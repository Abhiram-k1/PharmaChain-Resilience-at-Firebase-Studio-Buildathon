import type { AnalyzePharmaEventFromNewsOutput } from '@/ai/flows/analyze-pharma-event-from-news';
import type { GetContingencyRecommendationsOutput } from '@/ai/flows/get-contingency-recommendations';

// Augmenting the AI output with client-side data
export type AnalyzedEvent = AnalyzePharmaEventFromNewsOutput & {
  id: string;
  timestamp: string; // ISO string
  newsSnippet: string;
  title: string;
};

export type ContingencyData = GetContingencyRecommendationsOutput;

// Combined data structure for an event
export type EventData = {
  analysis: AnalyzedEvent;
  contingency: ContingencyData;
};

// For the timeline chart
export type TimelineData = {
  date: string;
  'Risk Score': number;
};

// For the map
export type MapMarkerData = {
  id: string;
  position: { lat: number; lng: number };
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  summary: string;
};
