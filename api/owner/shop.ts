import { api } from '../client';
import { Shop, ShopResponse } from '../types';
const shops = {
  // 1) 가게 등록
  register: async (data: Omit<Shop, 'id'>) => {
    return api.post<Shop>('/shops', data);
  },
  // 2) 가게 조회
  getShop: async (shop_id: string) => {
    return api.get<ShopResponse>(`/shops/${shop_id}`);
  },
  // 3) 가게 공고 리스트 조회
  getNotices: async (shop_id: string) => {
    return api.get<NoticeListResponse>(`/shops/${shop_id}/notices`);
  },
};
export default shops;
