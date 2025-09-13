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
  riskScore: z.number().describe('A numerical score representing the overall risk to the pharmaceutical supply chain (e.g., 0-100).'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('The severity level of the risk.'),
  summary: z.string().describe('A brief summary of the event and its potential impact.'),
  affectedLocation: z.string().describe('The geographical location most affected by the event.'),
  recommendedContingencyPlans: z.string().describe('Recommended actions to mitigate the risk.'),
});
export type AnalyzePharmaEventFromNewsOutput = z.infer<typeof AnalyzePharmaEventFromNewsOutputSchema>;

export async function analyzePharmaEventFromNews(input: AnalyzePharmaEventFromNewsInput): Promise<AnalyzePharmaEventFromNewsOutput> {
  return analyzePharmaEventFromNewsFlow(input);
}

const analyzePharmaEventFromNewsPrompt = ai.definePrompt({
  name: 'analyzePharmaEventFromNewsPrompt',
  input: {schema: AnalyzePharmaEventFromNewsInputSchema},
  output: {schema: AnalyzePharmaEventFromNewsOutputSchema},
  prompt: `You are an expert in pharmaceutical supply chain risk analysis. Analyze the following news text to assess potential risks to the supply chain for the drug: {{{productName}}}.

News Text: {{{newsText}}}

Consider risks such as cold chain integrity, regulatory compliance, quality control, and supplier concentration. Generate a risk score (0-100), severity level (Low, Medium, High, Critical), a brief summary, the affected location, and recommended contingency plans.

If no product name is provided, perform a general analysis.

Output in JSON format.
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
