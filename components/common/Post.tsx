import { useState, useEffect } from 'react';

import ClockIcon from '@/components/icons/ClockIcon';
import MapIcon from '@/components/icons/MapIcon';
import { formatWorkTime } from '@/lib/utils/formatWorkTime';
import { postClasses } from '@/lib/utils/postClasses';

import BadgeArrow from '../icons/BadgeArrow';

interface StoreInfo {
  name: string;
  startAt: string;
  workTime: number;
  location: string;
  wage: number;
  imageUrl: string;
  isActive?: boolean; // 활성/비활성 상태
  percentage?: number;
}
const Post = ({
  name,
  startAt,
  workTime,
  location,
  wage,
  imageUrl,
  isActive = true,
  percentage,
}: StoreInfo) => {
  // 클라이언트에서만 근무 시간 계산
  // 지난공고 여부도 받아옴
  const [workInfo, setWorkInfo] = useState({ text: '', isExpired: false });

  useEffect(() => {
    setWorkInfo(formatWorkTime(startAt, workTime));
  }, [startAt, workTime]);

  // 데스크탑: 배경색
  const getBadgeBgClass = (percentage: number) => {
    if (percentage >= 50) return 'bg-[var(--color-red-40)] text-white';
    if (percentage >= 30) return 'bg-[var(--color-red-30)] text-white';
    return 'bg-[var(--color-red-20)] text-white';
  };

  // 모바일: 배경 없이 텍스트 색만
  const getBadgeTextColorClass = (percentage: number) => {
    if (percentage >= 50) return 'text-[var(--color-red-40)]';
    if (percentage >= 30) return 'text-[var(--color-red-30)]';
    return 'text-[var(--color-red-20)]';
  };

  return (
    <div className={postClasses.container()}>
      <div className="relative h-[84px] max-w-[280px] sm:h-[160px]">
        <img
          src={imageUrl}
          alt={`${name} 사진`}
          className="h-full w-full rounded-[12px] object-cover"
        />
        {/* 비활성화 상태이거나 지난 공고 상태일 때 */}
        {(!isActive || workInfo.isExpired) && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-black/70">
            <span className="text-[20px] font-[700] tracking-[0.02em] text-[var(--color-gray-30)] sm:text-[28px]">
              {workInfo.isExpired ? '지난 공고' : '마감 완료'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {/* 가게 이름 */}
        <h2 className={postClasses.title({ isActive })}>{name}</h2>

        {/* 근무 시간 */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-start gap-2">
            <ClockIcon className={postClasses.icon({ isActive })} />
            <time className={postClasses.text({ isActive })}>
              {workInfo.text}
            </time>
          </div>
        </div>
        {/* 위치 */}
        <div className="flex items-center gap-2">
          <MapIcon className={postClasses.icon({ isActive })} />
          <span className={postClasses.text({ isActive })}>{location}</span>
        </div>

        {/* 시급 */}
        <div className="flex flex-col whitespace-nowrap sm:flex-row sm:items-center sm:justify-between">
          <h3 className={postClasses.wage({ isActive })}>
            {wage.toLocaleString()}원
          </h3>
          {percentage && (
            <>
              {/* 데스크탑 뱃지: 배경 + 흰색 텍스트 */}
              <span
                className={`${postClasses.badge({ isActive })} ${
                  isActive ? getBadgeBgClass(percentage) : ''
                }`}>
                기존 시급보다 {percentage}%
                <BadgeArrow className={postClasses.badgeArrow()} />
              </span>

              {/* 모바일 뱃지: 배경 없음, 텍스트 색상만 */}
              <span
                className={`${postClasses.badgeText({ isActive })} ${
                  isActive ? getBadgeTextColorClass(percentage) : ''
                }`}>
                기존 시급보다 {percentage}%
                <BadgeArrow className={postClasses.badgeArrow()} />
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
