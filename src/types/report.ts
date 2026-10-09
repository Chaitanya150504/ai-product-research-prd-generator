export interface ProductInput {
  productName: string;
  featureIdea: string;
  targetUsers?: string;
  productCategory?: string;
  targetMarket?: string;
}

export interface CompetitorItem {
  company: string;
  relevantFeature: string;
  strengths: string;
  weaknesses: string;
  pricing: string;
  differentiation: string;
}

export interface PersonaItem {
  name: string;
  age: number;
  occupation: string;
  goals: string[];
  frustrations: string[];
  behaviour: string;
  quote: string;
}

export interface UserJourneyStage {
  stage: 'Awareness' | 'Discovery' | 'Signup' | 'Usage' | 'Retention' | 'Advocacy';
  userAction: string;
  touchpoints: string;
  painPoints: string;
  opportunities: string;
}

export interface PainPointItem {
  id: number;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium';
  affectedSegment: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  rationale: string;
}

export interface RiceFeatureItem {
  feature: string;
  reach: string; // e.g. "50,000 users/mo"
  reachValue: number;
  impact: string; // e.g. "3 (High)"
  impactValue: number;
  confidence: string; // e.g. "80%"
  confidenceValue: number;
  effort: string; // e.g. "2 sprints"
  effortValue: number;
  riceScore: number;
  calculation: string; // "(50000 × 3 × 0.8) / 2 = 60,000"
}

export interface KanoCategoryItem {
  feature: string;
  explanation: string;
}

export interface UserStoryItem {
  id: string;
  role: string;
  want: string;
  soThat: string;
  priority: 'Must' | 'Should' | 'Could';
}

export interface AcceptanceCriterionItem {
  storyId: string;
  scenario: string;
  given: string;
  when: string;
  then: string;
}

export interface FunctionalRequirementItem {
  id: string;
  category: string;
  description: string;
}

export interface NonFunctionalRequirementItem {
  category: string;
  requirement: string;
  standard: string;
}

export interface MetricItem {
  metric: string;
  category: string;
  targetBenchmark: string;
  trackingMethod: string;
}

export interface RiskItem {
  risk: string;
  severity: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface ProductRoadmapPhase {
  phase: string; // e.g. "MVP", "Beta", "Scale / Growth"
  strategicFocus: string;
  keyInitiatives: string[];
  keyDeliverables: string[];
  dependencies: string[];
  successCriteria: string;
}

export interface FeatureSpecificationItem {
  featureName: string;
  description: string;
  userValue: string;
  priority: 'Must Have' | 'Should Have' | 'Could Have' | string;
  dependencies: string[];
  functionalRequirements: string[];
  acceptanceCriteria: string[];
}

export interface ProductReportData {
  meta: {
    productName: string;
    featureIdea: string;
    targetUsers: string;
    productCategory: string;
    targetMarket: string;
    generatedAt: string;
  };
  executiveSummary: string;
  problemStatement: {
    coreProblem: string;
    whyCurrentSolutionsFail: string;
    impactOfUnresolvedProblem: string;
  };
  marketOpportunity: {
    tam: string;
    sam: string;
    som: string;
    assumptions: string[];
  };
  competitorAnalysis: CompetitorItem[];
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  targetUsersAnalysis: {
    primarySegment: string;
    secondarySegment: string;
    demographics: string;
    psychographics: string;
    contextOfUse: string;
  };
  userPersonas: PersonaItem[];
  userJourney: UserJourneyStage[];
  customerPainPoints: PainPointItem[];
  proposedFeatures: {
    mustHave: FeatureItem[];
    shouldHave: FeatureItem[];
    couldHave: FeatureItem[];
    future: FeatureItem[];
  };
  ricePrioritization: RiceFeatureItem[];
  kanoModel: {
    basic: KanoCategoryItem[];
    performance: KanoCategoryItem[];
    delighters: KanoCategoryItem[];
  };
  moscowPrioritization: {
    mustHave: string[];
    shouldHave: string[];
    couldHave: string[];
    wontHave: string[];
  };
  prd: {
    productObjective: string;
    businessGoal: string;
    userStories: UserStoryItem[];
    acceptanceCriteria: AcceptanceCriterionItem[];
    functionalRequirements: FunctionalRequirementItem[];
    nonFunctionalRequirements: NonFunctionalRequirementItem[];
    dependencies: string[];
    risks: string[];
  };
  technicalArchitecture: {
    frontend: string;
    backend: string;
    database: string;
    aiModel: string;
    cloud: string;
    authentication: string;
    analytics: string;
    architecturalOverview: string;
  };
  successMetrics: {
    northStarMetric: {
      name: string;
      target: string;
      why: string;
    };
    metricsTable: MetricItem[];
  };
  riskAnalysis: {
    businessRisks: RiskItem[];
    technicalRisks: RiskItem[];
    operationalRisks: RiskItem[];
    legalRisks: RiskItem[];
  };
  launchStrategy: {
    alpha: {
      duration: string;
      cohort: string;
      objectives: string[];
    };
    beta: {
      duration: string;
      cohort: string;
      objectives: string[];
    };
    publicLaunch: {
      strategy: string;
      rolloutPhases: string[];
    };
    marketingStrategy: string[];
    pricingStrategy: string;
    goTMarketStrategy: string[];
  };
  productRoadmap: ProductRoadmapPhase[];
  featureSpecifications: FeatureSpecificationItem[];
}
