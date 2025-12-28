/**
 * 1단계: 환경 설정 및 기본 타입 시스템 - 정답
 *
 * 이 파일은 exercise.ts의 완성된 버전입니다.
 * 스스로 먼저 풀어보고, 막히면 참고하세요!
 */

// ============================================
// 과제 1: 기본 타입 - 두 숫자를 더하는 함수
// ============================================
function add(a: number, b: number): number {
  return a + b;
}

// ============================================
// 과제 2: 문자열 조작 - 문자열을 뒤집는 함수
// ============================================
function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

// ============================================
// 과제 3: 배열 타입 - 숫자 배열의 합을 구하는 함수
// ============================================
// number[] 또는 Array<number> 둘 다 사용 가능
function sumArray(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// ============================================
// 과제 4: 튜플 타입 - 이름과 나이를 튜플로 반환
// ============================================
// 튜플은 고정된 길이와 타입 순서를 가진 배열
function createPerson(name: string, age: number): [string, number] {
  return [name, age];
}

// ============================================
// 과제 5: 유니온 타입 - ID를 문자열로 변환
// ============================================
// 유니온 타입 (|)으로 여러 타입을 허용
function formatId(id: string | number): string {
  return `ID: ${id}`;
}

// ============================================
// 과제 6: unknown 타입 - 안전한 JSON 파싱
// ============================================
// unknown은 any와 달리 사용 전에 타입 체크가 필요
function safeJsonParse(jsonString: string): unknown {
  try {
    const result: unknown = JSON.parse(jsonString);
    return result;
  } catch {
    return null;
  }
}

// ============================================
// 과제 7: void 타입 - 콘솔에 로그를 출력하는 함수
// ============================================
// void는 반환값이 없음을 명시
function logMessage(message: string): void {
  console.log(`[LOG]: ${message}`);
}

// ============================================
// 과제 8: never 타입 - 항상 에러를 던지는 함수
// ============================================
// never는 절대 정상적으로 리턴하지 않는 함수
function throwError(message: string): never {
  throw new Error(message);
}

// ============================================
// 테스트 코드
// ============================================
console.log("=== 1단계 테스트 (정답) ===");
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
