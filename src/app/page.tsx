'use client';

import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { processNewEvent } from '@/app/actions';
import type { EventData, TimelineData, MapMarkerData } from '@/lib/types';
import { mockNewsData, locationCoordinates } from '@/lib/mock-data';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { RiskScoreCard } from '@/components/dashboard/risk-score-card';
import { RiskTimelineChart } from '@/components/dashboard/risk-timeline-chart';
import { RiskMap } from '@/components/dashboard/risk-map';
import { AlertFeed } from '@/components/dashboard/alert-feed';
import { ContingencyPlan } from '@/components/dashboard/contingency-plan';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productName, setProductName] = useState('');
  const { toast } = useToast();

  const handleSimulateEvent = async () => {
    setIsLoading(true);
    try {
      const newsSnippet = mockNewsData[Math.floor(Math.random() * mockNewsData.length)];
      const result = await processNewEvent(newsSnippet, productName);
      
      if (!result) {
        throw new Error('Analysis failed to return a result.');
      }
      
      setEvents(prevEvents => [result, ...prevEvents]);

      toast({
        title: "New Event Analyzed",
        description: `Supply chain risk assessment for ${productName || 'general overview'} has been updated.`,
      });

    } catch (error) {
      console.error('Failed to process event:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not analyze the new event. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const aggregatedRiskScore = useMemo(() => {
    if (events.length === 0) return 0;
    const totalScore = events.reduce((acc, event) => acc + event.analysis.riskScore, 0);
    return Math.round(totalScore / events.length);
  }, [events]);

  const timelineData: TimelineData[] = useMemo(() => {
    return events
      .map(event => ({
        date: format(new Date(event.analysis.timestamp), 'MMM d'),
        'Risk Score': event.analysis.riskScore,
      }))
      .reverse(); // a more natural chronological order for charts
  }, [events]);

  const mapMarkers: MapMarkerData[] = useMemo(() => {
    return events
      .map(event => {
        const location = event.analysis.affectedLocation;
        const coords = locationCoordinates[location];
        if (!coords) return null;

        return {
          id: event.analysis.id,
          position: coords,
          severity: event.analysis.severity,
          summary: event.analysis.summary,
        };
      })
      .filter((marker): marker is MapMarkerData => marker !== null);
  }, [events]);

  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <DashboardHeader 
        onSimulate={handleSimulateEvent} 
        isLoading={isLoading}
        productName={productName}
        onProductNameChange={setProductName}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {events.length === 0 ? (
           <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-150px)]">
              <h2 className="text-2xl font-headline font-semibold text-foreground/80">Welcome to PharmaChain Resilience</h2>
              <p className="mt-2 text-muted-foreground max-w-md">
                Enter a product name (optional) and click the "Simulate New Event" button to begin analyzing pharmaceutical supply chain risks.
              </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-screen-2xl grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <RiskScoreCard score={aggregatedRiskScore} />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <RiskTimelineChart data={timelineData} />
            </div>
            <div className="col-span-12 lg:col-span-7">
              <RiskMap markers={mapMarkers} />
            </div>
            <div className="col-span-12 lg:col-span-5">
              <AlertFeed events={events} />
            </div>
            <div className="col-span-12">
              <ContingencyPlan data={latestEvent?.contingency} isLoading={isLoading && events.length === 0} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
