
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/layout/PageTransition';

const NotFound: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
        <div className="glass-panel p-8 rounded-xl text-center max-w-md mx-auto">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="transition-all duration-300">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
