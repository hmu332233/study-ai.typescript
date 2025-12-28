/**
 * 3단계: 제네릭과 타입 조작 (Generics & Type Manipulation) - 정답
 *
 * 이 파일은 exercise.ts의 완성된 버전입니다.
 * 스스로 먼저 풀어보고, 막히면 참고하세요!
 */

// ============================================
// 과제 1: 기본 제네릭 - 배열의 첫 번째 요소 반환
// ============================================
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ============================================
// 과제 2: 기본 제네릭 - 배열의 마지막 요소 반환
// ============================================
function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// ============================================
// 과제 3: 제네릭 제약 - length 속성을 가진 값의 길이 반환
// ============================================
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

// ============================================
// 과제 4: 제네릭 제약 - 객체의 특정 키 값 가져오기
// ============================================
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ============================================
// 과제 5: 타입 좁히기 - typeof 사용
// ============================================
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return String(value * 2);
  }
}

// ============================================
// 과제 6: 타입 좁히기 - in 연산자 사용
// ============================================
interface Dog {
  bark: () => void;
  name: string;
}

interface Cat {
  meow: () => void;
  name: string;
}

function makeSound(animal: Dog | Cat): void {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// ============================================
// 과제 7: 사용자 정의 타입 가드
// ============================================
interface User {
  id: number;
  email: string;
  name: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    "name" in value &&
    typeof (value as User).id === "number" &&
    typeof (value as User).email === "string" &&
    typeof (value as User).name === "string"
  );
}

// ============================================
// 과제 8: 유틸리티 타입 - Partial, Required
// ============================================
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

// Partial: 모든 속성을 선택적으로 만듦
type ProductUpdate = Partial<Product>;

// Required: 모든 속성을 필수로 만듦
type ProductComplete = Required<Product>;

// ============================================
// 과제 9: 유틸리티 타입 - Pick, Omit
// ============================================
// Pick: 특정 속성만 선택
type ProductSummary = Pick<Product, "id" | "name">;

// Omit: 특정 속성 제외
type ProductInput = Omit<Product, "id">;

// ============================================
// 과제 10: 유틸리티 타입 - Record
// ============================================
// Record: 키 타입과 값 타입으로 객체 타입 생성
type ProductCatalog = Record<string, Product>;

// ============================================
// 과제 11: keyof와 typeof 연산자
// ============================================
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
} as const;

// typeof: 값에서 타입 추출
type Config = typeof config;

// keyof: 객체 타입의 키를 유니온으로 추출
type ConfigKey = keyof typeof config;

// ============================================
// 과제 12: 제네릭 API 래퍼 함수 (실습 과제)
// ============================================
async function fetchData<T>(url: string): Promise<T> {
  // 실제 구현 예시 (실제로는 fetch 사용)
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: T = await response.json();
  return data;
}

// Mock 버전 (네트워크 없이 테스트용)
async function fetchDataMock<T>(url: string, mockData: T): Promise<T> {
  console.log(`Fetching: ${url}`);
  return Promise.resolve(mockData);
}

// ============================================
// 테스트 코드
// ============================================
console.log("=== 3단계 테스트 (정답) ===");

// 테스트 1: first, last
console.log("first([1, 2, 3]):", first([1, 2, 3])); // 1
console.log("last(['a', 'b', 'c']):", last(["a", "b", "c"])); // 'c'
console.log("first([]):", first([])); // undefined

// 테스트 2: getLength
console.log('getLength("hello"):', getLength("hello")); // 5
console.log("getLength([1, 2, 3]):", getLength([1, 2, 3])); // 3

// 테스트 3: getProperty
const user: User = { id: 1, name: "Alice", email: "alice@example.com" };
console.log("getProperty(user, 'name'):", getProperty(user, "name")); // 'Alice'

// 테스트 4: processValue
console.log('processValue("hello"):', processValue("hello")); // 'HELLO'
console.log("processValue(21):", processValue(21)); // '42'

// 테스트 5: makeSound
const dog: Dog = { name: "멍멍이", bark: () => console.log("멍멍!") };
const cat: Cat = { name: "야옹이", meow: () => console.log("야옹!") };
makeSound(dog); // 멍멍!
makeSound(cat); // 야옹!

// 테스트 6: isUser
console.log(
  "isUser({ id: 1, email: 'test', name: 'test' }):",
  isUser({ id: 1, email: "test", name: "test" })
); // true
console.log("isUser({ random: 'data' }):", isUser({ random: "data" })); // false

// 테스트 7: 유틸리티 타입 사용 예시
const productUpdate: ProductUpdate = { name: "새 이름" };
const productSummary: ProductSummary = { id: 1, name: "제품" };
const productInput: ProductInput = {
  name: "제품",
  price: 1000,
  description: "설명",
};
const catalog: ProductCatalog = {
  prod1: { id: 1, name: "제품1", price: 1000 },
  prod2: { id: 2, name: "제품2", price: 2000 },
};

console.log("productUpdate:", productUpdate);
console.log("productSummary:", productSummary);
console.log("productInput:", productInput);
console.log("catalog:", catalog);

// 테스트 8: typeof, keyof
const configKey: ConfigKey = "apiUrl"; // 'apiUrl' | 'timeout' | 'retries'만 가능
console.log("configKey:", configKey);
console.log("config[configKey]:", config[configKey]);

// 테스트 9: fetchData (mock)
fetchDataMock<User>("/api/user", user).then((data) => {
  console.log("fetchDataMock result:", data);
});

export {};
