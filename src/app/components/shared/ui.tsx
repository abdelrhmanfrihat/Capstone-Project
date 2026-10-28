import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowRight, CheckCircle, AlertTriangle, XCircle, Info, Star, BrainCircuit } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden", className)} {...props}>
    {children}
  </div>
);

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClass = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    };
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-lg"
    };

    return (
      <button ref={ref} className={cn(baseClass, variants[variant], sizes[size], className)} {...props} />
    );
  }
);
Button.displayName = "Button";

export const Badge = ({ className, variant = 'neutral', children }: { className?: string, variant?: 'default' | 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'blue' | 'purple' | 'training', children: React.ReactNode }) => {
  const variants = {
    default: "border-[var(--border-main)] bg-transparent text-[var(--text-main)]",
    neutral: "border-[var(--border-main)] bg-transparent text-[var(--text-main)]",
    success: "border-green-200 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400",
    warning: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400",
    danger: "border-red-200 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400",
    info: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-400",
    blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-400",
    purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-400",
    training: "border-amber-200 bg-amber-50 text-amber-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
  };
  return (
    <span className={cn(className, "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium [&>svg]:size-3.5 [&>svg]:shrink-0", variants[variant])}>
      {children}
    </span>
  );
};

export const StatusBadge = ({ status, tone = 'workflow' }: { status: string, tone?: 'workflow' | 'admin' }) => {
  const map: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'training'> = {
    'Active': tone === 'admin' ? 'success' : 'info',
    'Applied': 'info',
    'Shortlisted': 'purple',
    'Interview': 'warning',
    'Matched': 'success',
    'In Training': 'training',
    'Rejected': 'default',
    'Released': 'info',
    'Suspended': 'danger',
    'Pending': 'warning',
    'Verified': 'success'
  };
  
  return <Badge variant={map[status] || 'default'}>{status}</Badge>;
};

export const MatchScore = ({ score, size = 'md' }: { score: number, size?: 'sm' | 'md' | 'lg' }) => {
  let color = "text-green-700 dark:text-green-400";
  let bg = "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
  if (score < 75) {
    color = "text-amber-800 dark:text-yellow-400";
    bg = "bg-amber-50 border-amber-200 dark:bg-yellow-900/20 dark:border-yellow-800";
  }
  if (score < 50) {
    color = "text-red-700 dark:text-red-400";
    bg = "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
  }

  const sizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-xl",
    lg: "w-20 h-20 text-3xl"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center rounded-full border-4 font-bold shadow-sm", bg, color, sizes[size])}>
      <span>{score}%</span>
    </div>
  );
};

export const AIExplanation = ({ score, strong, weak, message }: { score: number, strong: string[], weak: string[], message?: string }) => (
  <Card className="p-4 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800">
    <div className="flex items-start gap-4">
      <div className="mt-1">
        <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 space-y-3">
        <div>
          <h4 className="font-semibold text-foreground dark:text-white flex items-center gap-2">
            AI Match Analysis <Badge variant="info">{score}% Match</Badge>
          </h4>
          {message && <p className="text-sm text-[var(--text-body)] dark:text-gray-300 mt-1">{message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wider">Strong Matches</span>
            <div className="flex flex-wrap gap-1">
              {strong.map(s => <Badge key={s} variant="success" className="text-[10px]">{s}</Badge>)}
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-medium text-amber-700 dark:text-yellow-400 uppercase tracking-wider">Missing / Weak</span>
            <div className="flex flex-wrap gap-1">
              {weak.map(w => <Badge key={w} variant="warning" className="text-[10px]">{w}</Badge>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-400",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-400",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";
