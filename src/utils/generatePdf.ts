import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProductReportData } from '../types/report.ts';
import { normalizeReport, safeArray } from './normalizeReport.ts';

/**
 * Generates and downloads a clean, professional multi-page PDF Product Requirements Document (PRD).
 * Fully self-contained, client-side, multipage-safe, and table-aligned.
 */
export async function generatePdfReport(inputData: ProductReportData): Promise<void> {
  const data = normalizeReport(inputData);
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
    productRoadmap,
    featureSpecifications,
  } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = margin;

  // Colors
  const primaryColor: [number, number, number] = [30, 41, 59]; // slate-800
  const accentColor: [number, number, number] = [79, 70, 229]; // indigo-600
  const secondaryColor: [number, number, number] = [100, 116, 139]; // slate-500
  const lightBgColor: [number, number, number] = [248, 250, 252]; // slate-50
  const borderLightColor: [number, number, number] = [226, 232, 240]; // slate-200

  // Helper: check page bounds and auto-advance
  const ensureSpace = (requiredPt: number) => {
    if (cursorY + requiredPt > pageHeight - margin - 25) {
      doc.addPage();
      cursorY = margin;
    }
  };

  // Helper: render Section Header with icon-style accent
  const addSectionHeading = (num: string, title: string) => {
    ensureSpace(50);
    cursorY += 12;

    // Small badge text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(`SECTION ${num}`, margin, cursorY);
    cursorY += 13;

    // Main section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(title, margin, cursorY);
    cursorY += 6;

    // Accent line
    doc.setDrawColor(borderLightColor[0], borderLightColor[1], borderLightColor[2]);
    doc.setLineWidth(1);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 12;
  };

  // Helper: render Subheading
  const addSubheading = (title: string) => {
    ensureSpace(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(title, margin, cursorY);
    cursorY += 13;
  };

  // Helper: render body text with word wrapping
  const addParagraph = (text: string, fontSize = 9, indent = 0) => {
    if (!text) return;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(71, 85, 105); // slate-600

    const lines = doc.splitTextToSize(text, contentWidth - indent);
    const lineHeight = fontSize * 1.35;

    for (const line of lines) {
      ensureSpace(lineHeight + 4);
      doc.text(line, margin + indent, cursorY);
      cursorY += lineHeight;
    }
    cursorY += 5;
  };

  // Helper: render bullet points
  const addBulletPoints = (items: (string | any)[], bulletChar = '•') => {
    const list = safeArray(items);
    if (list.length === 0) {
      addParagraph('None specified.', 8.5, 8);
      return;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);

    list.forEach((item) => {
      const text = typeof item === 'object' && item !== null
        ? Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(' — ')
        : String(item);

      const lines = doc.splitTextToSize(text, contentWidth - 14);
      const lineHeight = 12;
      ensureSpace(lines.length * lineHeight + 4);

      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text(bulletChar, margin + 2, cursorY);
      doc.setTextColor(71, 85, 105);

      lines.forEach((l: string, idx: number) => {
        doc.text(l, margin + 12, cursorY);
        cursorY += lineHeight;
      });
      cursorY += 2;
    });
    cursorY += 4;
  };

  // -------------------------------------------------------------
  // COVER / DOCUMENT HEADER
  // -------------------------------------------------------------
  // Header background banner
  doc.setFillColor(lightBgColor[0], lightBgColor[1], lightBgColor[2]);
  doc.rect(margin, cursorY, contentWidth, 80, 'F');
  doc.setDrawColor(borderLightColor[0], borderLightColor[1], borderLightColor[2]);
  doc.rect(margin, cursorY, contentWidth, 80, 'S');

  // Top Category / Tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text(
    `${(meta.productCategory || 'PRODUCT MANAGEMENT').toUpperCase()}  |  PRODUCT RESEARCH & PRD`,
    margin + 12,
    cursorY + 18
  );

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(meta.productName, margin + 12, cursorY + 38);

  // Subtitle / Feature Idea
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  const featureLines = doc.splitTextToSize(`Feature: ${meta.featureIdea}`, contentWidth - 24);
  doc.text(featureLines[0] || '', margin + 12, cursorY + 54);

  // Metadata row
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  const dateStr = meta.generatedAt ? new Date(meta.generatedAt).toLocaleDateString() : new Date().toLocaleDateString();
  doc.text(
    `Target: ${meta.targetUsers || 'All Users'}  ·  Market: ${meta.targetMarket || 'Global'}  ·  Date: ${dateStr}`,
    margin + 12,
    cursorY + 70
  );

  cursorY += 92;

  // -------------------------------------------------------------
  // 01. EXECUTIVE SUMMARY
  // -------------------------------------------------------------
  addSectionHeading('01', 'Executive Summary');
  addParagraph(executiveSummary, 9.5);

  // -------------------------------------------------------------
  // 02. PROBLEM STATEMENT
  // -------------------------------------------------------------
  addSectionHeading('02', 'Problem Statement');
  addSubheading('Core Problem');
  addParagraph(problemStatement.coreProblem);
  addSubheading('Why Current Solutions Fail');
  addParagraph(problemStatement.whyCurrentSolutionsFail);
  addSubheading('Impact of Unresolved Problem');
  addParagraph(problemStatement.impactOfUnresolvedProblem);

  // -------------------------------------------------------------
  // 03. MARKET OPPORTUNITY
  // -------------------------------------------------------------
  addSectionHeading('03', 'Market Opportunity');
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Market Scope', 'Estimated Size', 'Description & Boundary']],
    body: [
      ['TAM (Total Addressable Market)', marketOpportunity.tam || 'N/A', 'Total worldwide market demand'],
      ['SAM (Serviceable Available Market)', marketOpportunity.sam || 'N/A', 'Segment reachable by business model'],
      ['SOM (Serviceable Obtainable Market)', marketOpportunity.som || 'N/A', 'Realistic near-term market capture'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8.5 },
    styles: { fontSize: 8, cellPadding: 5, textColor: [71, 85, 105] },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 10;

  addSubheading('Key Assumptions');
  addBulletPoints(marketOpportunity.assumptions);

  // -------------------------------------------------------------
  // 04. COMPETITOR ANALYSIS (TABLE)
  // -------------------------------------------------------------
  addSectionHeading('04', 'Competitor Analysis (5+ Analyzed)');
  const competitorRows = safeArray(competitorAnalysis).map((c) => [
    c.company || 'Competitor',
    c.relevantFeature || 'N/A',
    c.strengths || 'N/A',
    c.weaknesses || 'N/A',
    c.pricing || 'N/A',
    c.differentiation || 'N/A',
  ]);

  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Company', 'Feature', 'Strengths', 'Weaknesses', 'Pricing', 'Differentiation']],
    body: competitorRows.length > 0 ? competitorRows : [['No competitors specified', '-', '-', '-', '-', '-']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105], overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: 70, fontStyle: 'bold' },
      1: { cellWidth: 75 },
      2: { cellWidth: 90 },
      3: { cellWidth: 90 },
      4: { cellWidth: 65 },
      5: { cellWidth: 125 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 05. SWOT ANALYSIS
  // -------------------------------------------------------------
  addSectionHeading('05', 'SWOT Analysis');
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Strengths (Internal)', 'Weaknesses (Internal)']],
    body: [
      [
        safeArray(swotAnalysis.strengths).join('\n• ') ? '• ' + safeArray(swotAnalysis.strengths).join('\n• ') : 'None',
        safeArray(swotAnalysis.weaknesses).join('\n• ') ? '• ' + safeArray(swotAnalysis.weaknesses).join('\n• ') : 'None',
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8.5 },
    styles: { fontSize: 8, cellPadding: 6, textColor: [71, 85, 105], overflow: 'linebreak' },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 8;

  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Opportunities (External)', 'Threats (External)']],
    body: [
      [
        safeArray(swotAnalysis.opportunities).join('\n• ') ? '• ' + safeArray(swotAnalysis.opportunities).join('\n• ') : 'None',
        safeArray(swotAnalysis.threats).join('\n• ') ? '• ' + safeArray(swotAnalysis.threats).join('\n• ') : 'None',
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8.5 },
    styles: { fontSize: 8, cellPadding: 6, textColor: [71, 85, 105], overflow: 'linebreak' },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 06. TARGET USERS
  // -------------------------------------------------------------
  addSectionHeading('06', 'Target Users Analysis');
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Segment & Context', 'Details']],
    body: [
      ['Primary Segment', targetUsersAnalysis.primarySegment || 'N/A'],
      ['Secondary Segment', targetUsersAnalysis.secondarySegment || 'N/A'],
      ['Demographics', targetUsersAnalysis.demographics || 'N/A'],
      ['Psychographics', targetUsersAnalysis.psychographics || 'N/A'],
      ['Context of Use', targetUsersAnalysis.contextOfUse || 'N/A'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8.5 },
    styles: { fontSize: 8, cellPadding: 5, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 120, fontStyle: 'bold' },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 07. USER PERSONAS (3 PERSONAS)
  // -------------------------------------------------------------
  addSectionHeading('07', 'User Personas (3 Detailed Personas)');
  safeArray(userPersonas).forEach((p, idx) => {
    ensureSpace(80);
    addSubheading(`Persona ${idx + 1}: ${p.name || 'User'} (${p.age || 'N/A'} yo, ${p.occupation || 'Professional'})`);
    if (p.quote) {
      addParagraph(`"${p.quote}"`, 8.5, 6);
    }
    addParagraph(`Behavior: ${p.behaviour || 'N/A'}`, 8.5, 6);

    const goalsList = safeArray(p.goals);
    const frustList = safeArray(p.frustrations);

    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [['Goals & Motivations', 'Frustrations & Pain Points']],
      body: [
        [
          goalsList.join('\n• ') ? '• ' + goalsList.join('\n• ') : 'N/A',
          frustList.join('\n• ') ? '• ' + frustList.join('\n• ') : 'N/A',
        ],
      ],
      theme: 'grid',
      headStyles: { fillColor: [248, 250, 252], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 8;
  });

  // -------------------------------------------------------------
  // 08. USER JOURNEY TABLE
  // -------------------------------------------------------------
  addSectionHeading('08', 'End-to-End User Journey');
  const journeyRows = safeArray(userJourney).map((uj) => [
    uj.stage || 'Stage',
    uj.userAction || 'N/A',
    uj.touchpoints || 'N/A',
    uj.painPoints || 'N/A',
    uj.opportunities || 'N/A',
  ]);

  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Stage', 'User Action', 'Touchpoints', 'Pain Points', 'Opportunities']],
    body: journeyRows.length > 0 ? journeyRows : [['Awareness', '-', '-', '-', '-']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105], overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: 70, fontStyle: 'bold' },
      1: { cellWidth: 100 },
      2: { cellWidth: 90 },
      3: { cellWidth: 120 },
      4: { cellWidth: 135 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 09. CUSTOMER PAIN POINTS (10+)
  // -------------------------------------------------------------
  addSectionHeading('09', 'Customer Pain Points (Ranked & Categorized)');
  const painPointRows = safeArray(customerPainPoints).map((pp) => [
    `#${pp.id || '-'}`,
    pp.title || 'Pain point',
    pp.severity || 'Medium',
    pp.affectedSegment || 'All',
    pp.description || 'N/A',
  ]);

  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['#', 'Pain Point', 'Severity', 'Segment', 'Impact / Description']],
    body: painPointRows.length > 0 ? painPointRows : [['1', 'General friction', 'Medium', 'All', 'User delay']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 25, fontStyle: 'bold' },
      1: { cellWidth: 110, fontStyle: 'bold' },
      2: { cellWidth: 55 },
      3: { cellWidth: 80 },
      4: { cellWidth: 245 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 10. PROPOSED FEATURES
  // -------------------------------------------------------------
  addSectionHeading('10', 'Proposed Features Roadmap');
  const formatFeatureTier = (title: string, list: any[]) => {
    addSubheading(title);
    const arr = safeArray(list);
    if (arr.length === 0) {
      addParagraph('None specified.', 8, 8);
      return;
    }
    arr.forEach((f) => {
      addParagraph(`• ${f.title || 'Feature'}: ${f.description || ''} (Rationale: ${f.rationale || 'N/A'})`, 8, 8);
    });
  };

  formatFeatureTier('Must Have (P0)', proposedFeatures.mustHave);
  formatFeatureTier('Should Have (P1)', proposedFeatures.shouldHave);
  formatFeatureTier('Could Have (P2)', proposedFeatures.couldHave);
  formatFeatureTier('Future (P3)', proposedFeatures.future);

  // -------------------------------------------------------------
  // 11. RICE PRIORITIZATION (TABLE)
  // -------------------------------------------------------------
  addSectionHeading('11', 'RICE Prioritization Matrix');
  const riceRows = safeArray(ricePrioritization).map((r) => [
    r.feature || 'Feature',
    r.reach || 'N/A',
    r.impact || 'N/A',
    r.confidence || 'N/A',
    r.effort || 'N/A',
    String(r.riceScore || '0'),
    r.calculation || 'N/A',
  ]);

  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Feature', 'Reach (R)', 'Impact (I)', 'Confidence (C)', 'Effort (E)', 'RICE Score', 'Formula Calculation']],
    body: riceRows.length > 0 ? riceRows : [['Feature A', '10k', '3', '80%', '2', '12000', '(10k*3*0.8)/2']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 7.5 },
    styles: { fontSize: 7.5, cellPadding: 3.5, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 110, fontStyle: 'bold' },
      5: { cellWidth: 55, fontStyle: 'bold', textColor: [79, 70, 229] },
      6: { cellWidth: 130 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 12. KANO MODEL
  // -------------------------------------------------------------
  addSectionHeading('12', 'Kano Model Classification');
  const kanoRows: string[][] = [];
  safeArray(kanoModel.basic).forEach((k) => kanoRows.push(['Basic / Must-Be', k.feature || '', k.explanation || '']));
  safeArray(kanoModel.performance).forEach((k) => kanoRows.push(['Performance', k.feature || '', k.explanation || '']));
  safeArray(kanoModel.delighters).forEach((k) => kanoRows.push(['Delighters', k.feature || '', k.explanation || '']));

  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Category', 'Feature', 'Customer Expectation & Impact']],
    body: kanoRows.length > 0 ? kanoRows : [['Delighters', 'AI Feature', 'Creates emotional connection']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 100, fontStyle: 'bold' },
      1: { cellWidth: 130, fontStyle: 'bold' },
      2: { cellWidth: 285 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 13. MOSCOW PRIORITIZATION
  // -------------------------------------------------------------
  addSectionHeading('13', 'MoSCoW Prioritization Framework');
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Must Have', 'Should Have', 'Could Have', "Won't Have (Out of Scope)"]],
    body: [
      [
        safeArray(moscowPrioritization.mustHave).join('\n• ') ? '• ' + safeArray(moscowPrioritization.mustHave).join('\n• ') : 'None',
        safeArray(moscowPrioritization.shouldHave).join('\n• ') ? '• ' + safeArray(moscowPrioritization.shouldHave).join('\n• ') : 'None',
        safeArray(moscowPrioritization.couldHave).join('\n• ') ? '• ' + safeArray(moscowPrioritization.couldHave).join('\n• ') : 'None',
        safeArray(moscowPrioritization.wontHave).join('\n• ') ? '• ' + safeArray(moscowPrioritization.wontHave).join('\n• ') : 'None',
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105], overflow: 'linebreak' },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 14. PRD (REQUIREMENTS)
  // -------------------------------------------------------------
  addSectionHeading('14', 'Product Requirements Document (PRD Specifications)');
  addSubheading('Product Objective');
  addParagraph(prd.productObjective);
  addSubheading('Business Goal');
  addParagraph(prd.businessGoal);

  // User Stories Table
  addSubheading('User Stories');
  const storyRows = safeArray(prd.userStories).map((us) => [
    us.id || 'US-1',
    us.priority || 'Must',
    us.role || 'User',
    us.want || '',
    us.soThat || '',
  ]);
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['ID', 'Priority', 'As A (Role)', 'I Want To (Capability)', 'So That (Benefit)']],
    body: storyRows.length > 0 ? storyRows : [['US-1', 'Must', 'User', 'Access service', 'Achieve goal']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 50 },
      2: { cellWidth: 80 },
      3: { cellWidth: 165 },
      4: { cellWidth: 180 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 10;

  // Acceptance Criteria
  addSubheading('Acceptance Criteria (Gherkin Syntax)');
  const acRows = safeArray(prd.acceptanceCriteria).map((ac) => [
    ac.storyId || 'US-1',
    ac.scenario || 'Scenario',
    `Given: ${ac.given || ''}\nWhen: ${ac.when || ''}\nThen: ${ac.then || ''}`,
  ]);
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Story ID', 'Scenario', 'Given - When - Then Specification']],
    body: acRows.length > 0 ? acRows : [['US-1', 'Happy path', 'Given user logged in, When action taken, Then success']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 130 },
      2: { cellWidth: 325 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 10;

  // Functional Requirements
  addSubheading('Functional Requirements');
  const frRows = safeArray(prd.functionalRequirements).map((fr) => [
    fr.id || 'FR-1',
    fr.category || 'Core',
    fr.description || 'Description',
  ]);
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['ID', 'Category', 'Functional Specification']],
    body: frRows.length > 0 ? frRows : [['FR-1', 'Core', 'System must process inputs']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold' },
      1: { cellWidth: 100 },
      2: { cellWidth: 365 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 10;

  // Non-Functional Requirements
  addSubheading('Non-Functional Requirements');
  const nfrRows = safeArray(prd.nonFunctionalRequirements).map((nfr) => [
    nfr.category || 'Security',
    nfr.requirement || 'Requirement',
    nfr.standard || 'Standard',
  ]);
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Category', 'Requirement Description', 'Benchmark / Target Standard']],
    body: nfrRows.length > 0 ? nfrRows : [['Performance', 'Response time', '< 200ms']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 90, fontStyle: 'bold' },
      1: { cellWidth: 265 },
      2: { cellWidth: 160 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 10;

  // PRD Dependencies & Risks
  addSubheading('Technical Dependencies');
  addBulletPoints(prd.dependencies);
  addSubheading('Identified Launch Risks');
  addBulletPoints(prd.risks);

  // -------------------------------------------------------------
  // 15. TECHNICAL ARCHITECTURE
  // -------------------------------------------------------------
  addSectionHeading('15', 'Technical Architecture');
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Architecture Layer', 'Technology Stack & Implementation']],
    body: [
      ['Frontend', technicalArchitecture.frontend || 'React, Tailwind CSS, TypeScript'],
      ['Backend', technicalArchitecture.backend || 'Node.js, Express, Serverless APIs'],
      ['Database', technicalArchitecture.database || 'PostgreSQL / Managed Cloud Store'],
      ['AI Model', technicalArchitecture.aiModel || 'Gemini 2.5 Flash SDK'],
      ['Cloud Infrastructure', technicalArchitecture.cloud || 'Google Cloud / Vercel'],
      ['Authentication', technicalArchitecture.authentication || 'OAuth 2.0 / JWT'],
      ['Analytics & Observability', technicalArchitecture.analytics || 'PostHog, Datadog'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8.5 },
    styles: { fontSize: 8, cellPadding: 4.5, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 140, fontStyle: 'bold' },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 8;

  addSubheading('Architecture Overview');
  addParagraph(technicalArchitecture.architecturalOverview);

  // -------------------------------------------------------------
  // 16. SUCCESS METRICS
  // -------------------------------------------------------------
  addSectionHeading('16', 'Success Metrics & OKRs');
  addSubheading(`North Star Metric: ${successMetrics.northStarMetric?.name || 'Engagement Rate'}`);
  addParagraph(`Target: ${successMetrics.northStarMetric?.target || '10x growth'}`);
  addParagraph(`Strategic Rationale: ${successMetrics.northStarMetric?.why || 'Drives retention and value delivery'}`);

  const metricRows = safeArray(successMetrics.metricsTable).map((m) => [
    m.metric || 'Metric',
    m.category || 'Acquisition',
    m.targetBenchmark || 'Target',
    m.trackingMethod || 'Method',
  ]);
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Key Metric', 'Category', 'Target Benchmark', 'Tracking Method']],
    body: metricRows.length > 0 ? metricRows : [['DAU/MAU', 'Engagement', '> 40%', 'Mixpanel']],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 130, fontStyle: 'bold' },
      1: { cellWidth: 90 },
      2: { cellWidth: 130 },
      3: { cellWidth: 165 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 12;

  // -------------------------------------------------------------
  // 17. RISK ANALYSIS
  // -------------------------------------------------------------
  addSectionHeading('17', 'Comprehensive Risk Analysis');
  const formatRiskCategory = (label: string, risks: any[]) => {
    const rList = safeArray(risks);
    if (rList.length === 0) return;
    addSubheading(`${label} Risks`);
    const rRows = rList.map((r) => [r.risk || 'Risk', r.severity || 'Medium', r.mitigation || 'Mitigation plan']);
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [['Identified Risk', 'Severity', 'Mitigation Strategy']],
      body: rRows,
      theme: 'grid',
      headStyles: { fillColor: [248, 250, 252], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 3.5, textColor: [71, 85, 105] },
      columnStyles: {
        0: { cellWidth: 160 },
        1: { cellWidth: 60, fontStyle: 'bold' },
        2: { cellWidth: 295 },
      },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 8;
  };

  formatRiskCategory('Business', riskAnalysis.businessRisks);
  formatRiskCategory('Technical', riskAnalysis.technicalRisks);
  formatRiskCategory('Operational', riskAnalysis.operationalRisks);
  formatRiskCategory('Legal & Compliance', riskAnalysis.legalRisks);

  // -------------------------------------------------------------
  // 18. LAUNCH STRATEGY
  // -------------------------------------------------------------
  addSectionHeading('18', 'Go-To-Market & Launch Strategy');
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['Rollout Phase', 'Duration & Cohort', 'Phase Objectives']],
    body: [
      [
        'Alpha (Internal/Dogfood)',
        `${launchStrategy.alpha?.duration || '2 weeks'}\nCohort: ${launchStrategy.alpha?.cohort || 'Internal teams'}`,
        safeArray(launchStrategy.alpha?.objectives).join('\n• ') ? '• ' + safeArray(launchStrategy.alpha?.objectives).join('\n• ') : 'Verify stability',
      ],
      [
        'Beta (Closed Pilot)',
        `${launchStrategy.beta?.duration || '4 weeks'}\nCohort: ${launchStrategy.beta?.cohort || 'VIP customers'}`,
        safeArray(launchStrategy.beta?.objectives).join('\n• ') ? '• ' + safeArray(launchStrategy.beta?.objectives).join('\n• ') : 'Collect qualitative feedback',
      ],
      [
        'General Availability',
        `Strategy: ${launchStrategy.publicLaunch?.strategy || 'Gradual 100% rollout'}`,
        safeArray(launchStrategy.publicLaunch?.rolloutPhases).join('\n• ') ? '• ' + safeArray(launchStrategy.publicLaunch?.rolloutPhases).join('\n• ') : 'Global marketing push',
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 110, fontStyle: 'bold' },
      1: { cellWidth: 155 },
      2: { cellWidth: 250 },
    },
  });
  cursorY = (doc as any).lastAutoTable.finalY + 10;

  addSubheading('Marketing Strategy');
  addBulletPoints(launchStrategy.marketingStrategy);

  addSubheading('Pricing & Monetization Strategy');
  addParagraph(launchStrategy.pricingStrategy);

  addSubheading('Go-To-Market Tactics');
  addBulletPoints(launchStrategy.goTMarketStrategy);

  // -------------------------------------------------------------
  // 19. PRODUCT ROADMAP (PHASES: MVP, BETA, SCALE / GROWTH)
  // -------------------------------------------------------------
  addSectionHeading('19', 'Product Roadmap');
  safeArray(productRoadmap).forEach((phase, idx) => {
    ensureSpace(90);
    addSubheading(`${phase.phase || `Phase ${idx + 1}`}: Strategic Focus — ${phase.strategicFocus}`);

    const initList = safeArray(phase.keyInitiatives);
    const delivList = safeArray(phase.keyDeliverables);
    const depList = safeArray(phase.dependencies);

    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [['Key Initiatives', 'Key Deliverables', 'Dependencies']],
      body: [
        [
          initList.join('\n• ') ? '• ' + initList.join('\n• ') : 'None',
          delivList.join('\n• ') ? '• ' + delivList.join('\n• ') : 'None',
          depList.join('\n• ') ? '• ' + depList.join('\n• ') : 'None',
        ],
      ],
      theme: 'grid',
      headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105], overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 175 },
        1: { cellWidth: 175 },
        2: { cellWidth: 165 },
      },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 6;

    addParagraph(`Success Criteria: ${phase.successCriteria || 'All deliverables accepted with zero critical defects.'}`, 8, 4);
    cursorY += 4;
  });

  // -------------------------------------------------------------
  // 20. FEATURE SPECIFICATION (IMPLEMENTATION-READY)
  // -------------------------------------------------------------
  addSectionHeading('20', 'Feature Specification');
  safeArray(featureSpecifications).forEach((spec, idx) => {
    ensureSpace(100);
    addSubheading(`Feature Spec ${idx + 1}: ${spec.featureName} [Priority: ${spec.priority || 'Must Have'}]`);
    addParagraph(`Description: ${spec.description}`, 8, 4);
    addParagraph(`User Value: ${spec.userValue}`, 8, 4);

    const depList = safeArray(spec.dependencies);
    const frList = safeArray(spec.functionalRequirements);
    const acList = safeArray(spec.acceptanceCriteria);

    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [['Dependencies', 'Functional Requirements', 'Acceptance Criteria (Gherkin)']],
      body: [
        [
          depList.join('\n• ') ? '• ' + depList.join('\n• ') : 'None',
          frList.join('\n• ') ? '• ' + frList.join('\n• ') : 'None',
          acList.join('\n• ') ? '• ' + acList.join('\n• ') : 'None',
        ],
      ],
      theme: 'grid',
      headStyles: { fillColor: [248, 250, 252], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 7.5, cellPadding: 4, textColor: [71, 85, 105], overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 130 },
        1: { cellWidth: 190 },
        2: { cellWidth: 195 },
      },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 10;
  });

  // -------------------------------------------------------------
  // MULTI-PAGE NUMBERING & FOOTERS
  // -------------------------------------------------------------
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400

    // Running top header on pages > 1
    if (i > 1) {
      doc.text(
        `${meta.productName} — Product Research & PRD`,
        margin,
        25
      );
      doc.setDrawColor(borderLightColor[0], borderLightColor[1], borderLightColor[2]);
      doc.setLineWidth(0.5);
      doc.line(margin, 28, pageWidth - margin, 28);
    }

    // Running bottom footer
    doc.setDrawColor(borderLightColor[0], borderLightColor[1], borderLightColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);

    doc.text(
      'AI Product Research & PRD Generator',
      margin,
      pageHeight - 14
    );
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 14,
      { align: 'right' }
    );
  }

  // -------------------------------------------------------------
  // SAVE / DOWNLOAD PDF
  // -------------------------------------------------------------
  const cleanTitle = (meta.productName || 'product')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  const filename = `${cleanTitle || 'product'}-prd-report.pdf`;

  doc.save(filename);
}
