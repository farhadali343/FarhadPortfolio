import povNarrativeImg from '../assets/images/project_pov_narrative_1794735733009.jpg';
import fordInvestsImg from '../assets/images/project_ford_invests_1794735733605.jpg';
import whatTheByteImg from '../assets/images/project_whatthebyte_1794735733761.jpg';
import easyFindsImg from '../assets/images/project_easy_finds_1794735734343.jpg';
import aiWorkflowImg from '../assets/images/project_ai_workflow_1794735736078.jpg';

export type ContentStatus = 'verified' | 'pending_confirmation' | 'in_progress';
export type AttributionLevel = 'Hands-on' | 'AI-assisted / Directed' | 'Learning / Experimental';

export interface ProfileData {
  name: string;
  wordmark: string;
  primaryPositioning: string;
  supportingIdentities: string[];
  heroHeadline: string;
  heroSubheadline: string;
  heroSupportingText: string;
  availability: {
    showIndicator: boolean;
    label: string;
    status: ContentStatus;
  };
  locationLine: string;
  portraitUrl: string | null;
  portraitAlt: string;
  aboutSummary: string[];
  aboutDisciplines: string[];
  workflowSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  languages: {
    name: string;
    proficiency: string;
  }[];
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string | null;
  isPlaceholder: boolean;
  note?: string;
}

export interface ContactConfig {
  headline: string;
  supportingText: string;
  email: string;
  emailIsPlaceholder: boolean;
  formEndpoint: string;
  socialLinks: ContactLink[];
  channelLinks: ContactLink[];
}

export interface AuditMetric {
  id: string;
  value: string;
  label: string;
  project: string;
  auditDate: string;
  status: ContentStatus;
  note?: string;
}

export interface SkillItem {
  name: string;
  attribution: AttributionLevel;
}

