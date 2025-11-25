import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * Axios 인스턴스
 * - 기본 URL 및 공통 설정 적용
 * - 5초 타임아웃 설정
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 * - 모든 요청 전에 실행
 * - 인증 토큰 추가 등의 전처리 수행
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO: 토큰 추가 로직
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 * - 모든 응답 후 실행
 * - 성공 시: response.data만 반환하여 코드 간소화
 * - 실패 시: 에러 타입별 로깅 및 처리
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      console.error('요청 시간 초과');
    }

    if (error.response?.status === 401) {
      console.error('인증 에러');
    }

    return Promise.reject(error);
  }
);

/**
 * 타입 안전 API 래퍼 함수
 * 응답 데이터에 대한 제네릭 타입을 지정하여 타입 안정성을 제공합니다.
 *
 * @example
 * const data = await api.get<UserResponse>('/users/1');
 * const result = await api.post<SignupResponse>('/users', data);
 */
export const api = {
  get: async <T = unknown>(url: string, config = {}): Promise<T> => {
    const response = await apiClient.get(url, config);
    return response as T;
  },

  post: async <T = unknown>(
    url: string,
    data?: unknown,
    config = {}
  ): Promise<T> => {
    const response = await apiClient.post(url, data, config);
    return response as T;
  },

  put: async <T = unknown>(
    url: string,
    data?: unknown,
    config = {}
  ): Promise<T> => {
    const response = await apiClient.put(url, data, config);
    return response as T;
  },

  patch: async <T = unknown>(
    url: string,
    data?: unknown,
    config = {}
  ): Promise<T> => {
    const response = await apiClient.patch(url, data, config);
    return response as T;
  },
};

export default apiClient;
