"use client";

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username: string;
  password: string;
}

interface TouchedFields {
  username: boolean;
  password: boolean;
}

type FieldStatus = 'default' | 'error' | 'success';

const Auth: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    username: '',
    password: ''
  });
  
  const [touched, setTouched] = useState<TouchedFields>({
    username: false,
    password: false
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  
  // Secret feature states
  const [lockClickCount, setLockClickCount] = useState<number>(0);
  const [showSecretFeature, setShowSecretFeature] = useState<boolean>(false);
  const [lockAnimation, setLockAnimation] = useState<string>('');

  useEffect(() => {
    // Simulate checking authentication
    const checkAuth = (): void => {
      const storedAuth: string | null = sessionStorage.getItem('adminAuth');
      if (storedAuth === 'true') {
        console.log('Already authenticated, would redirect to /admin');
      }
      setAuthChecked(true);
    };
    
    checkAuth();
  }, []);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: validateField('username', formData.username),
      password: validateField('password', formData.password)
    };
    
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const isFormValid = (): boolean => {
    return formData.username.trim().length > 0 && 
           formData.password.trim().length > 0 && 
           !errors.username && 
           !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    const correctUsername: string = 'ganesh_sharmaz';
    const correctPassword: string = 'Ganesh@123';

    if (formData.username === correctUsername && formData.password === correctPassword) {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin')
      console.log('Login successful, redirecting to /admin');
    } else {
      setErrors({
        username: 'Invalid username or password',
        password: 'Invalid username or password'
      });
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    if (touched[name as keyof TouchedFields]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const getFieldStatus = (fieldName: keyof FormData): FieldStatus => {
    if (!touched[fieldName]) return 'default';
    if (errors[fieldName]) return 'error';
    if (formData[fieldName].trim()) return 'success';
    return 'default';
  };

  // Secret feature handler
  const handleLockClick = (): void => {
    const newCount = lockClickCount + 1;
    setLockClickCount(newCount);

    // Trigger animation based on click count
    if (newCount === 1) {
      setLockAnimation('animate-pulse');
    } else if (newCount === 2) {
      setLockAnimation('animate-bounce');
    } else if (newCount === 3) {
      setLockAnimation('animate-spin');
    } else if (newCount === 4) {
      setLockAnimation('animate-ping');
    } else if (newCount === 5) {
      setLockAnimation('animate-pulse');
      setShowSecretFeature(true);
      // Reset after showing secret
      setTimeout(() => {
        setLockAnimation('');
      }, 2000);
    }

    // Clear animation after a short delay for clicks 1-4
    if (newCount < 5) {
      setTimeout(() => {
        setLockAnimation('');
      }, 1000);
    }

    // Reset counter after 10 seconds of inactivity
    setTimeout(() => {
      if (newCount < 5) {
        setLockClickCount(0);
      }
    }, 10000);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className={`mx-auto h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${lockAnimation} ${
              lockClickCount > 0 ? 'ring-4 ring-indigo-300' : ''
            }`}
            onClick={handleLockClick}
            title={lockClickCount > 0 ? `${lockClickCount}/5 clicks` : 'Click me!'}
          >
            <Lock className={`h-8 w-8 text-white transition-all duration-300 ${
              lockClickCount >= 3 ? 'transform rotate-12' : ''
            }`} />
            {lockClickCount >= 2 && (
              <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
          
          {/* Click counter indicator */}
          {lockClickCount > 0 && lockClickCount < 5 && (
            <div className="mt-2 flex justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < lockClickCount ? 'bg-indigo-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors duration-200 ${
                    getFieldStatus('username') === 'error' ? 'text-red-400' :
                    getFieldStatus('username') === 'success' ? 'text-green-400' :
                    'text-gray-400'
                  }`} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className={`block w-full pl-10 pr-10 py-3 rounded-xl border-2 transition-all duration-200 ${
                    getFieldStatus('username') === 'error' 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' :
                    getFieldStatus('username') === 'success'
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-200' :
                      'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
                  } focus:ring-4 focus:outline-none placeholder-gray-400`}
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {getFieldStatus('username') === 'success' && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-400 animate-pulse" />
                  </div>
                )}
                {getFieldStatus('username') === 'error' && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 animate-pulse" />
                  </div>
                )}
              </div>
              {errors.username && (
                <div className="mt-2 flex items-center text-sm text-red-600 animate-slide-down">
                  <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                  {errors.username}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${
                    getFieldStatus('password') === 'error' ? 'text-red-400' :
                    getFieldStatus('password') === 'success' ? 'text-green-400' :
                    'text-gray-400'
                  }`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`block w-full pl-10 pr-10 py-3 rounded-xl border-2 transition-all duration-200 ${
                    getFieldStatus('password') === 'error' 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' :
                    getFieldStatus('password') === 'success'
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-200' :
                      'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
                  } focus:ring-4 focus:outline-none placeholder-gray-400`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center group"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mt-2 flex items-center text-sm text-red-600 animate-slide-down">
                  <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              onClick={handleSubmit}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isFormValid() && !isLoading
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Secret Feature - Hidden Help Text */}
          {showSecretFeature && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-200 animate-slide-down">
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-purple-600 mr-2 animate-pulse" />
                <h3 className="text-sm font-semibold text-purple-800">🎉 Secret Unlocked!</h3>
              </div>
              <div className="text-xs text-purple-700 space-y-1">
                <p><span className="font-medium">👤 Username:</span> ganesh_sharmaz</p>
                <p><span className="font-medium">🔐 Password:</span> Ganesh@123</p>
                <p className="text-purple-600 italic mt-2">You found the hidden easter egg! 🥚</p>
              </div>
            </div>
          )}

          {/* Regular Help Text */}
          {!showSecretFeature && (
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                💡 Try clicking the lock icon above multiple times...
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Secured by advanced authentication
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Auth;