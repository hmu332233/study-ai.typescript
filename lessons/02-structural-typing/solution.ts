/**
 * 2단계: 복잡한 데이터 모델링 (Structural Typing) - 정답
 *
 * 이 파일은 exercise.ts의 완성된 버전입니다.
 * 스스로 먼저 풀어보고, 막히면 참고하세요!
 */

// ============================================
// 과제 1: 리터럴 타입 - 사용자 권한 정의
// ============================================
type UserRole = "일반" | "관리자";

// ============================================
// 과제 2: 리터럴 타입 - 게시글 상태 정의
// ============================================
type PostStatus = "임시저장" | "발행";

// ============================================
// 과제 3: Interface - 사용자 객체 정의
// ============================================
interface User {
  readonly id: number;
  readonly email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
}

// ============================================
// 과제 4: Interface - 게시글 객체 정의
// ============================================
interface Post {
  readonly id: number;
  title: string;
  content: string;
  status: PostStatus;
  readonly authorId: number;
  tags?: string[];
  readonly createdAt: Date;
  updatedAt: Date;
}

// ============================================
// 과제 5: Interface 확장 - 관리자 사용자
// ============================================
interface AdminUser extends User {
  permissions: string[];
  lastLoginAt?: Date;
}

// ============================================
// 과제 6: Index Signature - 설정 객체
// ============================================
interface Settings {
  [key: string]: string | number;
}

// ============================================
// 과제 7: Intersection - 게시글 + 작성자 정보
// ============================================
type PostWithAuthor = Post & { author: User };

// ============================================
// 과제 8: Union - API 응답 타입
// ============================================
// Discriminated Union 패턴 (success 속성으로 구분)
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ============================================
// 과제 9: Enum vs as const - HTTP 메서드
// ============================================
// 방법 1: Enum
enum HttpMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

// 방법 2: as const (Tree-shaking에 유리)
const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

// as const 객체에서 값 타입 추출
type HttpMethodType = (typeof HttpMethod)[keyof typeof HttpMethod];

// ============================================
// 테스트 코드
// ============================================
console.log("=== 2단계 테스트 (정답) ===");

const user: User = {
  id: 1,
  email: "user@example.com",
  name: "홍길동",
  role: "일반",
};

const admin: AdminUser = {
  id: 2,
  email: "admin@example.com",
  name: "관리자",
  role: "관리자",
  permissions: ["read", "write", "delete"],
};

const post: Post = {
  id: 1,
  title: "TypeScript 배우기",
  content: "오늘은 타입스크립트를 공부합니다.",
  status: "발행",
  authorId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const postWithAuthor: PostWithAuthor = {
  ...post,
  author: user,
};

const successResponse: ApiResponse<User> = {
  success: true,
  data: user,
};

const errorResponse: ApiResponse<User> = {
  success: false,
  error: "사용자를 찾을 수 없습니다.",
};

const settings: Settings = {
  theme: "dark",
  fontSize: 14,
  language: "ko",
};

console.log("User:", user);
console.log("Admin:", admin);
console.log("Post:", post);
console.log("PostWithAuthor:", postWithAuthor);
console.log("Success Response:", successResponse);
console.log("Error Response:", errorResponse);
console.log("Settings:", settings);
console.log("HttpMethodEnum.GET:", HttpMethodEnum.GET);
console.log("HttpMethod.POST:", HttpMethod.POST);

export {};
