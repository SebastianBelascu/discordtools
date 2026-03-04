import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  href,
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-300';
  
  const variants = {
    primary: 'bg-gradient-to-r from-pink-400 to-fuchsia-500 text-white hover:opacity-90 shadow-[0_0_20px_-5px_rgba(236,72,153,0.4)]',
    secondary: 'bg-zinc-800/40 border border-white/10 hover:border-transparent hover:bg-gradient-to-r hover:from-pink-400 hover:to-fuchsia-500 text-white hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)]',
    ghost: 'bg-zinc-900/40 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-white/20',
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 [stroke-width:1.5]" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-1 opacity-60 group-hover:opacity-100 transition-opacity [stroke-width:1.5]" />}
    </>
  );

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
