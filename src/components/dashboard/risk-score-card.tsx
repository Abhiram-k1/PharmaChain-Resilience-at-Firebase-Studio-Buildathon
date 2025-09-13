'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';

function getRiskColor(score: number): string {
  if (score > 75) return 'text-red-500';
  if (score > 50) return 'text-orange-500';
  if (score > 25) return 'text-yellow-500';
  return 'text-green-500';
}

function getRiskLabel(score: number): string {
    if (score > 75) return 'Critical';
    if (score > 50) return 'High';
    if (score > 25) return 'Medium';
    return 'Low';
}

export function RiskScoreCard({ score }: { score: number }) {
  const colorClass = getRiskColor(score);
  const riskLabel = getRiskLabel(score);

  return (
    <Card className="h-full flex flex-col justify-between shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
            <ShieldCheck className="text-primary"/>
            Aggregated Risk Score
        </CardTitle>
        <CardDescription>Overall supply chain stability.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center flex-1">
        <div
          className="relative flex items-center justify-center font-bold"
        >
          <span className={cn('text-7xl font-headline tracking-tighter', colorClass)}>
            {score}
          </span>
          <span className="absolute -bottom-2 text-2xl text-muted-foreground/80">/100</span>
        </div>
        <p className={cn("mt-4 text-xl font-semibold", colorClass)}>{riskLabel} Risk</p>
      </CardContent>
    </Card>
  );
}
