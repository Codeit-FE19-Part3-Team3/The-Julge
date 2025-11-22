import { useMemo } from 'react';

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
  isActive?: boolean;
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
  // 근무 시간 계산
  const workInfo = useMemo(
    () => formatWorkTime(startAt, workTime),
    [startAt, workTime]
  );
  // 비활성화 상태이거나 지난 공고 상태일 때
  const isGray = isActive && !workInfo.isExpired;
  const overlayText = workInfo.isExpired ? '지난 공고' : '마감 완료';

  // 퍼센테이지 숫자에 따라 뱃지 색상 매핑
  const getBadgeColor = (percentage: number, isBackground = true) => {
    if (!isGray) return '';
    const levels = [
      { limit: 50, color: 'red-40' },
      { limit: 30, color: 'red-30' },
      { limit: 0, color: 'red-20' },
    ];
    const matched =
      levels.find((lv) => percentage >= lv.limit) ?? levels[levels.length - 1];

    return isBackground
      ? `bg-[var(--color-${matched.color})] text-white`
      : `text-[var(--color-${matched.color})]`;
  };

  return (
    <div className={postClasses.container()}>
      <div className="relative h-[84px] max-w-[280px] sm:h-[160px]">
        <img
          src={imageUrl}
          alt={`${name} 사진`}
          className="h-full w-full rounded-[12px] object-cover"
        />
        {/* 공고 시간이 지났거나 마감 됐을 때 띄우는 오버레이 */}
        {!isGray && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-black/70">
            <span className="text-[20px] font-[700] tracking-[0.02em] text-[var(--color-gray-30)] sm:text-[28px]">
              {overlayText}
            </span>
          </div>
        )}
      </div>
      {/* 근무 시간 */}
      <div className="flex flex-col gap-2">
        <h2 className={postClasses.title({ isActive: isGray })}>{name}</h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-start gap-2">
            <ClockIcon className={postClasses.icon({ isActive: isGray })} />
            <time className={postClasses.text({ isActive: isGray })}>
              {workInfo.text}
            </time>
          </div>
        </div>
        {/* 위치 */}
        <div className="flex items-center gap-2">
          <MapIcon className={postClasses.icon({ isActive: isGray })} />
          <span className={postClasses.text({ isActive: isGray })}>
            {location}
          </span>
        </div>
        {/* 시급 */}
        <div className="flex flex-col whitespace-nowrap sm:flex-row sm:items-center sm:justify-between">
          <h3 className={postClasses.wage({ isActive: isGray })}>
            {wage.toLocaleString()}원
          </h3>
          {/* 퍼센테이지가 입력됐을 때 띄우는 뱃지 */}
          {percentage && (
            <>
              {/* 데스크탑 뱃지: 배경 + 흰색 텍스트 */}
              <span
                className={`${postClasses.badge({ isActive: isGray })} ${getBadgeColor(percentage, true)}`}>
                기존 시급보다 {percentage}%
                <BadgeArrow className={postClasses.badgeArrow()} />
              </span>
              {/* 모바일 뱃지: 배경 없음, 텍스트 색상만 */}
              <span
                className={`${postClasses.badgeText({ isActive: isGray })} ${getBadgeColor(percentage, false)}`}>
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
