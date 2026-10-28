import React from 'react';
import { useNavigate } from 'react-router';
import { BrainCircuit, GraduationCap, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button, Card } from './shared/ui';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">InternMatch AI</span>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Intelligent Matching for the Future of Work
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Deep profiling, AI-powered compatibility, and feedback-driven skill building. Choose your portal to begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700" onClick={() => navigate('/auth/student/login')}>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Student Portal</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[48px]">Build your AI profile without a CV. Get matched to opportunities that fit your exact skills and goals.</p>
              <Button className="w-full justify-between group">
                Enter as Student
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-indigo-100 dark:border-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-700" onClick={() => navigate('/auth/company/login')}>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Company Portal</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[48px]">Find highly compatible candidates based on technical, behavioral, and soft skills.</p>
              <Button variant="secondary" className="w-full justify-between group bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50">
                Enter as Company
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600" onClick={() => navigate('/auth/admin/login')}>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[48px]">Manage the platform, verify companies, update matching rules, and resolve disputes.</p>
              <Button variant="outline" className="w-full justify-between group">
                Enter as Admin
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
