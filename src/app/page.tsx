import FdCalculator from "@/app/components/fd-calculator";
import AiRecommendations from "@/app/components/ai-recommendations";
import { Coins } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-start px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Coins className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-primary font-headline">
              FD Calc
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FdCalculator />
          <AiRecommendations />
        </div>
      </main>
      <footer className="mt-12 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FD Calc. All rights reserved.
      </footer>
    </div>
  );
}
