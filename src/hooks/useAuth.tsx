
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../store';
import { 
  login as loginAction, 
  signup as signupAction, 
  logout as logoutAction,
  checkAuthStatus 
} from '../store/slices/authSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  name: string;
}

/**
 * Custom hook for authentication state and actions
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, status, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      const resultAction = await dispatch(loginAction(credentials));
      if (loginAction.fulfilled.match(resultAction)) {
        navigate('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // Signup function
  const signup = async (credentials: SignupCredentials) => {
    try {
      const resultAction = await dispatch(signupAction(credentials));
      if (signupAction.fulfilled.match(resultAction)) {
        navigate('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await dispatch(logoutAction());
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Function to require authentication
  const requireAuth = (callback: () => void) => {
    if (!isAuthenticated && status !== 'loading') {
      navigate('/login');
    } else if (isAuthenticated) {
      callback();
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading: status === 'loading',
    error,
    login,
    signup,
    logout,
    requireAuth,
  };
};
