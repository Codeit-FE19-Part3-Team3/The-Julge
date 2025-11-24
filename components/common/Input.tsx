import { useState } from 'react';

/**
 * Input 컴포넌트
 *
 * @description
 * - text, email, password, number, select 타입 지원
 * - email: onBlur 시 형식 검사
 * - password: onBlur 시 길이 검사 (최소 8자) 또는 일치 검사
 * - select: 부모에서 Dropdown 제어, onToggleDropdown과 isDropdownOpen으로 연동
 * - number: unit prop으로 단위 표시
 *
 * @example
 * // 이메일
 * <Input type="email" value={email} onChange={setEmail} placeholder="이메일" />
 *
 * // 비밀번호
 * <Input type="password" value={password} onChange={setPassword} placeholder="비밀번호" />
 *
 * // 비밀번호 확인
 * <Input
 *   type="password"
 *   value={passwordConfirm}
 *   onChange={setPasswordConfirm}
 *   matchValue={password}
 *   placeholder="비밀번호 확인"
 * />
 *
 * // 셀렉트
 * <Input
 *   type="select"
 *   value={category}
 *   onChange={setCategory}
 *   onToggleDropdown={() => setDropdownOpen(!dropdownOpen)}
 *   isDropdownOpen={dropdownOpen}
 *   placeholder="선택"
 * />
 *
 * // 시급
 * <Input type="number" value={wage} onChange={setWage} unit="원" placeholder="시급" />
 */

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'select';
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  unit?: string;
  matchValue?: string;
  className?: string;
  onToggleDropdown?: () => void;
  isDropdownOpen?: boolean;
}

// 공통 스타일 함수
const inputVariants = ({ error }: { error: boolean }) => {
  return `w-full text-base h-[58px] px-4 py-3 border rounded-lg transition-colors outline-none ${
    error
      ? 'border-red-40 focus:border-red-40'
      : 'border-gray-30 focus:border-blue-20'
  }`;
};

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  unit,
  matchValue,
  className,
  onToggleDropdown,
  isDropdownOpen = false,
}: InputProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 이메일 형식 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 길이 검사 (8자 이상)
  const validatePassword = (password: string): boolean => password.length >= 8;

  // 비밀번호 일치 검사
  const validatePasswordMatch = (password: string, confirm: string): boolean =>
    password === confirm;

  // onBlur 시 검증
  const handleBlur = () => {
    if (!value) {
      setErrorMessage('');
      return;
    }

    if (type === 'email') {
      setErrorMessage(
        validateEmail(value) ? '' : '올바른 이메일 형식이 아닙니다.'
      );
    } else if (type === 'password') {
      if (matchValue !== undefined) {
        // 비밀번호 확인
        setErrorMessage(
          validatePasswordMatch(matchValue, value)
            ? ''
            : '비밀번호가 일치하지 않습니다.'
        );
      } else {
        // 비밀번호 길이 검사
        setErrorMessage(
          validatePassword(value)
            ? ''
            : '비밀번호는 최소 8자 이상이어야 합니다.'
        );
      }
    }
  };

  // 셀렉트 타입 클릭 이벤트
  const handleClick = () => {
    if (type === 'select') {
      onToggleDropdown?.();
    }
  };

  return (
    <div className={`w-full ${className ?? ''}`}>
      <div className="relative">
        <input
          type={
            type === 'select' ? 'text' : type === 'number' ? 'number' : type
          }
          readOnly={type === 'select'}
          value={value}
          onClick={handleClick}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${inputVariants({
            error: Boolean(errorMessage),
          })} ${type === 'select' || unit ? 'pr-10' : ''}`}
        />

        {type === 'select' && (
          <svg
            className={`pointer-events-none absolute top-1/2 right-5 h-2 w-3 -translate-y-1/2 text-gray-500 transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            fill="#111322"
            viewBox="0 0 13 8">
            <path d="M7.00324 7.7268L12.6032 1.3268C13.0558 0.809537 12.6885 0 12.0012 0L0.801179 0C0.113852 0 -0.25349 0.809537 0.199118 1.3268L5.79912 7.7268C6.11785 8.09107 6.68451 8.09107 7.00324 7.7268Z" />
          </svg>
        )}

        {/* Number 타입 단위 표시 */}
        {unit && (
          <span className="absolute top-1/2 right-5 -translate-y-1/2 text-sm text-black">
            {unit}
          </span>
        )}
      </div>

      {/* 에러 메시지 */}
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
