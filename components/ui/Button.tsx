'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-cursor="active"
        className={clsx(
          'group relative inline-flex items-center gap-2.5 overflow-hidden px-6 py-3 font-body text-sm font-medium transition-colors duration-300',
          variant === 'primary' && 'bg-paper text-void hover:bg-signal-glow',
          variant === 'ghost' &&
            'border border-line2 text-paper hover:border-signal/60 hover:text-signal-glow',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
