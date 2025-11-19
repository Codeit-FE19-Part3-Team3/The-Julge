import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'shrink transition-colors font-bold text-center rounded-md w-full',
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
      disabled: {
        true: 'cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        disabled: true,
        class:
          '!bg-gray-40 !border-gray-40 !text-white hover:!bg-gray-40 hover:!text-white',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      disabled: false,
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  /** 버튼에 표시될 텍스트 */
  label: string;
  /** 버튼 클릭 시 호출될 함수 */
  onClick?: () => void;
  /** disabled 상태 */
  disabled?: boolean;
}

const Button = ({
  label,
  onClick,
  disabled = false,
  variant,
  size,
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({
        variant,
        size,
        disabled,
      })}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
