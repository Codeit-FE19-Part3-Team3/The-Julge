/**
 @description
 * - text, email, password, number, select 타입 지원
 * - email: onBlur 시 형식 검사
 * - password: onBlur 시 길이 검사 (최소 8자) 또는 일치 검사
 * - select: 부모에서 Dropdown 제어, onToggleDropdown과 isDropdownOpen으로 연동
 * - number: unit prop으로 단위 표시
 * - 에러 상태는 부모에서 관리 (상태 끌어올리기 패턴)
 *
 * @example
 * // 이메일
 * const [email, setEmail] = useState('');
 * const [emailError, setEmailError] = useState('');
 * 
 * <Input 
 *   type="email" 
 *   value={email} 
 *   onChange={setEmail}
 *   error={emailError}
 *   onValidate={(isValid, message) => setEmailError(message)}
 *   placeholder="이메일" 
 * />
 *
 * // 비밀번호
 * const [password, setPassword] = useState('');
 * const [passwordError, setPasswordError] = useState('');
 * 
 * <Input 
 *   type="password" 
 *   value={password} 
 *   onChange={setPassword}
 *   error={passwordError}
 *   onValidate={(isValid, message) => setPasswordError(message)}
 *   placeholder="비밀번호" 
 * />
 *
 * // 비밀번호 확인
 * const [passwordConfirm, setPasswordConfirm] = useState('');
 * const [passwordConfirmError, setPasswordConfirmError] = useState('');
 * 
 * <Input
 *   type="password"
 *   value={passwordConfirm}
 *   onChange={setPasswordConfirm}
 *   matchValue={password}
 *   error={passwordConfirmError}
 *   onValidate={(isValid, message) => setPasswordConfirmError(message)}
 *   placeholder="비밀번호 확인"
 * />
 *
 * // 셀렉트 (Dropdown 컴포넌트와 함께 사용)
 * import Dropdown from '@/components/Dropdown';
 * 
 * const [category, setCategory] = useState('');
 * const [dropdownOpen, setDropdownOpen] = useState(false);
 * 
 * <div className="relative"> // relative필수
 *   <Input
 *     type="select"
 *     value={category}
 *     onChange={setCategory}
 *     onToggleDropdown={() => setDropdownOpen(!dropdownOpen)}
 *     isDropdownOpen={dropdownOpen}
 *     placeholder="선택"
 *   />
 *   {dropdownOpen && (
 *     <Dropdown
 *       items={['음식점', '카페', '편의점', '숙박', '기타']}
 *       selected={category}
 *       onSelect={(value) => {
 *         setCategory(value);
 *         setDropdownOpen(false);
 *       }}
 *       onClose={() => setDropdownOpen(false)}
 *     />
 *   )}
 * </div>
 *
 * // 시급
 * const [wage, setWage] = useState('');
 * 
 * <Input 
 *   type="number" 
 *   value={wage} 
 *   onChange={setWage} 
 *   unit="원" 
 *   placeholder="시급" 
 * />
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
  error?: string;
  onValidate?: (isValid: boolean, errorMessage: string) => void;
}

// 공통 스타일 함수
const inputVariants = ({ error }: { error: boolean }) => {
  return `w-full text-base h-[58px] px-4 py-3 border rounded-lg transition-colors outline-none ${
    error
      ? 'border-red-40 focus:border-red-40'
      : 'border-gray-30 focus:border-blue-20'
  }`;
};

// 검증 함수
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => password.length >= 8;

const validatePasswordMatch = (password: string, confirm: string): boolean =>
  password === confirm;

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
  error,
  onValidate,
}: InputProps) => {
  // onBlur 시 검증
  const handleBlur = () => {
    if (!value) {
      onValidate?.(true, '');
      return;
    }

    // 타입별 검증
    if (type === 'email') {
      const isValid = validateEmail(value);
      const errorMessage = isValid ? '' : '잘못된 이메일입니다.';
      onValidate?.(isValid, errorMessage);
    } else if (type === 'password') {
      if (matchValue !== undefined) {
        // 비밀번호 확인
        const isValid = validatePasswordMatch(matchValue, value);
        const errorMessage = isValid ? '' : '비밀번호가 일치하지 않습니다.';
        onValidate?.(isValid, errorMessage);
      } else {
        // 비밀번호 길이 검사
        const isValid = validatePassword(value);
        const errorMessage = isValid ? '' : '8자 이상 입력해 주세요.';
        onValidate?.(isValid, errorMessage);
      }
    }
  };

  const handleClick = () => {
    if (type === 'select') {
      onToggleDropdown?.();
    }
  };

  return (
    <div className={`w-full ${className ?? ''}`}>
      <div className="relative">
        <input
          type={type === 'select' ? 'text' : type}
          readOnly={type === 'select'}
          value={value}
          onClick={handleClick}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${inputVariants({
            error: Boolean(error),
          })} ${type === 'select' || unit ? 'pr-10' : ''}`}
        />

        {/* Select 타입 화살표*/}
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
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
