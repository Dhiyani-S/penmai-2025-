"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Calculator, Landmark, BarChart, Percent, Calendar, TrendingUp, PiggyBank } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const formSchema = z.object({
  principal: z.coerce.number().positive({ message: "Amount must be greater than 0." }),
  rate: z.coerce.number().positive({ message: "Rate must be greater than 0." }).max(100, { message: "Rate cannot exceed 100%." }),
  tenure: z.coerce.number().positive({ message: "Tenure must be greater than 0." }),
  compoundingFrequency: z.enum(["1", "2", "4", "12"]),
});

type FormValues = z.infer<typeof formSchema>;

interface CalculationResult {
  maturityAmount: number;
  totalInterest: number;
  principal: number;
}

export default function FdCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      principal: 100000,
      rate: 6.5,
      tenure: 5,
      compoundingFrequency: "4",
    },
  });

  function onSubmit(values: FormValues) {
    const { principal, rate, tenure, compoundingFrequency } = values;
    const n = parseInt(compoundingFrequency, 10);
    const r = rate / 100;

    const maturityAmount = principal * Math.pow(1 + r / n, n * tenure);
    const totalInterest = maturityAmount - principal;

    setResult({ maturityAmount, totalInterest, principal });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = result
    ? [
        { name: "Principal", value: result.principal, fill: "hsl(var(--primary))" },
        { name: "Interest", value: result.totalInterest, fill: "hsl(var(--accent))" },
      ]
    : [];

  const chartConfig = {
    principal: {
      label: "Principal",
      color: "hsl(var(--primary))",
    },
    interest: {
      label: "Interest",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <Card className="w-full shadow-lg border-2 border-primary/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline text-primary">FD Calculator</CardTitle>
        </div>
        <CardDescription>
          Estimate the returns on your Fixed Deposit investment.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="principal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Amount (₹)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="number" placeholder="e.g., 100000" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Rate (% p.a.)</FormLabel>
                    <FormControl>
                      <div className="relative">
                         <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="number" step="0.01" placeholder="e.g., 6.5" {...field} className="pl-10"/>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="tenure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenure (in years)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="number" placeholder="e.g., 5" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="compoundingFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compounding Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                         <div className="relative">
                          <BarChart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="2">Half-yearly</SelectItem>
                        <SelectItem value="1">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <Button type="submit" className="w-full text-base py-6">
              Calculate Maturity
            </Button>
            {result && (
              <div className="mt-4 rounded-lg border bg-secondary/50 p-6 space-y-4 animate-in fade-in-50">
                <h3 className="text-lg font-semibold text-center text-primary">Your FD Maturity Details</h3>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col gap-4">
                      <div className="text-center">
                          <p className="text-sm text-muted-foreground">Maturity Amount</p>
                          <p className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
                            <TrendingUp className="h-6 w-6 text-accent" />
                            {formatCurrency(result.maturityAmount)}
                          </p>
                      </div>
                      <div className="text-center">
                          <p className="text-sm text-muted-foreground">Principal Amount</p>
                          <p className="text-lg font-semibold text-foreground/90 flex items-center justify-center gap-2">
                            {formatCurrency(result.principal)}
                          </p>
                      </div>
                       <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total Interest</p>
                          <p className="text-lg font-semibold text-foreground/90 flex items-center justify-center gap-2">
                             <PiggyBank className="h-5 w-5 text-accent" />
                            {formatCurrency(result.totalInterest)}
                          </p>
                      </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square h-[200px]"
                    >
                      <PieChart>
                        <Tooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel nameKey="name" formatter={(value) => formatCurrency(value as number)} />}
                        />
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={50}
                          strokeWidth={5}
                          >
                           {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
