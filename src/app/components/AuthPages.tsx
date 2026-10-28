import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BrainCircuit } from 'lucide-react';
import { Card, Button, Input, Label } from './shared/ui';

export const AuthPages = ({ role }: { role: 'student' | 'company' | 'admin' }) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') navigate(isRegister ? '/student/assessment' : '/student/dashboard');
    if (role === 'company') navigate(isRegister ? '/company/pending-verification' : '/company/dashboard');
    if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <BrainCircuit className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {role === 'admin' ? 'Admin Login' : (isRegister ? `Create ${role} Account` : `${role.charAt(0).toUpperCase() + role.slice(1)} Login`)}
        </h2>
        
        {role === 'student' && isRegister && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
            <strong>No CV required.</strong> Your profile will be built through our AI assessment.
          </p>
        )}
        
        {role === 'company' && isRegister && (
          <p className="text-center text-sm text-amber-700 dark:text-yellow-400 mb-6 bg-amber-50 dark:bg-yellow-900/30 p-3 rounded-lg border border-amber-200 dark:border-yellow-800">
            Your company account must be verified by an admin before posting opportunities.
          </p>
        )}

        {role === 'admin' && (
          <p className="text-center text-sm text-red-600 dark:text-red-400 mb-6 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg border border-red-100 dark:border-red-800">
            Secure admin portal. Authorized personnel only.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="name">{role === 'company' ? 'Company Name' : 'Full Name'}</Label>
              <Input id="name" required placeholder={role === 'company' ? 'Acme Corp' : 'John Doe'} />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" required placeholder="name@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          
          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" required />
            </div>
          )}

          <Button type="submit" className="w-full mt-6">
            {role === 'admin' ? 'Sign In' : (isRegister ? 'Create Account' : 'Sign In')}
          </Button>
        </form>

        {role !== 'admin' && (
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setIsRegister(!isRegister)} className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium">
              {isRegister ? 'Sign In' : 'Create one'}
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};
