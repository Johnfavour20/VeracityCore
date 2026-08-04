import { HeuristicRule } from '../types';

export const INITIAL_HEURISTIC_RULES: HeuristicRule[] = [
  {
    id: 'rule-01',
    name: 'Excessive Capitalization',
    category: 'Headline Analysis',
    defaultWeight: 'Low',
    basePoints: 10,
    description: 'Flags headlines using all-caps phrases intended to provoke artificial urgency or panic.',
    enabled: true,
    lastUpdated: '2026-08-01'
  },
  {
    id: 'rule-02',
    name: 'Clickbait Language',
    category: 'Headline Analysis',
    defaultWeight: 'Medium',
    basePoints: 45,
    description: 'Detects exaggerated framing, secret-revealing hooks ("You won\'t believe what happened"), and sensational curiosity gaps.',
    enabled: true,
    lastUpdated: '2026-08-02'
  },
  {
    id: 'rule-03',
    name: 'Sensational Punctuation',
    category: 'Headline Analysis',
    defaultWeight: 'Low',
    basePoints: 15,
    description: 'Identifies excessive exclamation marks (!!!) or multiple question marks (???) in headlines.',
    enabled: true,
    lastUpdated: '2026-07-28'
  },
  {
    id: 'rule-04',
    name: 'Unknown Publisher',
    category: 'Source Credibility',
    defaultWeight: 'High',
    basePoints: 75,
    description: 'Flags domains lacking WHOIS transparency, missing editorial mastheads, or registered within the past 30 days.',
    enabled: true,
    lastUpdated: '2026-07-30'
  },
  {
    id: 'rule-05',
    name: 'Suspicious Domain Impersonation',
    category: 'Source Credibility',
    defaultWeight: 'Critical',
    basePoints: 95,
    description: 'Flags URLs that closely mimic legitimate news organizations (e.g. cnn-news.co, reuters-update.com) or host spoofed logos.',
    enabled: true,
    lastUpdated: '2026-08-03'
  },
  {
    id: 'rule-06',
    name: 'Missing Editorial Disclosure',
    category: 'Source Credibility',
    defaultWeight: 'Medium',
    basePoints: 40,
    description: 'Identifies articles with no clear author attribution, corrections policy, or publisher contact details.',
    enabled: true,
    lastUpdated: '2026-07-25'
  },
  {
    id: 'rule-07',
    name: 'Logical Inconsistencies',
    category: 'Content Analysis',
    defaultWeight: 'Medium',
    basePoints: 50,
    description: 'Detects internal contradictions between body paragraphs, timeline mismatches, or false causality claims.',
    enabled: false,
    lastUpdated: '2026-07-20'
  },
  {
    id: 'rule-08',
    name: 'Unsubstantiated Claims',
    category: 'Content Analysis',
    defaultWeight: 'High',
    basePoints: 70,
    description: 'Highlights sweeping statistical assertions, miracle medical claims, or unverified conspiracy narratives.',
    enabled: true,
    lastUpdated: '2026-08-02'
  },
  {
    id: 'rule-09',
    name: 'Missing Citations & References',
    category: 'Evidence & Citation Analysis',
    defaultWeight: 'High',
    basePoints: 65,
    description: 'Flags content referencing "experts say" or "studies prove" without linking to peer-reviewed data or primary documentation.',
    enabled: true,
    lastUpdated: '2026-07-31'
  },
  {
    id: 'rule-10',
    name: 'Out-of-Context Quotes',
    category: 'Evidence & Citation Analysis',
    defaultWeight: 'Medium',
    basePoints: 50,
    description: 'Detects truncated statements or repurposed historical quotes used out of original temporal context.',
    enabled: true,
    lastUpdated: '2026-07-22'
  },
  {
    id: 'rule-11',
    name: 'Emotional & Inflammatory Language',
    category: 'Writing Style Analysis',
    defaultWeight: 'Medium',
    basePoints: 40,
    description: 'Identifies high-density affective vocabulary designed to induce anger, fear, or moral outrage.',
    enabled: true,
    lastUpdated: '2026-08-01'
  },
  {
    id: 'rule-12',
    name: 'Partisan Bias & Loaded Terms',
    category: 'Writing Style Analysis',
    defaultWeight: 'Low',
    basePoints: 25,
    description: 'Flags heavy reliance on loaded political buzzwords and non-neutral characterizations in objective reporting contexts.',
    enabled: true,
    lastUpdated: '2026-07-19'
  }
];
