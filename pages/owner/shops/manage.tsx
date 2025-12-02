import Head from 'next/head';
import { useRouter } from 'next/router';

import ShopEditForm from '@/components/owner/ShopEditForm';
import ShopRegisterForm from '@/components/owner/ShopRegisterForm';

const ShopManagePage = () => {
  const router = useRouter();
  const { shopId } = router.query;

  const isEditMode = !!shopId;

  return (
    <>
      <Head>
        <title>{isEditMode ? '가게 정보 편집' : '가게 등록'} | The-Julge</title>
        <meta
          name="description"
          content={`가게 ${isEditMode ? '정보 편집' : '등록'} 페이지`}
        />
      </Head>

      {isEditMode ? <ShopEditForm /> : <ShopRegisterForm />}
    </>
  );
};

export default ShopManagePage;
