import { useEffect, useState } from 'react';

import shops from '@/api/owner/shop';
import users from '@/api/users';
import Button from '@/components/common/Button';
import ShopBanner from '@/components/owner/ShopBanner';

const MyShop = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.log('로그인 정보 없음 → 로그인 필요');
          return;
        }

        const userRes = await users.getUser(userId);
        const user = userRes?.item;

        const shopItem = user?.shop?.item;
        if (!shopItem) {
          setError('유저의 가게 정보가 없습니다.');
          setLoading(false);
          return;
        }
        const shopId = shopItem.id;
        const shopRes = await shops.getShop(shopId);
        const shopData = shopRes?.item;

        if (!shopData) {
          setError('가게 정보를 가져올 수 없습니다.');
          setLoading(false);
          return;
        }

        setShop(shopData);
      } catch (err: any) {
        console.error('유저 또는 가게 조회 실패:', err);
        setError('가게 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pt-15">
        <div className="mx-auto w-[964px] max-[744px]:w-[680px] max-[375px]:w-[351px]">
          <h1 className="mb-[24px] text-[28px] font-[700] max-[375px]:mb-[16px] max-[375px]:text-[20px]">
            내 가게
          </h1>
          {!loading && !error && !shop && (
            <div className="mx-auto w-[964px] max-[744px]:w-[680px] max-[375px]:w-[351px]">
              <div className="flex flex-col items-center justify-center gap-[24px] rounded-[12px] border-[1px] border-[var(--color-gray-20)] px-[24px] py-[60px]">
                <div className="text-[16px] max-[375px]:text-[14px]">
                  내 가게를 소개하고 공고도 등록해보세요.
                </div>
                <div className="h-[47px] w-[346px] max-[375px]:h-[37px] max-[375px]:w-[108px]">
                  <Button className="h-full w-full !max-w-none">
                    가게 등록하기
                  </Button>
                </div>
              </div>
            </div>
          )}
          {loading && <div>가게 정보를 불러오는 중...</div>}
          {error && <div className="text-red-500">{error}</div>}

          {!loading && !error && shop && (
            <ShopBanner
              category={shop.category}
              name={shop.name}
              location={shop.address1}
              imageUrl={shop.imageUrl}
              description={shop.description}
            />
          )}
        </div>
      </div>
      {!loading && !error && shop && (
        <div className="mx-auto max-w-[1440px] px-6 pt-15">
          <div className="mx-auto w-[964px] max-[744px]:w-[680px] max-[375px]:w-[351px]">
            <h2 className="mb-[24px] text-[28px] font-[700] max-[375px]:mb-[16px] max-[375px]:text-[20px]">
              내가 등록한 공고
            </h2>
            <div className="flex flex-col items-center justify-center gap-[24px] rounded-[12px] border-[1px] border-[var(--color-gray-20)] px-[24px] py-[60px]">
              <div className="text-[16px] max-[375px]:text-[14px]">
                공고를 등록해 보세요.
              </div>
              <div className="h-[47px] w-[346px] max-[375px]:h-[37px] max-[375px]:w-[108px]">
                <Button className="h-full w-full !max-w-none">
                  공고 등록하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyShop;
