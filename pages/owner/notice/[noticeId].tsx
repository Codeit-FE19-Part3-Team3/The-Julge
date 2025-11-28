// pages/owner/notice/[noticeId].tsx
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import notices from '@/api/owner/notice';
import { ApplicationItem, NoticeItem, Shop } from '@/api/types';
import Table from '@/components/common/Table';
import PostBanner from '@/components/owner/PostBanner';
import { transformApplicationData } from '@/lib/utils/transformTableData';

const NoticeDetail = () => {
  const router = useRouter();
  const { noticeId } = router.query;

  const [notice, setNotice] = useState<NoticeItem | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [_actionLoading, setActionLoading] = useState<string | null>(null);

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
        const noticeRes = await notices.getNotice(noticeId as string);
        const noticeData = noticeRes.item;
        setNotice(noticeData);

        console.log(noticeData);
        // 2. 관련 가게 정보
        if (noticeData.shop?.item) {
          setShop(noticeData.shop.item);
        }
        // 3) 지원자 목록 조회 (shop_id 필요!)
        const shopId = noticeData.shop.item.id;
        const applicationsRes = await notices.getApplications(
          shopId,
          noticeId as string,
          0,
          20
        );
        const employerApiData = applicationsRes.items.map((a) => a.item);

        setApplications(employerApiData);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [noticeId]);

  // 승인 처리
  const handleApprove = async (applicationId: string) => {
    if (!shop?.id || !noticeId) return;

    setActionLoading(applicationId);

    try {
      // 승인 API 호출
      await notices.approveApplication(
        shop.id,
        noticeId as string,
        applicationId
      );

      // 상태 업데이트: 해당 지원의 status를 'accepted'로 변경
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === applicationId ? { ...app, status: 'accepted' } : app
        )
      );

      alert('지원을 승인했습니다.');
    } finally {
      setActionLoading(null);
    }
  };

  // 거절 처리
  const handleReject = async (applicationId: string) => {
    if (!shop?.id || !noticeId) return;

    setActionLoading(applicationId);

    try {
      // 거절 API 호출
      await notices.rejectApplication(
        shop.id,
        noticeId as string,
        applicationId
      );

      // 상태 업데이트: 해당 지원의 status를 'rejected'로 변경
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === applicationId ? { ...app, status: 'rejected' } : app
        )
      );

      alert('지원을 거절했습니다.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="p-6">로딩 중...</div>;

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
                name=""
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
              <div>
                <Table
                  data={transformApplicationData(applications).map((item) => ({
                    ...item,
                    status: item.status === 'pending' ? '' : item.status,
                  }))}
                  rowKey="id"
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;
