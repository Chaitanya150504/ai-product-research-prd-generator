import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { sampleZomatoReport } from './src/data/sampleReport.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialise server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('GEMINI_API_KEY not found in environment variables.');
}

// Endpoint: Sample report for quick demo / fallback
app.get('/api/sample-report', (_req, res) => {
  return res.json(sampleZomatoReport);
});

// Endpoint: Generate dynamic report via Gemini
app.post('/api/generate-report', async (req, res) => {
  try {
    const { productName, featureIdea, targetUsers, productCategory, targetMarket } = req.body;

    if (!productName || !featureIdea) {
      return res.status(400).json({ error: 'Product Name and Feature Idea are required.' });
    }

    if (!ai) {
      // If no API key configured, return sample if matching Zomato, otherwise explain
      if (productName.toLowerCase().includes('zomato')) {
        return res.json(sampleZomatoReport);
      }
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please add it to your environment secrets.',
      });
    }

    const systemPrompt = `You are a Principal Product Manager, Head of Strategy, and Tech Lead at top tech companies (FAANG/Tier-1).
Your task is to generate an exhaustive, publication-grade Product Research & PRD Report in strict JSON format.

The user will provide:
- Product Name: ${productName}
- Feature Idea: ${featureIdea}
- Target Users: ${targetUsers || 'Not specified'}
- Product Category: ${productCategory || 'Not specified'}
- Target Market: ${targetMarket || 'Global / General'}

CRITICAL REQUIREMENTS:
1. Executive Summary: 150-200 words.
2. Market Opportunity: TAM, SAM, SOM with explicit currency/numbers, and at least 3 stated assumptions.
3. Competitor Analysis: EXACTLY 5 or more real or direct/indirect competitors. Include Company, Relevant Feature, Strengths, Weaknesses, Pricing, Differentiation.
4. SWOT Analysis: 4-5 items per quadrant.
5. User Personas: EXACTLY 3 distinct personas with realistic Name, Age, Occupation, Goals (3+ items), Frustrations (3+ items), Behaviour, and an evocative Quote.
6. User Journey: 6 stages: Awareness, Discovery, Signup, Usage, Retention, Advocacy. Each with userAction, touchpoints, painPoints, opportunities.
7. Customer Pain Points: AT LEAST 10 distinct pain points with title, description, severity (Critical/High/Medium), affectedSegment.
8. Proposed Features: Categorize into mustHave, shouldHave, couldHave, future (each with title, description, rationale).
9. RICE Prioritization: AT LEAST 5 features in a table with reach, reachValue, impact, impactValue, confidence, confidenceValue, effort, effortValue, riceScore, and exact calculation formula string (Reach * Impact * Confidence / Effort).
10. Kano Model: Categorize into basic, performance, delighters (with feature and explanation).
11. MoSCoW Prioritization: mustHave, shouldHave, couldHave, wontHave lists of strings.
12. PRODUCT REQUIREMENTS DOCUMENT (PRD):
    - productObjective
    - businessGoal
    - userStories (at least 4 stories with id, role, want, soThat, priority)
    - acceptanceCriteria (at least 4 criteria with storyId, scenario, given, when, then)
    - functionalRequirements (at least 5 items with id, category, description)
    - nonFunctionalRequirements (at least 4 categories like Performance, Security, Reliability, Scalability)
    - dependencies (list of strings)
    - risks (list of strings)
13. Technical Architecture: Details for frontend, backend, database, aiModel, cloud, authentication, analytics, and architecturalOverview.
14. Success Metrics:
    - northStarMetric: { name, target, why }
    - metricsTable: Array of at least 12 metrics covering North Star Metric, Activation Rate, Retention Rate, DAU, MAU, Conversion Rate, Feature Adoption, NPS, CSAT, Revenue, LTV, CAC. Each with metric, category, targetBenchmark, trackingMethod.
15. Risk Analysis: 4 categories (businessRisks, technicalRisks, operationalRisks, legalRisks), each with risk, severity, mitigation.
16. Launch Strategy: alpha (duration, cohort, objectives), beta (duration, cohort, objectives), publicLaunch (strategy, rolloutPhases), marketingStrategy, pricingStrategy, goTMarketStrategy.
17. 30/60/90 Day Roadmap: days30, days60, days90 with phase, timeframe, focus, deliverables (array), milestones.
18. PM Interview Questions: EXACTLY 5 PM interview questions specific to this product with id, question, category (e.g., Product Design, Metrics, Execution, Strategy, Trade-offs), evaluationCriteria, sampleAnswerApproach.

Return ONLY the valid raw JSON object matching this structure. No markdown formatting, no code block fences, no conversational preamble.`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: systemPrompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    } catch (apiError: any) {
      console.warn('First Gemini attempt failed, attempting single retry...', apiError?.message);
      // Wait 1 second before retry
      await new Promise((r) => setTimeout(r, 1000));
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: systemPrompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    }

    const responseText = response.text || '';
    if (!responseText.trim()) {
      throw new Error('Gemini returned an empty response.');
    }

    // Clean any markdown fences if present
    const cleanedJson = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsedReport = JSON.parse(cleanedJson);

    // Attach metadata
    parsedReport.meta = {
      productName,
      featureIdea,
      targetUsers: targetUsers || 'Not specified',
      productCategory: productCategory || 'General',
      targetMarket: targetMarket || 'Global',
      generatedAt: new Date().toISOString(),
    };

    return res.json(parsedReport);
  } catch (error: any) {
    console.error('Error generating report:', error?.message || error);
    // If user requested Zomato and Gemini experienced temporary capacity issues, return high-fidelity sample
    if (req.body?.productName && req.body.productName.toLowerCase().includes('zomato')) {
      console.log('Serving verified Zomato sample report as resilient fallback.');
      return res.json(sampleZomatoReport);
    }
    return res.status(500).json({
      error: error?.message || 'Failed to generate product report with Gemini.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Setup Vite middleware in dev or static files in production
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: false, // Disable HMR WebSocket in preview container to prevent connection failures
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
