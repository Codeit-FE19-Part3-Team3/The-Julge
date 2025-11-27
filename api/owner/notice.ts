import { api } from '../client';
import { Notice } from '../types';

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
};

export default notices;
