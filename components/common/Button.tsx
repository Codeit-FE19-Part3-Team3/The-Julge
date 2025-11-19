import type { ButtonHTMLAttributes } from 'react';

import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'shrink-0 transition-colors font-bold text-center rounded-md w-full',
  {
    variants: {
      variant: {
        primary:
          'bg-red-50 border border-red-50 text-white hover:bg-white hover:text-red-50 cursor-pointer',
        secondary:
          'bg-white border border-red-50 text-red-50 hover:bg-red-50 hover:text-white cursor-pointer',
      },
      size: {
        large: 'max-w-[350px] h-[48px] text-base',
        medium: 'max-w-[108px] h-[37px] text-sm',
        small: 'max-w-[82px] h-[32px] font-normal text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /** 버튼 variant */
  variant?: 'primary' | 'secondary';
  /** 버튼 크기 */
  size?: 'large' | 'medium' | 'small';
  /** disabled 상태 */
  disabled?: boolean;
}

const Button = ({
  children,
  className,
  variant,
  size,
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses = buttonVariants({ variant, size, className });
  const disabledClasses = disabled
    ? '!bg-gray-40 !border-gray-40 !text-white !cursor-not-allowed pointer-events-none hover:!bg-gray-40 hover:!text-white'
    : '';

  return (
    <button
      type="button"
      className={`${baseClasses} ${disabledClasses}`}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
