import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { isAxiosError } from 'axios';

import {
  ApiErrorResponse,
  LoginRequest,
  SignupRequest,
  UserType,
} from '@/api/types';
import users from '@/api/users';
import AuthRedirect from '@/components/auth/AuthRedirect';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ErrorModal from '@/components/common/modal/ErrorModal';
import useLogin from '@/hooks/useLogin';
import { cn } from '@/lib/utils';

// 회원 유형 옵션
const USER_TYPE_OPTIONS = [
  { type: UserType.EMPLOYEE, label: '알바님' },
  { type: UserType.EMPLOYER, label: '사장님' },
];

// API 메시지 상수
const API_MESSAGE = {
  SUCCESS: '가입이 완료되었습니다!',
  DUPLICATE_EMAIL: '이미 사용중인 이메일입니다.',
  INVALID_INPUT: '입력 정보를 다시 확인해 주세요.',
  SIGNUP_FAILED: '회원가입에 실패했습니다.',
  PROCESSING_ERROR: '회원가입 처리 중 오류가 발생했습니다.',
  LOGIN_FAILED: '비밀번호가 일치하지 않습니다.',
};

/**
 * 통합 인증 페이지 (로그인 + 회원가입)
 * query parameter 'mode'로 구분: login | signup
 */
const Auth = () => {
  const router = useRouter();
  const { mode = 'login' } = router.query;
  const isLoginMode = mode === 'login';

  // API 메시지
  const [apiMessage, setApiMessage] = useState('');
  // Modal 표시 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // form 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    userType: UserType.EMPLOYEE,
  });

  // form 입력값 에러 상태
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // 로그인 훅
  const loginMutation = useLogin();
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  // 로딩 상태
  const isLoading = isLoginMode ? loginMutation.isPending : isSignupLoading;

  // 폼 데이터 업데이트 함수
  const handleInputChange = (
    field: keyof typeof formData,
    value: string | UserType
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // API 에러 초기화
    if (apiMessage) setApiMessage('');
  };

  // 에러 업데이트 함수
  const handleErrorChange = (
    field: keyof typeof formErrors,
    message: string
  ) => {
    setFormErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  // 버튼 비활성화 조건
  const isDisabled = isLoginMode
    ? !formData.email ||
      !formData.password ||
      !!formErrors.email ||
      !!formErrors.password ||
      isLoading
    : !formData.email ||
      !formData.password ||
      !formData.passwordConfirm ||
      formData.password !== formData.passwordConfirm ||
      !!formErrors.email ||
      !!formErrors.password ||
      !!formErrors.passwordConfirm ||
      isLoading;

  // 회원 유형 옵션 버튼 렌더링 함수
  const renderUserTypeButton = (option: { type: UserType; label: string }) => {
    const isSelected = formData.userType === option.type;

    return (
      <button
        key={option.type}
        type="button"
        onClick={() => handleInputChange('userType', option.type)}
        disabled={isLoading}
        className={cn(
          'flex flex-[1_0_0] flex-col items-start gap-2 rounded-[30px] border bg-white px-[41px] py-[13px] transition-all',
          isSelected ? 'border-red-50' : 'border-gray-30'
        )}>
        <div className="flex items-center justify-center gap-2">
          <div
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
              isSelected ? 'border-red-50 bg-red-50' : 'border-gray-30'
            )}>
            {isSelected && (
              <Image
                src="/images/checked.svg"
                width={14}
                height={14}
                alt="회원 유형 선택 아이콘"
              />
            )}
          </div>
          <span className="text-sm leading-[22px]">{option.label}</span>
        </div>
      </button>
    );
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false);
    if (apiMessage === API_MESSAGE.SUCCESS) {
      router.push('/auth?mode=login');
    }
  };

  // 로그인 처리
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    // 유효성 검사
    const newErrors = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
    let formIsValid = true;

    if (!formData.email) {
      newErrors.email = '값을 입력해 주세요.';
      formIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '이메일 형식으로 작성해 주세요.';
      formIsValid = false;
    }

    if (!formData.password) {
      newErrors.password = '값을 입력해 주세요.';
      formIsValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = '8자 이상 입력해 주세요.';
      formIsValid = false;
    }

    setFormErrors(newErrors);

    if (!formIsValid) return;

    const loginData: LoginRequest = {
      email: formData.email,
      password: formData.password,
    };

    loginMutation.mutate(loginData, {
      onError: (error) => {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            setApiMessage(API_MESSAGE.LOGIN_FAILED);
            setIsModalOpen(true);
          }
        }
      },
    });
  };

  // 회원가입 처리
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const newErrors = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
    let formIsValid = true;

    if (!formData.email) {
      newErrors.email = '값을 입력해 주세요.';
      formIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '이메일 형식으로 작성해 주세요.';
      formIsValid = false;
    }

    if (!formData.password) {
      newErrors.password = '값을 입력해 주세요.';
      formIsValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = '8자 이상 입력해 주세요.';
      formIsValid = false;
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = '값을 입력해 주세요.';
      formIsValid = false;
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
      formIsValid = false;
    }

    setFormErrors(newErrors);

    if (!formIsValid) return;

    setIsSignupLoading(true);
    setApiMessage('');

    const signupData: SignupRequest = {
      email: formData.email,
      password: formData.password,
      type: formData.userType,
    };

    try {
      const response = await users.signup(signupData);

      console.log('회원가입 성공:', response);
      setApiMessage(API_MESSAGE.SUCCESS);
      setIsModalOpen(true);
    } catch (error) {
      console.error('회원가입 실패:', error);

      if (isAxiosError<ApiErrorResponse>(error) && error.response) {
        const { status, data } = error.response;
        const message = data?.message;

        if (status === 409) {
          setApiMessage(message || API_MESSAGE.DUPLICATE_EMAIL);
          setIsModalOpen(true);
        } else if (status === 400) {
          setApiMessage(message || API_MESSAGE.INVALID_INPUT);
          setIsModalOpen(true);
        }
      } else {
        setApiMessage(API_MESSAGE.PROCESSING_ERROR);
        setIsModalOpen(true);
      }
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleSubmit = isLoginMode ? handleLogin : handleSignup;

  return (
    <>
      <Head>
        <title>{isLoginMode ? '로그인' : '회원가입'} | The-Julge</title>
        <meta
          name="description"
          content={isLoginMode ? '로그인 페이지' : '회원가입 페이지'}
        />
      </Head>
      <div className="flex h-screen w-screen justify-center p-5">
        <div className="flex w-full max-w-[350px] flex-col items-center justify-center">
          {/* 로고 */}
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="The Julge 로고"
              width={208}
              height={38}
              className="md:h-[45px] md:w-[248px]"
              priority
            />
          </Link>

          {/* 폼 */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full flex-col gap-7">
            {/* 이메일 */}
            <Input
              type="email"
              label="이메일"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              error={formErrors.email}
              onValidate={(isValid, message) =>
                handleErrorChange('email', message)
              }
              placeholder="입력"
              disabled={isLoading}
            />

            {/* 비밀번호 */}
            <Input
              type="password"
              label="비밀번호"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              error={formErrors.password}
              onValidate={(isValid, message) =>
                handleErrorChange('password', message)
              }
              placeholder="입력"
              disabled={isLoading}
            />

            {/* 비밀번호 확인 (회원가입 모드만) */}
            {!isLoginMode && (
              <Input
                type="password"
                label="비밀번호 확인"
                value={formData.passwordConfirm}
                onChange={(value) =>
                  handleInputChange('passwordConfirm', value)
                }
                matchValue={formData.password}
                error={formErrors.passwordConfirm}
                onValidate={(isValid, message) =>
                  handleErrorChange('passwordConfirm', message)
                }
                placeholder="입력"
                disabled={isLoading}
              />
            )}

            {/* 회원 유형 (회원가입 모드만) */}
            {!isLoginMode && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  회원 유형
                </label>
                <div className="flex gap-4">
                  {USER_TYPE_OPTIONS.map(renderUserTypeButton)}
                </div>
              </div>
            )}

            {/* 제출 버튼 */}
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={isDisabled}>
              {isLoading
                ? isLoginMode
                  ? '로그인 중...'
                  : '가입 중...'
                : isLoginMode
                  ? '로그인 하기'
                  : '가입하기'}
            </Button>
          </form>

          {/* 로그인/회원가입 전환 링크 */}
          <AuthRedirect variant={isLoginMode ? 'login' : 'signup'} />
        </div>
      </div>

      {/* Error Modal */}
      {isModalOpen && (
        <ErrorModal message={apiMessage} onClose={handleModalClose} />
      )}
    </>
  );
};

export default Auth;
