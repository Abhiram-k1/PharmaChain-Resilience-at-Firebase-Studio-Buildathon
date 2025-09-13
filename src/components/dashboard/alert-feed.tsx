'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { EventData } from '@/lib/types';
import { AlertTriangle, Info } from 'lucide-react';

const severityConfig = {
  Critical: 'bg-red-500 border-red-500 text-white',
  High: 'bg-orange-500 border-orange-500 text-white',
  Medium: 'bg-yellow-500 border-yellow-500 text-black',
  Low: 'bg-green-500 border-green-500 text-white',
};

export function AlertFeed({ events }: { events: EventData[] }) {
  return (
    <Card className="h-full flex flex-col shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <AlertTriangle className="text-primary" />
          Real-time Alert Feed
        </CardTitle>
        <CardDescription>
          Live updates on potential supply chain disruptions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ScrollArea className="h-[400px] pr-4">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map(({ analysis }) => (
                <div key={analysis.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Badge
                      className={cn(
                        'w-20 justify-center',
                        severityConfig[analysis.severity]
                      )}
                    >
                      {analysis.severity}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{analysis.title}</p>
                    <p className="text-xs text-muted-foreground">{analysis.affectedLocation}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <Info className="w-8 h-8 mb-2" />
              <p>No events to display.</p>
              <p className="text-sm">Simulate an event to see alerts here.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
