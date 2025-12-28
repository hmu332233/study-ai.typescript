/**
 * 4단계: 실전 적용 및 생태계 (Ecosystem & Advanced) - 정답
 *
 * 이 파일은 exercise.ts의 완성된 버전입니다.
 * 스스로 먼저 풀어보고, 막히면 참고하세요!
 */

// ============================================
// 과제 1: 타입 단언 (Type Assertion)
// ============================================
function getInputValue(id: string): string {
  const element = document.getElementById(id);
  if (element === null) {
    throw new Error(`Element with id '${id}' not found`);
  }
  // instanceof로 타입 확인 후 사용 (더 안전한 방법)
  if (element instanceof HTMLInputElement) {
    return element.value;
  }
  // 또는 타입 단언 사용 (덜 안전하지만 간단)
  // return (element as HTMLInputElement).value;
  throw new Error(`Element with id '${id}' is not an input element`);
}

// ============================================
// 과제 2: 논-널 단언 연산자 (!)
// ============================================
function getFromMap(map: Map<string, number>, key: string): number {
  const value = map.get(key);
  // 방법 1: 논-널 단언 (! 사용) - 위험할 수 있음
  // return map.get(key)!;

  // 방법 2: 안전한 처리 (권장)
  if (value === undefined) {
    throw new Error(`Key '${key}' not found in map`);
  }
  return value;
}

// ============================================
// 과제 3: Discriminated Union - 상태 관리
// ============================================
interface LoadingState {
  status: "loading";
}

interface SuccessState<T> {
  status: "success";
  data: T;
}

interface ErrorState {
  status: "error";
  error: string;
}

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function handleAsyncState<T>(state: AsyncState<T>): string {
  switch (state.status) {
    case "loading":
      return "로딩 중...";
    case "success":
      return `성공: ${JSON.stringify(state.data)}`;
    case "error":
      return `에러: ${state.error}`;
  }
}

// ============================================
// 과제 4: Exhaustive Check (완전성 검사)
// ============================================
type PaymentMethod = "card" | "cash" | "transfer";

function getPaymentFee(method: PaymentMethod): number {
  switch (method) {
    case "card":
      return 100;
    case "cash":
      return 0;
    case "transfer":
      return 50;
    default:
      // 완전성 검사: 모든 케이스가 처리되면 여기 도달하지 않음
      // 새로운 PaymentMethod가 추가되면 컴파일 에러 발생
      const _exhaustiveCheck: never = method;
      return _exhaustiveCheck;
  }
}

// ============================================
// 과제 5: 조건부 타입 (Conditional Types)
// ============================================
type Unwrap<T> = T extends Array<infer U> ? U : T;

// 테스트:
type Test1 = Unwrap<string[]>; // string
type Test2 = Unwrap<number>; // number
type Test3 = Unwrap<Array<{ id: number }>>; // { id: number }

// ============================================
// 과제 6: infer 키워드
// ============================================
// ReturnType 재구현
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

// 첫 번째 파라미터 타입 추출
type FirstParameter<T> = T extends (first: infer F, ...args: unknown[]) => unknown
  ? F
  : never;

// 테스트:
type FuncReturnType = MyReturnType<() => string>; // string
type FuncFirstParam = FirstParameter<(a: number, b: string) => void>; // number

// ============================================
// 과제 7: 템플릿 리터럴 타입
// ============================================
type EventName = "click" | "change" | "focus" | "blur";
type EventHandlerName<T extends string> = `on${Capitalize<T>}`;

// 테스트:
type ClickHandler = EventHandlerName<"click">; // 'onClick'
type ChangeHandler = EventHandlerName<"change">; // 'onChange'

// 모든 이벤트 핸들러 이름
type AllHandlers = EventHandlerName<EventName>;
// 'onClick' | 'onChange' | 'onFocus' | 'onBlur'

// ============================================
// 과제 8: 타입 안전한 이벤트 에미터
// ============================================
interface EventMap {
  userLogin: { userId: number; timestamp: Date };
  userLogout: { userId: number };
  pageView: { path: string; referrer?: string };
}

class TypedEventEmitter {
  private listeners = new Map<
    keyof EventMap,
    Array<(payload: EventMap[keyof EventMap]) => void>
  >();

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
    console.log(`Emitted '${event}':`, payload);
  }

  on<K extends keyof EventMap>(
    event: K,
    handler: (payload: EventMap[K]) => void
  ): void {
    const handlers = this.listeners.get(event) ?? [];
    handlers.push(handler as (payload: EventMap[keyof EventMap]) => void);
    this.listeners.set(event, handlers);
  }

  off<K extends keyof EventMap>(
    event: K,
    handler: (payload: EventMap[K]) => void
  ): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      const index = handlers.indexOf(
        handler as (payload: EventMap[keyof EventMap]) => void
      );
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }
}

// ============================================
// 과제 9: 모듈 보강 (Module Augmentation)
// ============================================
// 전역 Window 타입에 커스텀 속성 추가
declare global {
  interface Window {
    myApp?: {
      version: string;
      config: Record<string, unknown>;
    };
  }
}

// ============================================
// 과제 10: 선언 파일 (.d.ts) 작성 예시
// ============================================
// 이것은 별도의 .d.ts 파일에 작성하는 것이 일반적입니다

// 가상의 모듈 타입 선언 예시 (별도 .d.ts 파일에 작성)
// declare module "my-library" {
//   export function doSomething(value: string): number;
//   export interface Config {
//     enabled: boolean;
//     timeout: number;
//   }
//   export function configure(config: Partial<Config>): void;
// }

// ============================================
// 테스트 코드
// ============================================
console.log("=== 4단계 테스트 (정답) ===");

// Discriminated Union 테스트
const loadingState: AsyncState<string> = { status: "loading" };
const successState: AsyncState<string> = { status: "success", data: "Hello!" };
const errorState: AsyncState<string> = {
  status: "error",
  error: "Something went wrong",
};

console.log(handleAsyncState(loadingState)); // 로딩 중...
console.log(handleAsyncState(successState)); // 성공: "Hello!"
console.log(handleAsyncState(errorState)); // 에러: Something went wrong

// PaymentMethod 테스트
console.log("Card fee:", getPaymentFee("card")); // 100
console.log("Cash fee:", getPaymentFee("cash")); // 0
console.log("Transfer fee:", getPaymentFee("transfer")); // 50

// 이벤트 에미터 테스트
const emitter = new TypedEventEmitter();

emitter.on("userLogin", (payload) => {
  console.log(`User ${payload.userId} logged in at ${payload.timestamp}`);
});

emitter.on("pageView", (payload) => {
  console.log(`Page viewed: ${payload.path}`);
});

emitter.emit("userLogin", { userId: 1, timestamp: new Date() });
emitter.emit("pageView", { path: "/home" });

// 타입 테스트 (컴파일 시점에만 체크)
// 아래는 타입 에러를 발생시켜야 함 (주석 해제하면 에러)
// emitter.emit("userLogin", { wrongField: "test" }); // Error!
// emitter.emit("unknownEvent", {}); // Error!

console.log("\n=== 타입 테스트 ===");
console.log("Unwrap<string[]>:", "string (컴파일 타임에 확인)");
console.log("EventHandlerName<'click'>:", "onClick (컴파일 타임에 확인)");

export {};
