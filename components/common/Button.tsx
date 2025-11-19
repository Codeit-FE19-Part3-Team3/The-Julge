import React from 'react';

interface ButtonProps {
  /** 버튼에 표시될 텍스트 */
  label: string;
  /** 버튼 크기: small, medium, large */
  size?: 'small' | 'medium' | 'large';
  /** 버튼 스타일: primary / secondary */
  variant?: 'primary' | 'secondary';
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 버튼 클릭 시 호출될 함수 */
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  onClick,
}) => {
  // 사이즈별 스타일
  const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
    large:
      'w-[350px] h-[48px] font-bold text-base md:text-base text-center rounded-md',
    medium: 'w-[108px] h-[37px] font-bold text-sm text-center rounded-md',
    small: 'w-[82px] h-[32px] font-normal text-xs text-center rounded-md',
  };
  // 상태별 스타일
  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-red-50 border-[1px] border border-red-50 text-white hover:bg-white hover:text-red-50',
    secondary:
      'bg-white border-[1px] border border-red-50 text-red-50 hover:bg-red-50 hover:text-white',
  };

  // disabled 상태 클래스
  const disabledClasses =
    'bg-gray-40 text-white cursor-not-allowed pointer-events-none';

  return (
    <button
      className={`${sizeClasses[size]} ${
        disabled ? disabledClasses : variantClasses[variant]
      } shrink cursor-pointer transition-colors`}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
