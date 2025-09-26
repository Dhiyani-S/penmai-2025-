'use server';

/**
 * @fileOverview Generates personalized FD tenure and amount recommendations based on user financial goals.
 *
 * - getFdRecommendations - A function that generates FD recommendations.
 * - FdRecommendationsInput - The input type for the getFdRecommendations function.
 * - FdRecommendationsOutput - The return type for the getFdRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FdRecommendationsInputSchema = z.object({
  financialGoals: z
    .string()
    .describe('Description of the users financial goals.'),
  investmentAmount: z
    .number()
    .describe('The amount the user is planning to invest.'),
  riskTolerance: z
    .string()
    .describe('The risk tolerance of the user (e.g., low, medium, high).'),
});
export type FdRecommendationsInput = z.infer<typeof FdRecommendationsInputSchema>;

const FdRecommendationsOutputSchema = z.object({
  recommendedTenure: z
    .string()
    .describe('Recommended FD tenure based on financial goals.'),
  recommendedAmount: z
    .string()
    .describe('Recommended FD amount based on financial goals.'),
  rationale: z
    .string()
    .describe('Explanation of why the tenure and amount are recommended.'),
});
export type FdRecommendationsOutput = z.infer<typeof FdRecommendationsOutputSchema>;

export async function getFdRecommendations(input: FdRecommendationsInput): Promise<FdRecommendationsOutput> {
  return fdRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fdRecommendationsPrompt',
  input: {schema: FdRecommendationsInputSchema},
  output: {schema: FdRecommendationsOutputSchema},
  prompt: `You are an expert financial advisor specializing in fixed deposit (FD) investments.

Based on the user's financial goals, investment amount, and risk tolerance, provide personalized recommendations for FD tenure and amount.
Explain the rationale behind your recommendations.

Financial Goals: {{{financialGoals}}}
Investment Amount: {{{investmentAmount}}}
Risk Tolerance: {{{riskTolerance}}}

Here's how to format your output:

Recommended Tenure: [Recommended FD tenure]
Recommended Amount: [Recommended FD amount]
Rationale: [Explanation of why the tenure and amount are recommended]`,
});

const fdRecommendationsFlow = ai.defineFlow(
  {
    name: 'fdRecommendationsFlow',
    inputSchema: FdRecommendationsInputSchema,
    outputSchema: FdRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