export interface ExpertiseCategory {
  id: string;
  index: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ToolItem {
  name: string;
  attribution: AttributionLevel;
  note?: string;
}

export interface ToolCategory {
  id: string;
  category: string;
  tools: ToolItem[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  projectGroup: string;
  engagementType: 'Independent Venture' | 'Project Operations' | 'Experimental Initiative';
  platforms: string;
  timeframe: string;
  responsibilities: string[];
  status: ContentStatus;
}

export type CuratedProjectTab =
  | 'All Work'
  | 'YouTube & Video'
  | 'Social & Content'
  | 'E-Commerce & Affiliate'
  | 'AI & Web Prototypes';

export type ProjectCategory =
  | 'All Projects'
  | 'Video Production'
  | 'Social Media'
  | 'YouTube'
  | 'E-commerce'
  | 'Affiliate Marketing'
  | 'Writing & Research'
  | 'AI & Digital Projects';

export interface ProjectExternalLink {
  label: string;
  url: string | null;
  isPending: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  primaryCategory: Exclude<ProjectCategory, 'All Projects'>;
  categories: Exclude<ProjectCategory, 'All Projects'>[];
  curatedTabs: Exclude<CuratedProjectTab, 'All Work'>[];
  categoryEyebrow: string;
  cardSummary: string;
  role: string;
  status: ContentStatus;
  statusLabel: string;
  timeframe: string;
  summary: string;
  overview: string;
  challenge: string;
  objective: string;
  contribution: string;
  workflow: string[];
  workPerformed: string[];
  tools: string[];
  deliverables: string[];
  results: {
    metric: string;
    context: string;
  }[];
  image: string | null;
  imageAlt: string;
  visualCode: string;
  externalLinks: ProjectExternalLink[];
  mediaNote?: string;
}

export interface PendingCvRecord {
  educationClaims: {
    credential: string;
    institution: string;
    year: string;
    status: ContentStatus;
  }[];
  freelanceClaims: {
    role: string;
    timeframe: string;
    notes: string;
    status: ContentStatus;
  }[];
  referencedItems: {
    name: string;
    note: string;
    status: ContentStatus;
  }[];
}

// ============================================================================
// CENTRALIZED PROFILE & PORTFOLIO CONFIGURATION
// Edit values here to update both the interactive website and the PDF Resume.
// Items marked status: 'pending_confirmation' are automatically omitted from
// public views until verified and switched to 'verified'.
// ============================================================================

export const PROFILE: ProfileData = {
  name: 'Farhad Ali',
  wordmark: 'FARHAD ALI',
  primaryPositioning: 'Multidisciplinary Digital Creator & AI-Powered Content Producer',
  supportingIdentities: [
    'AI Video Producer',
    'Digital Content Strategist',
    'Social Media Manager',
    'YouTube Channel Manager',
    'Digital Operations Specialist',
    'AI-Assisted Creative Producer',
    'E-commerce & Affiliate Marketing Operator',
    'Creative Director',
  ],
  heroHeadline: 'Building High-Retention Media, AI Workflows & Digital Brands.',
  heroSubheadline: 'AI-Powered Content | Video Production | Digital Operations',
  heroSupportingText:
    'I’m Farhad Ali—a digital creator and media strategist scaling YouTube channels, short-form video systems, and e-commerce storefronts from concept to revenue.',
  availability: {
    showIndicator: true,
    label: 'Open for freelance and international collaborations',
    status: 'verified',
  },
  locationLine: 'Pakistan · Working with Global Digital Platforms',
  portraitUrl: '/assets/aistudio/1df7c320-acfb-484f-bf63-8e23ff2c3888_6cc7c2a8.jpg',
  portraitAlt: 'Farhad Ali — Multidisciplinary Digital Creator and AI-Powered Content Producer',
  aboutSummary: [
    'I build digital media systems across YouTube channels, short-form video, editorial publishing, and e-commerce—combining audience psychology with editorial rigor so every release is grounded in clear positioning rather than guesswork.',
    'Rather than treating AI as a shortcut, I integrate it inside a disciplined creative direction pipeline: researching viewer intent, scripting high-retention hooks, directing generative visuals and voice pacing, and verifying accuracy before a single asset ships.',
  ],
  aboutDisciplines: [
    'Digital content creation & publishing systems',
    'AI-powered short-form & long-form video production',
    'Multi-platform social media management',
    'YouTube channel strategy, packaging & analytics',
    'Affiliate publishing & Pinterest discovery marketing',
    'E-commerce storefront operations & product research',
    'Creative direction & visual quality control',
    'AI-assisted experimental product development',
  ],
  workflowSteps: [
    {
      step: '01',
      title: 'Research & Planning',
      description:
        'Audience analysis, topic verification, competitive packaging audits, and structured content calendars.',
    },
    {
      step: '02',
      title: 'Creative Direction',
      description:
        'Defining narrative hooks, visual language, pacing blueprints, typography choices, and prompt direction.',
    },
    {
      step: '03',
      title: 'Structured Execution',
      description:
        'Combining hands-on writing and editing with directed AI media, voiceover, and motion workflows.',
    },
    {
      step: '04',
      title: 'Quality Assurance',
      description:
        'Source fact-checking, audio-visual sync inspection, thumbnail legibility checks, and brand consistency.',
    },
    {
      step: '05',
      title: 'Publishing & Optimization',
      description:
        'Platform-native SEO metadata, scheduled distribution, retention diagnosis, and iterative refinement.',
    },
  ],
  languages: [
    { name: 'English', proficiency: 'Professional working proficiency' },
    { name: 'Urdu', proficiency: 'Native / Bilingual proficiency' },
  ],
};

export const CONTACT_CONFIG: ContactConfig = {
  headline: 'Let’s Build Something Worth Watching.',
  supportingText:
    'Available for select freelance collaborations, channel launches, video systems, and digital storefront builds.',
  email: 'farhad0official@gmail.com',
  emailIsPlaceholder: false,
  formEndpoint: '',
  socialLinks: [
    {
      id: 'fb-business',
      label: 'Facebook (Business)',
      value: 'Farhad Ali',
      href: 'https://www.facebook.com/people/Farhad-Ali/61596174413291/',
      isPlaceholder: false,
    },
    {
      id: 'ig-muse',
      label: 'Instagram',
      value: '@farhad.muse.ai',
      href: 'https://www.instagram.com/farhad.muse.ai/',
      isPlaceholder: false,
    },
    {
      id: 'threads-muse',
      label: 'Threads',
      value: '@farhad.muse.ai',
      href: 'https://www.threads.com/@farhad.muse.ai',
      isPlaceholder: false,
    },
    {
      id: 'pinterest-easyfinds',
      label: 'Pinterest',
      value: '@easyfinds_us',
      href: 'https://www.pinterest.com/easyfinds_us/',
      isPlaceholder: false,
    },
    {
      id: 'benable-farhad',
      label: 'Benable',
      value: 'benable.com/farhad',
      href: 'https://benable.com/farhad',
      isPlaceholder: false,
    },
  ],
  channelLinks: [
    {
      id: 'yt-pov-narrative',
      label: 'YouTube — The POV Narrative',
      value: '@ThePOVNarrative',
      href: 'https://www.youtube.com/@ThePOVNarrative',
      isPlaceholder: false,
    },
    {
      id: 'yt-ford-invests',
      label: 'YouTube — Ford Invests',
      value: '@fordinvestsUS',
      href: 'https://www.youtube.com/@fordinvestsUS',
      isPlaceholder: false,
    },
    {
      id: 'tt-whatthebyte',
      label: 'TikTok — WhatTheByte',
      value: '@whatthebyte',
      href: 'https://www.tiktok.com/@whatthebyte',
      isPlaceholder: false,
    },
    {
      id: 'tt-pov-life',
      label: 'TikTok — POV Life Outline',
      value: '@pov.life.ouline',
      href: 'https://www.tiktok.com/@pov.life.ouline',
      isPlaceholder: false,
    },
    {
      id: 'tt-theoshow22',
      label: 'TikTok — TheoShow22',
      value: '@theoshow22',
      href: 'https://www.tiktok.com/@theoshow22',
      isPlaceholder: false,
    },
    {
      id: 'fourthwall-pov',
      label: 'Fourthwall — POV Narrative Shop',
      value: 'thepovnarrative-shop.fourthwall.com',
      href: 'https://thepovnarrative-shop.fourthwall.com/',
      isPlaceholder: false,
    },
    {
      id: 'shopify-elecostudio',
      label: 'Shopify — EleCoStudio',
      value: 'elecostudio.shop',
      href: 'http://elecostudio.shop/',
      isPlaceholder: false,
    },
  ],
};

export const AUDIT_STATISTICS: AuditMetric[] = [
  {
    id: 'pov-videos',
    value: '120',
    label: 'Published Videos',
    project: 'The POV Narrative',
    auditDate: 'Oct 2026',
    status: 'verified',
  },
  {
    id: 'pov-views',
    value: '118,142',
    label: 'Channel Views',
    project: 'The POV Narrative',
    auditDate: 'Oct 2026',
    status: 'verified',
  },
  {
    id: 'pov-top-video',
    value: '~68K',
    label: 'Peak Video Views',
    project: 'The POV Narrative',
    auditDate: 'Oct 2026',
    status: 'verified',
  },
  {
    id: 'easy-finds-pins',
    value: '266',
    label: 'Live Pinterest Pins',
    project: 'Easy Finds',
    auditDate: 'Nov 2026',
    status: 'verified',
  },
  {
    id: 'medium-stories',
    value: '80',
    label: 'Published Stories',
    project: 'Medium — Farhad Ali',
    auditDate: 'Sep–Oct 2026',
    status: 'verified',
  },
  {
    id: 'nov-reels',
    value: '12',
    label: 'Published Reels',
    project: 'Short-Form Video',
    auditDate: 'Nov 2026',
    status: 'verified',
  },
  {
    id: 'ballwool-listings',
    value: '32',
    label: 'Active Ballwool Listings',
    project: 'Ballwool Commerce',
    auditDate: '14 Nov 2026',
    status: 'pending_confirmation',
    note: 'Omitted publicly pending ownership confirmation.',
  },
];

export const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    id: 'ai-content',
    index: '01',
    title: 'AI Content Creation',
    description:
      'Directing generative imagery, voice synthesis, and structured prompt pipelines for consistent creative output.',
    skills: [
      { name: 'Prompt engineering & iteration', attribution: 'Hands-on' },
      { name: 'AI image generation & visual direction', attribution: 'AI-assisted / Directed' },
      { name: 'AI voice & narration workflows', attribution: 'AI-assisted / Directed' },
      { name: 'Content automation workflows', attribution: 'AI-assisted / Directed' },
      { name: 'Creative direction for AI-generated assets', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'video-production',
    index: '02',
    title: 'Video Production',
    description:
      'Concepting, scripting, and directing high-retention short-form Reels, Shorts, and narrative explainers.',
    skills: [
      { name: 'Short-form video production (Shorts & Reels)', attribution: 'Hands-on' },
      { name: 'Video scripting & hook retention structure', attribution: 'Hands-on' },
      { name: 'Voiceover & audio pacing direction', attribution: 'AI-assisted / Directed' },
      { name: 'Motion graphics & visual storyboard direction', attribution: 'AI-assisted / Directed' },
      { name: 'Sound effects & final quality assurance', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'social-media',
    index: '03',
    title: 'Social Media Management',
    description:
      'Operating multi-platform publishing calendars, captions, community engagement, and organic reach reviews.',
    skills: [
      { name: 'Multi-platform management (IG, Threads, FB)', attribution: 'Hands-on' },
      { name: 'Content calendars & publishing cadence', attribution: 'Hands-on' },
      { name: 'Social media strategy & copywriting', attribution: 'Hands-on' },
      { name: 'Community engagement & analytics review', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'youtube-management',
    index: '04',
    title: 'YouTube Management',
    description:
      'End-to-end channel structuring, packaging psychology, metadata optimization, and retention diagnostics.',
    skills: [
      { name: 'Channel setup, branding & niche positioning', attribution: 'Hands-on' },
      { name: 'Video packaging & thumbnail direction', attribution: 'Hands-on' },
      { name: 'YouTube SEO, titles & metadata systems', attribution: 'Hands-on' },
      { name: 'Channel analytics & performance diagnosis', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'marketing-ecommerce',
    index: '05',
    title: 'Digital Marketing & E-commerce',
    description:
      'Curating affiliate product ecosystems, Pinterest discovery boards, and structured online storefront operations.',
    skills: [
      { name: 'Amazon Associates & affiliate content ops', attribution: 'Hands-on' },
      { name: 'Pinterest visual discovery & pin SEO', attribution: 'Hands-on' },
      { name: 'Product research & listing management', attribution: 'Hands-on' },
      { name: 'Shopify & print-on-demand storefront ops', attribution: 'Learning / Experimental' },
    ],
  },
  {
    id: 'graphic-direction',
    index: '06',
    title: 'Graphic Design & Creative Direction',
    description:
      'Shaping visual hierarchy, thumbnail clarity, pin compositions, and typography across digital formats.',
    skills: [
      { name: 'YouTube thumbnails & social graphics', attribution: 'Hands-on' },
      { name: 'Pinterest creative design & layout systems', attribution: 'Hands-on' },
      { name: 'AI image composition & visual QA', attribution: 'AI-assisted / Directed' },
      { name: 'Brand identity & typography decisions', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'writing-research',
    index: '07',
    title: 'Writing & Research',
    description:
      'Producing structured long-form articles, SEO guides, narrative scripts, and fact-checked briefs.',
    skills: [
      { name: 'Long-form articles & Medium essays', attribution: 'Hands-on' },
      { name: 'SEO writing & blog content architecture', attribution: 'Hands-on' },
      { name: 'Topic research & source verification', attribution: 'Hands-on' },
      { name: 'Video scripts & social copywriting', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'digital-operations',
    index: '08',
    title: 'Digital Operations & Automation',
    description:
      'Designing repeatable production pipelines, documentation, QA checklists, and AI-assisted app prototypes.',
    skills: [
      { name: 'Production pipeline & workflow design', attribution: 'Hands-on' },
      { name: 'Project documentation & QA systems', attribution: 'Hands-on' },
      { name: 'AI-assisted workflow automation', attribution: 'AI-assisted / Directed' },
      { name: 'Vibe-coding project & product direction', attribution: 'Learning / Experimental' },
    ],
  },
];

export const TOOL_ECOSYSTEM: ToolCategory[] = [
  {
    id: 'tools-ai',
    category: 'AI & Creative',
    tools: [
      { name: 'Google Flow', attribution: 'AI-assisted / Directed' },
      { name: 'Nano Banana Pro', attribution: 'AI-assisted / Directed' },
      { name: 'Canva', attribution: 'Hands-on' },
      { name: 'AI Voice & TTS Workflows', attribution: 'AI-assisted / Directed' },
      { name: 'Whisper', attribution: 'AI-assisted / Directed' },
    ],
  },
  {
    id: 'tools-video',
    category: 'Video Production',
    tools: [
      { name: 'Remotion', attribution: 'AI-assisted / Directed' },
      { name: 'FFmpeg', attribution: 'AI-assisted / Directed' },
      { name: 'Python-Assisted Video Workflows', attribution: 'AI-assisted / Directed' },
      { name: 'HTML/JS Canvas Direction', attribution: 'AI-assisted / Directed' },
    ],
  },
  {
    id: 'tools-social',
    category: 'Social & Publishing',
    tools: [
      { name: 'YouTube Studio', attribution: 'Hands-on' },
      { name: 'Instagram & Threads', attribution: 'Hands-on' },
      { name: 'Facebook', attribution: 'Hands-on' },
      { name: 'Pinterest', attribution: 'Hands-on' },
      { name: 'Medium & Blogger', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'tools-ecommerce',
    category: 'E-commerce & Affiliate',
    tools: [
      { name: 'Amazon Associates', attribution: 'Hands-on' },
      { name: 'Shopify', attribution: 'Hands-on' },
      { name: 'Fourthwall', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'tools-writing',
    category: 'Writing & Research',
    tools: [
      { name: 'Google Docs', attribution: 'Hands-on' },
      { name: 'Google Drive', attribution: 'Hands-on' },
      { name: 'SEO & Topic Research Systems', attribution: 'Hands-on' },
    ],
  },
  {
    id: 'tools-dev',
    category: 'AI-Assisted Development',
    tools: [
      { name: 'Google AI Studio', attribution: 'Hands-on' },
      { name: 'AI-Assisted Vibe Coding', attribution: 'Learning / Experimental' },
      { name: 'Automation Editor (Prototype)', attribution: 'Learning / Experimental' },
      { name: 'PakTransfer (Prototype)', attribution: 'Learning / Experimental' },
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceEntry[] = [
  {
    id: 'exp-pov-narrative',
    role: 'YouTube Channel Manager & Creator',
    projectGroup: 'The POV Narrative & Related YouTube Channels',
    engagementType: 'Independent Venture',
    platforms: 'YouTube',
    timeframe: '2025 – 2026',
    status: 'verified',
    responsibilities: [
      'Architected channel strategy around second-person POV storytelling across military hierarchies, intelligence, and investigative narratives.',
      'Directed video packaging, thumbnail composition, SEO metadata, and structured publishing schedules.',
      'Produced 120 published videos totaling 118,142 channel views and ~68K views on the top-performing release.',
    ],
  },
  {
    id: 'exp-farhad-muse',
    role: 'Digital Content Creator & Social Media Operator',
    projectGroup: 'Farhad Muse AI',
    engagementType: 'Independent Venture',
    platforms: 'Instagram · Threads · Facebook',
    timeframe: 'Active',
    status: 'verified',
    responsibilities: [
      'Developed daily content strategy, creative direction, and short-form video concepts focused on AI workflows and freelancing systems.',
      'Executed copywriting, caption frameworks, multi-platform scheduling, and audience engagement management.',
      'Produced and published short-form Reels batches, including 12 recent November releases.',
    ],
  },
  {
    id: 'exp-ai-video',
    role: 'AI Video Producer',
    projectGroup: 'Ford Invests · WhatTheByte · Short-Form Series',
    engagementType: 'Independent Venture',
    platforms: 'YouTube · TikTok · Facebook',
    timeframe: '2025 – 2026',
    status: 'verified',
    responsibilities: [
      'Directed end-to-end short-form explainer and quiz-entertainment video concepts, hook structures, and retention pacing.',
      'Coordinated voice narration, Remotion and FFmpeg motion rendering, sound effects timing, and visual review.',
      'Built repeatable quiz formats (logos, flags, landmarks, US states, rebus puzzles) and personal-finance visualizers.',
    ],
  },
  {
    id: 'exp-affiliate-ops',
    role: 'E-commerce & Affiliate Marketing Operator',
    projectGroup: 'Easy Finds · EleCoStudio · The POV Narrative Shop · What If Money',
    engagementType: 'Independent Venture',
    platforms: 'Shopify · Fourthwall · Pinterest · Amazon Associates · Blog',
    timeframe: 'Active',
    status: 'verified',
    responsibilities: [
      'Operated EleCoStudio (Shopify) and The POV Narrative merch storefront (Fourthwall), overseeing product presentation and storefront readiness.',
      'Managed product curation, Pinterest SEO pin design, and Amazon Associates integration for Easy Finds (266 live pins) and Benable.',
      'Researched and authored comparison guides and personal-finance articles for What If Money.',
    ],
  },
  {
    id: 'exp-medium-writer',
    role: 'Digital Writer & Content Researcher',
    projectGroup: 'Medium — Farhad Ali',
    engagementType: 'Independent Venture',
    platforms: 'Medium',
    timeframe: '2026',
    status: 'verified',
    responsibilities: [
      'Researched, drafted, edited, and published 80 long-form stories covering freelancing systems, digital workflows, and online business.',
      'Structured articles for reader scannability, search intent, and factual clarity.',
    ],
  },
  {
    id: 'exp-ai-projects',
    role: 'Product Concept & Creative Director',
    projectGroup: 'Automation Editor · PakTransfer · What If Animation Studio',
    engagementType: 'Experimental Initiative',
    platforms: 'Web · Video Prototypes',
    timeframe: 'In Development',
    status: 'in_progress',
    responsibilities: [
      'Defined product concepts, feature scopes, and UX feedback for web utilities built through generative workflows.',
      'Directed storyboarding, character consistency, and timed narration prototypes for upcoming animation concepts.',
      'Conducted iterative testing, edge-case review, and interface refinement.',
    ],
  },
];

export const CURATED_PROJECT_TABS: CuratedProjectTab[] = [
  'All Work',
  'YouTube & Video',
  'Social & Content',
  'E-Commerce & Affiliate',
  'AI & Web Prototypes',
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All Projects',
  'Video Production',
  'Social Media',
  'YouTube',
  'E-commerce',
  'Affiliate Marketing',
  'Writing & Research',
  'AI & Digital Projects',
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'the-pov-narrative',
    title: 'The POV Narrative',
    primaryCategory: 'YouTube',
    categories: ['YouTube', 'Video Production', 'Writing & Research', 'E-commerce'],
    curatedTabs: ['YouTube & Video', 'E-Commerce & Affiliate'],
    categoryEyebrow: 'YOUTUBE & STORYTELLING',
    cardSummary:
      'Second-person investigative storytelling channel & Fourthwall merch store — 120 videos • 118K+ views.',
    role: 'Channel Creator & Manager',
    status: 'verified',
    statusLabel: 'YouTube & Merch',
    timeframe: '2025 – 2026',
    summary:
      'Second-person POV storytelling channel and companion Fourthwall merch storefront exploring military hierarchies and investigative narratives.',
    overview:
      'The POV Narrative is an independently operated YouTube channel built around immersive second-person ("You are...") narrative scripts examining historical operations, institutional hierarchies, and investigative case breakdowns, paired with an official Fourthwall merchandise store.',
    challenge:
      'Standing out in a competitive faceless documentary niche requires immediate 3-second hook clarity, tight narrative tension, and packaging that earns clicks without misleading viewers.',
    objective:
      'Establish a scalable storytelling format, publishing cadence, and branded merchandise extension on Fourthwall.',
    contribution:
      'Owned channel positioning, topic selection, second-person script architecture, thumbnail creative direction, metadata optimization, Fourthwall storefront setup, and analytics diagnostics.',
    workflow: [
      'Topic research & narrative angle selection',
      'Second-person hook and pacing script',
      'Directed voiceover & atmospheric visual assembly',
      'Thumbnail concepting & title framing',
      'Scheduled upload, Fourthwall merch integration & retention review',
    ],
    workPerformed: [
      'Channel branding and narrative format architecture',
      'Thumbnail direction and high-contrast title packaging',
      'YouTube SEO metadata and publishing schedule management',
      'Fourthwall merch storefront setup and brand alignment',
      'Retention diagnostics across 120 uploaded videos',
    ],
    tools: ['YouTube Studio', 'Fourthwall', 'Google Docs', 'AI Voice Workflows', 'Canva', 'FFmpeg'],
    deliverables: ['120 published videos', 'Thumbnail & title packaging system', 'Fourthwall merch store'],
    results: [
      { metric: '120 Videos', context: 'Published across the channel catalog' },
      { metric: '118,142 Views', context: 'Cumulative channel viewership' },
      { metric: '~68K Views', context: 'Peak single-video performance' },
      { metric: '596 Subscribers', context: 'Organic subscriber base' },
    ],
    image: povNarrativeImg,
    imageAlt: 'Editorial storyboarding desk and audio timeline monitor representing The POV Narrative production workflow',
    visualCode: '',
    externalLinks: [
      {
        label: 'YouTube — @ThePOVNarrative',
        url: 'https://www.youtube.com/@ThePOVNarrative',
        isPending: false,
      },
      {
        label: 'Fourthwall Store — The POV Narrative Shop',
        url: 'https://thepovnarrative-shop.fourthwall.com/',
        isPending: false,
      },
    ],
  },
  {
    id: 'ford-invests',
    title: 'Ford Invests',
    primaryCategory: 'Video Production',
    categories: ['Video Production', 'YouTube', 'Writing & Research'],
    curatedTabs: ['YouTube & Video'],
    categoryEyebrow: 'FINANCE VIDEO SERIES',
    cardSummary:
      'Short-form personal finance explainers pairing structured scripts, motion charts, and clear pacing.',
    role: 'AI Video Producer & Script Director',
    status: 'verified',
    statusLabel: 'Finance Series',
    timeframe: '2025 – 2026',
    summary:
      'Personal finance and investing explainer video series combining structured scripts, clean motion graphics, and sound design.',
    overview:
      'Ford Invests translates personal finance concepts, compounding principles, and market frameworks into crisp, accessible short-form explainer videos built for high viewer comprehension.',
    challenge:
      'Financial topics often lose mobile viewers within seconds if presented as dry lectures or cluttered spreadsheets.',
    objective:
      'Deliver visually disciplined financial explainers where motion charts, voice pacing, and sound cues clarify complex ideas in under 60 seconds.',
    contribution:
      'Directed video concepts, script structuring, data visualization framing, AI voiceover pacing, sound design cues, and final review.',
    workflow: [
      'Concept & financial takeaway distilling',
      'Structured hook-to-payoff scriptwriting',
      'Voiceover timing & subtitle sync',
      'Motion chart direction & sound-effect layering',
      'Final visual clarity & factual check',
    ],
    workPerformed: [
      'Structured financial explainer scripting',
      'Directed motion graphics and data visualization frames',
      'Voiceover pacing and sound-design review',
    ],
    tools: ['Remotion', 'FFmpeg', 'AI Voice Workflows', 'Google Docs', 'Whisper'],
    deliverables: ['Short-form financial explainer videos', 'Reusable motion chart templates'],
    results: [{ metric: 'Production System', context: 'Repeatable finance explainer pipeline' }],
    image: fordInvestsImg,
    imageAlt: 'Minimalist geometric chart blocks and index cards representing Ford Invests financial visualizers',
    visualCode: '',
    externalLinks: [
      {
        label: 'YouTube — @fordinvestsUS',
        url: 'https://www.youtube.com/@fordinvestsUS',
        isPending: false,
      },
    ],
  },
  {
    id: 'whatthebyte',
    title: 'WhatTheByte',
    primaryCategory: 'Video Production',
    categories: ['Video Production', 'Social Media', 'YouTube'],
    curatedTabs: ['YouTube & Video', 'Social & Content'],
    categoryEyebrow: 'SHORT-FORM EDUTAINMENT',
    cardSummary:
      'Cross-platform quiz series spanning logos, flags, landmarks, and puzzles across 5+ repeatable formats.',
    role: 'Creator & Short-Form Systems Producer',
    status: 'verified',
    statusLabel: 'Short-Form Quiz',
    timeframe: '2025 – 2026',
    summary:
      'Cross-platform quiz and edutainment format spanning logos, flags, landmarks, US states, and rebus visual puzzles.',
    overview:
      'WhatTheByte is an interactive visual quiz brand designed for rapid engagement across YouTube Shorts, TikTok, and Facebook Reels through timed countdown challenges.',
    challenge:
      'Quiz videos require pinpoint timing between visual clues, countdown audio ticks, and answer reveals to sustain completion rates.',
    objective:
      'Build a modular short-form quiz engine capable of producing consistent batches across geography, branding, and wordplay formats.',
    contribution:
      'Designed quiz categories, pacing timers, visual card layouts, cross-platform formatting, and multi-channel publishing workflows.',
    workflow: [
      'Quiz category curation & difficulty tiering',
      'Modular visual asset & flag/logo preparation',
      'Timed countdown & sound-cue synchronization',
      'Multi-platform aspect ratio & caption formatting',
    ],
    workPerformed: [
      'Logo, flag, landmark, US state, and rebus quiz formats',
      'Short-form batch production & publishing workflows',
      'Cross-platform distribution across YouTube, TikTok, and Facebook',
    ],
    tools: ['Python-Assisted Workflows', 'FFmpeg', 'Canva', 'YouTube Studio'],
    deliverables: ['Multi-format quiz video series', 'Cross-platform publishing templates'],
    results: [{ metric: '5+ Quiz Formats', context: 'Logos, flags, landmarks, US states, and rebus puzzles' }],
    image: whatTheByteImg,
    imageAlt: 'Clean flat-lay of geometric puzzle tiles and cartographic compass representing WhatTheByte quiz formats',
    visualCode: '',
    externalLinks: [
      {
        label: 'TikTok — @whatthebyte',
        url: 'https://www.tiktok.com/@whatthebyte',
        isPending: false,
      },
    ],
  },
  {
    id: 'farhad-muse-ai',
    title: 'Farhad Muse AI',
    primaryCategory: 'Social Media',
    categories: ['Social Media', 'Video Production', 'AI & Digital Projects'],
    curatedTabs: ['Social & Content', 'AI & Web Prototypes'],
    categoryEyebrow: 'SOCIAL & AI WORKFLOWS',
    cardSummary:
      'Multi-platform creator brand sharing AI workflows & freelancing systems — 12 short-form Reels shipped.',
    role: 'Founder, Creative Director & Social Operator',
    status: 'verified',
    statusLabel: 'Social Brand',
    timeframe: 'Active',
    summary:
      'Personal social media brand sharing practical AI workflows, freelancing systems, and digital productivity insights.',
    overview:
      'Farhad Muse AI serves as an active testing ground and public distribution brand for creative production workflows, short-form Reels, and actionable freelancing guidance across Instagram, Threads, and Facebook.',
    challenge:
      'Maintaining a cohesive visual identity and daily publishing rhythm across three distinct social feeds without sacrificing substance.',
    objective:
      'Demonstrate practical creative workflows publicly while building structured multi-platform content operations.',
    contribution:
      'Managed content calendar strategy, visual identity direction, daily Reels and graphic production, copywriting, publishing, and engagement review.',
    workflow: [
      'Weekly AI & freelancing topic ideation',
      'Carousel graphic & short-form Reel scripting',
      'Generative asset direction & editorial layout',
      'Cross-posting across Instagram, Threads, and Facebook',
    ],
    workPerformed: [
      'Multi-platform social media management & daily publishing',
      'Short-form Reels direction and editorial carousel design',
      'Audience engagement and performance tracking',
    ],
    tools: ['Instagram', 'Threads', 'Facebook', 'Canva', 'Google Flow', 'Nano Banana Pro'],
    deliverables: ['12 published Reels', 'Editorial social graphics & Threads copy'],
    results: [{ metric: '12 Reels', context: 'Short-form Reels batch published across feeds' }],
    image: aiWorkflowImg,
    imageAlt: 'Modern creative studio workstation displaying video timelines representing Farhad Muse AI operations',
    visualCode: '',
    externalLinks: [
      {
        label: 'Instagram — @farhad.muse.ai',
        url: 'https://www.instagram.com/farhad.muse.ai/',
        isPending: false,
      },
      {
        label: 'Threads — @farhad.muse.ai',
        url: 'https://www.threads.com/@farhad.muse.ai',
        isPending: false,
      },
      {
        label: 'Facebook — Farhad Ali',
        url: 'https://www.facebook.com/people/Farhad-Ali/61596174413291/',
        isPending: false,
      },
    ],
  },
  {
    id: 'easy-finds',
    title: 'Easy Finds',
    primaryCategory: 'Affiliate Marketing',
    categories: ['Affiliate Marketing', 'E-commerce'],
    curatedTabs: ['E-Commerce & Affiliate'],
    categoryEyebrow: 'PINTEREST & AFFILIATE',
    cardSummary:
      'Evergreen Pinterest visual discovery and Amazon Associates curation engine — 266 live pins published.',
    role: 'Affiliate Publisher & Pinterest Strategist',
    status: 'verified',
    statusLabel: 'Pinterest Curation',
    timeframe: 'Active',
    summary:
      'Pinterest-driven product discovery and Amazon Associates affiliate curation project focused on clean visual SEO.',
    overview:
      'Easy Finds connects high-intent Pinterest searchers with vetted everyday products through structured pin design, keyword-aligned descriptions, and Amazon Associates affiliate links.',
    challenge:
      'Converting visual discovery browsing into qualified product clicks requires consistent pin typography, clear product framing, and accurate search tagging.',
    objective:
      'Build a durable library of SEO-structured Pinterest boards and pins aligned with evergreen consumer categories.',
    contribution:
      'Executed product research, Amazon Associates link integration, Pinterest pin creative direction, board taxonomy, and publishing cadence.',
    workflow: [
      'Evergreen product & category research',
      'Pinterest keyword & board structure mapping',
      'Pin visual composition & legible product callouts',
      'Consistent publishing & link checks',
    ],
    workPerformed: [
      'Product research and Amazon Associates integration',
      'Pinterest pin creative design and SEO descriptions',
      'Structured board curation and publishing workflow',
    ],
    tools: ['Pinterest', 'Amazon Associates', 'Canva', 'Google Docs'],
    deliverables: ['266 live Pinterest pins', 'Keyword-mapped product boards'],
    results: [{ metric: '266 Live Pins', context: 'Published across evergreen discovery boards' }],
    image: easyFindsImg,
    imageAlt: 'Curated minimalist desk accessories on travertine surface representing Easy Finds product curation',
    visualCode: '',
    externalLinks: [
      {
        label: 'Pinterest — @easyfinds_us',
        url: 'https://www.pinterest.com/easyfinds_us/',
        isPending: false,
      },
    ],
  },
  {
    id: 'benable-curated-lists',
    title: 'Benable — Curated Lists',
    primaryCategory: 'Affiliate Marketing',
    categories: ['Affiliate Marketing', 'E-commerce'],
    curatedTabs: ['E-Commerce & Affiliate'],
    categoryEyebrow: 'PRODUCT CURATION',
    cardSummary:
      'Structured affiliate recommendation hub organizing curated everyday products into browsable buyer lists.',
    role: 'Affiliate Curator & Recommender',
    status: 'verified',
    statusLabel: 'Product Curation',
    timeframe: 'Active',
    summary:
      'Curated product recommendation lists on Benable extending affiliate product discovery alongside Pinterest.',
    overview:
      'Benable serves as a structured recommendation hub where curated product selections are organized into browsable lists with concise editorial context.',
    challenge:
      'Selecting practical, well-reviewed products and presenting clear list summaries without clutter.',
    objective:
      'Maintain a clean public product curation storefront complementary to Easy Finds on Pinterest.',
    contribution:
      'Handled product research, list organization, recommendation copy, and profile maintenance.',
    workflow: [
      'Product research & category selection',
      'List structuring & concise buyer notes',
      'Publishing & ongoing link upkeep',
    ],
    workPerformed: [
      'Affiliate product curation and list taxonomy',
      'Concise product recommendation copywriting',
    ],
    tools: ['Benable', 'Google Docs', 'Product Research Workflows'],
    deliverables: ['Benable curation hub', 'Structured recommendation lists'],
    results: [{ metric: 'Curated Lists', context: 'Public Benable recommendation catalog' }],
    image: null,
    imageAlt: 'Benable curated product recommendation lists plate',
    visualCode: '',
    externalLinks: [
      {
        label: 'Benable — benable.com/farhad',
        url: 'https://benable.com/farhad',
        isPending: false,
      },
    ],
  },
  {
    id: 'tiktok-short-form-channels',
    title: 'TikTok Short-Form Network',
    primaryCategory: 'Video Production',
    categories: ['Video Production', 'Social Media'],
    curatedTabs: ['YouTube & Video', 'Social & Content'],
    categoryEyebrow: 'SHORT-FORM VIDEO NETWORK',
    cardSummary:
      'Vertical storytelling and entertainment channels operated across 3 active TikTok accounts.',
    role: 'Creator & Short-Form Channel Operator',
    status: 'verified',
    statusLabel: 'TikTok Network',
    timeframe: 'Active',
    summary:
      'Dedicated short-form TikTok video channels including @pov.life.ouline and @theoshow22 alongside @whatthebyte.',
    overview:
      'Multi-channel short-form video operations testing distinct narrative, outline, and entertainment hooks across dedicated TikTok accounts.',
    challenge:
      'Tailoring pacing, opening hooks, and publishing consistency across separate niche channel identities.',
    objective:
      'Operate focused vertical video channels with clear format positioning per account.',
    contribution:
      'Managed channel positioning, short-form video scripting, visual direction, and publishing workflows.',
    workflow: [
      'Niche angle definition per account',
      'Short-form scripting & hook framing',
      'Short-form video assembly & audio sync',
      'TikTok vertical publishing',
    ],
    workPerformed: [
      'Channel concepting and format testing',
      'Short-form vertical production and scheduling',
    ],
    tools: ['TikTok', 'FFmpeg', 'AI Voice Workflows', 'Canva'],
    deliverables: ['Active TikTok channels (@pov.life.ouline, @theoshow22)'],
    results: [{ metric: '3 Active Channels', context: '@whatthebyte, @pov.life.ouline, @theoshow22' }],
    image: null,
    imageAlt: 'Short-Form Video Channels TikTok production plate',
    visualCode: '',
    externalLinks: [
      {
        label: 'TikTok — @pov.life.ouline',
        url: 'https://www.tiktok.com/@pov.life.ouline',
        isPending: false,
      },
      {
        label: 'TikTok — @theoshow22',
        url: 'https://www.tiktok.com/@theoshow22',
        isPending: false,
      },
    ],
  },
  {
    id: 'what-if-money',
    title: 'What If Money',
    primaryCategory: 'Affiliate Marketing',
    categories: ['Affiliate Marketing', 'Writing & Research'],
    curatedTabs: ['E-Commerce & Affiliate', 'Social & Content'],
    categoryEyebrow: 'EDITORIAL & AFFILIATE',
    cardSummary:
      'Personal finance and online business blog pairing research-backed guides with structured comparisons.',
    role: 'Content Operator & SEO Writer',
    status: 'verified',
    statusLabel: 'Editorial Blog',
    timeframe: '2025 – 2026',
    summary:
      'Personal finance and online business blog pairing research-backed guides with structured affiliate comparisons.',
    overview:
      'What If Money publishes practical personal finance explainers, tool comparisons, and online business guides structured around search intent and transparent product evaluations.',
    challenge:
      'Finance and comparison blogs require clear structure, verifiable claims, and helpful breakdowns that avoid generic fluff.',
    objective:
      'Operate a clean editorial publishing workflow balancing educational utility with ethical affiliate integration.',
    contribution:
      'Conducted topic research, SEO outlining, long-form article drafting, comparison formatting, and blog publishing operations.',
    workflow: [
      'Search-intent topic & keyword research',
      'Fact-checked outlining and comparison criteria',
      'Long-form editorial drafting & formatting',
      'Blog CMS publishing & internal linking',
    ],
    workPerformed: [
      'Article research and SEO content drafting',
      'Product and service comparison breakdowns',
      'Blog publishing operations and formatting',
    ],
    tools: ['Blogger', 'Google Docs', 'SEO Research Workflows'],
    deliverables: ['Long-form finance & business articles', 'Comparison guides'],
    results: [{ metric: 'Editorial Blog', context: 'Structured SEO & comparison publishing' }],
    image: null,
    imageAlt: 'What If Money editorial research and affiliate publishing plate',
    visualCode: '',
    externalLinks: [],
  },
  {
    id: 'medium-farhad-ali',
    title: 'Medium Publication',
    primaryCategory: 'Writing & Research',
    categories: ['Writing & Research'],
    curatedTabs: ['Social & Content'],
    categoryEyebrow: 'LONG-FORM PUBLICATION',
    cardSummary:
      'Long-form editorial publication covering freelancing systems and digital workflows — 80+ published articles.',
    role: 'Digital Writer & Researcher',
    status: 'verified',
    statusLabel: 'Editorial Essays',
    timeframe: 'Sep – Oct 2026',
    summary:
      'Long-form Medium publication covering freelancing systems, digital operations, and practical creator workflows.',
    overview:
      'Published an intensive series of structured long-form articles on Medium examining freelancing systems, productivity frameworks, and modern content workflows.',
    challenge:
      'Sustaining high editorial clarity and research depth across dozens of long-form articles within a compressed publishing window.',
    objective:
      'Develop a disciplined writing and editing habit while building a searchable body of practical essays.',
    contribution:
      'Researched topics, structured outlines, wrote and edited long-form articles, and formatted headlines and metadata for Medium discovery.',
    workflow: [
      'Topic ideation & reader problem framing',
      'Structured outline & source checks',
      'Long-form drafting & clarity editing',
      'Headline optimization & Medium publishing',
    ],
    workPerformed: [
      'Long-form article writing and structural editing',
      'Freelancing systems research and synthesis',
      'Headline and SEO-friendly formatting',
    ],
    tools: ['Medium', 'Google Docs', 'Research Workflows'],
    deliverables: ['80 published Medium stories'],
    results: [{ metric: '80 Stories', context: 'Long-form essays published on Medium' }],
    image: null,
    imageAlt: 'Medium — Farhad Ali editorial writing showcase plate',
    visualCode: '',
    externalLinks: [],
  },
  {
    id: 'short-form-creative-batches',
    title: 'Motion & Educational Reels',
    primaryCategory: 'Video Production',
    categories: ['Video Production', 'AI & Digital Projects'],
    curatedTabs: ['YouTube & Video'],
    categoryEyebrow: 'EDUCATIONAL MOTION',
    cardSummary:
      'Technical and educational motion studies spanning engineering explainers and beat-sync video — 5+ series shipped.',
    role: 'Creative Director & Video Producer',
    status: 'verified',
    statusLabel: 'Educational Reels',
    timeframe: '2025 – 2026',
    summary:
      'Focused short-form technical and educational video studies including Python vs JavaScript, AirLLM, Manhole-Cover engineering, and beat-sync batches.',
    overview:
      'A curated collection of standalone educational Reels and motion experiments testing visual pacing, audio beat synchronization, and complex technical simplification.',
    challenge:
      'Translating abstract engineering or technical subjects (such as AirLLM memory efficiency or circular manhole geometry) into engaging 30–45 second visual stories.',
    objective:
      'Refine pacing, motion direction, and audio synchronization techniques across varied subject matter.',
    contribution:
      'Directed visual concepts, script hooks, animation sequencing prompts, beat-sync timing checks, and final cut quality assurance.',
    workflow: [
      'Visual hook & curiosity-gap scripting',
      'Canvas, Remotion, and Python motion sequencing',
      'Beat-sync audio alignment & SFX layering',
      'Frame-by-frame readability checks',
    ],
    workPerformed: [
      'Python vs JavaScript comparison video',
      'AirLLM technical explainer reel',
      'Manhole-cover geometry & Flamingo educational animations',
      'Beat-sync short-form video batches',
    ],
    tools: ['Remotion', 'FFmpeg', 'HTML/JS Canvas Direction', 'Python-Assisted Workflows'],
    deliverables: ['Educational & beat-sync Reels', 'Motion pacing templates'],
    results: [{ metric: '5+ Verified Series', context: 'Completed short-form technical & animation studies' }],
    image: null,
    imageAlt: 'Short-Form Motion and Educational Reels visual study plate',
    visualCode: '',
    externalLinks: [],
  },
  {
    id: 'automation-editor',
    title: 'Automation Editor',
    primaryCategory: 'AI & Digital Projects',
    categories: ['AI & Digital Projects', 'Video Production'],
    curatedTabs: ['AI & Web Prototypes'],
    categoryEyebrow: 'WEB WORKFLOW PROTOTYPE',
    cardSummary:
      'Browser-based creative workflow utility prototype directed from product scoping through iterative UI design.',
    role: 'Product Concept & Creative Director',
    status: 'in_progress',
    statusLabel: 'Concept Prototype',
    timeframe: 'In Development',
    summary:
      'Workflow utility prototype directed through iterative feature planning, UI critique, and browser-based automation.',
    overview:
      'Automation Editor is a browser-based utility built to streamline repetitive content editing and workflow assembly steps through a structured interface.',
    challenge:
      'Bridging creative production needs with a usable interface requires translating producer pain points into clear functional specifications and iterative UI feedback.',
    objective:
      'Direct practical workflow utilities through focused feature scoping, usability testing, and rapid prototyping.',
    contribution:
      'Defined product concept, prioritized feature scope, provided UI/UX feedback, directed implementation iterations, and conducted functional testing.',
    workflow: [
      'Workflow bottleneck identification',
      'Feature specification & UI layout direction',
      'Iterative implementation & prompt refinement',
      'Manual testing & UX polish',
    ],
    workPerformed: [
      'Product concept and workflow architecture',
      'Feature planning and interface critique',
      'Iterative prototyping in Google AI Studio',
    ],
    tools: ['Google AI Studio', 'Project Documentation'],
    deliverables: ['Working browser prototype'],
    results: [{ metric: 'Prototype', context: 'Browser workflow utility in active development' }],
    image: null,
    imageAlt: 'Automation Editor interface blueprint',
    visualCode: '',
    externalLinks: [],
  },
  {
    id: 'paktransfer',
    title: 'PakTransfer',
    primaryCategory: 'AI & Digital Projects',
    categories: ['AI & Digital Projects'],
    curatedTabs: ['AI & Web Prototypes'],
    categoryEyebrow: 'DIGITAL UTILITY CONCEPT',
    cardSummary:
      'Streamlined regional digital transfer utility concept mapping clean user journeys and interface clarity.',
    role: 'Product Concept & UX Direction',
    status: 'in_progress',
    statusLabel: 'Regional Utility',
    timeframe: 'In Development',
    summary:
      'Digital transfer product concept exploring streamlined regional utility workflows and interface clarity.',
    overview:
      'PakTransfer is an early-stage digital utility focused on testing straightforward transfer flows and intuitive user steps.',
    challenge:
      'Designing clear, reliable task flows for everyday digital utilities with minimal friction.',
    objective:
      'Validate core user journey concepts before committing to full production infrastructure.',
    contribution:
      'Conceptualized product scope, mapped user steps, directed interface iterations, and reviewed usability.',
    workflow: [
      'Problem framing & regional user-flow mapping',
      'Interface direction & prototype iteration',
      'Feature scope validation',
    ],
    workPerformed: [
      'Product concept & user journey mapping',
      'Prototype direction & UI feedback',
    ],
    tools: ['Google AI Studio', 'UX Flow Mapping'],
    deliverables: ['Concept prototype'],
    results: [{ metric: 'Concept UX', context: 'Validated core regional utility flows' }],
    image: null,
    imageAlt: 'PakTransfer platform concept plate',
    visualCode: '',
    externalLinks: [],
  },
  {
    id: 'what-if-animation-studio',
    title: 'What If Animation Studio',
    primaryCategory: 'Video Production',
    categories: ['Video Production', 'AI & Digital Projects'],
    curatedTabs: ['YouTube & Video', 'AI & Web Prototypes'],
    categoryEyebrow: 'ANIMATION R&D',
    cardSummary:
      'Pre-production animation R&D pipeline testing character consistency, storyboards, and timed narration.',
    role: 'Storyboarding & Creative Director',
    status: 'in_progress',
    statusLabel: 'Animation R&D',
    timeframe: 'In Development',
    summary:
      'Animation R&D initiative exploring character consistency, storyboarding, and timed voice narration.',
    overview:
      'What If Animation Studio is an ongoing R&D pipeline testing how storyboard frames, consistent character direction, and timed voice narration combine into cohesive animated explainers.',
    challenge:
      'Maintaining visual character continuity across scenes when working with generative media pipelines.',
    objective:
      'Develop a reliable pre-production storyboarding and audio-timing blueprint prior to channel launch.',
    contribution:
      'Directed storyboards, character visual rules, scene prompts, and narration timing tests.',
    workflow: [
      'Narrative concept & scene breakdown',
      'Character consistency testing',
      'Timed narration alignment & pacing review',
    ],
    workPerformed: [
      'Storyboarding and visual character direction',
      'Timed narration studies',
      'Animation workflow prototyping',
    ],
    tools: ['Google Flow', 'Nano Banana Pro', 'AI Voice Workflows'],
    deliverables: ['Internal storyboards & animation studies'],
    results: [{ metric: 'R&D Pipeline', context: 'Pre-production storyboarding blueprint' }],
    image: null,
    imageAlt: 'What If Animation Studio storyboarding and character direction plate',
    visualCode: '',
    externalLinks: [],
  },
  {
    id: 'elecostudio-commerce',
    title: 'EleCoStudio',
    primaryCategory: 'E-commerce',
    categories: ['E-commerce'],
    curatedTabs: ['E-Commerce & Affiliate'],
    categoryEyebrow: 'SHOPIFY STOREFRONT',
    cardSummary:
      'Active Shopify e-commerce storefront (elecostudio.shop) built for clean product merchandising and COD readiness.',
    role: 'Shopify Store Operator',
    status: 'verified',
    statusLabel: 'Shopify Storefront',
    timeframe: 'Active Store',
    summary:
      'Shopify e-commerce storefront (elecostudio.shop) focused on structured product presentation, bilingual positioning, and cash-on-delivery readiness.',
    overview:
      'EleCoStudio is an active Shopify e-commerce storefront featuring curated product presentation, clear product descriptions, and market-adapted merchandising.',
    challenge: 'Presenting products cleanly with trust-building storefront structure and clear buyer messaging.',
    objective: 'Operate a cohesive Shopify storefront with organized product pages and visual consistency.',
    contribution: 'Managed Shopify store setup, product research, product presentation, and storefront QA.',
    workflow: ['Product research', 'Storefront layout & listing setup', 'Visual & copy QA'],
    workPerformed: [
      'Shopify storefront management',
      'Product presentation and listing content',
      'Bilingual English/Arabic & cash-on-delivery commerce positioning',
    ],
    tools: ['Shopify', 'Canva', 'Google Docs'],
    deliverables: ['Live Shopify storefront (elecostudio.shop)', 'Structured product listings'],
    results: [{ metric: 'Live Storefront', context: 'Active Shopify store at elecostudio.shop' }],
    image: null,
    imageAlt: 'EleCoStudio Shopify storefront showcase plate',
    visualCode: '',
    externalLinks: [
      {
        label: 'Shopify Store — elecostudio.shop',
        url: 'http://elecostudio.shop/',
        isPending: false,
      },
    ],
  },
];

// ============================================================================
// PENDING OLD CV RECORDS (OMITTED PUBLICLY PER CONTENT INTEGRITY RULES)
// Preserved here in editable structured form until verified by the user.
// ============================================================================

export const PENDING_OLD_CV_RECORDS: PendingCvRecord = {
  educationClaims: [
    {
      credential: 'Intermediate (I.Com)',
      institution: 'Superior Group of College, Rawalpindi',
      year: '2022',
      status: 'pending_confirmation',
    },
    {
      credential: 'Matriculation (Science)',
      institution: 'Civil College of Commerce & Sciences, Rawalpindi',
      year: '2019',
      status: 'pending_confirmation',
    },
    {
      credential: 'Three-month Digital Marketing Course',
      institution: 'Saga Institute of Technical Education, Rawalpindi',
      year: 'Unconfirmed year',
      status: 'pending_confirmation',
    },
  ],
  freelanceClaims: [
    {
      role: 'E-commerce and Tech Automation',
      timeframe: '2024 – present',
      notes: 'Supplied in older CV; pending confirmation.',
      status: 'pending_confirmation',
    },
    {
      role: 'Social Media Marketing and YouTube Automation',
      timeframe: '2022 – 2024',
      notes: 'Supplied in older CV; pending confirmation.',
      status: 'pending_confirmation',
    },
    {
      role: 'Graphic Design',
      timeframe: '2021 – 2023',
      notes: 'Supplied in older CV; pending confirmation.',
      status: 'pending_confirmation',
    },
    {
      role: 'Remotask Data Specialist',
      timeframe: '2019 – 2022',
      notes: 'Supplied in older CV; pending confirmation.',
      status: 'pending_confirmation',
    },
  ],
  referencedItems: [
    { name: 'eBay dropshipping', note: 'Old CV reference pending confirmation', status: 'pending_confirmation' },
    {
      name: 'Gumroad digital product "Uncomfortable Truths"',
      note: 'Old CV reference pending confirmation',
      status: 'pending_confirmation',
    },
    {
      name: 'Adobe Photoshop & Illustrator',
      note: 'Old CV tool claim pending confirmation',
      status: 'pending_confirmation',
    },
    {
      name: 'elecostudio.shop & Ballwool (32 listings)',
      note: 'Ownership relationship pending confirmation',
      status: 'pending_confirmation',
    },
  ],
};

// ============================================================================
// PUBLIC SELECTORS — Enforce strict omission of pending_confirmation records
// ============================================================================

export const getPublicMetrics = (): AuditMetric[] =>
  AUDIT_STATISTICS.filter((item) => item.status !== 'pending_confirmation');

export const getPublicExperience = (): ExperienceEntry[] =>
  EXPERIENCE_TIMELINE.filter((item) => item.status !== 'pending_confirmation');

export const getPublicProjects = (): ProjectCaseStudy[] =>
  PROJECTS.filter((item) => item.status !== 'pending_confirmation');

export const getPublicEducation = () =>
  PENDING_OLD_CV_RECORDS.educationClaims.filter((item) => item.status === 'verified');
