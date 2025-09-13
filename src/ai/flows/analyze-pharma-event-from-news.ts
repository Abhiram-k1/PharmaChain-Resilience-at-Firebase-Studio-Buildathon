'use server';
/**
 * @fileOverview Analyzes pharmaceutical supply chain risks from news text using the Gemini API.
 *
 * - analyzePharmaEventFromNews - A function that handles the analysis of pharmaceutical supply chain risks from news text.
 * - AnalyzePharmaEventFromNewsInput - The input type for the analyzePharmaEventFromNews function.
 * - AnalyzePharmaEventFromNewsOutput - The return type for the analyzePharmaEventFromNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePharmaEventFromNewsInputSchema = z.object({
  newsText: z.string().describe('The text from a news article about a potential pharmaceutical supply chain event.'),
  productName: z.string().optional().describe('The specific pharmaceutical product to focus the analysis on.'),
});
export type AnalyzePharmaEventFromNewsInput = z.infer<typeof AnalyzePharmaEventFromNewsInputSchema>;

const AnalyzePharmaEventFromNewsOutputSchema = z.object({
  riskScore: z.number().describe('A numerical score representing the overall risk to the pharmaceutical supply chain (e.g., 0-100). A higher score indicates a more severe risk.'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('The severity level of the risk, determined by the potential impact on supply.'),
  summary: z.string().describe('A concise, one-paragraph summary of the event and its direct and indirect impacts on the pharmaceutical supply chain.'),
  affectedLocation: z.string().describe('The primary geographical location (e.g., City, Country) affected by the event.'),
  recommendedContingencyPlans: z.string().describe('A bulleted list of 2-3 specific, actionable recommendations for a supply chain manager to mitigate the identified risks.'),
});
export type AnalyzePharmaEventFromNewsOutput = z.infer<typeof AnalyzePharmaEventFromNewsOutputSchema>;

export async function analyzePharmaEventFromNews(input: AnalyzePharmaEventFromNewsInput): Promise<AnalyzePharmaEventFromNewsOutput> {
  return analyzePharmaEventFromNewsFlow(input);
}

const analyzePharmaEventFromNewsPrompt = ai.definePrompt({
  name: 'analyzePharmaEventFromNewsPrompt',
  input: {schema: AnalyzePharmaEventFromNewsInputSchema},
  output: {schema: AnalyzePharmaEventFromNewsOutputSchema},
  prompt: `You are an expert in pharmaceutical supply chain risk analysis. Your role is to provide clear, actionable insights for supply chain managers.
Analyze the following news text to assess potential risks to the supply chain. If a specific drug is mentioned ({{{productName}}}), focus your analysis on it. Otherwise, provide a general analysis.

News Text: {{{newsText}}}

Your analysis should consider the following:
- **Direct Impacts:** Production halts, facility damage, transportation delays.
- **Indirect Impacts:** Regulatory scrutiny, quality control issues, supplier concentration risks, cold chain vulnerabilities.
- **Geopolitical & Environmental Factors:** Trade restrictions, natural disasters, political instability.

Based on your analysis, provide the following in a structured JSON format:
1.  **riskScore:** An integer from 0 to 100. A score of 0-25 is Low, 26-50 is Medium, 51-75 is High, and 76-100 is Critical.
2.  **severity:** The corresponding severity level ('Low', 'Medium', 'High', 'Critical').
3.  **summary:** A concise, one-paragraph summary of the event and its potential impact on the pharmaceutical supply chain.
4.  **affectedLocation:** The primary geographical location (e.g., City, Country) where the event occurred.
5.  **recommendedContingencyPlans:** A bulleted list of 2-3 specific, actionable recommendations for a supply chain manager.
`,
});

const analyzePharmaEventFromNewsFlow = ai.defineFlow(
  {
    name: 'analyzePharmaEventFromNewsFlow',
    inputSchema: AnalyzePharmaEventFromNewsInputSchema,
    outputSchema: AnalyzePharmaEventFromNewsOutputSchema,
  },
  async input => {
    const {output} = await analyzePharmaEventFromNewsPrompt(input);
    return output!;
  }
);
