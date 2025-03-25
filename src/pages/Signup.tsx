
import React from 'react';
import SignupForm from '@/components/Auth/SignupForm';
import PageTransition from '@/components/layout/PageTransition';

const Signup: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
          <div className="w-full max-w-md mb-8 text-center">
          <div className=' flex items-center justify-center'> <img src="/logo-icon.png" alt="logo.png" />
          <h1 className="text-3xl font-bold mb-2">taskify</h1></div>
         
        </div>
        <SignupForm />
      </div>
    </PageTransition>
  );
};

export default Signup;
