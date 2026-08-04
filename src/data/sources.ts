import { CredibilitySource } from '../types';

export const INITIAL_CREDIBILITY_SOURCES: CredibilitySource[] = [
  {
    id: 'src-01',
    name: 'Reuters',
    domain: 'reuters.com',
    status: 'Trusted',
    dateAdded: '2025-10-12',
    lastUpdated: '2026-08-01',
    enabled: true,
    notes: 'Primary global news agency. Consistently high factual accuracy rating and transparent editorial oversight.',
    category: 'International Wire Service'
  },
  {
    id: 'src-02',
    name: 'Associated Press',
    domain: 'apnews.com',
    status: 'Trusted',
    dateAdded: '2025-10-12',
    lastUpdated: '2026-07-28',
    enabled: true,
    notes: 'Nonprofit news agency based in New York. Gold standard for wire reporting and factual verification.',
    category: 'International Wire Service'
  },
  {
    id: 'src-03',
    name: 'Global Tribune Press',
    domain: 'globaltribune.org',
    status: 'Monitored',
    dateAdded: '2025-11-04',
    lastUpdated: '2026-08-02',
    enabled: true,
    notes: 'Independent outlet registered in 2024. Occasional sensationalized headlines flagged during viral surge periods.',
    category: 'Regional Digital Outlet'
  },
  {
    id: 'src-04',
    name: 'TechNews Daily Co',
    domain: 'technewsdaily.co',
    status: 'Under Review',
    dateAdded: '2025-12-15',
    lastUpdated: '2026-08-03',
    enabled: true,
    notes: 'Domain registered recently. Multiple articles flagged for unverified tech rumor amplification and clickbait phrasing.',
    category: 'Tech & Science Blog'
  },
  {
    id: 'src-05',
    name: 'BBC News',
    domain: 'bbc.com',
    status: 'Trusted',
    dateAdded: '2025-09-01',
    lastUpdated: '2026-07-30',
    enabled: true,
    notes: 'British public service broadcaster with strict impartiality guidelines and public corrections log.',
    category: 'Public Broadcaster'
  },
  {
    id: 'src-06',
    name: 'Bloomberg News',
    domain: 'bloomberg.com',
    status: 'Trusted',
    dateAdded: '2025-09-15',
    lastUpdated: '2026-07-25',
    enabled: true,
    notes: 'Financial and business journalism leader with verified dataset citations and analyst disclosures.',
    category: 'Financial News'
  },
  {
    id: 'src-07',
    name: 'Health Secrets Unfiltered',
    domain: 'healthsecrets-unfiltered.net',
    status: 'Untrusted',
    dateAdded: '2026-01-10',
    lastUpdated: '2026-08-02',
    enabled: true,
    notes: 'Promotes unverified miracle remedies, false medical claims, and missing scientific references.',
    category: 'Alternative Health'
  },
  {
    id: 'src-08',
    name: 'CNN News Update Mirror',
    domain: 'cnn-news-update.co',
    status: 'Untrusted',
    dateAdded: '2026-02-18',
    lastUpdated: '2026-08-03',
    enabled: true,
    notes: 'Spoofed domain impersonating major network news logo and layout to spread synthetic outrage pieces.',
    category: 'Impersonator Domain'
  },
  {
    id: 'src-09',
    name: 'ProPublica',
    domain: 'propublica.org',
    status: 'Trusted',
    dateAdded: '2025-10-01',
    lastUpdated: '2026-07-20',
    enabled: true,
    notes: 'Nonprofit investigative newsroom publishing primary source documents and data methodology.',
    category: 'Investigative Journalism'
  },
  {
    id: 'src-10',
    name: 'National Science Review',
    domain: 'natsci-review.org',
    status: 'Monitored',
    dateAdded: '2026-03-05',
    lastUpdated: '2026-07-15',
    enabled: true,
    notes: 'Aggregate blog re-publishing peer-reviewed papers with occasional exaggerated summary titles.',
    category: 'Science Aggregator'
  }
];
