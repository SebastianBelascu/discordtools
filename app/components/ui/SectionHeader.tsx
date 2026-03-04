import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  withDividers?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  withDividers = false,
}) => {
  return (
    <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-normal text-zinc-300 mb-8 backdrop-blur-sm uppercase tracking-wider">
          {BadgeIcon && <BadgeIcon className="w-4 h-4 text-zinc-400 [stroke-width:1.5]" />}
          <span>{badge}</span>
        </div>
      )}

      {withDividers ? (
        <div className="flex items-center justify-center w-full max-w-4xl mx-auto gap-6 sm:gap-12 mb-6">
          <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white whitespace-nowrap">
            {title}
          </h2>
          <div className="hidden sm:block h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      ) : (
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
          {title}
        </h2>
      )}

      <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
};
