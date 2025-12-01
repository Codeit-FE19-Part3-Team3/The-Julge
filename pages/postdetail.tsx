import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import PostBannerUser from '@/components/auth/PostBanner';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import Post from '@/components/post/Post';
import { useRecentNotices, addRecentNotice } from '@/hooks/useRecentNotices';
import { TransformedNotice } from '@/utils/transformNotice';

const NoticeDetailPage = () => {
  const router = useRouter();
  // query에서 파라미터 받기 (URL: /postdetail?shopId=...&noticeId=...)
  const { shopId, noticeId } = router.query;

  console.log('라우터 query:', router.query);
  console.log('shopId:', shopId, 'noticeId:', noticeId);

  // 상세 데이터
  const [noticeDetail, setNoticeDetail] = useState<TransformedNotice | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // 최근 본 공고 ID 목록
  const recentNotices = useRecentNotices();

  // 최근 본 공고 실제 데이터 (최대 6개)
  const [recentNoticesList, setRecentNoticesList] = useState<
    TransformedNotice[]
  >([]);

  // 신청 상태
  const [applicationStatus, setApplicationStatus] = useState<
    'none' | 'pending' | 'approved' | 'rejected' | 'canceled'
  >('none');

  // 취소 모달
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // 공고 상세 데이터 fetch
  useEffect(() => {
    if (!shopId || !noticeId) return;
    if (Array.isArray(shopId) || Array.isArray(noticeId)) return;

    const fetchData = async () => {
      setIsLoading(true);

      // 임시: API 호출 건너뛰고 목 데이터만 사용
      console.log('목 데이터 사용 (API 비활성화)');
      setTimeout(() => {
        setNoticeDetail({
          id: String(noticeId),
          shopId: String(shopId),
          name: '도토리 식당',
          startAt: '2025-12-02T15:00:00',
          workTime: 3,
          location: '서울시 송파구',
          wage: 15000,
          imageUrl:
            'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81',
          isActive: true,
          percentage: 50,
        });
        setIsLoading(false);

        // 최근 본 공고에 추가
        addRecentNotice(String(shopId), String(noticeId));
      }, 300);

      /* TODO: API 연결 시 아래 주석 해제
      try {
        console.log('API 호출 시작:', { shopId, noticeId });
        const res = await fetchNoticeDetail(shopId, noticeId);
        console.log('API 응답:', res);
        const transformed = transformNoticeData(res.item);
        setNoticeDetail(transformed);
        addRecentNotice(shopId, noticeId);
      } catch (err) {
        console.error('공고 상세 로딩 실패:', err);
        setNoticeDetail(null);
      } finally {
        setIsLoading(false);
      }
      */
    };

    fetchData();
  }, [shopId, noticeId]);

  // 최근 본 공고 데이터 fetch (현재 공고 제외)
  useEffect(() => {
    console.log('recentNotices 배열:', recentNotices);

    // 임시: 항상 목 데이터 사용 (API 타임아웃 방지)
    console.log('최근 본 공고 목 데이터 사용');
    setRecentNoticesList([
      {
        id: 'mock-1',
        shopId: 'shop-1',
        name: '카페 모카',
        startAt: '2025-12-05T14:00:00',
        workTime: 4,
        location: '서울시 강남구',
        wage: 12000,
        imageUrl:
          'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81',
        isActive: true,
        percentage: 20,
      },
      {
        id: 'mock-2',
        shopId: 'shop-2',
        name: '라떼 카페',
        startAt: '2025-12-06T15:00:00',
        workTime: 3,
        location: '서울시 서초구',
        wage: 11000,
        imageUrl:
          'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81',
        isActive: true,
      },
      {
        id: 'mock-3',
        shopId: 'shop-3',
        name: '에스프레소 바',
        startAt: '2025-12-07T16:00:00',
        workTime: 5,
        location: '서울시 마포구',
        wage: 13000,
        imageUrl:
          'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81',
        isActive: false,
        percentage: 30,
      },
    ]);

    /* API 연결 시 아래 주석 해제
    if (recentNotices.length === 0) {
      setRecentNoticesList([]);
      return;
    }

    const fetchRecentNotices = async () => {
      try {
        const filteredRecent = recentNotices
          .filter((item) => item.id !== noticeId)
          .slice(0, 6);

        const promises = filteredRecent.map(async (item) => {
          try {
            const data = await fetchNoticeDetail(item.shopId, item.id);
            return transformNoticeData(data.item);
          } catch (error) {
            console.error(`공고 ${item.id} 로딩 실패:`, error);
            return null;
          }
        });

        const results = await Promise.all(promises);
        const validNotices = results.filter(
          (item): item is TransformedNotice => item !== null
        );

        setRecentNoticesList(validNotices);
      } catch (error) {
        console.error('최근 본 공고 로딩 실패:', error);
        setRecentNoticesList([]);
      }
    };

    fetchRecentNotices();
    */
  }, [recentNotices, noticeId]);

  // 신청 버튼
  const handleApply = async () => {
    if (!shopId || !noticeId) return;

    try {
      // API 연결
      // await applyNotice(String(shopId), String(noticeId));
      setApplicationStatus('pending');
      console.log('신청 성공!');
    } catch (err) {
      console.error('신청 실패:', err);
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  };

  // 취소 클릭 시 모달 열기
  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  // 모달 확인 시 취소 처리
  const handleCancelConfirm = () => {
    // TODO: API 연결
    setApplicationStatus('canceled');
    setIsCancelModalOpen(false);
    console.log('신청 취소 완료');
  };

  // 모달 닫기
  const handleCancelCancel = () => {
    setIsCancelModalOpen(false);
  };

  // 공고 클릭 해당 공고 상세 이동
  const handleNoticeClick = (clickedNoticeId: string) => {
    // 임시: 같은 페이지에서 query만 변경
    router.push(`/postdetail?shopId=${shopId}&noticeId=${clickedNoticeId}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg font-medium text-gray-900">로딩 중...</div>
      </div>
    );
  }

  if (!noticeDetail) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            공고를 찾을 수 없습니다.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 rounded-lg bg-[#FF5C3F] px-6 py-2 text-white hover:bg-[#FF4A2D]">
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 카테고리 & 제목 */}
      <div className="bg-white pt-15">
        <div className="mx-auto max-w-[964px] px-3 sm:px-8 lg:px-0">
          <p className="mb-2 text-[14px] leading-[22px] font-bold text-[#FF5C3F]">
            식당
          </p>
          <h1 className="text-[20px] leading-8 font-bold text-black sm:text-[28px] sm:leading-9">
            {noticeDetail.name}
          </h1>
        </div>
      </div>

      {/* PostBannerUser 영역 */}
      <div className="bg-white pt-6">
        <div className="flex justify-center px-3 sm:px-8 lg:px-0">
          <PostBannerUser
            name={noticeDetail.name}
            startAt={noticeDetail.startAt}
            workTime={noticeDetail.workTime}
            location={noticeDetail.location}
            wage={noticeDetail.wage}
            imageUrl={noticeDetail.imageUrl}
            percentage={noticeDetail.percentage}
            description="공고 설명입니다." // TODO: API에서 description 추가 필요
            isActive={noticeDetail.isActive}
            applicationStatus={applicationStatus}
            onApply={handleApply}
            onCancel={handleCancelClick}
          />
        </div>
      </div>

      {/* 공고 설명 */}
      <div className="bg-white px-3 pt-6 pb-15 sm:px-8 lg:px-0">
        <div className="bg-gray-10 mx-auto max-w-[964px] rounded-xl px-9 py-9 sm:px-8 lg:px-9 lg:py-9">
          <h2 className="mb-2 text-[20px] leading-[32px] font-bold text-black">
            공고 설명
          </h2>
          <p className="text-[14px] leading-[22px] whitespace-pre-wrap text-black sm:text-[16px] sm:leading-[26px]">
            공고 설명입니다. {/* TODO: API에서 description 추가 필요 */}
          </p>
        </div>
      </div>

      {/* 최근 본 공고 */}
      {recentNoticesList.length > 0 && (
        <div className="mt-16 pb-20">
          <div className="mx-auto max-w-[964px] px-3 sm:px-8 lg:px-0">
            <h2 className="mb-6 text-[20px] leading-[32px] font-bold text-black sm:text-[28px] sm:leading-[36px]">
              최근에 본 공고
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
              {recentNoticesList.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => handleNoticeClick(notice.id)}
                  className="cursor-pointer">
                  <Post
                    name={notice.name}
                    startAt={notice.startAt}
                    workTime={notice.workTime}
                    location={notice.location}
                    wage={notice.wage}
                    imageUrl={notice.imageUrl}
                    isActive={notice.isActive}
                    percentage={notice.percentage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 취소 확인 모달 */}
      <ConfirmModal
        isOpen={isCancelModalOpen}
        message="신청을 취소하시겠어요?"
        onConfirm={handleCancelConfirm}
        onCancel={handleCancelCancel}
      />
    </div>
  );
};

export default NoticeDetailPage;
