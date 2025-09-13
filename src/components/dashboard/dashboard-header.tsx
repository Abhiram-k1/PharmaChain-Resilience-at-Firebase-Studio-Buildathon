'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PharmaChainLogo } from '@/components/icons';
import { Bot, Loader2 } from 'lucide-react';

type DashboardHeaderProps = {
  onSimulate: () => void;
  isLoading: boolean;
};

export function DashboardHeader({ onSimulate, isLoading }: DashboardHeaderProps) {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4 sm:px-6 md:px-8 max-w-screen-2xl">
        <div className="mr-4 flex items-center">
          <PharmaChainLogo className="h-8 w-8 text-primary" />
          <h1 className="ml-2 text-xl font-bold font-headline">
            PharmaChain Resilience
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button onClick={onSimulate} disabled={isLoading} variant="outline" className="bg-primary/10 border-primary/50 text-primary hover:bg-primary/20 hover:text-primary">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            Simulate New Event
          </Button>
          <Avatar className="h-9 w-9">
             {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
