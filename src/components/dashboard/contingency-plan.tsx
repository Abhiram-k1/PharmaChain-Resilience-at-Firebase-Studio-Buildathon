'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import type { ContingencyData } from '@/lib/types';
import { FileText, Users } from 'lucide-react';

export function ContingencyPlan({ data, isLoading }: { data: ContingencyData | undefined | null, isLoading: boolean }) {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="font-headline">Contingency & Supplier Recommendations</CardTitle>
        <CardDescription>
          AI-generated action plan for the latest supply chain event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-2" />
            </div>
          </div>
        ) : data ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold font-headline mb-2">
                <FileText className="text-primary w-5 h-5" />
                Contingency Plan
              </h3>
              <div className="prose prose-sm max-w-none text-foreground/90">
                <p>{data.contingencyPlan}</p>
              </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold font-headline mb-2">
                <Users className="text-primary w-5 h-5" />
                Alternative Suppliers
              </h3>
              <pre className="bg-muted p-4 rounded-md font-code text-sm whitespace-pre-wrap">
                <code>{data.alternativeSuppliers}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No recommendations available.</p>
            <p className="text-sm">Simulate an event to generate a contingency plan.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
