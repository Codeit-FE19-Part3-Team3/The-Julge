// pages/owner/notice/[noticeId].tsx
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import notices from '@/api/owner/notice';
import { NoticeItem, Shop } from '@/api/types';
import PostBanner from '@/components/owner/PostBanner';

const NoticeDetail = () => {
  const router = useRouter();
  const { noticeId } = router.query;

  const [notice, setNotice] = useState<NoticeItem | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const allowedCategories = [
    '한식',
    '중식',
    '일식',
    '양식',
    '분식',
    '카페',
    '편의점',
    '기타',
  ] as const;

  const category =
    shop && allowedCategories.includes(shop.category as any)
      ? (shop.category as (typeof allowedCategories)[number])
      : '기타';

  useEffect(() => {
    if (!noticeId) return;

    const fetchNotice = async () => {
      try {
        // 1. 공고 상세 조회
        const res = await notices.getNotice(noticeId as string);
        const noticeData = res.item;
        setNotice(noticeData);

        // 2. 관련 가게 정보
        if (noticeData.shop?.item) {
          setShop(noticeData.shop.item);
        }
      } catch (err: any) {
        console.error(err);
        setError('공고 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [noticeId]);

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!notice) return <div className="p-6">공고를 찾을 수 없습니다.</div>;

  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-6">
      <div className="mx-auto w-[964px] max-[744px]:w-[680px] max-[375px]:w-[351px]">
        {shop && (
          <>
            <div className="mb-2 text-[16px] max-[375px]:text-[14px]">
              {category}
            </div>
            <div className="mb-4 text-[24px] font-bold max-[375px]:text-[20px]">
              {shop.name}
            </div>
            <div className="mb-8">
              <PostBanner
                location={shop.address1}
                imageUrl={shop.imageUrl}
                description={shop.description}
                startAt={notice.startsAt}
                workTime={notice.workhour}
                wage={notice.hourlyPay}
              />
            </div>

            {/* 공고 설명 */}
            <div className="bg-gray-10 mb-8 flex flex-col gap-8 rounded-xl p-8 max-[744px]:p-8 max-[375px]:p-5">
              <div className="text-[16px] leading-5 font-bold text-black max-[375px]:text-[14px]">
                공고 설명
              </div>
              <div className="text-[16px] leading-[26px] font-normal text-black max-[375px]:text-[14px] max-[375px]:leading-[22px]">
                {notice.description}
              </div>
            </div>

            {/* 신청자 목록 */}
            <div className="mb-4">
              <div className="mb-2 text-[18px] font-semibold max-[375px]:text-[16px]">
                신청자 목록
              </div>
              <div>{/* 신청자 목록 테이블 */}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;
