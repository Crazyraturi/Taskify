import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/Auth/LoginForm";
import PageTransition from "@/components/layout/PageTransition";

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
        <div className="w-full max-w-md mb-8 text-center">
          <div className="flex items-center justify-center">
            <img src="/logo-icon.png" alt="logo.png" />
            <h1 className="text-3xl font-bold mb-2">taskify</h1>
          </div>

          <p className="text-muted-foreground">
            Manage your tasks with elegance
          </p>
        </div>
        <LoginForm />
      </div>
    </PageTransition>
  );
};

export default Login;
