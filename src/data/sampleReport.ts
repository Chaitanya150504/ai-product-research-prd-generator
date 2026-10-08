import { ProductReportData } from '../types/report.ts';

export const sampleZomatoReport: ProductReportData = {
  meta: {
    productName: 'Zomato',
    featureIdea:
      "AI-powered mood-based food recommendations that recommend restaurants and dishes based on the user's mood, preferences, budget, location, and previous orders.",
    targetUsers: 'Urban users aged 18–35 who frequently order food online.',
    productCategory: 'Food Delivery & Quick Commerce',
    targetMarket: 'India (Tier-1 and Tier-2 Cities)',
    generatedAt: new Date().toISOString(),
  },
  executiveSummary:
    'Zomato MoodMatch introduces an intelligent, sentiment-aware recommendation engine within India\'s premier food delivery platform. By analyzing contextual user inputs (e.g., "stressed after work", "celebrating weekend wins", "rainy day comfort cravings"), combined with historical order frequency, dietary preferences, micro-location, and current weather, the feature eliminates the 8-to-12 minute "decision fatigue" bottleneck where up to 24% of browsing sessions are abandoned without ordering. MoodMatch bridges culinary psychology and machine learning to curate 3 hyper-personalized dish-and-restaurant combinations with single-tap checkout. Projected to lift cart conversion by 14.5%, increase evening order frequency by 18%, and drive an incremental ₹140 Cr annual GMV in Tier-1 metros within 12 months post-rollout, MoodMatch solidifies Zomato\'s technological moat against Swiggy.',
  problemStatement: {
    coreProblem:
      'Users experience severe "Menu Decision Paralysis" and cognitive fatigue when browsing thousands of dining options, scrolling through over 40 restaurants before deciding or abandoning the app empty-handed.',
    whyCurrentSolutionsFail:
      'Current filters rely on static categorical facets (e.g., "Biryani", "North Indian", "Fast Delivery") or generic popularity rankings. They lack emotional resonance, situational context (weather, stress level, social setting), and fail to decipher unspoken user cravings.',
    impactOfUnresolvedProblem:
      'High browse-to-order latency (average 11.4 minutes per order), approximately 22% session abandonment rate at the search/discovery phase, and user dissatisfaction leading to exploratory switching to competitor platforms.',
  },
  marketOpportunity: {
    tam: '₹2,40,000 Cr ($29B) Indian Food Services & Online Delivery Ecosystem by 2028',
    sam: '₹68,000 Cr ($8.2B) Urban Online Food Delivery Market across Top 50 Indian Cities',
    som: '₹18,500 Cr ($2.2B) Zomato captive user base addressable through personalization & AI discovery',
    assumptions: [
      'Top 25 Indian urban clusters account for 78% of repeat food delivery gross merchandise value (GMV).',
      'At least 62% of regular food ordering app users express frustration with excessive choice and menu fatigue.',
      'A personalized 3-dish recommendation card can boost average checkout conversion by 12% to 16% over generic category carousels.',
      'Average Order Value (AOV) among mood-prompted cohorts is estimated at ₹420 vs platform baseline of ₹385.',
    ],
  },
  competitorAnalysis: [
    {
      company: 'Swiggy',
      relevantFeature: 'Swiggy AI Assistant / Neural Search (Voice & Text Search)',
      strengths: 'Deep conversational search capability, high penetration of Instamart multi-category search.',
      weaknesses: 'Primarily transactional keyword matching; lacks proactive emotional mood mapping and post-work sentiment prompts.',
      pricing: 'Free in-app feature; monetized through standard delivery fees and Swiggy One subscriptions.',
      differentiation: 'Zomato MoodMatch provides 1-tap sensory mood presets ("Comfort Comfort", "Guilt-Free Desk Crunch", "Midnight Rain Cravings") with real-time biometric and weather synchrony.',
    },
    {
      company: 'Uber Eats (Global / US)',
      relevantFeature: 'Uber Eats AI Conversational Cart Builder',
      strengths: 'Advanced LLM-backed dialogue interface, integration with Uber One rides ecosystem.',
      weaknesses: 'Not localized to Indian food dialect, complex regional cuisines, or micro-monsoon contextual cravings.',
      pricing: 'Standard platform take-rate (15-30% restaurant commission).',
      differentiation: 'Hyper-localized cultural mood palettes tailored to Indian street food, regional thalis, and late-night chai/snack habits.',
    },
    {
      company: 'EatSure (Rebel Foods)',
      relevantFeature: 'Multi-brand Cloud Kitchen Unified Basket',
      strengths: 'Enables ordering from multiple brands (Faasos, Behrouz, Oven Story) in a single order.',
      weaknesses: 'Confined strictly to Rebel Foods cloud kitchen portfolio; zero discovery for third-party local iconic diners.',
      pricing: 'Direct cloud kitchen pricing with free delivery bundles.',
      differentiation: 'Open restaurant marketplace ecosystem leveraging 150,000+ local restaurant partners with authentic Zomato user reviews and ratings.',
    },
    {
      company: 'Zepto Cafe & Blinkit Quick Cravings',
      relevantFeature: '10-Minute Snacking & Ready-to-Eat Bites',
      strengths: 'Blazing fast sub-10 minute delivery for coffee, samosas, and quick breakfast snacks.',
      weaknesses: 'Limited to pre-packaged ambient snacks and microwaveable fast food; lacks gourmet and full meal selection.',
      pricing: 'Low AOV items (₹80-₹220) with nominal packaging fees.',
      differentiation: 'Full culinary spectrum from fine dining to comfort dhabas, matching mood intensity with dining category.',
    },
    {
      company: 'DoorDash (Global)',
      relevantFeature: 'Personalized "Storefront Discovery" & DashPass Recommendations',
      strengths: 'World-class collaborative filtering algorithm based on reorder history and time-of-day habits.',
      weaknesses: 'Purely statistical past-behavior extrapolation; fails when users want spontaneous novel tastes contrary to their usual routine.',
      pricing: 'DashPass monthly tier ($9.99/mo) and tiered merchant fees.',
      differentiation: 'Explorative sentiment prompting ("Break the monotony", "Sweet surprise") designed to unlock latent novelty rather than repetitive past orders.',
    },
  ],
  swotAnalysis: {
    strengths: [
      'Massive proprietary dataset of over 1.2 billion historical orders, ratings, and culinary preference vectors across India.',
      'Strong brand affinity with humorous, emotionally engaging social media voice that makes "mood food" natural and viral.',
      'Robust logistics network with an average delivery SLA of under 30 minutes in metro zones.',
      'Deep restaurant relationship ecosystem enabling exclusive mood-combo tie-ups and priority prep times.',
    ],
    weaknesses: [
      'Cold-start challenge for new users with zero order history requiring explicit mood quiz interactions.',
      'Potential recommendation inaccuracy during festival/fasting periods (e.g., Navratri, Ramadan, Shravan) if calendar context is missed.',
      'App real-estate congestion with Gold banners, Blinkit banners, and multiple promo carousels competing for visual priority.',
      'Server compute and latency overhead from dynamic LLM inference on high-concurrency peak hours (8:00 PM - 9:30 PM).',
    ],
    opportunities: [
      'Context-aware triggers: Auto-prompting mood recommendations based on local weather (monsoon chai & pakoras) and cricket match spikes.',
      'B2B Corporate Wellness integrations: Late-night coding session snacks and healthy overtime work meals.',
      'Zomato Gold Loyalty gamification: Exclusive mood-based discounts and surprise companion desserts.',
      'Expansion into AI-curated dining-out reservation suggestions under Zomato Dining tab.',
    ],
    threats: [
      'Swiggy releasing a cloned conversational UI or mood wheel within their next sprint release.',
      'Quick commerce apps (Blinkit, Zepto, Instamart) cannibalizing instant craving and impulse snacking needs.',
      'User privacy concerns regarding sentiment tracking or aggressive behavioral push notifications.',
      'Restaurant partner menu stockouts causing recommended "mood dishes" to be unavailable right at checkout.',
    ],
  },
  targetUsersAnalysis: {
    primarySegment:
      'Tired Corporate Professionals & Tech Workers (Aged 22–34) living in Bangalore, Mumbai, Gurgaon, Hyderabad, and Pune who order 4–6 times per week after exhausting workdays.',
    secondarySegment:
      'College Students & Young Cohabitants (Aged 18–24) seeking budget-friendly late-night study bites, weekend comfort food, and celebratory treats.',
    demographics:
      'Urban Gen Z and Millennials, smartphone-first, disposable monthly income ₹30,000–₹1,50,000, high digital payment adoption (UPI).',
    psychographics:
      'Experience-driven, high cognitive overload, prone to impulsive food cravings, value speed, emotional comfort, and photogenic food.',
    contextOfUse:
      'Weekday evenings (7:30 PM–10:00 PM) on the couch or desk, Friday night unwinding, rainy Sunday afternoons, and late-night binge watching.',
  },
  userPersonas: [
    {
      name: 'Aanya Sharma',
      age: 26,
      occupation: 'Senior Product Marketing Specialist at Fintech Unicorn',
      goals: [
        'Wind down after 9 hours of sprint planning and back-to-back Zoom calls without spending 15 minutes picking dinner.',
        'Enjoy healthy yet comforting meals that align with weekly calorie targets without feeling deprived.',
        'Have food delivered reliably within 30 minutes before evening meetings wrap up.',
      ],
      frustrations: [
        'Opens Zomato, scrolls endlessly between 6 tabs, gets overwhelmed, and ends up drinking tea or eating cold bread.',
        'Recommendations always push greasy fast food when she wants a warm, clean bowl of soothing khichdi or soba noodles.',
        'Surprise delivery delays after spending 20 minutes placing an order.',
      ],
      behaviour:
        'Orders dinner 4 times a week between 8:30 PM and 9:15 PM; pays instantly via UPI; checks restaurant ratings obsessively.',
      quote:
        '"I make 200 decisions every single workday. By 8:30 PM, I just want my phone to know I had a brutal day and feed me something soothing."',
    },
    {
      name: 'Rohan Mehra',
      age: 21,
      occupation: 'Engineering Undergraduate & Hostelite',
      goals: [
        'Find spicy, filling, high-dopamine snacks during 1:00 AM hackathons and exam cram sessions.',
        'Maximize portion size and taste satisfaction within a strict ₹200–₹250 budget constraint.',
        'Split bills seamlessly with roommates using UPI apps.',
      ],
      frustrations: [
        'Most good restaurants show as "Closed" after midnight, leaving only repetitive burger joints.',
        'Minimum order value and high surge delivery fees blow his student weekly food allowance.',
        'Search results show expensive fine-dining places when he is craving affordable street-style rolls.',
      ],
      behaviour:
        'Night owl active between 11:30 PM and 2:30 AM; uses discounts, coupon codes, and group ordering with hostel mates.',
      quote:
        '"When we pass an exam or finish a game tournament at midnight, we want instant celebration food—cheesy, spicy, and cheap!"',
    },
    {
      name: 'Vikram & Priya Iyer',
      age: 33,
      occupation: 'Management Consultant & UX Lead (Working Couple)',
      goals: [
        'Order balanced weekend lunches that cater to both divergent tastes (spicy Andhra meals vs continental salads) without placing separate orders.',
        'Discover underrated local heritage restaurants that deliver authentic regional flavors.',
        'Consistent food hygiene and packaging quality.',
      ],
      frustrations: [
        'Debating "what should we eat" for 25 minutes every Friday evening until both get hangry.',
        'Lack of transparency on restaurant ingredient freshness and oil quality.',
        'Generic discounts on low-quality cloud kitchens masking genuine culinary gems.',
      ],
      behaviour:
        'Orders 2–3 premium meals on weekends with AOV exceeding ₹900; subscribers to Zomato Gold; frequently writes detailed photo reviews.',
      quote:
        '"Friday dinner is our weekly sacred ritual. If an app can settle our dining debate in 30 seconds with options we both love, take my money."',
    },
  ],
  userJourney: [
    {
      stage: 'Awareness',
      userAction: 'Views playful Zomato push notification at 8:00 PM: "Had a rough Wednesday? Let your mood pick dinner."',
      touchpoints: 'Android/iOS Push Notification, Instagram Meme Reel, Zomato Home Tab Banner',
      painPoints: 'Banner blindness; notification spam fatigue.',
      opportunities: 'Trigger contextual micro-copy based on local weather (e.g. "Heavy rains in Indiranagar - hot soup alert!").',
    },
    {
      stage: 'Discovery',
      userAction: 'Taps MoodMatch widget on Zomato home screen; selects "Exhausted & Need Comfort" mood icon.',
      touchpoints: 'Home Screen Mood Carousel, Haptic Mood Slider, 3-Card Recommendation Deck',
      painPoints: 'Too many question steps could cause drop-off before recommendations appear.',
      opportunities: 'Instant 1-tap presets with zero mandatory questionnaire; AI infers time, past orders, and weather automatically.',
    },
    {
      stage: 'Signup',
      userAction: 'Existing Zomato users seamlessly activate feature; new users complete instant 1-tap phone OTP.',
      touchpoints: 'Phone Number OTP / Truecaller Verification, Location Permission Dialog',
      painPoints: 'Location permission denial breaks delivery radius calculation.',
      opportunities: 'Graceful fallback to last saved home/office address without modal blocking.',
    },
    {
      stage: 'Usage',
      userAction: 'App presents 3 tailored dish cards with price, prep time, and mood rationale ("Rich Dal Makhani + Garlic Naan from Punjab Grill").',
      touchpoints: 'Mood Recommendation Deck, Single-Tap "Quick Add to Cart" Button, Dish Preview Video',
      painPoints: 'Items in cart become unavailable if restaurant inventory changes.',
      opportunities: 'Real-time stock validation check before rendering the 3 mood cards.',
    },
    {
      stage: 'Retention',
      userAction: 'Receives personalized post-meal prompt: "Did this hit the comfort spot?" and gains Mood Loyalty Badges.',
      touchpoints: 'Delivery Tracking Screen, Post-Delivery Rating Sheet, Weekly Cravings Wrap',
      painPoints: 'Intrusive rating popups right after delivery when user wants to eat.',
      opportunities: 'Gentle 1-tap emoji feedback delayed by 45 minutes when opening app next time.',
    },
    {
      stage: 'Advocacy',
      userAction: 'Shares funny "My Weekly Mood vs My Food" infographic card on Instagram Stories or WhatsApp groups.',
      touchpoints: 'Share to Instagram Story Sheet, WhatsApp Referral Link with ₹100 Off coupon',
      painPoints: 'Shareable graphic looks like an advertisement instead of relatable personal content.',
      opportunities: 'Generate high-aesthetic, Spotify-Wrapped style personalized monthly mood-food charts.',
    },
  ],
  customerPainPoints: [
    {
      id: 1,
      title: 'Cognitive Choice Overload & Decision Fatigue',
      description: 'Browsing over 500 restaurant menus after an exhausting workday creates mental paralysis, leading to 22% session abandonment.',
      severity: 'Critical',
      affectedSegment: 'Working Professionals (Ages 22-35)',
    },
    {
      id: 2,
      title: 'Mismatch Between Past Orders and Current Emotional State',
      description: 'Reorder carousels push heavy biryani ordered last Sunday when the user currently has an upset stomach or wants light soup.',
      severity: 'High',
      affectedSegment: 'All Repeat Users',
    },
    {
      id: 3,
      title: 'Time-Consuming Filter Configuration',
      description: 'Toggling multiple checkboxes (Veg, Under ₹300, 4.0+ Stars, Under 30 Mins) takes 8+ taps every single session.',
      severity: 'Medium',
      affectedSegment: 'Busy On-the-Go Orderers',
    },
    {
      id: 4,
      title: 'Couple / Roommate Dinner Disagreements',
      description: 'Households spend 20+ minutes negotiating what to eat because one person wants spicy while the other wants healthy.',
      severity: 'High',
      affectedSegment: 'Couples & Co-living Flatmates',
    },
    {
      id: 5,
      title: 'Late-Night Inventory Heartbreak',
      description: 'Spending 10 minutes customizing an order only to see "Restaurant closed" or "Item out of stock" at checkout.',
      severity: 'Critical',
      affectedSegment: 'Midnight Cravers & Students',
    },
    {
      id: 6,
      title: 'Guilt and Regret After Impulsive Fast Food Orders',
      description: 'Users default to unhealthy fast food out of sheer exhaustion and later experience dietary remorse.',
      severity: 'Medium',
      affectedSegment: 'Health-Conscious Urbanites',
    },
    {
      id: 7,
      title: 'Lack of Weather and Seasonal Adaptation',
      description: 'App fails to recognize a heavy tropical rainstorm outside and still recommends chilled cold coffee instead of steaming ginger tea.',
      severity: 'Medium',
      affectedSegment: 'Monsoon / Winter City Dwellers',
    },
    {
      id: 8,
      title: 'Misleading Ratings Obscuring Authentic Dish Quality',
      description: 'A 4.3-rated restaurant might have terrible pasta despite great desserts; users cannot easily tell which specific dish matches their craving.',
      severity: 'High',
      affectedSegment: 'Food Enthusiasts & Connoisseurs',
    },
    {
      id: 9,
      title: 'Budget Anxiety During Food Discovery',
      description: 'Browsing high-priced dishes creates checkout sticker shock after adding delivery charges, packaging fees, and taxes.',
      severity: 'High',
      affectedSegment: 'College Students & Budget Shoppers',
    },
    {
      id: 10,
      title: 'Cold-Start Disconnect for Travelers & New Residents',
      description: 'Moving to a new city leaves users clueless about genuine local comfort food spots beyond generic commercial chains.',
      severity: 'Medium',
      affectedSegment: 'Migrants, Relocated Employees & Tourists',
    },
  ],
  proposedFeatures: {
    mustHave: [
      {
        title: 'Contextual Mood Selector (1-Tap Emotion Matrix)',
        description: 'Interactive visual selector with 6 primary moods ("Stressed / Comfort", "Celebration / Party", "Guilt-Free Healthy", "Late-Night Crunch", "Rainy Day Nostalgia", "Quick & Cheap").',
        rationale: 'Reduces time-to-first-relevant-result from 11 minutes down to under 30 seconds.',
      },
      {
        title: '3-Card Curated Dish Deck with AI Explanation',
        description: 'Presents exactly 3 distinct dish & restaurant options with a brief reason (e.g., "Warm creamy dal loaded with butter from your favorite high-rated spot 2.1 km away").',
        rationale: 'Strictly caps cognitive load to eliminate analysis paralysis while maintaining variety.',
      },
      {
        title: 'Single-Tap Express Mood Checkout',
        description: 'Direct CTA on each card that loads the dish, selects default condiments, verifies delivery address, and navigates to UPI payment.',
        rationale: 'Maximizes checkout velocity and minimizes intermediate friction points.',
      },
    ],
    shouldHave: [
      {
        title: 'Weather & Hyper-Local Context Synchronizer',
        description: 'Auto-adjusts mood presets according to local API weather feeds (e.g. rain detection triggers pakora/soup promotions, heat waves trigger smoothies).',
        rationale: 'Delivers spontaneous delight and taps into universal seasonal food cravings.',
      },
      {
        title: 'Budget & Calorie Guardrails',
        description: 'Quick toggle sliders allowing users to lock maximum spend (e.g., "Under ₹300") and dietary caps (e.g., "Under 500 kcal").',
        rationale: 'Eliminates checkout price shock and caters to fitness-conscious demographics.',
      },
      {
        title: 'Household Compromise Mode ("Duo Mood")',
        description: 'Allows two users to select separate moods or dietary styles and finds a single multi-cuisine restaurant or nearby cloud kitchen hub.',
        rationale: 'Solves the ubiquitous couple dining deadlock problem.',
      },
    ],
    couldHave: [
      {
        title: 'Spotify / Apple Music Mood Playlist Sync',
        description: 'Optional integration analyzing current listening session vibes (lo-fi chill, high-tempo workout) to recommend matching cuisines.',
        rationale: 'High viral PR factor and brand differentiation among Gen Z audiences.',
      },
      {
        title: 'Voice-Activated Conversational Mood Prompting',
        description: 'Speak in Hindi, Hinglish, or English: "Kuch meetha aur garama-garam chahiye under ₹150".',
        rationale: 'Hands-free convenience for users driving home or cooking.',
      },
    ],
    future: [
      {
        title: 'Continuous Biometric Glucose & Wearable Sync',
        description: 'Integration with Apple Health, WHOOP, and Ultrahuman to detect elevated cortisol or blood sugar dips and recommend restorative nutrients.',
        rationale: 'Pioneers proactive nutritional medicine in consumer food delivery.',
      },
      {
        title: 'Autonomous Recurring Mood Replenishment',
        description: 'Smart auto-ordering of favorite comfort tea or weekend brunch at preset times with 10-minute cancellation buffer.',
        rationale: 'Creates predictable recurring GMV subscriptions.',
      },
    ],
  },
  ricePrioritization: [
    {
      feature: '1-Tap Contextual Mood Selector',
      reach: '4,200,000 monthly active eaters',
      reachValue: 4200000,
      impact: '3 (Massive conversion lift)',
      impactValue: 3,
      confidence: '90% (Validated via user research)',
      confidenceValue: 0.9,
      effort: '2 Sprints (Engineering + ML API)',
      effortValue: 2,
      riceScore: 5670000,
      calculation: '(4,200,000 × 3 × 0.90) / 2 = 5,670,000',
    },
    {
      feature: '3-Card Curated Dish Deck with AI Rationale',
      reach: '3,800,000 users per month',
      reachValue: 3800000,
      impact: '2.5 (High user satisfaction)',
      impactValue: 2.5,
      confidence: '85% (High prototype benchmark)',
      confidenceValue: 0.85,
      effort: '2.5 Sprints (Design + Catalog ML)',
      effortValue: 2.5,
      riceScore: 3230000,
      calculation: '(3,800,000 × 2.5 × 0.85) / 2.5 = 3,230,000',
    },
    {
      feature: 'Weather & Time Context Auto-Trigger',
      reach: '5,000,000 active app visitors',
      reachValue: 5000000,
      impact: '2 (Moderate impulse purchase lift)',
      impactValue: 2,
      confidence: '80% (Clear monsoon historical lift)',
      confidenceValue: 0.8,
      effort: '1.5 Sprints (Weather API hookup)',
      effortValue: 1.5,
      riceScore: 5333333,
      calculation: '(5,000,000 × 2 × 0.80) / 1.5 = 5,333,333',
    },
    {
      feature: 'Single-Tap Express Mood Checkout',
      reach: '2,500,000 high-intent checkout users',
      reachValue: 2500000,
      impact: '2 (Friction reduction)',
      impactValue: 2,
      confidence: '80% (Cart checkout metric data)',
      confidenceValue: 0.8,
      effort: '2 Sprints (Payment gateway fast-track)',
      effortValue: 2,
      riceScore: 2000000,
      calculation: '(2,500,000 × 2 × 0.80) / 2 = 2,000,000',
    },
    {
      feature: 'Duo Mood Compromise Mode',
      reach: '1,200,000 multi-person households',
      reachValue: 1200000,
      impact: '2 (High household NPS)',
      impactValue: 2,
      confidence: '65% (Experimental UX hypothesis)',
      confidenceValue: 0.65,
      effort: '3 Sprints (Multi-cart logic)',
      effortValue: 3,
      riceScore: 520000,
      calculation: '(1,200,000 × 2 × 0.65) / 3 = 520,000',
    },
    {
      feature: 'Spotify Music Mood Sync',
      reach: '800,000 music-linked Gen Z users',
      reachValue: 800000,
      impact: '1 (Niche delightful novelty)',
      impactValue: 1,
      confidence: '50% (OAuth friction risk)',
      confidenceValue: 0.5,
      effort: '2.5 Sprints (3P OAuth & token management)',
      effortValue: 2.5,
      riceScore: 160000,
      calculation: '(800,000 × 1 × 0.50) / 2.5 = 160,000',
    },
  ],
  kanoModel: {
    basic: [
      {
        feature: 'Accurate Restaurant Availability & Operational Hours',
        explanation: 'Must-be baseline: Recommending a dish from a closed restaurant causes instant churn and zero user trust.',
      },
      {
        feature: 'Real-time Pricing, Delivery Fee & Tax Transparency',
        explanation: 'Users expect the recommended dish price to match checkout without hidden surprise surcharges.',
      },
      {
        feature: 'Dietary Strictness Adherence (Veg / Non-Veg / Halal / Jain)',
        explanation: 'Recommending meat to a strict vegetarian or Jain eater violates core ethical norms and causes severe brand backlash.',
      },
    ],
    performance: [
      {
        feature: 'Recommendation Relevance & Precision Score',
        explanation: 'The closer the 3 suggested meals hit the user\'s exact subjective craving, the higher the conversion and satisfaction.',
      },
      {
        feature: 'Sub-30-Second Time to Checkout Completion',
        explanation: 'Speed is linear: every second shaved off browsing directly increases repeat order frequency.',
      },
      {
        feature: 'Micro-Location Delivery SLA Under 32 Minutes',
        explanation: 'Prioritizing nearby high-efficiency kitchens ensures hot food arrives before the user\'s mood shifts.',
      },
    ],
    delighters: [
      {
        feature: 'Hyper-Personalized Sensory Micro-Copy ("We know your day was heavy...")',
        explanation: 'Unexpected emotional empathy transforms a purely transactional food app into a comforting digital companion.',
      },
      {
        feature: 'Surprise Mood Add-On Discount (e.g., Free Gulab Jamun on rough days)',
        explanation: 'Delivers intense emotional delight and sparks organic word-of-mouth social sharing.',
      },
      {
        feature: 'Monsoon Rain & Cricket Match Synchronized Visual Themes',
        explanation: 'Dynamic app background and steaming chai aroma graphics create immersive seasonal nostalgia.',
      },
    ],
  },
  moscowPrioritization: {
    mustHave: [
      'Visual Mood Selector on Home Screen with 6 primary emotional presets',
      '3-Card Recommendation Deck with instant item price, rating, and prep time',
      'Dietary Preference & Allergy hard-filters (Pure Veg, Non-Veg, Egg, Jain)',
      'Direct Add-to-Cart with single-click address confirmation',
      'Real-time restaurant live inventory check to prevent stockout failures',
    ],
    shouldHave: [
      'Weather API hookup (Monsoon rain, temperature, humidity situational triggers)',
      'Budget cap selector (Under ₹250, ₹250-₹500, Premium Treat)',
      'Past Order Taste Vector ML weighting (spice tolerance, sweet vs savory bias)',
      'Post-meal mood rating widget ("Did this meal fix your mood?")',
    ],
    couldHave: [
      'Couple / Roommate "Duo Mood" conflict resolver',
      'Spotify playlist vibe synchronization',
      'Conversational Hinglish / Voice mood input ("Kuch garam soup pila do")',
      'Monthly "Mood Wrapped" shareable social graphics',
    ],
    wontHave: [
      'Biometric smartwatch cortisol synchronization (v1 out of scope)',
      'Autonomous recurring auto-debit meal delivery (regulatory & risk concerns)',
      'In-app social community chat feed around food cravings',
    ],
  },
  prd: {
    productObjective:
      'Transform food ordering on Zomato from an exhausting manual search chore into an effortless, emotionally resonant 30-second delight through AI-powered mood recommendations.',
    businessGoal:
      'Lift overall search-to-order conversion rate from 38% to 46%, decrease browse-to-cart duration by 40%, and generate ₹140 Cr incremental GMV in Year 1 across top 10 Indian metropolitan areas.',
    userStories: [
      {
        id: 'US-01',
        role: 'Tired Working Professional',
        want: 'tap my current mood state ("Exhausted & Stressed") on the home screen',
        soThat: 'I receive 3 comforting, high-quality dinner recommendations without scrolling through dozens of menus.',
        priority: 'Must',
      },
      {
        id: 'US-02',
        role: 'Strict Vegetarian User',
        want: 'my dietary boundaries to be strictly respected during mood curation',
        soThat: 'I never get recommended non-vegetarian or cross-contaminated kitchen items regardless of the selected mood.',
        priority: 'Must',
      },
      {
        id: 'US-03',
        role: 'Budget-Conscious Student',
        want: 'set a strict maximum price limit (e.g. ₹200) on my mood recommendations',
        soThat: 'I can satisfy my late-night cravings without exceeding my monthly hostel allowance.',
        priority: 'Should',
      },
      {
        id: 'US-04',
        role: 'Busy Parent / Working Couple',
        want: 'find a restaurant that satisfies two distinct mood requirements in a single delivery',
        soThat: 'we do not need to place two separate orders with duplicate delivery fees.',
        priority: 'Could',
      },
    ],
    acceptanceCriteria: [
      {
        storyId: 'US-01',
        scenario: 'User selects "Stressed & Comfort" mood after 8:00 PM',
        given: 'User is logged in on Zomato home screen in Indiranagar, Bangalore with past preference for North Indian.',
        when: 'User taps the "Stressed & Comfort" mood icon.',
        then: 'System displays exactly 3 curated dish cards within 600ms, each with restaurant name, distance under 4km, ETA under 35 mins, price, and a 1-sentence emotional rationale.',
      },
      {
        storyId: 'US-02',
        scenario: 'Strict Pure-Veg filter enforcement',
        given: 'User profile has "Pure Veg" toggle turned ON in food preferences.',
        when: 'User triggers any mood (e.g., "Celebration", "Quick Bite").',
        then: 'All 3 generated cards must contain exclusively 100% Green Dot vegetarian certified dishes from verified veg kitchens or pure-veg outlets.',
      },
      {
        storyId: 'US-03',
        scenario: 'Budget cap filter boundary validation',
        given: 'User selects budget slider capped at ₹250.',
        when: 'Mood recommendations are calculated.',
        then: 'Every recommended dish base price must be ≤ ₹250, and estimated landing cost including standard tax must not exceed ₹290.',
      },
      {
        storyId: 'US-04',
        scenario: 'Item out of stock during card render',
        given: 'A candidate restaurant runs out of butter chicken at 9:15 PM.',
        when: 'The recommendation engine queries merchant POS inventory.',
        then: 'The engine automatically falls back to candidate #4 without displaying an error modal or broken image to the user.',
      },
    ],
    functionalRequirements: [
      {
        id: 'FR-01',
        category: 'UI / UX',
        description: 'Home screen entry point banner and persistent floating action trigger ("Feeling hungry? How\'s your mood?") responsive on mobile viewports.',
      },
      {
        id: 'FR-02',
        category: 'Recommendation Engine',
        description: 'Vector-search microservice calculating similarity between user mood embeddings, restaurant review sentiment, and historical item affinities.',
      },
      {
        id: 'FR-03',
        category: 'Inventory & Operations',
        description: 'Real-time integration with Zomato Merchant Kitchen Display Systems (KDS) to verify prep time under 20 mins and item active status.',
      },
      {
        id: 'FR-04',
        category: 'Checkout & Payments',
        description: 'Express 1-tap cart creation bypassing intermediate add-on modals with pre-selected best-seller condiments (e.g., green chutney, raita).',
      },
      {
        id: 'FR-05',
        category: 'Feedback Loop',
        description: 'Post-delivery micro-survey capturing 1-5 smiley satisfaction score correlating mood intent with culinary fulfillment.',
      },
    ],
    nonFunctionalRequirements: [
      {
        category: 'Performance & Latency',
        requirement: 'End-to-end API response time for 3-card generation must be under 750ms at P95 and under 1.2s at P99 under 50,000 QPS load.',
        standard: 'P95 ≤ 750ms SLA',
      },
      {
        category: 'High Availability',
        requirement: 'Microservice availability of 99.99% during peak meal windows (12:00 PM - 2:30 PM and 7:30 PM - 11:00 PM IST).',
        standard: '99.99% Uptime with Multi-Region Failover',
      },
      {
        category: 'Security & Privacy',
        requirement: 'All user sentiment queries and location telemetry encrypted in transit (TLS 1.3) and at rest (AES-256) complying with India DPDP Act 2023.',
        standard: 'DPDP Act & ISO 27001 Certified',
      },
      {
        category: 'Scalability',
        requirement: 'System must horizontally auto-scale during IPL cricket matches and New Year\'s Eve spikes up to 4.5x normal baseline concurrency.',
        standard: 'Kubernetes HPA with warm standby pods',
      },
    ],
    dependencies: [
      'Zomato Core Catalog & Menu Availability Real-Time Service',
      'OpenWeatherMap / Indian Meteorological Dept Real-time Microclimate API',
      'Zomato Delivery Fleet Dispatch & ETA Estimator Engine',
      'UPI & Payment Gateway Deep Linking (PhonePe, Google Pay, Paytm)',
    ],
    risks: [
      'Hallucinated or out-of-stock dish recommendations causing negative user sentiment.',
      'Peak hour API timeouts if LLM inference latency spikes during dinner rushes.',
      'Dietary classification errors causing non-veg items to slip into pure-veg user recommendations.',
    ],
  },
  technicalArchitecture: {
    frontend:
      'React Native (Mobile iOS & Android apps) with fast local caching via SQLite/WatermelonDB, animated micro-interactions using Reanimated 3, and responsive Web companion in React 19 + Tailwind CSS.',
    backend:
      'High-throughput Go (Golang) and Node.js microservices hosted on Google Kubernetes Engine (GKE), orchestrated with gRPC for internal service-to-service communication with sub-10ms inter-service latency.',
    database:
      'ScyllaDB / Cassandra for high-velocity user order history and real-time session vectors; PostgreSQL (Google Cloud SQL) for transactional billing metadata; Redis Cluster for ultra-fast menu caching and rate limiting.',
    aiModel:
      'Google Gemini 3.8 Flash fine-tuned with culinary embeddings for natural language prompt analysis and contextual sentiment translation, paired with Milvus/Pinecone vector database for sub-15ms semantic dish retrieval.',
    cloud:
      'Multi-region Google Cloud Platform (Mumbai & Delhi zones) with Cloud CDN, Cloud Armor DDoS mitigation, and Cloud Pub/Sub for asynchronous event streaming.',
    authentication:
      'Zomato Centralized Identity Service using JWT tokens with OAuth 2.0, biometric FaceID/Fingerprint quick-auth on mobile, and SMS/WhatsApp OTP fallback.',
    analytics:
      'Apache Kafka event streaming into Google BigQuery, transformed via dbt, and visualized in Looker + Mixpanel for real-time funnel conversion tracking.',
    architecturalOverview:
      'When a user selects a mood, the mobile client dispatches a lightweight JSON payload to the API Gateway. The API Gateway queries the Context Aggregator (weather, location, time-of-day, dietary flags). This enriched context is passed to the Gemini Embedding & Vector Search service, which intersects semantic mood vectors against active nearby restaurant menus filtered by radius and ETA. The ranked top 3 items are returned with personalized micro-copy in under 600ms.',
  },
  successMetrics: {
    northStarMetric: {
      name: 'Weekly Mood-to-Order Conversion Rate (MCR)',
      target: '≥ 44% of users who tap MoodMatch complete an order within 10 minutes',
      why: 'Directly validates that emotional curation eliminates decision paralysis and converts latent cravings into immediate checkout revenue.',
    },
    metricsTable: [
      {
        metric: 'North Star: Mood-to-Order Conversion Rate',
        category: 'Core Conversion',
        targetBenchmark: '44.0% (vs platform avg 31.5%)',
        trackingMethod: 'Mixpanel Funnel: Mood Select → Cart Add → Payment Success',
      },
      {
        metric: 'Activation Rate',
        category: 'User Onboarding',
        targetBenchmark: '≥ 32% of active users trigger MoodMatch in Week 1',
        trackingMethod: 'Unique user IDs initiating feature / Total weekly active app opens',
      },
      {
        metric: 'Browse-to-Cart Latency',
        category: 'User Experience',
        targetBenchmark: '≤ 3.2 minutes (down from 11.4 mins baseline)',
        trackingMethod: 'Timestamp delta between home screen view and cart creation',
      },
      {
        metric: '30-Day Retention Rate (Cohort)',
        category: 'Retention',
        targetBenchmark: '58% repeat order retention at Day 30',
        trackingMethod: 'Cohort retention analysis in Amplitude',
      },
      {
        metric: 'Daily Active Users (DAU)',
        category: 'Engagement',
        targetBenchmark: '1,800,000 DAU interacting with MoodMatch',
        trackingMethod: 'Daily unique user interaction events',
      },
      {
        metric: 'Monthly Active Users (MAU)',
        category: 'Engagement',
        targetBenchmark: '9,500,000 MAU engaging at least twice a month',
        trackingMethod: 'Monthly unique user interaction events',
      },
      {
        metric: 'Average Order Value (AOV)',
        category: 'Monetization',
        targetBenchmark: '₹415 (vs platform baseline ₹382)',
        trackingMethod: 'Total MoodMatch GMV divided by total completed orders',
      },
      {
        metric: 'Feature Adoption Rate',
        category: 'Product Health',
        targetBenchmark: '26% of all dinner orders generated via MoodMatch',
        trackingMethod: 'MoodMatch order attribution tag / Total platform dinner orders',
      },
      {
        metric: 'Net Promoter Score (NPS)',
        category: 'Customer Satisfaction',
        targetBenchmark: '+68 NPS among MoodMatch active cohort',
        trackingMethod: 'Quarterly in-app 1-question NPS survey',
      },
      {
        metric: 'Customer Satisfaction (CSAT)',
        category: 'Customer Satisfaction',
        targetBenchmark: '4.7 / 5.0 on post-meal sentiment rating',
        trackingMethod: 'In-app 5-star rating sheet after delivery',
      },
      {
        metric: 'Customer Lifetime Value (LTV)',
        category: 'Unit Economics',
        targetBenchmark: '₹6,800 over 18 months (+22% lift over standard)',
        trackingMethod: 'Historical cohort gross margin contribution over time',
      },
      {
        metric: 'Customer Acquisition Cost (CAC)',
        category: 'Unit Economics',
        targetBenchmark: '₹0 incremental organic CAC (internal app feature)',
        trackingMethod: 'Blended paid promotion spend per net new MoodMatch user',
      },
    ],
  },
  riskAnalysis: {
    businessRisks: [
      {
        risk: 'Merchant Partner Perception of Bias: Excluded restaurants may complain that the AI favors specific national chains over local eateries.',
        severity: 'High',
        mitigation: 'Implement fair rotation algorithms ensuring at least 1 local independent restaurant is included in every 3-card deck.',
      },
      {
        risk: 'Cannibalization of Paid Ad Placements: Premium restaurant sponsored banners might see reduced CTR if users bypass them directly via mood cards.',
        severity: 'Medium',
        mitigation: 'Introduce "Sponsored Mood Pairings" allowing advertisers to bid on specific emotional keywords while maintaining quality thresholds.',
      },
    ],
    technicalRisks: [
      {
        risk: 'LLM Inference Latency and Cost Spikes: High query volume during Friday 8:00 PM rush causing latency to exceed 2 seconds.',
        severity: 'High',
        mitigation: 'Pre-compute and cache mood recommendation candidate pools hourly using Redis, using Gemini real-time only for dynamic contextual tie-breaks.',
      },
      {
        risk: 'Sudden Kitchen Stockouts: Recommended dishes going out of stock after being shown to the user.',
        severity: 'Medium',
        mitigation: 'Implement webhook listeners from POS systems to remove unavailable items from candidate pools in under 2 seconds.',
      },
    ],
    operationalRisks: [
      {
        risk: 'Rider Shortages during Weather Spikes: Rain prompts surge in hot soup/chai orders, but fewer riders are available on the road.',
        severity: 'High',
        mitigation: 'Dynamically throttle mood radius to < 2.5 km during torrential weather and offer delivery partner rainy-day incentives.',
      },
    ],
    legalRisks: [
      {
        risk: 'Allergen and Food Safety Liability: A user with severe peanut allergy trusting a "Comfort" recommendation that triggers an allergic reaction.',
        severity: 'High',
        mitigation: 'Prominent mandatory allergen tags on all 3 cards and clear disclaimer that food preparation is governed by restaurant partner kitchens.',
      },
      {
        risk: 'Data Privacy Compliance under India DPDP Act 2023: User mood and behavioral history must not be sold or processed without consent.',
        severity: 'Medium',
        mitigation: 'Explicit opt-in prompt and localized data storage in Google Cloud Mumbai region with right-to-delete user profile vectors.',
      },
    ],
  },
  launchStrategy: {
    alpha: {
      duration: '4 Weeks (Sprint 1-2)',
      cohort: '5,000 Zomato employees & Bangalore tech campus beta testers',
      objectives: [
        'Stress-test recommendation relevance and measure browse-to-order completion times in real working environments.',
        'Calibrate accuracy of pure-veg and dietary restriction filters with zero tolerance for classification errors.',
        'Verify P95 API latency remains under 700ms during lunch and dinner spikes.',
      ],
    },
    beta: {
      duration: '6 Weeks (Sprint 3-5)',
      cohort: '100,000 Zomato Gold members across Bangalore, Mumbai, and Gurgaon',
      objectives: [
        'Measure incremental conversion lift against a randomized A/B control group viewing standard home carousels.',
        'Refine the 6 primary mood presets based on heatmap tap distribution and user feedback surveys.',
        'Optimize unit economics and average order value (AOV) targets.',
      ],
    },
    publicLaunch: {
      strategy: 'Phased city-by-city rollout across Top 15 Indian metros accompanied by high-impact culturally viral marketing campaigns.',
      rolloutPhases: [
        'Phase 1: Tier-1 Metros (Bangalore, Mumbai, Delhi-NCR, Hyderabad, Pune, Chennai).',
        'Phase 2: High-growth Tier-2 culinary hubs (Jaipur, Ahmedabad, Chandigarh, Lucknow, Kochi).',
        'Phase 3: National rollout across all 1,000+ Zomato operating cities in India.',
      ],
    },
    marketingStrategy: [
      'Viral Social Media Campaign: Zomato\'s legendary billboard & Twitter/X banter: "Your ex gave you mixed signals. We give you comfort food."',
      'Influencer Collaborations: Tech & lifestyle creators testing "Eating according to my mood for 24 hours" on YouTube Shorts & Instagram Reels.',
      'Contextual Push Notifications: Weather-triggered and Friday evening micro-copy timed perfectly with commuter arrival windows.',
    ],
    pricingStrategy:
      'Free core feature for all Zomato users to maximize adoption and order volume; Zomato Gold members receive exclusive "Surprise Mood Treats" and zero delivery fees.',
    goTMarketStrategy: [
      'Partner with 500 top-tier regional restaurants to create exclusive "Mood Match Combos" available only through the feature.',
      'In-app gamified launch event: "Unlock your Food Zodiac / Mood Persona" with ₹50 discount vouchers on first mood order.',
      'Corporate partnerships with co-working spaces (WeWork, Awfis) for office late-night overtime snack credits.',
    ],
  },
  roadmap: {
    days30: {
      phase: 'Phase 1: Foundation, Discovery & Alpha Testing',
      timeframe: 'Days 1 – 30',
      focus: 'Build core AI recommendation pipeline, establish low-latency vector index, and validate with internal alpha testers.',
      deliverables: [
        'Finalized PRD and interactive Figma design system components.',
        'Gemini 3.8 Flash prompt engineering and culinary embedding pipeline in Python/Go.',
        'Initial home-screen mood selector widget and 3-card card component in React Native.',
        'Alpha launch to 5,000 internal Zomato employees with bug-tracking dashboard.',
      ],
      milestones: 'Alpha rollout complete; P95 response time validated at ≤ 650ms; zero dietary classification bugs.',
    },
    days60: {
      phase: 'Phase 2: Closed Beta, Operational Refinement & A/B Experimentation',
      timeframe: 'Days 31 – 60',
      focus: 'Roll out closed beta to 100,000 Zomato Gold subscribers; implement weather and temporal context triggers; optimize conversion funnel.',
      deliverables: [
        'Live A/B test running in Bangalore and Mumbai comparing MoodMatch vs Standard Home carousel.',
        'Integration with real-time OpenWeatherMap API for monsoon & temperature triggers.',
        'Express 1-tap checkout flow integration with UPI and stored payment methods.',
        'Merchant partner dashboard showing mood-driven demand insights.',
      ],
      milestones: 'Statistically significant +12.8% conversion lift observed in beta cohort; AOV confirmed at ₹410+.',
    },
    days90: {
      phase: 'Phase 3: General Availability (GA), Multi-City Rollout & Scale',
      timeframe: 'Days 61 – 90',
      focus: 'Public launch across top 15 metros; trigger national multi-channel marketing campaign; monitor North Star metrics and scale infrastructure.',
      deliverables: [
        'Full public GA launch on iOS and Android app stores for Tier-1 metros.',
        'National social media and outdoor billboard ad campaign execution.',
        'Automated real-time inventory and KDS stockout circuit-breaker in production.',
        'Post-launch executive metrics dashboard in Looker tracking ₹140 Cr GMV trajectory.',
      ],
      milestones: 'Reaching 1.5M+ daily mood orders; North Star Mood-to-Order Conversion Rate exceeding 42%; app store rating steady at 4.6+ stars.',
    },
  },
  pmInterviewQuestions: [
    {
      id: 1,
      question: 'Product Design: How would you design an intuitive, non-intrusive onboarding flow for Zomato MoodMatch that prevents user drop-off?',
      category: 'Product Design & UX',
      evaluationCriteria:
        'Tests candidate\'s user empathy, friction minimization instincts, progressive disclosure principles, and cold-start problem solving.',
      sampleAnswerApproach:
        'A strong PM will avoid multi-step questionnaires or quizzes. They will propose 1-tap visual mood chips directly on the home screen, leverage automated contextual signals (time of day, current weather, past order history) to pre-highlight the most probable mood, and allow immediate single-tap exploration without forcing mandatory profile setup.',
    },
    {
      id: 2,
      question: 'Metrics & Analytics: If overall browse-to-order conversion jumps by 15% after launch, but Average Order Value (AOV) drops by 8%, how would you diagnose this and what trade-offs would you evaluate?',
      category: 'Product Metrics & Trade-offs',
      evaluationCriteria:
        'Tests analytical rigor, unit economics comprehension, cannibalization analysis, and strategic prioritization between order volume vs basket size.',
      sampleAnswerApproach:
        'Segment the data by mood category. Users picking "Late-Night Crunch" or "Quick Comfort" might be buying single dishes rather than multi-course family meals. Calculate net GMV impact: 1.15 orders × 0.92 AOV = 1.058 (a +5.8% net revenue gain!). Propose nudges like smart beverage/dessert pairings ("Complete your comfort meal with a hot gulab jamun for ₹40") to lift AOV back up without hurting conversion.',
    },
    {
      id: 3,
      question: 'Product Strategy: How does Zomato MoodMatch create a defensible competitive moat against Swiggy and quick-commerce players like Zepto/Blinkit?',
      category: 'Product Strategy & Competitive Moats',
      evaluationCriteria:
        'Evaluates strategic vision, differentiation versus pure speed (quick commerce) or pure search (Swiggy), and data network effects.',
      sampleAnswerApproach:
        'Quick commerce dominates commodity snacking (chips, bread in 10 mins), while Swiggy focuses on transactional utility. Zomato MoodMatch shifts the battlefield from transactional utility to emotional empathy. Every mood interaction feeds proprietary taste-and-emotion vectors that cannot be easily copied, creating an emotional habit loop where hungry, exhausted users associate Zomato with instant emotional relief.',
    },
    {
      id: 4,
      question: 'Execution & Edge Cases: How would you handle dietary and religious dietary restrictions (e.g., Pure Veg during Navratri or Halal requirements) in mood recommendations?',
      category: 'Execution, Edge Cases & Ethics',
      evaluationCriteria:
        'Tests operational thoroughness, cultural context awareness in India, edge-case risk mitigation, and zero-defect quality standards.',
      sampleAnswerApproach:
        'Emphasize that dietary boundaries are non-negotiable "hard constraints", while moods are "soft scoring weights". The candidate filtering pipeline must strictly enforce user dietary preferences (Pure Veg, Halal, Jain, Vegan) before any semantic mood vector scoring occurs. Additionally, integrate dynamic festival calendar signals (e.g. Navratri fasting days in North India) to automatically adjust default mood decks.',
    },
    {
      id: 5,
      question: 'Technical & Cross-Functional Trade-offs: The engineering team informs you that running real-time LLM inference for 50,000 concurrent dinner rush users will cost ₹25 Lakhs per month and add 1.8 seconds of latency. How do you resolve this?',
      category: 'Technical Trade-offs & Engineering Collaboration',
      evaluationCriteria:
        'Tests technical literacy, pragmatism, cost vs latency optimization, caching strategies, and ability to negotiate feasible engineering solutions.',
      sampleAnswerApproach:
        'Do not run live generative LLM inference on every single raw user request. Decouple offline and online processing: pre-compute embeddings and candidate restaurant clusters in background batch jobs (hourly/daily) stored in a fast vector database (Milvus/Redis). At runtime, perform lightweight vector cosine similarity lookups taking < 20ms and costing a fraction of real-time generation, reserving LLM generation only for novel or long-tail conversational queries.',
    },
  ],
};
