"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BrainCircuit, Loader2, Lightbulb, TrendingUp, Calendar, PiggyBank } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { getRecommendationsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type FdRecommendationsOutput } from "@/ai/flows/fd-recommendations";

const formSchema = z.object({
  financialGoals: z.string().min(20, { message: "Please describe your goals in at least 20 characters." }).max(500),
  investmentAmount: z.coerce.number().positive({ message: "Amount must be greater than 0." }),
  riskTolerance: z.enum(["low", "medium", "high"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function AiRecommendations() {
  const [result, setResult] = useState<FdRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      financialGoals: "",
      investmentAmount: 50000,
      riskTolerance: "low",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const recommendations = await getRecommendationsAction(values);
      setResult(recommendations);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <BrainCircuit className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline text-primary">AI-Powered Suggestions</CardTitle>
        </div>
        <CardDescription>
          Not sure where to start? Get personalized recommendations based on your goals.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="financialGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your financial goals?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'I want to save for a down payment on a house in 5 years.'"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="investmentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planned Investment (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="riskTolerance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Tolerance</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your risk tolerance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <Button type="submit" disabled={isLoading} className="w-full text-base py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Analyzing..." : "Get AI Suggestion"}
            </Button>
            {result && (
              <div className="mt-4 rounded-lg border border-accent bg-background p-6 space-y-4 animate-in fade-in-50">
                 <h3 className="text-lg font-semibold text-center text-primary">AI Recommendation</h3>
                 <div className="grid grid-cols-2 gap-4 text-center pt-2">
                    <div>
                        <p className="text-sm text-muted-foreground">Recommended Tenure</p>
                        <p className="text-xl font-bold text-primary flex items-center justify-center gap-2">
                           <Calendar className="h-5 w-5 text-accent" />
                           {result.recommendedTenure}
                        </p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Recommended Amount</p>
                        <p className="text-xl font-bold text-primary flex items-center justify-center gap-2">
                           <PiggyBank className="h-5 w-5 text-accent" />
                           {`₹${result.recommendedAmount}`}
                        </p>
                    </div>
                </div>
                <Card className="bg-primary/5 border-primary/20 mt-4">
                    <CardHeader className="flex-row items-center gap-3 space-y-0 p-4">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base font-semibold">Rationale</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="text-sm text-foreground/80">{result.rationale}</p>
                    </CardContent>
                </Card>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
