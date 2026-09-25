import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  trend?: {
    value: number;
    label?: string;
  };
}

const variantClasses = {
  default: 'bg-primary-50 text-primary-600',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-red-50 text-red-600',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  trend,
}: StatCardProps) {
  return (
    <div className="card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 truncate">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.value >= 0 ? (
                <TrendingUp className="w-3 h-3 text-green-600" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-600" />
              )}
              <span
                className={`text-xs font-medium ${
                  trend.value >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.value >= 0 ? '+' : ''}
                {trend.value.toFixed(1)}%
              </span>
              {trend.label && <span className="text-xs text-gray-400">{trend.label}</span>}
            </div>
          )}
        </div>
        <div className={`p-2.5 rounded-lg flex-shrink-0 ${variantClasses[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
