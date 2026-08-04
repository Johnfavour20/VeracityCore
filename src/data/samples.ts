import { SampleArticle } from '../types';

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    id: 'sample-chocolate',
    title: '"New Study Claims Chocolate Cures Everything"',
    domain: 'health-miracles-today.net',
    category: 'Sensational Science',
    snippet: 'A revolutionary new study published by independent researchers reveals that eating 500g of cocoa daily permanently cures heart disease, aging, and all metabolic ailments without side effects.',
    presetReport: {
      reportId: 'VRTS-8492-X',
      articleTitle: '"New Study Claims Chocolate Cures Everything"',
      sourceDomain: 'health-miracles-today.net',
      overallRiskScore: 68,
      riskLevel: 'High Risk',
      modules: [
        {
          name: 'Headline Assessment',
          status: 'warning',
          score: 85,
          summary: 'Exaggerated absolute claim ("cures everything") and sensational clickbait phrasing.'
        },
        {
          name: 'Source Reputation',
          status: 'warning',
          score: 70,
          summary: 'Domain registered recently with no editorial disclosures or journalistic accreditation.'
        },
        {
          name: 'Content Structure',
          status: 'check',
          score: 30,
          summary: 'Grammatically coherent structure but contains logical leaps in causal inference.'
        },
        {
          name: 'Evidence Quality',
          status: 'warning',
          score: 80,
          summary: 'No links to peer-reviewed clinical trials or DOI identifiers in PubMed.'
        },
        {
          name: 'Stylistic Analysis',
          status: 'check',
          score: 40,
          summary: 'Contains emotional enthusiasm markers and informal medical advice terminology.'
        }
      ],
      heuristicsBreakdown: [
        {
          finding: 'Headline is sensational',
          weight: 'Medium',
          impact: 15,
          category: 'Headline Assessment',
          detail: 'Uses absolute cure claims ("cures everything") that violate medical journalism standards.'
        },
        {
          finding: 'Source has unknown reputation',
          weight: 'High',
          impact: 20,
          category: 'Source Reputation',
          detail: 'Domain health-miracles-today.net has low domain authority and missing WHOIS verification.'
        },
        {
          finding: 'Lack of verifiable citations',
          weight: 'Critical',
          impact: 25,
          category: 'Evidence Quality',
          detail: 'Fails to link to randomized controlled trials or name lead academic investigators.'
        },
        {
          finding: 'Over-extrapolation of preliminary dietary findings',
          weight: 'Low',
          impact: 8,
          category: 'Content Structure',
          detail: 'Conflates in-vitro flavonoid observations with human therapeutic outcomes.'
        }
      ],
      summaryText: 'Every risk score is a simple sum of penalties assigned by our heuristics. We show you the math.',
      verifiableClaims: [
        'Eating 500g of dark cocoa daily reverses vascular aging',
        'Clinical trial conducted on 10,000 subjects'
      ],
      suggestedVerification: [
        'Check PubMed database for clinical trials on cocoa flavanols',
        'Verify if lead author is affiliated with an accredited university medical center'
      ]
    }
  },
  {
    id: 'sample-solar',
    title: 'Breakthrough in Solid-State Battery Energy Storage Efficiency',
    domain: 'tech-journal.org',
    category: 'Technology & Energy',
    snippet: 'Engineers at MIT and Stanford have demonstrated a 98% round-trip efficiency solid-state electrolyte cell in peer-reviewed Nature Energy research.',
    presetReport: {
      reportId: 'VRTS-3104-A',
      articleTitle: 'Breakthrough in Solid-State Battery Energy Storage Efficiency',
      sourceDomain: 'tech-journal.org',
      overallRiskScore: 12,
      riskLevel: 'Low Risk',
      modules: [
        {
          name: 'Headline Assessment',
          status: 'check',
          score: 10,
          summary: 'Accurate summary matching body findings without hyperbolic adjectives.'
        },
        {
          name: 'Source Reputation',
          status: 'check',
          score: 15,
          summary: 'Verified academic publication index with established editorial oversight.'
        },
        {
          name: 'Content Structure',
          status: 'check',
          score: 10,
          summary: 'Clear methodology discussion, acknowledged limitations, and technical rigor.'
        },
        {
          name: 'Evidence Quality',
          status: 'check',
          score: 10,
          summary: 'Direct DOI links provided to Nature Energy paper and publicly accessible datasets.'
        },
        {
          name: 'Stylistic Analysis',
          status: 'check',
          score: 15,
          summary: 'Objective, scientific voice with appropriate domain terminology.'
        }
      ],
      heuristicsBreakdown: [
        {
          finding: 'Minor press release reliance in opening summary',
          weight: 'Low',
          impact: 12,
          category: 'Content Structure',
          detail: 'Opening paragraph mirrors university media release closely before expanding with independent analysis.'
        }
      ],
      summaryText: 'Article demonstrates high credibility with direct peer-reviewed citations, transparent institutional affiliation, and cautious reporting standards.',
      verifiableClaims: [
        'Nature Energy DOI 10.1038/s41560-026-01234-x published July 2026',
        '98% electrolyte stability achieved over 1,000 thermal cycles'
      ],
      suggestedVerification: [
        'Open DOI link to read full open-access article',
        'Cross-reference battery lifespan numbers against standard lithium-ion baselines'
      ]
    }
  },
  {
    id: 'sample-moon-base',
    title: 'Leaked Documents Unveil Hidden Lunar Facility Built in Secret',
    domain: 'unfiltered-truth-leaks.com',
    category: 'Conspiracy & Space',
    snippet: 'Anonymous whistleblowers claim secret global budget documents reveal an artificial moon base hidden in the Aitken Basin since 2018.',
    presetReport: {
      reportId: 'VRTS-9921-Z',
      articleTitle: 'Leaked Documents Unveil Hidden Lunar Facility Built in Secret',
      sourceDomain: 'unfiltered-truth-leaks.com',
      overallRiskScore: 92,
      riskLevel: 'Critical Risk',
      modules: [
        {
          name: 'Headline Assessment',
          status: 'alert',
          score: 95,
          summary: 'Extreme sensationalism, unverified leak tropes, and conspiratorial hooks.'
        },
        {
          name: 'Source Reputation',
          status: 'alert',
          score: 90,
          summary: 'Domain listed on multiple disinformation monitoring watchlists.'
        },
        {
          name: 'Content Structure',
          status: 'alert',
          score: 85,
          summary: 'Relies entirely on unfalsifiable claims, circular references, and anonymous hearsay.'
        },
        {
          name: 'Evidence Quality',
          status: 'alert',
          score: 95,
          summary: 'Zero primary documents attached; satellite imagery provided is demonstrably doctored.'
        },
        {
          name: 'Stylistic Analysis',
          status: 'alert',
          score: 90,
          summary: 'Aggressive emotional manipulation and distrust-building rhetoric.'
        }
      ],
      heuristicsBreakdown: [
        {
          finding: 'Sensational conspiracy headline',
          weight: 'Critical',
          impact: 30,
          category: 'Headline Assessment',
          detail: 'Employs unverified leak narratives intended to maximize virality.'
        },
        {
          finding: 'Flagged disinformation domain',
          weight: 'Critical',
          impact: 25,
          category: 'Source Reputation',
          detail: 'Domain domain registered behind proxy with history of fabricated scoops.'
        },
        {
          finding: 'Total absence of primary verifiable data',
          weight: 'Critical',
          impact: 25,
          category: 'Evidence Quality',
          detail: 'No verifiable documents, archive numbers, or named scientific witnesses.'
        },
        {
          finding: 'Inconsistent physical claims',
          weight: 'Medium',
          impact: 12,
          category: 'Content Structure',
          detail: 'Logistical payload requirements contradict known space agency transport capabilities.'
        }
      ],
      summaryText: 'Article exhibits extreme risk of deliberate misinformation. It relies on unverified anonymous leaks, doctored assets, and sensational conspiracy patterns.',
      verifiableClaims: [
        'Alleged secret launch manifests between 2018 and 2024'
      ],
      suggestedVerification: [
        'Check NASA LRO (Lunar Reconnaissance Orbiter) high-resolution public surface imagery',
        'Consult astronomical observatory orbital tracking databases'
      ]
    }
  }
];
