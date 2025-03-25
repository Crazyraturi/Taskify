
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/50">
        {/* Header */}
        <header className="glass-panel border-b sticky top-0 z-10 backdrop-blur-md">
          <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
          <div className='flex items-center ju'>
              <img src="/logo-icon.png" alt="logo" />
              <h1 className="text-2xl border-b-2 border-orange-500 font-bold">Taskify</h1>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-sm text-orange-500 font-semibold text-muted-foreground hidden md:inline-block">
                  Welcome, {user.name}
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={logout} className="flex hover:border  hover:border-orange-500 items-center gap-2">
                <LogOut className="h-4  w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 container mx-auto py-8 px-4 sm:px-6">
          <TaskInput />
          <TaskList />
        </main>
        
        {/* Footer */}
        <footer className="py-6 border-t">
          <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} TaskSphere. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
