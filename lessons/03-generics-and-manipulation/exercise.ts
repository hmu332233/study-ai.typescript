/**
 * 3단계: 제네릭과 타입 조작 (Generics & Type Manipulation)
 *
 * 목표: 제네릭, 타입 좁히기, 유틸리티 타입을 활용하여
 *       재사용 가능하고 타입 안전한 코드를 작성하세요.
 *
 * 힌트:
 * - <T>는 타입 파라미터로, 함수 호출 시 실제 타입으로 대체됨
 * - extends로 제네릭 타입에 제약을 걸 수 있음
 * - typeof, instanceof, in으로 타입을 좁힐 수 있음
 */

// ============================================
// 과제 1: 기본 제네릭 - 배열의 첫 번째 요소 반환
// ============================================
// TODO: 제네릭을 사용하여 어떤 타입의 배열이든 받을 수 있게 하세요
// 배열이 비어있으면 undefined를 반환
function first(arr) {
  return arr[0];
}

// ============================================
// 과제 2: 기본 제네릭 - 배열의 마지막 요소 반환
// ============================================
// TODO: 제네릭을 사용하세요
function last(arr) {
  return arr[arr.length - 1];
}

// ============================================
// 과제 3: 제네릭 제약 - length 속성을 가진 값의 길이 반환
// ============================================
// TODO: extends를 사용하여 length 속성이 있는 타입만 받도록 제한하세요
function getLength(value) {
  return value.length;
}

// ============================================
// 과제 4: 제네릭 제약 - 객체의 특정 키 값 가져오기
// ============================================
// TODO: K extends keyof T를 사용하여 타입 안전하게 만드세요
function getProperty(obj, key) {
  return obj[key];
}

// ============================================
// 과제 5: 타입 좁히기 - typeof 사용
// ============================================
// TODO: typeof를 사용하여 타입을 좁히세요
function processValue(value: string | number): string {
  // value가 string이면 대문자로, number면 2배로 변환
  // TODO: 조건문을 작성하세요
  return "";
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

// TODO: in 연산자를 사용하여 Dog와 Cat을 구분하세요
function makeSound(animal: Dog | Cat): void {
  // animal이 Dog면 bark(), Cat이면 meow() 호출
  // TODO: 조건문을 작성하세요
}

// ============================================
// 과제 7: 사용자 정의 타입 가드
// ============================================
interface User {
  id: number;
  email: string;
  name: string;
}

// TODO: value가 User 타입인지 확인하는 타입 가드를 작성하세요
// 반환 타입: value is User
function isUser(value: unknown) {
  // TODO: 구현하세요
  return false;
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

// TODO: Partial을 사용하여 모든 속성이 선택적인 타입을 만드세요
type ProductUpdate = unknown;

// TODO: Required를 사용하여 모든 속성이 필수인 타입을 만드세요
type ProductComplete = unknown;

// ============================================
// 과제 9: 유틸리티 타입 - Pick, Omit
// ============================================
// TODO: Pick을 사용하여 id와 name만 가진 타입을 만드세요
type ProductSummary = unknown;

// TODO: Omit을 사용하여 id를 제외한 타입을 만드세요
type ProductInput = unknown;

// ============================================
// 과제 10: 유틸리티 타입 - Record
// ============================================
// TODO: Record를 사용하여 문자열 키와 Product 값을 가진 타입을 만드세요
type ProductCatalog = unknown;

// ============================================
// 과제 11: keyof와 typeof 연산자
// ============================================
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
} as const;

// TODO: config 객체에서 타입을 추출하세요
type Config = unknown;

// TODO: config 객체의 키 타입을 추출하세요
type ConfigKey = unknown;

// ============================================
// 과제 12: 제네릭 API 래퍼 함수 (실습 과제)
// ============================================
// TODO: 제네릭을 사용하여 타입 안전한 API 래퍼를 만드세요
async function fetchData(url) {
  // TODO: 구현하세요
  // 실제로는 fetch를 사용하지만, 여기서는 mock 데이터 반환
  return null;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================
console.log("=== 3단계 테스트 ===");

/*
// 테스트 1: first, last
console.log("first([1, 2, 3]):", first([1, 2, 3])); // 1
console.log("last(['a', 'b', 'c']):", last(["a", "b", "c"])); // 'c'

// 테스트 2: getLength
console.log('getLength("hello"):', getLength("hello")); // 5
console.log("getLength([1, 2, 3]):", getLength([1, 2, 3])); // 3

// 테스트 3: getProperty
const user = { id: 1, name: "Alice", email: "alice@example.com" };
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
console.log("isUser({ id: 1, email: 'test', name: 'test' }):", 
  isUser({ id: 1, email: "test", name: "test" })); // true
console.log("isUser({ random: 'data' }):", isUser({ random: "data" })); // false
*/

console.log("타입을 완성하고 위 테스트 코드의 주석을 해제하세요!");

export {};
