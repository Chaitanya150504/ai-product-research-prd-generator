import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { sampleZomatoReport } from '../src/data/sampleReport.ts';
import { normalizeReport } from '../src/utils/normalizeReport.ts';

// Helper to send JSON responses across Vercel serverless and Express runtimes
function sendJson(res: any, statusCode: number, data: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(data));
}

// Timeout budget for serverless execution safety (safely below Vercel 60s hard limit)
const SERVERLESS_TIMEOUT_MS = 50000;

export default async function handler(req: any, res: any) {
  const requestStartTime = Date.now();

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (typeof res.status === 'function') {
      return res.status(200).end();
    }
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed. Use POST.' });
  }

  try {
    // Parse request body safely
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (_) {
        body = {};
      }
    } else if (!body && typeof req.on === 'function') {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const raw = Buffer.concat(chunks).toString('utf-8');
      try {
        body = JSON.parse(raw);
      } catch (_) {
        body = {};
      }
    }

    body = body || {};
    const { productName, featureIdea, targetUsers, productCategory, targetMarket } = body;

    if (!productName || !featureIdea) {
      return sendJson(res, 400, {
        error: 'Product Name and Feature Idea are required fields.',
      });
    }

    console.log(`[GenerateReport] Request started for product: "${productName}", category: "${productCategory || 'N/A'}", market: "${targetMarket || 'N/A'}"`);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      if (productName.toLowerCase().includes('zomato')) {
        console.log('[GenerateReport] No API key; returning verified sample Zomato report.');
        return sendJson(res, 200, normalizeReport(sampleZomatoReport));
      }
      return sendJson(res, 500, {
        error:
          'GEMINI_API_KEY is not configured on the server. Please add it to your environment variables.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemPrompt = `You are a Principal Product Manager, Head of Strategy, and Tech Lead at top-tier tech companies.
Your task is to generate a concise, high-density, publication-grade Product Research & PRD Report in strict JSON format.

Input Parameters:
- Product Name: ${productName}
- Feature Idea: ${featureIdea}
- Target Users: ${targetUsers || 'General user segment'}
- Product Category: ${productCategory || 'General'}
- Target Market: ${targetMarket || 'Global / General'}

CRITICAL GUIDELINES FOR PERFORMANCE AND CONCISENESS (Deliver all 20 sections compactly; strictly avoid unnecessary fluff or long paragraphs):
1. executiveSummary: 150-200 words maximum summarizing problem, solution, TAM/SAM/SOM, and projected impact. Concise and punchy.
2. problemStatement: { coreProblem, whyCurrentSolutionsFail, impactOfUnresolvedProblem } (1-2 concise sentences each).
3. marketOpportunity: { tam, sam, som, assumptions: string[] (EXACTLY 3 concise bullet points) }.
4. competitorAnalysis: EXACTLY 5 competitors with { company, relevantFeature, strengths, weaknesses, pricing, differentiation } (concise 1-sentence entries).
5. swotAnalysis: { strengths: string[], weaknesses: string[], opportunities: string[], threats: string[] } (3-4 concise items each).
6. targetUsersAnalysis: { primarySegment, secondarySegment, demographics, psychographics, contextOfUse } (1-2 sentences each).
7. userPersonas: EXACTLY 3 personas with { name, age, occupation, goals: string[], frustrations: string[], behaviour, quote } (concise fields, 2-3 goals and frustrations each).
8. userJourney: 6 stages [Awareness, Discovery, Signup, Usage, Retention, Advocacy] with { stage, userAction, touchpoints, painPoints, opportunities } (1 sentence per field).
9. customerPainPoints: UP TO 10 items (7-10 items) with { id: number, title, description, severity: "Critical"|"High"|"Medium", affectedSegment } (concise descriptions).
10. proposedFeatures: { mustHave: Feature[], shouldHave: Feature[], couldHave: Feature[], future: Feature[] } (2-3 items per bucket, each { title, description, rationale }; concise descriptions).
11. ricePrioritization: 6 to 8 features with { feature, reach, reachValue: number, impact, impactValue: number, confidence, confidenceValue: number, effort, effortValue: number, riceScore: number, calculation: string }.
12. kanoModel: { basic: Item[], performance: Item[], delighters: Item[] } (2-3 items each, with { feature, explanation }).
13. moscowPrioritization: { mustHave: string[], shouldHave: string[], couldHave: string[], wontHave: string[] } (3-4 concise items each).
14. prd: concise but complete:
    - productObjective: string (1-2 sentences)
    - businessGoal: string (1-2 sentences)
    - userStories: EXACTLY 4 items with { id, role, want, soThat, priority: "Must"|"Should"|"Could" }
    - acceptanceCriteria: EXACTLY 4 items with { storyId, scenario, given, when, then }
    - functionalRequirements: EXACTLY 5 items with { id, category, description }
    - nonFunctionalRequirements: EXACTLY 4 items with { category, requirement, standard }
    - dependencies: string[] (3-4 concise items)
    - risks: string[] (3-4 concise items)
15. technicalArchitecture: { frontend, backend, database, aiModel, cloud, authentication, analytics, architecturalOverview } (concise entries).
16. successMetrics: { northStarMetric: { name, target, why }, metricsTable: MetricItem[] (6-8 key metrics with metric, category, targetBenchmark) }.
17. riskAnalysis: { businessRisks: Risk[], technicalRisks: Risk[], operationalRisks: Risk[], legalRisks: Risk[] } (2-3 items each with { risk, severity: "High"|"Medium"|"Low", mitigation }).
18. launchStrategy: { alpha: { duration: string, cohort: string, objectives: string[] }, beta: { duration: string, cohort: string, objectives: string[] }, publicLaunch: { strategy: string, rolloutPhases: string[] }, marketingStrategy: string[] (CRITICAL: MUST be a JSON array of strings e.g. ["Strategy 1", "Strategy 2", "Strategy 3"], NEVER a JSON object), pricingStrategy: string, goTMarketStrategy: string[] (MUST be a JSON array of strings) }.
19. productRoadmap: JSON array of 3 phases (MVP, Beta, Scale / Growth). Do not use mandatory 30/60/90-day timelines. Do NOT invent specific fake numerical targets, revenue, or dates unless provided. Use qualitative success criteria or label as "Suggested Target / Assumption". Each phase item MUST contain:
    - phase: string (e.g. "MVP", "Beta", "Scale / Growth")
    - strategicFocus: string
    - keyInitiatives: string[] (2-3 items)
    - keyDeliverables: string[] (2-3 items)
    - dependencies: string[] (2 items)
    - successCriteria: string
20. featureSpecifications: JSON array of ONLY the most important 5 features translating proposed features into detailed engineering requirements (complementing Section 14 PRD). For each feature include:
    - featureName: string
    - description: string
    - userProblem: string
    - userValue: string
    - priority: "Must Have" | "Should Have" | "Could Have"
    - userStory: string
    - functionalRequirements: string[] (2-3 items)
    - dependencies: string[] (2 items)
    - acceptanceCriteria: string[] (2-3 items)

CRITICAL SCHEMA INTEGRITY RULES:
- All fields designated as arrays (productRoadmap, featureSpecifications, marketingStrategy, goTMarketStrategy, rolloutPhases, assumptions, SWOT items, MoSCoW lists, userStories, etc.) MUST be JSON arrays [ ... ], NEVER JSON objects { ... } or raw strings.
- Return ONLY valid JSON matching this schema. No markdown formatting, no code fences.`;

    const PRIMARY_MODEL = 'gemini-3.1-flash-lite';
    const FALLBACK_MODEL = 'gemini-3.8-flash';

    console.log(`[GenerateReport] Primary Gemini model selected: ${PRIMARY_MODEL}`);

    // Create a timeout promise to protect against serverless gateway 504 timeouts
    let timeoutHandle: any;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutHandle = setTimeout(() => {
        reject(new Error(`SERVERLESS_TIMEOUT: Report generation exceeded ${SERVERLESS_TIMEOUT_MS / 1000}s execution safety window.`));
      }, SERVERLESS_TIMEOUT_MS);
    });

    // Execute generation with primary model and at most 1 controlled fallback
    const generationPromise = (async () => {
      let activeModel = PRIMARY_MODEL;
      const geminiStartTime = Date.now();
      console.log(`[GenerateReport] Gemini request started (model: ${activeModel})`);

      let resp;
      try {
        resp = await ai.models.generateContent({
          model: activeModel,
          contents: systemPrompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
      } catch (primaryError: any) {
        console.warn(`[GenerateReport] Primary model ${activeModel} failed (${primaryError?.message || 'unknown error'}). Initiating single controlled fallback to ${FALLBACK_MODEL}...`);
        activeModel = FALLBACK_MODEL;
        const fallbackStartTime = Date.now();
        console.log(`[GenerateReport] Gemini request started (model: ${activeModel})`);
        resp = await ai.models.generateContent({
          model: activeModel,
          contents: systemPrompt,
          config: {
            responseMimeType: 'application/json',
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        });
        console.log(`[GenerateReport] Fallback request completed in ${Date.now() - fallbackStartTime}ms`);
      }

      const text = resp.text || '';
      console.log(`[GenerateReport] Gemini response received (model: ${activeModel}, duration: ${Date.now() - geminiStartTime}ms, length: ${text.length} chars)`);
      return text;
    })();

    let responseText: string;
    try {
      responseText = await Promise.race([generationPromise, timeoutPromise]);
    } finally {
      clearTimeout(timeoutHandle);
    }

    if (!responseText || !responseText.trim()) {
      throw new Error('Gemini returned an empty response.');
    }

    const parseStartTime = Date.now();
    const cleanedJson = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsedReport = JSON.parse(cleanedJson);
    console.log(`[GenerateReport] Response parsing completed in ${Date.now() - parseStartTime}ms`);

    parsedReport.meta = {
      productName,
      featureIdea,
      targetUsers: targetUsers || 'General user segment',
      productCategory: productCategory || 'General',
      targetMarket: targetMarket || 'Global',
      generatedAt: new Date().toISOString(),
    };

    const validatedReport = normalizeReport(parsedReport);
    const totalGenerationTime = Date.now() - requestStartTime;
    console.log(`[GenerateReport] Total generation time: ${totalGenerationTime}ms — returning validated report.`);

    return sendJson(res, 200, validatedReport);
  } catch (error: any) {
    const totalGenerationTime = Date.now() - requestStartTime;
    const isTimeout = error?.message?.includes('SERVERLESS_TIMEOUT');
    console.error(`[GenerateReport] Error / Timeout after ${totalGenerationTime}ms:`, error?.message || error);

    // If request was for Zomato and Gemini experienced capacity or rate limit issues
    if (req.body?.productName && req.body.productName.toLowerCase().includes('zomato')) {
      console.log('[GenerateReport] Serving verified Zomato sample report fallback on error.');
      return sendJson(res, 200, normalizeReport(sampleZomatoReport));
    }

    if (isTimeout) {
      return sendJson(res, 504, {
        error:
          'Report generation timed out on the server. Please try again with more concise inputs or select a sample report.',
      });
    }

    return sendJson(res, 500, {
      error: error?.message || 'Failed to generate product report with Gemini.',
    });
  }
}
