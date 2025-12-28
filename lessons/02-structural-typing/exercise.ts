/**
 * 2단계: 복잡한 데이터 모델링 (Structural Typing)
 *
 * 목표: Interface, Type Alias, Union, Intersection, Literal 타입을 활용하여
 *       실제 서비스에서 사용할 수 있는 데이터 모델을 정의하세요.
 *
 * 힌트:
 * - Interface는 객체 구조 정의에, Type Alias는 유니온 등 복잡한 타입에 적합
 * - optional(?)과 readonly를 적절히 활용하세요
 * - Literal 타입으로 특정 값만 허용하도록 제한하세요
 */

// ============================================
// 과제 1: 리터럴 타입 - 사용자 권한 정의
// ============================================
// TODO: '일반' 또는 '관리자'만 가능한 타입을 정의하세요
type UserRole = unknown; // <- 수정하세요

// ============================================
// 과제 2: 리터럴 타입 - 게시글 상태 정의
// ============================================
// TODO: '임시저장' 또는 '발행'만 가능한 타입을 정의하세요
type PostStatus = unknown; // <- 수정하세요

// ============================================
// 과제 3: Interface - 사용자 객체 정의
// ============================================
// TODO: 다음 속성을 가진 User 인터페이스를 완성하세요
// - id: 숫자 (읽기 전용)
// - email: 문자열 (읽기 전용)
// - name: 문자열
// - role: UserRole 타입
// - profileImage: 문자열 (선택적 속성)
interface User {
  // 여기에 속성을 추가하세요
}

// ============================================
// 과제 4: Interface - 게시글 객체 정의
// ============================================
// TODO: 다음 속성을 가진 Post 인터페이스를 완성하세요
// - id: 숫자 (읽기 전용)
// - title: 문자열
// - content: 문자열
// - status: PostStatus 타입
// - authorId: 숫자 (읽기 전용)
// - tags: 문자열 배열 (선택적 속성)
// - createdAt: Date (읽기 전용)
// - updatedAt: Date
interface Post {
  // 여기에 속성을 추가하세요
}

// ============================================
// 과제 5: Interface 확장 - 관리자 사용자
// ============================================
// TODO: User를 확장하여 AdminUser 인터페이스를 정의하세요
// - permissions: 문자열 배열 (관리자 권한 목록)
// - lastLoginAt: Date (선택적 속성)
interface AdminUser {
  // extends를 사용하여 User를 확장하세요
}

// ============================================
// 과제 6: Index Signature - 설정 객체
// ============================================
// TODO: 키는 문자열, 값은 문자열 또는 숫자인 설정 객체 타입을 정의하세요
interface Settings {
  // Index Signature를 사용하세요
}

// ============================================
// 과제 7: Intersection - 게시글 + 작성자 정보
// ============================================
// TODO: Post와 작성자 정보(author: User)를 합친 타입을 정의하세요
type PostWithAuthor = unknown; // <- 수정하세요

// ============================================
// 과제 8: Union - API 응답 타입
// ============================================
// TODO: 성공 응답과 에러 응답을 유니온으로 정의하세요
// 성공: { success: true, data: T }
// 실패: { success: false, error: string }
type ApiResponse<T> = unknown; // <- 수정하세요

// ============================================
// 과제 9: Enum vs as const - HTTP 메서드
// ============================================
// TODO: Enum과 as const 두 가지 방식으로 HTTP 메서드를 정의하세요

// 방법 1: Enum
enum HttpMethodEnum {
  // GET, POST, PUT, DELETE를 정의하세요
}

// 방법 2: as const (Tree-shaking에 유리)
const HttpMethod = {
  // GET, POST, PUT, DELETE를 정의하세요
} as const;

// as const 객체에서 값 타입 추출
type HttpMethodType = unknown; // <- 수정하세요

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================
console.log("=== 2단계 테스트 ===");

// 테스트용 데이터를 만들기 위해서는 타입을 올바르게 정의해야 합니다
// 아래 코드가 타입 에러 없이 동작하면 성공입니다!

/*
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

console.log("User:", user);
console.log("Admin:", admin);
console.log("Post:", post);
console.log("PostWithAuthor:", postWithAuthor);
console.log("Success Response:", successResponse);
console.log("Error Response:", errorResponse);
*/

console.log("타입을 완성하고 위 테스트 코드의 주석을 해제하세요!");

export {};
