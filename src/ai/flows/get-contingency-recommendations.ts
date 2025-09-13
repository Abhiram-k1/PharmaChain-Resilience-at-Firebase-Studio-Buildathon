'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating contingency plans and suggesting alternative suppliers based on AI analysis of event data.
 *
 * - getContingencyRecommendations - A function that takes event details as input and returns contingency plans and alternative supplier recommendations.
 * - GetContingencyRecommendationsInput - The input type for the getContingencyRecommendations function.
 * - GetContingencyRecommendationsOutput - The return type for the getContingencyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetContingencyRecommendationsInputSchema = z.object({
  eventDetails: z
    .string()
    .describe('Detailed information about the supply chain event.'),
  knownPharmaSuppliers: z
    .string()
    .describe('A list of known pharmaceutical suppliers.'),
  productName: z.string().optional().describe('The specific pharmaceutical product to focus the analysis on.'),
});
export type GetContingencyRecommendationsInput = z.infer<
  typeof GetContingencyRecommendationsInputSchema
>;

const GetContingencyRecommendationsOutputSchema = z.object({
  contingencyPlan: z
    .string()
    .describe('A detailed, multi-step plan to mitigate the risks associated with the event. Use bullet points for clarity.'),
  alternativeSuppliers: z
    .string()
    .describe('A list of 3-5 recommended alternative suppliers, including their location and a brief justification for their suitability. Format as a list.'),
});
export type GetContingencyRecommendationsOutput = z.infer<
  typeof GetContingencyRecommendationsOutputSchema
>;

export async function getContingencyRecommendations(
  input: GetContingencyRecommendationsInput
): Promise<GetContingencyRecommendationsOutput> {
  return getContingencyRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getContingencyRecommendationsPrompt',
  input: {schema: GetContingencyRecommendationsInputSchema},
  output: {schema: GetContingencyRecommendationsOutputSchema},
  prompt: `You are a strategic sourcing specialist for the pharmaceutical industry.
Based on the following event summary concerning the drug "{{{productName}}}":
"{{{eventDetails}}}"

And considering this list of potential pharmaceutical suppliers:
"{{{knownPharmaSuppliers}}}"

Provide the following in a structured JSON format:
1.  **contingencyPlan:** A detailed, multi-step contingency plan. Use bullet points to outline immediate, short-term, and long-term actions.
2.  **alternativeSuppliers:** A list of 3-5 alternative suppliers from the provided list. For each supplier, specify their likely location and a brief rationale for why they are a good alternative (e.g., "diversified geographic risk," "specializes in sterile injectables"). If the provided list is not relevant, state that and suggest supplier discovery strategies.

If no specific product name is provided, offer general advice applicable to the broader pharmaceutical supply chain.
`,
});

const getContingencyRecommendationsFlow = ai.defineFlow(
  {
    name: 'getContingencyRecommendationsFlow',
    inputSchema: GetContingencyRecommendationsInputSchema,
    outputSchema: GetContingencyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
