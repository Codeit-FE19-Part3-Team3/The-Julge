import { api } from '../client';
import { ApplicationListResponse, Notice } from '../types';

const notices = {
  // 1) 공고 등록
  register: async (data: Omit<Notice, 'id'>) => {
    return api.post<Notice>('/notices', data);
  },

  // 2) 공고 조회
  getNotice: async (notice_id: string) => {
    return api.get<Notice>(`/notices/${notice_id}`);
  },

  // 3) 공고 리스트 조회
  getNotices: async () => {
    return api.get<Notice[]>('/notices');
  },

  // 4) 공고 지원자 목록 조회
  getApplications: async (
    shop_id: string,
    notice_id: string,
    offset?: number,
    limit?: number
  ) => {
    return api.get<ApplicationListResponse>(
      `/shops/${shop_id}/notices/${notice_id}/applications`,
      {
        params: { offset, limit },
      }
    );
  },

  // 5) 지원 상태 변경
  updateApplicationStatus: async (
    shop_id: string,
    notice_id: string,
    application_id: string,
    status: 'accepted' | 'rejected'
  ) => {
    return api.put(
      `/shops/${shop_id}/notices/${notice_id}/applications/${application_id}`,
      {
        status,
      }
    );
  },
};

export default notices;
