import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'default' | 'pulse';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  icon: Icon,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 backdrop-blur-md shadow-lg shadow-black/20 ${className}`}>
      {variant === 'pulse' && (
        <div className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
      )}
      {Icon && <Icon className="w-4 h-4 text-zinc-400 [stroke-width:1.5]" />}
      <span className="tracking-wide uppercase text-xs sm:text-sm">{children}</span>
    </div>
  );
};
