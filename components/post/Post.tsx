import { usePost } from '@/hooks/post/usePost';
import { postClasses } from '@/lib/utils/postClasses';

import PostLocation from './PostLocation';
import PostTime from './PostTime';
import PostWage from './PostWage';
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
  const { workInfo, isGray, overlayText, getBadgeColor } = usePost({
    startAt,
    workTime,
    isActive,
  });

  return (
    <div className={postClasses.container()}>
      {/* 이미지 + 오버레이 */}
      <div className="relative h-[84px] max-w-[280px] sm:h-[160px]">
        <img
          src={imageUrl}
          alt={`${name} 사진`}
          className="h-full w-full rounded-[12px] object-cover"
        />
        {!isGray && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-black/70">
            <span className="text-[20px] font-[700] tracking-[0.02em] text-[var(--color-gray-30)] sm:text-[28px]">
              {overlayText}
            </span>
          </div>
        )}
      </div>

      {/* 정보 영역 - 근무시간, 가게위치, 시급 */}
      <div className="flex flex-col gap-2">
        <h2 className={postClasses.title({ isActive: isGray })}>{name}</h2>
        <PostTime workInfo={workInfo} isGray={isGray} />
        <PostLocation location={location} isGray={isGray} />
        <PostWage
          wage={wage}
          percentage={percentage}
          isGray={isGray}
          getBadgeColor={getBadgeColor}
        />
      </div>
    </div>
  );
};

export default Post;
