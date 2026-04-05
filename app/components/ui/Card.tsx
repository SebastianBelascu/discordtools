import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlighted' | 'muted';
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
  style,
}) => {
  const baseStyles = 'relative rounded-[2rem] p-8 sm:p-10 transition-all duration-300 overflow-hidden';
  
  const variants = {
    default: 'bg-zinc-900/40 backdrop-blur-xl border border-white/10',
    highlighted: 'bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl',
    muted: 'bg-zinc-900/30 border border-white/5',
  };

  const hoverStyles = hover ? 'hover:border-white/20 hover:bg-zinc-900/60' : '';

  return (
    <div style={style} className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
      {children}
    </div>
  );
};
