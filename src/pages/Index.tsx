
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/50">
        {/* Hero section */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Manage Tasks with Elegance
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A minimalist task management application with a premium feel.
              Stay organized, track priorities, and increase productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                className="transition-all duration-300 text-lg"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                variant="outline"
                size="lg"
                className="transition-all duration-300 text-lg"
              >
                Create Account
              </Button>
            </div>
          </motion.div>
        </main>

        {/* Features section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Task Prioritization"
                description="Assign high, medium, or low priority to your tasks and focus on what matters most."
                delay={0.1}
              />
              <FeatureCard
                title="Weather Integration"
                description="Add locations to your tasks and get real-time weather data to plan outdoor activities."
                delay={0.2}
              />
              <FeatureCard
                title="Elegant Experience"
                description="Enjoy a premium, minimalist interface with smooth animations and transitions."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskSphere. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className="glass-panel glass-panel-hover p-6 rounded-lg"
  >
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export default Index;
