import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, MenuIcon, CheckSquare, User, Sparkles, Calendar, Clock, Target } from 'lucide-react';
import TaskInput from '@/components/Tasks/TaskInput';
import TaskList from '@/components/Tasks/TaskList';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md sticky top-0 z-10">
          <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <img 
                src="/logo-icon.png" 
                alt="logo" 
                className="h-8 w-8 mr-2 bg-white p-1 rounded-full"
              />
              <h1 className="text-2xl font-bold text-white">
                Taskify
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              {user && (
                <div className="hidden md:flex items-center gap-2 text-sm text-orange-600 font-semibold bg-white px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
                  <User className="h-4 w-4 text-orange-500" />
                  <span>
                    {user.name}
                  </span>
                </div>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout} 
                className="flex text-white hover:bg-white hover:text-orange-600 items-center gap-2 rounded-full transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </motion.div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 md:py-8 bg-gray-50/50 rounded-lg mt-6 shadow-sm">
          {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-2 text-orange-600">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-orange-600/80">
              Let's organize your day and boost your productivity
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-orange-600/70">Total Tasks</p>
                  <h3 className="text-2xl font-bold text-orange-600">12</h3>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-orange-600/70">Due Today</p>
                  <h3 className="text-2xl font-bold text-orange-600">3</h3>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-orange-600/70">Completed</p>
                  <h3 className="text-2xl font-bold text-orange-600">8</h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Task Input and List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <TaskInput />
            <TaskList />
          </motion.div>
        </main>
        
        {/* Footer */}
        <footer className="py-4 md:py-6 border-t mt-6">
          <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-orange-600">
            <p className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              © {new Date().getFullYear()} Taskify. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
