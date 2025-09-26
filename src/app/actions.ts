'use server';

import { getFdRecommendations, type FdRecommendationsInput } from "@/ai/flows/fd-recommendations";
import { z } from "zod";

const ActionInputSchema = z.object({
  financialGoals: z.string().min(10, "Please describe your financial goals in more detail."),
  investmentAmount: z.number().positive("Investment amount must be positive."),
  riskTolerance: z.enum(["low", "medium", "high"]),
});

export async function getRecommendationsAction(input: FdRecommendationsInput) {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error(parsedInput.error.errors.map(e => e.message).join(', '));
  }

  try {
    const recommendations = await getFdRecommendations(parsedInput.data);
    return recommendations;
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    throw new Error("Failed to get recommendations. Please try again later.");
  }
}
