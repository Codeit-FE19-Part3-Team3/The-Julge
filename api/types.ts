/**
 * API 요청/응답 타입 정의
 *
 * 이 파일은 API 통신에 사용되는 요청(Request)과 응답(Response) 타입을 정의합니다.
 * 각 API 엔드포인트별로 타입을 그룹화하여 관리합니다.
 *
 * @example
 * import { SignupRequest, SignupResponse } from '@/apis/types';
 *
 * const data: SignupRequest = { email, password, ... };
 * const response: SignupResponse = await authApi.signup(data);
 */

/**
 * API 공통 타입
 */
export interface ApiLink {
  rel: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  href: string;
  body?: Record<string, unknown>;
}

/**
 * API 에러 응답 타입
 */
export interface ApiErrorResponse {
  message: string;
}

/**
 * 사용자 유형
 * - EMPLOYEE: 직원 (알바생)
 * - EMPLOYER: 고용주 (사장님)
 */
export enum UserType {
  EMPLOYEE = 'employee',
  EMPLOYER = 'employer',
}

/**
 * 사용자 정보
 */
export interface User {
  [x: string]: any;
  id: string;
  email: string;
  type: UserType;
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop?: {
    item: Shop;
  } | null;
  links?: ApiLink[];
}

/**
 * 회원가입 요청 타입
 */
export interface SignupRequest {
  email: string;
  password: string;
  type: UserType;
}

/**
 * 회원가입 응답 타입
 */
export interface SignupResponse {
  item: User;
  links: ApiLink[];
}

/**
 * 로그인 요청 타입
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답 타입
 */
export interface LoginResponse {
  data: any;
  item: {
    token: string; // JWT 토큰
    user: {
      item: User;
      href: string;
    };
  };
  links: ApiLink[];
}
/**
 * 가게
 */
export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user?: {
    item: User;
    href: string;
  };
}
/**
 * Shop이 item으로 감싸져서 반환될 때
 */
export interface ShopResponse {
  item: Shop;
  links?: ApiLink[];
}
/**
 * 공고
 */

/** 가게 공고 정보 */
export interface NoticeItem {
  shop: { item: Shop };
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

export interface Notice {
  item: NoticeItem;
  links?: ApiLink[];
}

export interface NoticeListResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Notice[];
  links?: ApiLink[];
}
