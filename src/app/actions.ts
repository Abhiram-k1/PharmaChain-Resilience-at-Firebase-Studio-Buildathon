'use server';

import { analyzePharmaEventFromNews } from '@/ai/flows/analyze-pharma-event-from-news';
import { getContingencyRecommendations } from '@/ai/flows/get-contingency-recommendations';
import { knownPharmaSuppliers } from '@/lib/mock-data';
import type { EventData } from '@/lib/types';

export async function processNewEvent(newsSnippet: string, productName?: string): Promise<EventData | null> {
  try {
    const analysis = await analyzePharmaEventFromNews({ newsText: newsSnippet, productName });

    const contingency = await getContingencyRecommendations({
      eventDetails: analysis.summary,
      knownPharmaSuppliers: knownPharmaSuppliers.join(', '),
      productName,
    });
    
    const id = `evt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const title = analysis.summary.split('. ')[0];

    return {
      analysis: {
        ...analysis,
        id,
        timestamp: new Date().toISOString(),
        newsSnippet,
        title,
      },
      contingency: contingency,
    };
  } catch (error) {
    console.error('Error processing new event:', error);
    return null;
  }
}
