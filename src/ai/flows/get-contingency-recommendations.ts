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
    .describe('A detailed plan to mitigate the risks associated with the event.'),
  alternativeSuppliers: z
    .string()
    .describe('A list of recommended alternative suppliers.'),
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
  prompt: `Based on the following event details for the drug {{{productName}}}: {{{eventDetails}}},
and considering the following list of known pharmaceutical suppliers:
{{{knownPharmaSuppliers}}},

provide a detailed contingency plan to mitigate the risks associated with the event and recommend alternative suppliers.

If no product name is provided, provide general recommendations.
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
