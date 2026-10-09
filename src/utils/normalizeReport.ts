import {
  ProductReportData,
  CompetitorItem,
  PersonaItem,
  UserJourneyStage,
  PainPointItem,
  FeatureItem,
  RiceFeatureItem,
  KanoCategoryItem,
  UserStoryItem,
  AcceptanceCriterionItem,
  FunctionalRequirementItem,
  NonFunctionalRequirementItem,
  MetricItem,
  RiskItem,
  RoadmapPhase,
  InterviewQuestionItem,
} from '../types/report.ts';

/**
 * Safely converts any value (string, object, array, null, undefined) into a list of strings.
 * Gracefully extracts key-value pairs from objects and splits multiline strings.
 */
export function safeStringList(val: any, fallback: string[] = []): string[] {
  if (val === null || val === undefined) return fallback;

  if (Array.isArray(val)) {
    if (val.length === 0) return fallback;
    return val.map((item) => {
      if (typeof item === 'string') return item;
      if (typeof item === 'number' || typeof item === 'boolean') return String(item);
      if (typeof item === 'object' && item !== null) {
        // If it's a key-value object like { tactic: "SEO", budget: "10k" }
        return Object.entries(item)
          .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').trim()}: ${typeof v === 'object' ? (Array.isArray(v) ? v.join(', ') : JSON.stringify(v)) : v}`)
          .join(' — ');
      }
      return String(item);
    });
  }

  if (typeof val === 'string') {
    if (!val.trim()) return fallback;
    // If it contains bullet characters or newlines, split it
    if (val.includes('\n') || val.includes('•') || val.includes('- ') || val.includes(';')) {
      const parts = val
        .split(/\n|•|;/)
        .map((s) => s.replace(/^[-*]\s*/, '').trim())
        .filter(Boolean);
      if (parts.length > 0) return parts;
    }
    return [val.trim()];
  }

  if (typeof val === 'object') {
    const entries = Object.entries(val);
    if (entries.length === 0) return fallback;
    return entries.map(([k, v]) => {
      const formattedKey = k.replace(/([A-Z])/g, ' $1').trim();
      const formattedVal =
        Array.isArray(v)
          ? v.join(', ')
          : typeof v === 'object' && v !== null
          ? Object.entries(v)
              .map(([subK, subV]) => `${subK}: ${subV}`)
              .join('; ')
          : String(v);
      return `${formattedKey}: ${formattedVal}`;
    });
  }

  return [String(val)];
}

/**
 * Safely converts any value into a single clean string.
 */
export function safeString(val: any, fallback: string = ''): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) {
    return val.map((v) => (typeof v === 'object' ? JSON.stringify(v) : String(v))).join('; ');
  }
  if (typeof val === 'object') {
    return Object.entries(val)
      .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join('. ');
  }
  return String(val);
}

/**
 * Safely converts any value into an array of type T.
 */
export function safeArray<T = any>(val: any, fallback: T[] = []): T[] {
  if (val === null || val === undefined) return fallback;
  if (Array.isArray(val)) return val as T[];
  if (typeof val === 'object') {
    return Object.values(val) as T[];
  }
  return fallback;
}

/**
 * Thoroughly normalizes a raw Gemini JSON response into a 100% type-safe ProductReportData object.
 * Guarantees that arrays are arrays, strings are strings, and nested objects exist.
 */
