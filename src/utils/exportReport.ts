import { ProductReportData } from '../types/report.ts';

export function generateMarkdownReport(data: ProductReportData): string {
  const {
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
  } = data;

  let md = `# Product Strategy & PRD: ${meta.productName}\n\n`;
  md += `**Feature Idea:** ${meta.featureIdea}\n\n`;
  md += `**Target Users:** ${meta.targetUsers || 'N/A'}  \n`;
  md += `**Product Category:** ${meta.productCategory || 'N/A'}  \n`;
  md += `**Target Market:** ${meta.targetMarket || 'N/A'}  \n`;
  md += `**Generated Date:** ${new Date(meta.generatedAt).toLocaleDateString()}  \n\n`;
  md += `---\n\n`;

  // 1. Executive Summary
  md += `## 1. Executive Summary\n\n${executiveSummary}\n\n`;

  // 2. Problem Statement
  md += `## 2. Problem Statement\n\n`;
  md += `### Core Problem\n${problemStatement.coreProblem}\n\n`;
  md += `### Why Current Solutions Fail\n${problemStatement.whyCurrentSolutionsFail}\n\n`;
  md += `### Impact of Unresolved Problem\n${problemStatement.impactOfUnresolvedProblem}\n\n`;

  // 3. Market Opportunity
  md += `## 3. Market Opportunity\n\n`;
  md += `- **TAM (Total Addressable Market):** ${marketOpportunity.tam}\n`;
  md += `- **SAM (Serviceable Available Market):** ${marketOpportunity.sam}\n`;
  md += `- **SOM (Serviceable Obtainable Market):** ${marketOpportunity.som}\n\n`;
  md += `### Key Assumptions\n`;
  marketOpportunity.assumptions.forEach((a, i) => {
    md += `${i + 1}. ${a}\n`;
  });
  md += `\n`;

  // 4. Competitor Analysis
  md += `## 4. Competitor Analysis\n\n`;
  md += `| Company | Relevant Feature | Strengths | Weaknesses | Pricing | Differentiation |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
  competitorAnalysis.forEach((c) => {
    md += `| **${c.company}** | ${c.relevantFeature.replace(/\|/g, '/')} | ${c.strengths.replace(/\|/g, '/')} | ${c.weaknesses.replace(/\|/g, '/')} | ${c.pricing.replace(/\|/g, '/')} | ${c.differentiation.replace(/\|/g, '/')} |\n`;
  });
  md += `\n`;

  // 5. SWOT Analysis
  md += `## 5. SWOT Analysis\n\n`;
  md += `### Strengths\n`;
  swotAnalysis.strengths.forEach((s) => (md += `- ${s}\n`));
  md += `\n### Weaknesses\n`;
  swotAnalysis.weaknesses.forEach((w) => (md += `- ${w}\n`));
  md += `\n### Opportunities\n`;
  swotAnalysis.opportunities.forEach((o) => (md += `- ${o}\n`));
  md += `\n### Threats\n`;
  swotAnalysis.threats.forEach((t) => (md += `- ${t}\n`));
  md += `\n`;

  // 6. Target Users
  md += `## 6. Target Users Analysis\n\n`;
  md += `- **Primary Segment:** ${targetUsersAnalysis.primarySegment}\n`;
  md += `- **Secondary Segment:** ${targetUsersAnalysis.secondarySegment}\n`;
  md += `- **Demographics:** ${targetUsersAnalysis.demographics}\n`;
  md += `- **Psychographics:** ${targetUsersAnalysis.psychographics}\n`;
  md += `- **Context of Use:** ${targetUsersAnalysis.contextOfUse}\n\n`;

  // 7. User Personas
  md += `## 7. User Personas\n\n`;
  userPersonas.forEach((p, idx) => {
    md += `### Persona ${idx + 1}: ${p.name} (${p.age}, ${p.occupation})\n\n`;
    md += `> "${p.quote}"\n\n`;
    md += `**Behavior:** ${p.behaviour}\n\n`;
    md += `**Goals:**\n`;
    p.goals.forEach((g) => (md += `- ${g}\n`));
    md += `\n**Frustrations:**\n`;
    p.frustrations.forEach((f) => (md += `- ${f}\n`));
    md += `\n`;
  });

  // 8. User Journey
  md += `## 8. User Journey\n\n`;
  md += `| Stage | User Action | Touchpoints | Pain Points | Opportunities |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- |\n`;
  userJourney.forEach((uj) => {
    md += `| **${uj.stage}** | ${uj.userAction.replace(/\|/g, '/')} | ${uj.touchpoints.replace(/\|/g, '/')} | ${uj.painPoints.replace(/\|/g, '/')} | ${uj.opportunities.replace(/\|/g, '/')} |\n`;
  });
  md += `\n`;

  // 9. Customer Pain Points
  md += `## 9. Customer Pain Points\n\n`;
  customerPainPoints.forEach((pp) => {
    md += `### ${pp.id}. ${pp.title} [${pp.severity}]\n`;
    md += `**Affected Segment:** ${pp.affectedSegment}\n\n`;
    md += `${pp.description}\n\n`;
  });

  // 10. Proposed Features
  md += `## 10. Proposed Features\n\n`;
  md += `### Must Have\n`;
  proposedFeatures.mustHave.forEach((f) => {
    md += `#### ${f.title}\n${f.description}\n*Rationale: ${f.rationale}*\n\n`;
  });
  md += `### Should Have\n`;
  proposedFeatures.shouldHave.forEach((f) => {
    md += `#### ${f.title}\n${f.description}\n*Rationale: ${f.rationale}*\n\n`;
  });
  md += `### Could Have\n`;
  proposedFeatures.couldHave.forEach((f) => {
    md += `#### ${f.title}\n${f.description}\n*Rationale: ${f.rationale}*\n\n`;
  });
  md += `### Future\n`;
  proposedFeatures.future.forEach((f) => {
    md += `#### ${f.title}\n${f.description}\n*Rationale: ${f.rationale}*\n\n`;
  });

  // 11. RICE Prioritization
  md += `## 11. RICE Prioritization\n\n`;
  md += `| Feature | Reach | Impact | Confidence | Effort | RICE Score | Calculation Formula |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
  ricePrioritization.forEach((r) => {
    md += `| **${r.feature}** | ${r.reach} | ${r.impact} | ${r.confidence} | ${r.effort} | **${r.riceScore.toLocaleString()}** | \`${r.calculation}\` |\n`;
  });
  md += `\n`;

  // 12. Kano Model
  md += `## 12. Kano Model Analysis\n\n`;
  md += `### Basic (Must-be Needs)\n`;
  kanoModel.basic.forEach((k) => (md += `- **${k.feature}:** ${k.explanation}\n`));
  md += `\n### Performance (One-dimensional Needs)\n`;
  kanoModel.performance.forEach((k) => (md += `- **${k.feature}:** ${k.explanation}\n`));
  md += `\n### Delighters (Attractive Needs)\n`;
  kanoModel.delighters.forEach((k) => (md += `- **${k.feature}:** ${k.explanation}\n`));
  md += `\n`;

  // 13. MoSCoW Prioritization
  md += `## 13. MoSCoW Prioritization\n\n`;
  md += `### Must Have\n`;
  moscowPrioritization.mustHave.forEach((m) => (md += `- ${m}\n`));
  md += `\n### Should Have\n`;
  moscowPrioritization.shouldHave.forEach((s) => (md += `- ${s}\n`));
  md += `\n### Could Have\n`;
  moscowPrioritization.couldHave.forEach((c) => (md += `- ${c}\n`));
  md += `\n### Won't Have (v1)\n`;
  moscowPrioritization.wontHave.forEach((w) => (md += `- ${w}\n`));
  md += `\n`;

  // 14. PRD
  md += `## 14. Product Requirements Document (PRD)\n\n`;
  md += `### Product Objective\n${prd.productObjective}\n\n`;
  md += `### Business Goal\n${prd.businessGoal}\n\n`;
  md += `### User Stories\n`;
  prd.userStories.forEach((us) => {
    md += `- **[${us.id}] [${us.priority}]** As a *${us.role}*, I want to *${us.want}*, so that *${us.soThat}*.\n`;
  });
  md += `\n### Acceptance Criteria\n`;
  prd.acceptanceCriteria.forEach((ac) => {
    md += `#### ${ac.storyId}: ${ac.scenario}\n`;
    md += `- **Given** ${ac.given}\n`;
    md += `- **When** ${ac.when}\n`;
    md += `- **Then** ${ac.then}\n\n`;
  });
  md += `### Functional Requirements\n`;
  prd.functionalRequirements.forEach((fr) => {
    md += `- **[${fr.id}] (${fr.category}):** ${fr.description}\n`;
  });
  md += `\n### Non-Functional Requirements\n`;
  prd.nonFunctionalRequirements.forEach((nfr) => {
    md += `- **${nfr.category} [${nfr.standard}]:** ${nfr.requirement}\n`;
  });
  md += `\n### Dependencies\n`;
  prd.dependencies.forEach((d) => (md += `- ${d}\n`));
  md += `\n### Risks\n`;
  prd.risks.forEach((r) => (md += `- ${r}\n`));
  md += `\n`;

  // 15. Technical Architecture
  md += `## 15. Technical Architecture\n\n`;
  md += `### Overview\n${technicalArchitecture.architecturalOverview}\n\n`;
  md += `- **Frontend:** ${technicalArchitecture.frontend}\n`;
  md += `- **Backend:** ${technicalArchitecture.backend}\n`;
  md += `- **Database:** ${technicalArchitecture.database}\n`;
  md += `- **AI / ML Model:** ${technicalArchitecture.aiModel}\n`;
  md += `- **Cloud Infrastructure:** ${technicalArchitecture.cloud}\n`;
  md += `- **Authentication:** ${technicalArchitecture.authentication}\n`;
  md += `- **Analytics & Telemetry:** ${technicalArchitecture.analytics}\n\n`;

  // 16. Success Metrics
  md += `## 16. Success Metrics\n\n`;
  md += `### North Star Metric\n`;
  md += `**${successMetrics.northStarMetric.name}**  \n`;
  md += `- Target: ${successMetrics.northStarMetric.target}  \n`;
  md += `- Strategic Rationale: ${successMetrics.northStarMetric.why}\n\n`;
  md += `### Metrics Table\n\n`;
  md += `| Metric | Category | Target Benchmark | Tracking Method |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  successMetrics.metricsTable.forEach((m) => {
    md += `| **${m.metric}** | ${m.category} | ${m.targetBenchmark} | ${m.trackingMethod} |\n`;
  });
  md += `\n`;

  // 17. Risk Analysis
  md += `## 17. Risk Analysis & Mitigation\n\n`;
  md += `### Business Risks\n`;
  riskAnalysis.businessRisks.forEach((r) => {
    md += `- **[${r.severity}]** ${r.risk}\n  - *Mitigation:* ${r.mitigation}\n`;
  });
  md += `\n### Technical Risks\n`;
  riskAnalysis.technicalRisks.forEach((r) => {
    md += `- **[${r.severity}]** ${r.risk}\n  - *Mitigation:* ${r.mitigation}\n`;
  });
  md += `\n### Operational Risks\n`;
  riskAnalysis.operationalRisks.forEach((r) => {
    md += `- **[${r.severity}]** ${r.risk}\n  - *Mitigation:* ${r.mitigation}\n`;
  });
  md += `\n### Legal & Regulatory Risks\n`;
  riskAnalysis.legalRisks.forEach((r) => {
    md += `- **[${r.severity}]** ${r.risk}\n  - *Mitigation:* ${r.mitigation}\n`;
  });
  md += `\n`;

  // 18. Launch Strategy
  md += `## 18. Launch Strategy\n\n`;
  md += `### Alpha Launch\n- **Duration:** ${launchStrategy.alpha.duration}\n- **Cohort:** ${launchStrategy.alpha.cohort}\n`;
  launchStrategy.alpha.objectives.forEach((o) => (md += `  - ${o}\n`));
  md += `\n### Beta Launch\n- **Duration:** ${launchStrategy.beta.duration}\n- **Cohort:** ${launchStrategy.beta.cohort}\n`;
  launchStrategy.beta.objectives.forEach((o) => (md += `  - ${o}\n`));
  md += `\n### Public Launch\n${launchStrategy.publicLaunch.strategy}\n`;
  launchStrategy.publicLaunch.rolloutPhases.forEach((p) => (md += `- ${p}\n`));
  md += `\n### Pricing Strategy\n${launchStrategy.pricingStrategy}\n\n`;
  md += `### Marketing Strategy\n`;
  launchStrategy.marketingStrategy.forEach((m) => (md += `- ${m}\n`));
  md += `\n### Go-To-Market (GTM) Tactics\n`;
  launchStrategy.goTMarketStrategy.forEach((g) => (md += `- ${g}\n`));
  md += `\n`;

  // 19. 30/60/90 Day Roadmap
  md += `## 19. 30/60/90 Day Roadmap\n\n`;
  const phases = [roadmap.days30, roadmap.days60, roadmap.days90];
  phases.forEach((p) => {
    md += `### ${p.phase} (${p.timeframe})\n`;
    md += `**Focus:** ${p.focus}\n\n`;
    md += `**Key Deliverables:**\n`;
    p.deliverables.forEach((d) => (md += `- ${d}\n`));
    md += `\n**Milestone:** ${p.milestones}\n\n`;
  });

  // 20. PM Interview Questions
  md += `## 20. Product Manager Interview Questions\n\n`;
  pmInterviewQuestions.forEach((q) => {
    md += `### Q${q.id} [${q.category}]: ${q.question}\n\n`;
    md += `**Evaluation Criteria:**\n${q.evaluationCriteria}\n\n`;
    md += `**Sample Answer Approach:**\n${q.sampleAnswerApproach}\n\n`;
  });

  return md;
}

export function downloadFile(content: string, filename: string, mimeType = 'text/markdown') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
