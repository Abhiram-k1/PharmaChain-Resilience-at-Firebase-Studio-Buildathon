'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent
} from '@/components/ui/chart';
import type { TimelineData } from '@/lib/types';
import { Activity } from 'lucide-react';

const chartConfig = {
  'Risk Score': {
    label: 'Risk Score',
    color: 'hsl(var(--accent))',
  },
};

export function RiskTimelineChart({ data }: { data: TimelineData[] }) {
  return (
    <Card className="h-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Activity className="text-primary" />
          Risk Score Timeline
        </CardTitle>
        <CardDescription>
          Historical trend of the aggregated risk score.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          {data.length > 0 ? (
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    type="monotone"
                    dataKey="Risk Score"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: 'hsl(var(--accent))',
                      stroke: 'hsl(var(--background))',
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              <p>No historical data to display. Simulate an event to start the timeline.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