export function normalizeReport(raw: any): ProductReportData {
  const data = typeof raw === 'object' && raw !== null ? raw : {};

  // 1. Meta
  const rawMeta = typeof data.meta === 'object' && data.meta !== null ? data.meta : {};
  const meta = {
    productName: safeString(rawMeta.productName || data.productName, 'Product Idea'),
    featureIdea: safeString(rawMeta.featureIdea || data.featureIdea, 'Core Feature'),
    targetUsers: safeString(rawMeta.targetUsers || data.targetUsers, 'Target Users'),
    productCategory: safeString(rawMeta.productCategory || data.productCategory, 'Technology'),
    targetMarket: safeString(rawMeta.targetMarket || data.targetMarket, 'Global'),
    generatedAt: safeString(rawMeta.generatedAt, new Date().toISOString()),
  };

  // 2. Executive Summary
  const executiveSummary = safeString(
    data.executiveSummary,
    'Executive summary currently being finalized.'
  );

  // 3. Problem Statement
  const rawProblem = typeof data.problemStatement === 'object' && data.problemStatement !== null ? data.problemStatement : {};
  const problemStatement = {
    coreProblem: safeString(
      rawProblem.coreProblem || (typeof data.problemStatement === 'string' ? data.problemStatement : ''),
      'Core user problem under evaluation.'
    ),
    whyCurrentSolutionsFail: safeString(
      rawProblem.whyCurrentSolutionsFail,
      'Existing market alternatives fail to address situational user context.'
    ),
    impactOfUnresolvedProblem: safeString(
      rawProblem.impactOfUnresolvedProblem,
      'High churn and user friction result from unresolved bottlenecks.'
    ),
  };

  // 4. Market Opportunity
  const rawMarket = typeof data.marketOpportunity === 'object' && data.marketOpportunity !== null ? data.marketOpportunity : {};
  const marketOpportunity = {
    tam: safeString(rawMarket.tam, '$10B+ Total Addressable Market'),
    sam: safeString(rawMarket.sam, '$2.5B Serviceable Available Market'),
    som: safeString(rawMarket.som, '$500M Serviceable Obtainable Market'),
    assumptions: safeStringList(rawMarket.assumptions, [
      'Digital adoption expands rapidly across target demographics.',
      'Unit economics support healthy customer acquisition and retention margins.',
      'Platform network effects compound competitive differentiation.',
    ]),
  };

  // 5. Competitor Analysis
  let rawCompetitors: any[] = [];
  if (Array.isArray(data.competitorAnalysis)) {
    rawCompetitors = data.competitorAnalysis;
  } else if (typeof data.competitorAnalysis === 'object' && data.competitorAnalysis !== null) {
    rawCompetitors = Object.entries(data.competitorAnalysis).map(([k, v]) => {
      if (typeof v === 'object' && v !== null) {
        return { company: k, ...v };
      }
      return { company: k, relevantFeature: String(v) };
    });
  } else if (typeof data.competitorAnalysis === 'string') {
    rawCompetitors = safeStringList(data.competitorAnalysis).map((str, i) => ({
      company: str.split(':')[0] || `Competitor ${i + 1}`,
      relevantFeature: str.split(':')[1] || str,
    }));
  }

  const competitorAnalysis: CompetitorItem[] = rawCompetitors.map((c, i) => {
    if (typeof c === 'string') {
      return {
        company: c,
        relevantFeature: 'Core offering',
        strengths: 'Market share',
        weaknesses: 'User experience friction',
        pricing: 'Standard',
        differentiation: 'Direct competitive alternative',
      };
    }
    const item = typeof c === 'object' && c !== null ? c : {};
    return {
      company: safeString(item.company || item.name, `Competitor ${i + 1}`),
      relevantFeature: safeString(item.relevantFeature || item.feature, 'Core product offering'),
      strengths: safeString(item.strengths, 'Established distribution network'),
      weaknesses: safeString(item.weaknesses, 'Legacy user interface and workflow friction'),
      pricing: safeString(item.pricing, 'Freemium / Tiered SaaS'),
      differentiation: safeString(item.differentiation, 'Proprietary automated workflow advantage'),
    };
  });

  // 6. SWOT Analysis
  const rawSwot = typeof data.swotAnalysis === 'object' && data.swotAnalysis !== null ? data.swotAnalysis : {};
  const swotAnalysis = {
    strengths: safeStringList(rawSwot.strengths, ['Proprietary AI architecture']),
    weaknesses: safeStringList(rawSwot.weaknesses, ['Cold start onboarding friction']),
    opportunities: safeStringList(rawSwot.opportunities, ['Market expansion and API integration']),
    threats: safeStringList(rawSwot.threats, ['Incumbent fast-follower replication']),
  };

  // 7. Target Users
  const rawTargetUsers = typeof data.targetUsersAnalysis === 'object' && data.targetUsersAnalysis !== null ? data.targetUsersAnalysis : {};
  const targetUsersAnalysis = {
    primarySegment: safeString(rawTargetUsers.primarySegment, 'Active digital professionals'),
    secondarySegment: safeString(rawTargetUsers.secondarySegment, 'Early adopters and students'),
    demographics: safeString(rawTargetUsers.demographics, 'Ages 20–40, digital-first'),
    psychographics: safeString(rawTargetUsers.psychographics, 'Efficiency-driven, values automation'),
    contextOfUse: safeString(rawTargetUsers.contextOfUse, 'Daily workflows on mobile and desktop'),
  };

  // 8. User Personas
  let rawPersonas: any[] = [];
  if (Array.isArray(data.userPersonas)) {
    rawPersonas = data.userPersonas;
  } else if (typeof data.userPersonas === 'object' && data.userPersonas !== null) {
    rawPersonas = Object.values(data.userPersonas);
  }
  const userPersonas: PersonaItem[] = rawPersonas.map((p, i) => {
    const item = typeof p === 'object' && p !== null ? p : { name: String(p) };
    return {
      name: safeString(item.name, `User Persona ${i + 1}`),
      age: typeof item.age === 'number' ? item.age : parseInt(safeString(item.age, '28'), 10) || 28,
      occupation: safeString(item.occupation, 'Knowledge Worker'),
      goals: safeStringList(item.goals, ['Achieve workflow efficiency without manual overhead']),
      frustrations: safeStringList(item.frustrations, ['Repetitive manual steps and choice overload']),
      behaviour: safeString(item.behaviour || item.behavior, 'Frequently leverages software tools during peak hours'),
      quote: safeString(item.quote, 'I need tools that anticipate my workflow context.'),
    };
  });

  // 9. User Journey
  const defaultStages: Array<'Awareness' | 'Discovery' | 'Signup' | 'Usage' | 'Retention' | 'Advocacy'> = [
    'Awareness',
    'Discovery',
    'Signup',
    'Usage',
    'Retention',
    'Advocacy',
  ];
  let rawJourney: any[] = [];
  if (Array.isArray(data.userJourney)) {
    rawJourney = data.userJourney;
  } else if (typeof data.userJourney === 'object' && data.userJourney !== null) {
    rawJourney = Object.entries(data.userJourney).map(([k, v]) => ({
      stage: k,
      ...(typeof v === 'object' && v !== null ? v : { userAction: String(v) }),
    }));
  }
  const userJourney: UserJourneyStage[] = defaultStages.map((stageName, idx) => {
    const existing =
      rawJourney.find((j) => safeString(j?.stage).toLowerCase() === stageName.toLowerCase()) ||
      rawJourney[idx] ||
      {};
    return {
      stage: stageName,
      userAction: safeString(existing.userAction, `User experiences ${stageName} phase`),
      touchpoints: safeString(existing.touchpoints, 'Application interface and notifications'),
      painPoints: safeString(existing.painPoints, 'Drop-off friction and cognitive load'),
      opportunities: safeString(existing.opportunities, 'Streamlined one-tap progression'),
    };
  });

  // 10. Customer Pain Points
  let rawPainPoints: any[] = [];
  if (Array.isArray(data.customerPainPoints)) {
    rawPainPoints = data.customerPainPoints;
  } else if (typeof data.customerPainPoints === 'object' && data.customerPainPoints !== null) {
    rawPainPoints = Object.values(data.customerPainPoints);
  } else if (typeof data.customerPainPoints === 'string') {
    rawPainPoints = safeStringList(data.customerPainPoints);
  }
  const customerPainPoints: PainPointItem[] = rawPainPoints.map((pp, i) => {
    if (typeof pp === 'string') {
      return {
        id: i + 1,
        title: pp,
        description: pp,
        severity: 'High' as const,
        affectedSegment: 'Primary users',
      };
    }
    const item = typeof pp === 'object' && pp !== null ? pp : {};
    const rawSev = safeString(item.severity).toLowerCase();
    const severity: 'Critical' | 'High' | 'Medium' = rawSev.includes('crit')
      ? 'Critical'
      : rawSev.includes('high')
      ? 'High'
      : 'Medium';
    return {
      id: typeof item.id === 'number' ? item.id : i + 1,
      title: safeString(item.title || item.painPoint, `Pain Point ${i + 1}`),
      description: safeString(item.description, 'Friction causing user drop-off.'),
      severity,
      affectedSegment: safeString(item.affectedSegment, 'Primary users'),
    };
  });

  // 11. Proposed Features
  const mapFeatureList = (arr: any): FeatureItem[] => {
    let list: any[] = [];
    if (Array.isArray(arr)) {
      list = arr;
    } else if (typeof arr === 'object' && arr !== null) {
      list = Object.values(arr);
    } else if (typeof arr === 'string') {
      list = safeStringList(arr);
    }
    return list.map((f, i) => {
      if (typeof f === 'string') {
        return {
          title: f,
          description: f,
          rationale: 'Directly addresses identified user bottleneck.',
        };
      }
      const item = typeof f === 'object' && f !== null ? f : {};
      return {
        title: safeString(item.title || item.name || item.feature, `Feature ${i + 1}`),
        description: safeString(item.description || item.desc, 'Feature functional summary.'),
        rationale: safeString(item.rationale || item.reason, 'Directly addresses identified user bottleneck.'),
      };
    });
  };

  const rawFeatures = typeof data.proposedFeatures === 'object' && data.proposedFeatures !== null ? data.proposedFeatures : {};
  const proposedFeatures = {
    mustHave: mapFeatureList(rawFeatures.mustHave),
    shouldHave: mapFeatureList(rawFeatures.shouldHave),
    couldHave: mapFeatureList(rawFeatures.couldHave),
    future: mapFeatureList(rawFeatures.future),
  };

  // 12. RICE Prioritization
  let rawRice: any[] = [];
  if (Array.isArray(data.ricePrioritization)) {
    rawRice = data.ricePrioritization;
  } else if (typeof data.ricePrioritization === 'object' && data.ricePrioritization !== null) {
    rawRice = Object.values(data.ricePrioritization);
  }
  const ricePrioritization: RiceFeatureItem[] = rawRice.map((r, i) => {
    if (typeof r === 'string') {
      return {
        feature: r,
        reach: '10,000 users/mo',
        reachValue: 10000,
        impact: '3 (High)',
        impactValue: 3,
        confidence: '80%',
        confidenceValue: 0.8,
        effort: '2 sprints',
        effortValue: 2,
        riceScore: 12000,
        calculation: '(10000 × 3 × 0.8) / 2 = 12000',
      };
    }
    const item = typeof r === 'object' && r !== null ? r : {};
    const reachVal = typeof item.reachValue === 'number' ? item.reachValue : 10000;
    const impactVal = typeof item.impactValue === 'number' ? item.impactValue : 2;
    const confVal = typeof item.confidenceValue === 'number' ? item.confidenceValue : 0.8;
    const effortVal = typeof item.effortValue === 'number' ? item.effortValue : 2;
    const riceScore =
      typeof item.riceScore === 'number'
        ? item.riceScore
        : Math.round((reachVal * impactVal * confVal) / (effortVal || 1));
    return {
      feature: safeString(item.feature || item.title || item.name, `Feature ${i + 1}`),
      reach: safeString(item.reach, `${reachVal.toLocaleString()} users/mo`),
      reachValue: reachVal,
      impact: safeString(item.impact, `${impactVal} (Moderate)`),
      impactValue: impactVal,
      confidence: safeString(item.confidence, `${Math.round(confVal * 100)}%`),
      confidenceValue: confVal,
      effort: safeString(item.effort, `${effortVal} sprints`),
      effortValue: effortVal,
      riceScore,
      calculation: safeString(
        item.calculation,
        `(${reachVal} × ${impactVal} × ${confVal}) / ${effortVal} = ${riceScore}`
      ),
    };
  });

  // 13. Kano Model
  const mapKanoList = (arr: any): KanoCategoryItem[] => {
    let list: any[] = [];
    if (Array.isArray(arr)) {
      list = arr;
    } else if (typeof arr === 'object' && arr !== null) {
      list = Object.values(arr);
    } else if (typeof arr === 'string') {
      list = safeStringList(arr);
    }
    return list.map((k) => {
      if (typeof k === 'string') {
        return {
          feature: k,
          explanation: 'Core satisfaction driver.',
        };
      }
      const item = typeof k === 'object' && k !== null ? k : {};
      return {
        feature: safeString(item.feature || item.title || item.name, 'System Feature'),
        explanation: safeString(item.explanation || item.description, 'Expected satisfaction impact.'),
      };
    });
  };

  const rawKano = typeof data.kanoModel === 'object' && data.kanoModel !== null ? data.kanoModel : {};
  const kanoModel = {
    basic: mapKanoList(rawKano.basic),
    performance: mapKanoList(rawKano.performance),
    delighters: mapKanoList(rawKano.delighters),
  };

  // 14. MoSCoW Prioritization
  const rawMoscow = typeof data.moscowPrioritization === 'object' && data.moscowPrioritization !== null ? data.moscowPrioritization : {};
  const moscowPrioritization = {
    mustHave: safeStringList(rawMoscow.mustHave),
    shouldHave: safeStringList(rawMoscow.shouldHave),
    couldHave: safeStringList(rawMoscow.couldHave),
    wontHave: safeStringList(rawMoscow.wontHave),
  };

  // 15. PRD
  const rawPrd = typeof data.prd === 'object' && data.prd !== null ? data.prd : {};
  const prd = {
    productObjective: safeString(rawPrd.productObjective, 'Drive core product value through contextual AI automation.'),
    businessGoal: safeString(rawPrd.businessGoal, 'Increase feature adoption by 25% and reduce user friction.'),
    userStories: safeArray<any>(rawPrd.userStories).map((us, i) => {
      if (typeof us === 'string') {
        return {
          id: `US-0${i + 1}`,
          role: 'User',
          want: us,
          soThat: 'I achieve my goal efficiently',
          priority: 'Must' as const,
        };
      }
      const item = typeof us === 'object' && us !== null ? us : {};
      return {
        id: safeString(item.id, `US-0${i + 1}`),
        role: safeString(item.role, 'User'),
        want: safeString(item.want, 'interact with automated recommendations'),
        soThat: safeString(item.soThat, 'I save time and achieve my workflow goals'),
        priority: (safeString(item.priority).includes('Should') ? 'Should' : safeString(item.priority).includes('Could') ? 'Could' : 'Must') as 'Must' | 'Should' | 'Could',
      };
    }),
    acceptanceCriteria: safeArray<any>(rawPrd.acceptanceCriteria).map((ac, i) => {
      if (typeof ac === 'string') {
        return {
          storyId: `US-0${i + 1}`,
          scenario: ac,
          given: 'User is active on the screen',
          when: 'User triggers action',
          then: 'System processes and displays results',
        };
      }
      const item = typeof ac === 'object' && ac !== null ? ac : {};
      return {
        storyId: safeString(item.storyId, `US-0${i + 1}`),
        scenario: safeString(item.scenario, 'Core interaction flow'),
        given: safeString(item.given, 'User is logged in on the active screen'),
        when: safeString(item.when, 'User initiates feature action'),
        then: safeString(item.then, 'System displays tailored results in under 800ms'),
      };
    }),
    functionalRequirements: safeArray<any>(rawPrd.functionalRequirements).map((fr, i) => {
      if (typeof fr === 'string') {
        return {
          id: `FR-0${i + 1}`,
          category: 'Core Logic',
          description: fr,
        };
      }
      const item = typeof fr === 'object' && fr !== null ? fr : {};
      return {
        id: safeString(item.id, `FR-0${i + 1}`),
        category: safeString(item.category, 'Core Logic'),
        description: safeString(item.description, 'System functional specification.'),
      };
    }),
    nonFunctionalRequirements: safeArray<any>(rawPrd.nonFunctionalRequirements).map((nfr) => {
      if (typeof nfr === 'string') {
        return {
          category: 'Performance & Security',
          requirement: nfr,
          standard: 'P95 latency ≤ 800ms',
        };
      }
      const item = typeof nfr === 'object' && nfr !== null ? nfr : {};
      return {
        category: safeString(item.category, 'Performance & Security'),
        requirement: safeString(item.requirement, 'System maintains high throughput and data privacy standards.'),
        standard: safeString(item.standard, 'P95 latency ≤ 800ms'),
      };
    }),
    dependencies: safeStringList(rawPrd.dependencies, ['Core Cloud Platform Services', 'Authentication Provider']),
    risks: safeStringList(rawPrd.risks, ['Peak concurrency inference latency']),
  };

  // 16. Technical Architecture
  const rawTech = typeof data.technicalArchitecture === 'object' && data.technicalArchitecture !== null ? data.technicalArchitecture : {};
  const technicalArchitecture = {
    frontend: safeString(rawTech.frontend, 'React 19, TypeScript, Tailwind CSS'),
    backend: safeString(rawTech.backend, 'Node.js / Express or Vercel Serverless Functions'),
    database: safeString(rawTech.database, 'PostgreSQL with Redis caching layer'),
    aiModel: safeString(rawTech.aiModel, 'Google Gemini 3.8 Flash'),
    cloud: safeString(rawTech.cloud, 'Google Cloud Platform / Vercel Edge Network'),
    authentication: safeString(rawTech.authentication, 'OAuth 2.0 / JWT session authentication'),
    analytics: safeString(rawTech.analytics, 'Mixpanel & BigQuery telemetry pipeline'),
    architecturalOverview: safeString(
      rawTech.architecturalOverview,
      'Client requests pass through API Gateway, querying vector embeddings and Gemini models for contextual generation.'
    ),
  };

  // 17. Success Metrics
  const rawMetrics = typeof data.successMetrics === 'object' && data.successMetrics !== null ? data.successMetrics : {};
  let rawMetricsTable: any[] = [];
  if (Array.isArray(rawMetrics.metricsTable)) {
    rawMetricsTable = rawMetrics.metricsTable;
  } else if (typeof rawMetrics.metricsTable === 'object' && rawMetrics.metricsTable !== null) {
    rawMetricsTable = Object.values(rawMetrics.metricsTable);
  }
  const successMetrics = {
    northStarMetric: {
      name: safeString(rawMetrics.northStarMetric?.name, 'Weekly Feature Conversion Rate'),
      target: safeString(rawMetrics.northStarMetric?.target, '≥ 40% adoption among active sessions'),
      why: safeString(rawMetrics.northStarMetric?.why, 'Validates that the feature delivers measurable user value.'),
    },
    metricsTable: rawMetricsTable.map((m, i) => {
      if (typeof m === 'string') {
        return {
          metric: m,
          category: 'Engagement',
          targetBenchmark: 'Industry top quartile',
          trackingMethod: 'Automated event telemetry',
        };
      }
      const item = typeof m === 'object' && m !== null ? m : {};
      return {
        metric: safeString(item.metric || item.name, `Metric ${i + 1}`),
        category: safeString(item.category, 'Engagement'),
        targetBenchmark: safeString(item.targetBenchmark || item.benchmark, 'Industry top quartile'),
        trackingMethod: safeString(item.trackingMethod || item.tracking, 'Automated event telemetry'),
      };
    }),
  };

  // 18. Risk Analysis
  const mapRiskList = (arr: any): RiskItem[] => {
    let list: any[] = [];
    if (Array.isArray(arr)) {
      list = arr;
    } else if (typeof arr === 'object' && arr !== null) {
      list = Object.values(arr);
    } else if (typeof arr === 'string') {
      list = safeStringList(arr);
    }
    return list.map((r) => {
      if (typeof r === 'string') {
        return {
          risk: r,
          severity: 'Medium' as const,
          mitigation: 'Proactive monitoring and automated fallbacks.',
        };
      }
      const item = typeof r === 'object' && r !== null ? r : {};
      const rawSev = safeString(item.severity).toLowerCase();
      const severity: 'High' | 'Medium' | 'Low' = rawSev.includes('high')
        ? 'High'
        : rawSev.includes('med')
        ? 'Medium'
        : 'Low';
      return {
        risk: safeString(item.risk, 'Potential operational or technical constraint.'),
        severity,
        mitigation: safeString(item.mitigation, 'Proactive monitoring and automated fallbacks.'),
      };
    });
  };

  const rawRisk = typeof data.riskAnalysis === 'object' && data.riskAnalysis !== null ? data.riskAnalysis : {};
  const riskAnalysis = {
    businessRisks: mapRiskList(rawRisk.businessRisks),
    technicalRisks: mapRiskList(rawRisk.technicalRisks),
    operationalRisks: mapRiskList(rawRisk.operationalRisks),
    legalRisks: mapRiskList(rawRisk.legalRisks),
  };

  // 19. Launch Strategy (CRITICAL: DEFENSIVE HANDLING FOR MARKETING STRATEGY)
  const rawLaunch = typeof data.launchStrategy === 'object' && data.launchStrategy !== null ? data.launchStrategy : {};
  const launchStrategy = {
    alpha: {
      duration: safeString(rawLaunch.alpha?.duration, '4 Weeks'),
      cohort: safeString(rawLaunch.alpha?.cohort, 'Internal team & close beta testers'),
      objectives: safeStringList(rawLaunch.alpha?.objectives, ['Stress test core workflows and API latency']),
    },
    beta: {
      duration: safeString(rawLaunch.beta?.duration, '6 Weeks'),
      cohort: safeString(rawLaunch.beta?.cohort, 'Top active user cohort'),
      objectives: safeStringList(rawLaunch.beta?.objectives, ['Measure conversion lift and gather UX feedback']),
    },
    publicLaunch: {
      strategy: safeString(rawLaunch.publicLaunch?.strategy || rawLaunch.publicLaunch, 'Phased rollout across all target cohorts.'),
      rolloutPhases: safeStringList(rawLaunch.publicLaunch?.rolloutPhases, ['Phase 1: Early Access', 'Phase 2: General Availability']),
    },
    marketingStrategy: safeStringList(rawLaunch.marketingStrategy, [
      'Targeted email onboarding sequences for existing power users.',
      'Social proof & community case studies highlighting workflow velocity.',
      'Content marketing around problem resolution and time savings.',
    ]),
    pricingStrategy: safeString(rawLaunch.pricingStrategy, 'Freemium tier with premium feature entitlement.'),
    goTMarketStrategy: safeStringList(rawLaunch.goTMarketStrategy || rawLaunch.goMarketStrategy, [
      'Direct in-app promotion triggers at high-intent moments.',
      'Partnership distribution and community referrals.',
    ]),
  };

  // 20. Roadmap
  const mapPhase = (p: any, defaultPhaseName: string, defaultTime: string): RoadmapPhase => {
    const item = typeof p === 'object' && p !== null ? p : {};
    return {
      phase: safeString(item.phase, defaultPhaseName),
      timeframe: safeString(item.timeframe, defaultTime),
      focus: safeString(item.focus, 'Core architectural foundation and testing.'),
      deliverables: safeStringList(item.deliverables, ['Functional specifications', 'Alpha prototype']),
      milestones: safeString(item.milestones, 'Initial validation complete with zero blocking issues.'),
    };
  };

  const rawRoadmap = typeof data.roadmap === 'object' && data.roadmap !== null ? data.roadmap : {};
  const roadmap = {
    days30: mapPhase(rawRoadmap.days30, 'Phase 1: Discovery & Foundation', 'Days 1–30'),
    days60: mapPhase(rawRoadmap.days60, 'Phase 2: Closed Beta & Optimization', 'Days 31–60'),
    days90: mapPhase(rawRoadmap.days90, 'Phase 3: General Availability & Scale', 'Days 61–90'),
  };

  // 21. PM Interview Questions
  let rawQuestions: any[] = [];
  if (Array.isArray(data.pmInterviewQuestions)) {
    rawQuestions = data.pmInterviewQuestions;
  } else if (typeof data.pmInterviewQuestions === 'object' && data.pmInterviewQuestions !== null) {
    rawQuestions = Object.values(data.pmInterviewQuestions);
  } else if (typeof data.pmInterviewQuestions === 'string') {
    rawQuestions = safeStringList(data.pmInterviewQuestions);
  }
  const pmInterviewQuestions: InterviewQuestionItem[] = rawQuestions.map((q, i) => {
    if (typeof q === 'string') {
      return {
        id: i + 1,
        question: q,
        category: 'Product Design & Strategy',
        evaluationCriteria: 'Evaluates candidate analytical clarity and user empathy.',
        sampleAnswerApproach: 'Structure answer with customer problem, metric goals, and technical trade-offs.',
      };
    }
    const item = typeof q === 'object' && q !== null ? q : {};
    return {
      id: typeof item.id === 'number' ? item.id : i + 1,
      question: safeString(item.question, `How would you prioritize trade-offs for this feature?`),
      category: safeString(item.category, 'Product Design & Strategy'),
      evaluationCriteria: safeString(item.evaluationCriteria, 'Evaluates candidate analytical clarity and user empathy.'),
      sampleAnswerApproach: safeString(item.sampleAnswerApproach, 'Structure answer with customer problem, metric goals, and technical trade-offs.'),
    };
  });

  return {
    meta,
    executiveSummary,
    problemStatement,
    marketOpportunity,
    competitorAnalysis,
    swotAnalysis,
    targetUsersAnalysis,
    userPersonas,
    userJourney,
    customerPainPoints,
    proposedFeatures,
    ricePrioritization,
    kanoModel,
    moscowPrioritization,
    prd,
    technicalArchitecture,
    successMetrics,
    riskAnalysis,
    launchStrategy,
    roadmap,
    pmInterviewQuestions,
  };
}
