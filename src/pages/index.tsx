import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Sparkles, Target, Clock, Calendar, Zap } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

const Index: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-orange-500/[0.02] -z-10" />
          <div className="container mx-auto px-4 sm:px-6 py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-500 text-sm font-medium mb-6"
              >
                <Sparkles className="h-4 w-4" />
                <span>Your Personal Task Manager</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                Organize Your Tasks, Boost Your Productivity
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Taskify helps you manage your tasks efficiently with a beautiful interface and powerful features.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-orange-200 hover:bg-orange-50">
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                Why Choose Taskify?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the perfect blend of simplicity and power with our task management solution.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Target className="h-8 w-8 text-orange-500" />,
                  title: "Smart Task Management",
                  description: "Organize tasks with priority levels, due dates, and categories for better efficiency."
                },
                {
                  icon: <Clock className="h-8 w-8 text-orange-500" />,
                  title: "Real-time Updates",
                  description: "Stay on top of your tasks with instant updates and notifications."
                },
                {
                  icon: <Calendar className="h-8 w-8 text-orange-500" />,
                  title: "Beautiful Calendar View",
                  description: "Visualize your schedule with our intuitive calendar interface."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6 rounded-xl border border-orange-200/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="p-3 bg-orange-100 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-panel p-8 md:p-12 rounded-2xl border border-orange-200/50 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                Ready to Boost Your Productivity?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already managing their tasks efficiently with Taskify.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Start Free Trial <Zap className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/logo-icon.png" alt="Taskify" className="h-6 w-6" />
                <span className="font-semibold text-orange-500">Taskify</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index; 