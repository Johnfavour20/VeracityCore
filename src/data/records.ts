import { AssessmentRecord } from '../types';

export const INITIAL_ASSESSMENT_RECORDS: AssessmentRecord[] = [
  {
    id: 'VR-8492',
    articleTitle: 'Global Markets See Unprecedented Shift As New Energy Storage Tech Scales',
    sourceDomain: 'bloomberg.com',
    articleUrl: 'https://bloomberg.com/news/articles/2026-08-04/global-energy-markets-shift',
    assessmentDate: '2026-08-04 • 14:32',
    riskScore: 14,
    riskLevel: 'Low',
    status: 'Complete',
    recommendation: 'Low risk detected. No warning banners required. Content matches verified financial wire reporting.',
    summaryNotes: 'Reported by accredited news agency with verified data tables and standard institutional citations.',
    modules: {
      headline: {
        status: 'check',
        score: 10,
        weight: '20%',
        summary: 'Headline matches content without sensational exaggeration or clickbait mechanics.'
      },
      source: {
        status: 'check',
        score: 5,
        weight: '30%',
        summary: 'Domain bloomberg.com is registered as a Trusted financial news provider.'
      },
      content: {
        status: 'check',
        score: 15,
        weight: '25%',
        summary: 'Data tables align with quarterly energy transition reports and official SEC filings.'
      },
      evidence: {
        status: 'check',
        score: 12,
        weight: '15%',
        summary: 'Direct links provided to peer-reviewed research papers and market analyst disclosures.'
      },
      writingStyle: {
        status: 'check',
        score: 18,
        weight: '10%',
        summary: 'Objective, neutral tone adhering to Reuters-Bloomberg financial journalism standards.'
      }
    }
  },
  {
    id: 'VR-8491',
    articleTitle: 'Secret Government Initiative Revealed: What They Aren\'t Telling You About Water Supplies',
    sourceDomain: 'truthseekerdaily.net',
    articleUrl: 'https://truthseekerdaily.net/2026/08/secret-gov-initiative-revealed',
    assessmentDate: '2026-08-04 • 13:15',
    riskScore: 88,
    riskLevel: 'High',
    status: 'Complete',
    recommendation: 'Flag for manual moderator audit and apply mandatory contextual misinformation warning.',
    summaryNotes: 'Severe heuristic penalties triggered due to conspiratorial framing, missing citations, and untrusted domain reputation.',
    modules: {
      headline: {
        status: 'alert',
        score: 92,
        weight: '20%',
        summary: 'Headline uses extreme emotional triggers ("Secret", "Revealed", "What They Aren\'t Telling You").',
        flags: [
          'Hyperbolic phrase detection: "Secret Government Initiative"',
          'Conspiratorial framing: "What They Aren\'t Telling You"'
        ]
      },
      source: {
        status: 'alert',
        score: 85,
        weight: '30%',
        summary: 'Domain truthseekerdaily.net registered privado < 6 months ago with no WHOIS contact.',
        flags: [
          'Domain age under 180 days',
          'Missing transparency masthead & editorial contacts'
        ]
      },
      content: {
        status: 'warning',
        score: 78,
        weight: '25%',
        summary: 'Internal dates contradict EPA published testing standards and regional municipality logs.',
        flags: ['Internal chronology contradiction', 'Unverified chemical claim']
      },
      evidence: {
        status: 'alert',
        score: 95,
        weight: '15%',
        summary: 'Zero external citations or DOI links. Quotes attributed exclusively to unnamed "insiders".',
        flags: ['Missing peer citations', 'Unverifiable anonymous source attribution']
      },
      writingStyle: {
        status: 'warning',
        score: 80,
        weight: '10%',
        summary: 'Persistent subjective tone loaded with anxiety-inducing urgency markers.',
        flags: ['High density of inflammatory adjectives']
      }
    }
  },
  {
    id: 'VR-8490',
    articleTitle: 'New Study Claims Coffee Might Be The Single Cure For Common Viral Infections',
    sourceDomain: 'healthsecrets-unfiltered.net',
    articleUrl: 'https://healthsecrets-unfiltered.net/coffee-cures-viruses',
    assessmentDate: '2026-08-04 • 11:05',
    riskScore: 64,
    riskLevel: 'Moderate',
    status: 'Complete',
    recommendation: 'Attach medical accuracy disclaimer and deprioritize in automated discovery feeds.',
    summaryNotes: 'Extrapolates preliminary in-vitro test tube observations to human clinical cures without evidence.',
    modules: {
      headline: {
        status: 'warning',
        score: 75,
        weight: '20%',
        summary: 'Headline makes unverified medical cure claim ("Single Cure")',
        flags: ['Sensational health claim']
      },
      source: {
        status: 'alert',
        score: 88,
        weight: '30%',
        summary: 'Outlet flagged under Untrusted status in Source Directory due to prior medical pseudoscience.',
        flags: ['Listed in Untrusted Directory']
      },
      content: {
        status: 'warning',
        score: 55,
        weight: '25%',
        summary: 'Conflates laboratory cell culture studies with human clinical trial efficacy.'
      },
      evidence: {
        status: 'warning',
        score: 60,
        weight: '15%',
        summary: 'Cites a non-indexed pre-print repository paper without peer review validation.'
      },
      writingStyle: {
        status: 'check',
        score: 40,
        weight: '10%',
        summary: 'Moderate informal phrasing with persuasive health sales copy tones.'
      }
    }
  },
  {
    id: 'VR-8489',
    articleTitle: 'BREAKING: National Power Grid Shut Down Across 4 States Following Cyber Attack',
    sourceDomain: 'cnn-news-update.co',
    articleUrl: 'https://cnn-news-update.co/breaking/power-grid-shutdown',
    assessmentDate: '2026-08-04 • 09:42',
    riskScore: 95,
    riskLevel: 'Critical',
    status: 'Complete',
    recommendation: 'Emergency suppression required. Domain is a confirmed fake news impersonator.',
    summaryNotes: 'Spoofed CNN domain attempting to cause public panic regarding critical national infrastructure.',
    modules: {
      headline: {
        status: 'alert',
        score: 98,
        weight: '20%',
        summary: 'All-caps BREAKING prefix used to simulate urgent broadcast alert.',
        flags: ['Urgent all-caps alert prefix', 'False crisis declaration']
      },
      source: {
        status: 'alert',
        score: 99,
        weight: '30%',
        summary: 'Confirmed domain spoofing impersonator (.co suffix mimicking major network).',
        flags: ['Domain impersonation penalty', 'Impersonator classification']
      },
      content: {
        status: 'alert',
        score: 90,
        weight: '25%',
        summary: 'Department of Energy and local utility dashboards show normal grid operations.',
        flags: ['Factual falsehood verified against official API']
      },
      evidence: {
        status: 'alert',
        score: 96,
        weight: '15%',
        summary: 'No press releases from state governors or emergency services.',
        flags: ['Fabricated agency quote']
      },
      writingStyle: {
        status: 'alert',
        score: 92,
        weight: '10%',
        summary: 'Aggressive panic-inducing phrasing designed for rapid social media sharing.'
      }
    }
  },
  {
    id: 'VR-8488',
    articleTitle: 'Tech CEO Announces Departure Amid Board Restructuring and Quarterly Report',
    sourceDomain: 'reuters.com',
    articleUrl: 'https://reuters.com/business/tech-ceo-announces-departure-2026',
    assessmentDate: '2026-08-03 • 16:20',
    riskScore: 12,
    riskLevel: 'Low',
    status: 'Complete',
    recommendation: 'Low risk. Standard corporate disclosure verified via SEC Form 8-K.',
    summaryNotes: 'Verified wire service report with confirmed primary source SEC filings.',
    modules: {
      headline: {
        status: 'check',
        score: 10,
        weight: '20%',
        summary: 'Strict factual headline adhering to news wire guidelines.'
      },
      source: {
        status: 'check',
        score: 5,
        weight: '30%',
        summary: 'Reuters is classified as a Gold Standard International Wire Service.'
      },
      content: {
        status: 'check',
        score: 12,
        weight: '25%',
        summary: 'Quotes verified directly against official press release and investor call recording.'
      },
      evidence: {
        status: 'check',
        score: 8,
        weight: '15%',
        summary: 'Links to public SEC disclosures and company investor relations portal.'
      },
      writingStyle: {
        status: 'check',
        score: 15,
        weight: '10%',
        summary: 'Impartial third-person journalistic tone.'
      }
    }
  },
  {
    id: 'VR-8487',
    articleTitle: 'Recent Climate Assessment Highlights Regional Precipitation Shifts',
    sourceDomain: 'apnews.com',
    articleUrl: 'https://apnews.com/article/climate-assessment-precipitation-2026',
    assessmentDate: '2026-08-03 • 14:10',
    riskScore: 18,
    riskLevel: 'Low',
    status: 'Complete',
    recommendation: 'Low risk. Peer-reviewed climate dataset citation verified.',
    summaryNotes: 'Accurate reporting on IPCC sub-regional meteorological models.',
    modules: {
      headline: {
        status: 'check',
        score: 12,
        weight: '20%',
        summary: 'Accurate summary of scientific findings without apocalyptic exaggeration.'
      },
      source: {
        status: 'check',
        score: 8,
        weight: '30%',
        summary: 'Associated Press domain with high credibility verification rating.'
      },
      content: {
        status: 'check',
        score: 20,
        weight: '25%',
        summary: 'Data points match NOAA and European Centre for Medium-Range Weather Forecasts.'
      },
      evidence: {
        status: 'check',
        score: 15,
        weight: '15%',
        summary: 'Direct citations to published meteorological journal papers.'
      },
      writingStyle: {
        status: 'check',
        score: 15,
        weight: '10%',
        summary: 'Balanced scientific reporting.'
      }
    }
  },
  {
    id: 'VR-8486',
    articleTitle: 'Leaked Memo Alleges Major Automotive Manufacturer Hiding Battery Defect',
    sourceDomain: 'technewsdaily.co',
    articleUrl: 'https://technewsdaily.co/leaked-memo-battery-defect',
    assessmentDate: '2026-08-03 • 11:45',
    riskScore: 72,
    riskLevel: 'High',
    status: 'Complete',
    recommendation: 'Flag as unverified rumor. Require corroboration from NHTSA before indexing.',
    summaryNotes: 'Unsubstantiated leak claims posted on recently registered tech blog under review.',
    modules: {
      headline: {
        status: 'warning',
        score: 80,
        weight: '20%',
        summary: 'Headline relies heavily on unverified "Leaked Memo" framing.',
        flags: ['Unverified leak assertion']
      },
      source: {
        status: 'warning',
        score: 75,
        weight: '30%',
        summary: 'Source is under active review in the Credibility Directory due to rumor amplification.',
        flags: ['Domain Under Review status']
      },
      content: {
        status: 'warning',
        score: 70,
        weight: '25%',
        summary: 'Allegations fail to cite specific vehicle identification numbers or safety recall logs.'
      },
      evidence: {
        status: 'alert',
        score: 85,
        weight: '15%',
        summary: 'Document image provided lacks official letterhead or serial verification signatures.'
      },
      writingStyle: {
        status: 'warning',
        score: 65,
        weight: '10%',
        summary: 'Speculative phrasing ("could endanger millions") without regulatory corroboration.'
      }
    }
  },
  {
    id: 'VR-8485',
    articleTitle: 'New Quantum Computing Benchmark Achieves Million Qubit Simulation',
    sourceDomain: 'propublica.org',
    articleUrl: 'https://propublica.org/article/quantum-benchmark-simulation',
    assessmentDate: '2026-08-02 • 18:00',
    riskScore: 16,
    riskLevel: 'Low',
    status: 'Complete',
    recommendation: 'Low risk. Thorough investigative reporting with publicly accessible methodology.',
    summaryNotes: 'Nonprofit investigative newsroom publishing primary research data and code links.',
    modules: {
      headline: {
        status: 'check',
        score: 15,
        weight: '20%',
        summary: 'Factual title supported by academic peer review.'
      },
      source: {
        status: 'check',
        score: 5,
        weight: '30%',
        summary: 'ProPublica verified non-profit investigative journal.'
      },
      content: {
        status: 'check',
        score: 18,
        weight: '25%',
        summary: 'Detailed explanation of simulation benchmarks and hardware limitations.'
      },
      evidence: {
        status: 'check',
        score: 10,
        weight: '15%',
        summary: 'GitHub links to open-source verification suite included.'
      },
      writingStyle: {
        status: 'check',
        score: 15,
        weight: '10%',
        summary: 'Rigorous analytical tone.'
      }
    }
  }
];
