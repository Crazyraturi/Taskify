
import React from 'react';
import SignupForm from '@/components/Auth/SignupForm';
import PageTransition from '@/components/layout/PageTransition';

const Signup: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">TaskSphere</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>
        <SignupForm />
      </div>
    </PageTransition>
  );
};

export default Signup;
