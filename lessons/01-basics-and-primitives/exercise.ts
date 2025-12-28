/**
 * 1단계: 환경 설정 및 기본 타입 시스템
 *
 * 목표: 아래의 JavaScript 함수들을 TypeScript로 변환하세요.
 *       `any`를 사용하지 않고 모든 타입 에러를 해결해야 합니다.
 *
 * 힌트:
 * - 함수 매개변수와 반환값에 타입을 명시하세요
 * - 배열, 튜플, 유니온 타입을 적절히 활용하세요
 * - `unknown`과 `never` 타입의 사용법을 익히세요
 */

// ============================================
// 과제 1: 기본 타입 - 두 숫자를 더하는 함수
// ============================================
// TODO: 매개변수와 반환 타입을 추가하세요
function add(a, b) {
  return a + b;
}

// ============================================
// 과제 2: 문자열 조작 - 문자열을 뒤집는 함수
// ============================================
// TODO: 타입을 추가하세요
function reverseString(str) {
  return str.split("").reverse().join("");
}

// ============================================
// 과제 3: 배열 타입 - 숫자 배열의 합을 구하는 함수
// ============================================
// TODO: 배열 타입을 사용하세요 (string[] 또는 Array<string> 형식)
function sumArray(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// ============================================
// 과제 4: 튜플 타입 - 이름과 나이를 튜플로 반환
// ============================================
// TODO: 튜플 반환 타입 [string, number]를 명시하세요
function createPerson(name, age) {
  return [name, age];
}

// ============================================
// 과제 5: 유니온 타입 - ID를 문자열로 변환
// ============================================
// TODO: id는 string 또는 number일 수 있습니다
function formatId(id) {
  return `ID: ${id}`;
}

// ============================================
// 과제 6: unknown 타입 - 안전한 JSON 파싱
// ============================================
// TODO: any 대신 unknown을 사용하고, 타입 가드를 추가하세요
function safeJsonParse(jsonString) {
  try {
    const result = JSON.parse(jsonString);
    return result;
  } catch {
    return null;
  }
}

// ============================================
// 과제 7: void 타입 - 콘솔에 로그를 출력하는 함수
// ============================================
// TODO: 반환 타입이 없음을 명시하세요
function logMessage(message) {
  console.log(`[LOG]: ${message}`);
}

// ============================================
// 과제 8: never 타입 - 항상 에러를 던지는 함수
// ============================================
// TODO: never 타입을 사용하세요
function throwError(message) {
  throw new Error(message);
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================
console.log("=== 1단계 테스트 ===");
console.log("add(1, 2):", add(1, 2));
console.log('reverseString("hello"):', reverseString("hello"));
console.log("sumArray([1, 2, 3, 4, 5]):", sumArray([1, 2, 3, 4, 5]));
console.log('createPerson("Alice", 30):', createPerson("Alice", 30));
console.log("formatId(123):", formatId(123));
console.log('formatId("ABC"):', formatId("ABC"));
console.log('safeJsonParse(\'{"name": "test"}\'):', safeJsonParse('{"name": "test"}'));
logMessage("테스트 메시지");

// throwError는 프로그램을 종료시키므로 주석 처리
// throwError("테스트 에러");

// 모듈로 인식시키기 위한 빈 export
export {};
