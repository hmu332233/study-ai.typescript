/**
 * 4단계: 실전 적용 및 생태계 (Ecosystem & Advanced)
 *
 * 목표: 실제 프로젝트에서 사용되는 고급 타입 패턴을 익히고,
 *       외부 라이브러리와 함께 TypeScript를 활용하세요.
 *
 * 힌트:
 * - as 키워드는 최소한으로 사용하세요
 * - Discriminated Union은 success, type 등의 공통 속성으로 구분
 * - never 타입을 활용하여 완전성 검사를 수행하세요
 */

// ============================================
// 과제 1: 타입 단언 (Type Assertion)
// ============================================
// 상황: DOM에서 요소를 가져올 때 타입 단언이 필요합니다

// TODO: getElementById의 반환 타입을 HTMLInputElement로 단언하세요
// 주의: 실제로는 요소가 없을 수 있으므로 null 체크가 필요합니다
function getInputValue(id: string): string {
  const element = document.getElementById(id);
  // TODO: element가 null이 아니고, HTMLInputElement임을 확인한 후 value 반환
  return "";
}

// ============================================
// 과제 2: 논-널 단언 연산자 (!)
// ============================================
// TODO: Map에서 확실히 존재하는 값을 가져올 때 ! 사용 (주의해서 사용)
function getFromMap(map: Map<string, number>, key: string): number {
  // TODO: map.get(key)!를 사용하되, 실제로는 undefined 처리가 더 안전함을 이해하세요
  return 0;
}

// ============================================
// 과제 3: Discriminated Union - 상태 관리
// ============================================
// TODO: 로딩/성공/에러 상태를 구분하는 타입을 정의하세요
// 각 상태는 status 속성으로 구분됩니다

interface LoadingState {
  // status: 'loading'
}

interface SuccessState<T> {
  // status: 'success', data: T
}

interface ErrorState {
  // status: 'error', error: string
}

// TODO: 위 세 상태를 유니온으로 합친 타입
type AsyncState<T> = unknown;

// TODO: AsyncState를 처리하는 함수를 작성하세요
function handleAsyncState(state: unknown): string {
  // switch문으로 status에 따라 다른 메시지 반환
  return "";
}

// ============================================
// 과제 4: Exhaustive Check (완전성 검사)
// ============================================
type PaymentMethod = "card" | "cash" | "transfer";

// TODO: 모든 PaymentMethod 케이스를 처리하고, 
// 새로운 결제 방법이 추가되면 컴파일 에러가 발생하도록 하세요
function getPaymentFee(method: PaymentMethod): number {
  // switch문 사용, default에서 never 타입으로 완전성 검사
  return 0;
}

// ============================================
// 과제 5: 조건부 타입 (Conditional Types)
// ============================================
// TODO: T가 배열이면 배열의 요소 타입을, 아니면 T 자체를 반환하는 타입
type Unwrap<T> = unknown;

// 테스트:
// Unwrap<string[]> => string
// Unwrap<number> => number

// ============================================
// 과제 6: infer 키워드
// ============================================
// TODO: 함수 타입에서 반환 타입을 추출하는 타입 (ReturnType 재구현)
type MyReturnType<T> = unknown;

// TODO: 함수 타입에서 첫 번째 파라미터 타입을 추출하는 타입
type FirstParameter<T> = unknown;

// ============================================
// 과제 7: 템플릿 리터럴 타입
// ============================================
// TODO: 이벤트 핸들러 이름을 자동으로 생성하는 타입
// 예: 'click' -> 'onClick', 'change' -> 'onChange'
type EventName = "click" | "change" | "focus" | "blur";
type EventHandlerName<T extends string> = unknown;

// ============================================
// 과제 8: 타입 안전한 이벤트 에미터
// ============================================
// TODO: 이벤트 타입에 따라 다른 페이로드를 가지는 이벤트 시스템

interface EventMap {
  userLogin: { userId: number; timestamp: Date };
  userLogout: { userId: number };
  pageView: { path: string; referrer?: string };
}

// TODO: EventMap을 기반으로 타입 안전한 emit과 on 메서드 구현
class TypedEventEmitter {
  // TODO: 구현하세요
  // emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void
  // on<K extends keyof EventMap>(event: K, handler: (payload: EventMap[K]) => void): void
}

// ============================================
// 과제 9: 모듈 보강 (Module Augmentation)
// ============================================
// 상황: 외부 라이브러리의 타입을 확장해야 할 때

// 예시: 전역 Window 타입에 커스텀 속성 추가
// declare global {
//   interface Window {
//     myApp: {
//       version: string;
//       config: Record<string, unknown>;
//     };
//   }
// }

// ============================================
// 과제 10: 선언 파일 (.d.ts) 작성
// ============================================
// 상황: 타입이 없는 JS 라이브러리에 타입을 추가할 때

// 예시: 가상의 'my-library' 모듈 타입 선언
// declare module 'my-library' {
//   export function doSomething(value: string): number;
//   export interface Config {
//     enabled: boolean;
//     timeout: number;
//   }
// }

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================
console.log("=== 4단계 테스트 ===");

/*
// Discriminated Union 테스트
const loadingState: AsyncState<string> = { status: 'loading' };
const successState: AsyncState<string> = { status: 'success', data: 'Hello!' };
const errorState: AsyncState<string> = { status: 'error', error: 'Something went wrong' };

console.log(handleAsyncState(loadingState));
console.log(handleAsyncState(successState));
console.log(handleAsyncState(errorState));

// PaymentMethod 테스트
console.log('Card fee:', getPaymentFee('card'));
console.log('Cash fee:', getPaymentFee('cash'));
console.log('Transfer fee:', getPaymentFee('transfer'));

// 조건부 타입 테스트
type Test1 = Unwrap<string[]>;  // string
type Test2 = Unwrap<number>;    // number

// 템플릿 리터럴 타입 테스트
type ClickHandler = EventHandlerName<'click'>;  // 'onClick'

// 이벤트 에미터 테스트
const emitter = new TypedEventEmitter();
emitter.on('userLogin', (payload) => {
  console.log(`User ${payload.userId} logged in at ${payload.timestamp}`);
});
emitter.emit('userLogin', { userId: 1, timestamp: new Date() });
*/

console.log("타입을 완성하고 위 테스트 코드의 주석을 해제하세요!");

export {};
