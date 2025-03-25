import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, MenuIcon, CheckSquare, User } from 'lucide-react';
import TaskInput from '@/components/Tasks/TaskInput';
import TaskList from '@/components/Tasks/TaskList';
import PageTransition from '@/components/layout/PageTransition';

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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
        {/* Header */}
        <header className="glass-panel border-b sticky top-0 z-10 backdrop-blur-md shadow-sm">
          <div className="container mx-auto py-3 px-4 sm:px-6 flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/logo-icon.png" 
                alt="logo" 
                className="h-8 w-8 mr-2"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                Taskify
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden md:flex items-center gap-2 text-sm text-orange-500 font-semibold bg-orange-50 px-3 py-1 rounded-full">
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
                className="flex hover:bg-red-50 hover:text-red-500 items-center gap-2 rounded-full"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 md:py-8">
          <TaskInput />
          <TaskList />
        </main>
        
        {/* Footer */}
        <footer className="py-4 md:py-6 border-t bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Taskify. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
