import Tippy from '@tippyjs/react';

import { postClasses } from '@/lib/utils/postClasses';

import Button from '../common/Button';
import PostImage from '../post/PostImage';
import PostLocation from '../post/PostLocation';
import 'tippy.js/dist/tippy.css';

interface StoreInfo {
  cartegory:
    | '한식'
    | '중식'
    | '일식'
    | '양식'
    | '분식'
    | '카페'
    | '편의점'
    | '기타';
  name: string;
  location: string;
  imageUrl: string;
  description: string;
}

const ShopBanner = ({
  cartegory,
  name,
  location,
  imageUrl,
  description,
}: StoreInfo) => {
  return (
    <div className="flex w-[964px] gap-6 rounded-[12px] bg-[var(--color-red-10)] p-6">
      {/* 이미지 영역 */}
      <div className="h-[308px] w-[539px]">
        <PostImage imageUrl={imageUrl} name={name} isColor={true} />
      </div>

      {/* 정보 영역 */}
      <div className="flex w-[346px] flex-1 flex-col justify-between pt-4">
        <div>
          {/* 카테고리 */}
          <span className="text-[16px] leading-[20px] font-[700] tracking-[0%] text-[var(--color-red-50)]">
            {cartegory}
          </span>

          {/* 카테고리 ↔ 가게 이름 8px */}
          <div className="h-[8px]" />

          {/* 가게 이름 */}
          <h2 className={postClasses.title()}>{name}</h2>

          {/* 가게 이름 ↔ 위치 12px */}
          <div className="h-[12px]" />

          {/* 위치 */}
          <PostLocation location={location} isColor={true} />

          {/* description 높이 78px */}
          <Tippy
            trigger="mouseenter focus"
            content={description}
            placement="bottom"
            arrow={true}
            animation="scale"
            duration={0}>
            <div
              className="mt-[12px] cursor-pointer overflow-hidden break-words text-ellipsis"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                maxHeight: '78px',
              }}>
              {description}
            </div>
          </Tippy>
        </div>

        {/* 버튼 영역 */}
        <div className="mt-[54px] flex h-[48px] w-full gap-2">
          <Button
            variant="secondary"
            size={undefined}
            className="h-full max-w-none flex-1">
            편집하기
          </Button>
          <Button size={undefined} className="h-full max-w-none flex-1">
            공고 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopBanner;
