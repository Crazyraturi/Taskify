
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/Auth/LoginForm';
import PageTransition from '@/components/layout/PageTransition';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">TaskSphere</h1>
          <p className="text-muted-foreground">Manage your tasks with elegance</p>
        </div>
        <LoginForm />
      </div>
    </PageTransition>
  );
};

export default Login;
