import { useRouter } from 'next/router';

import Button from '../common/Button';

/**
 * EmptyProfileState 사용 예제
 *
 * import EmptyProfileState from '@/components/profile/EmptyProfileState';
 *
 * const Ex = () {
 *   return (
 *     <div>
 *      // 프로필 미등록 상태
 *      <EmptyProfileState variant="profile" />
 *      // 지원 내역 없음 상태
 *      <EmptyProfileState variant="applications" />
 *     </div>
 *   );
 * }
 *
 */

// EmptyProfileState 컴포넌트의 props 타입 정의
interface EmptyStateProps {
  variant: 'profile' | 'applications';
}

/**
 * variant에 따른 빈 상태 데이터 상수
 * - profile: 프로필 미등록 상태
 * - applications: 지원 내역 없음 상태
 */
const EMPTY_STATE_DATA = {
  profile: {
    message: '내 프로필을 등록하고 원하는 가게에 지원해 보세요.',
    buttonText: '내 프로필 등록하기',
    link: '/staff/profile/register',
  },
  applications: {
    message: '아직 신청 내역이 없어요.',
    buttonText: '공고 보러가기',
    link: '/',
  },
};

const EmptyProfileState: React.FC<EmptyStateProps> = ({ variant }) => {
  const router = useRouter();

  // variant에 따른 데이터 추출
  const { message, buttonText, link } = EMPTY_STATE_DATA[variant];

  return (
    <div className="border-gray-20 flex w-full flex-col items-center justify-center gap-4 rounded-xl border px-6 py-15">
      {/* 안내 메시지 */}
      <p className="text-sm leading-[22px] font-normal sm:text-base sm:leading-relaxed">
        {message}
      </p>

      {/* 액션 버튼 */}
      <Button
        variant="primary"
        size="large"
        onClick={() => router.push(link)}
        className="max-w-fit px-5 py-2.5 text-sm sm:px-[136px] sm:py-3.5 sm:text-base sm:leading-5">
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyProfileState;
