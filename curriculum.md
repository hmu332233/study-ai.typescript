### 1단계: 환경 설정 및 기본 타입 시스템 (Based & Primitives)

**핵심 목표:** `tsconfig.json`을 이해하고, `any`를 쓰지 않으면서 변수와 함수의 타입을 선언할 수 있다.

#### 1. 컴파일러와 설정 (`tsconfig.json`)

* **TS 동작 방식:** 소스 코드(.ts) → 트랜스파일링(Transpiling) → 자바스크립트(.js) 실행.
* **필수 옵션 이해:**
* `target`: 변환될 JS 버전 설정 (ES5, ES6, ESNext 등).
* `module`: 모듈 시스템 설정 (CommonJS vs ESNext).
* **`strict: true`**: (★중요) 이 옵션을 켜야 진정한 TS 학습이 가능합니다 (`noImplicitAny`, `strictNullChecks` 포함).
* `outDir`, `rootDir`: 빌드 경로 관리.



#### 2. 기본 타입과 타입 추론 (Type Inference)

* **Primitive Types:** `string`, `number`, `boolean`, `symbol`.
* **배열과 튜플:**
* `string[]` vs `Array<string>`.
* `Tuple`: `[string, number]` (고정된 길이와 타입 순서, React Hooks 리턴값 이해에 필수).


* **타입 추론:** 명시적으로 타입을 적지 않아도 초기값을 통해 타입을 추론하는 원리.

#### 3. 특수 타입 (JS 개발자가 가장 헷갈리는 부분)

* **`any` vs `unknown**`:
* `any`: 타입 검사 포기 (사용 지양).
* `unknown`: 무엇이든 들어올 수 있지만, 사용 전 반드시 타입을 확인해야 함 (안전한 `any`).


* **`void` vs `never**`:
* `void`: 리턴값이 없는 함수.
* `never`: 절대 리턴되지 않는 함수 (예: 무한 루프, 에러 throw).



> **🎯 1단계 실습 과제:**
> 기존에 작성했던 간단한 JS 유틸리티 함수(예: 덧셈, 문자열 조작) 5개를 `.ts` 파일로 옮기고, `noImplicitAny` 에러를 모두 해결해 보세요.

---

### 2단계: 복잡한 데이터 모델링 (Structural Typing)

**핵심 목표:** 객체 지향적인 구조와 유연한 데이터 타입을 정의하여 코드의 의도를 명확히 한다.

#### 1. 객체와 인터페이스 (Interface & Type Alias)

* **Interface:** 객체의 뼈대 정의 (`extends`를 통한 상속/확장 용이).
* **Type Alias:** 유니온 타입 등 더 복잡한 타입 정의 (`type MyType = A | B`).
* **Property 속성:**
* Optional Property (`?`): 있어도 되고 없어도 되는 속성.
* Readonly Property (`readonly`): 수정 불가능한 속성 (불변성 유지).


* **Index Signature:** 속성 이름을 미리 알 수 없을 때 사용 (`{ [key: string]: number }`).

#### 2. 유니온(Union)과 인터섹션(Intersection)

* **Union (`|`)**: "A 이거나 B이다". (JS의 동적 타이핑을 커버하는 핵심).
* 예: `string | number` (ID 값 처리 시 유용).


* **Intersection (`&`)**: "A 이면서 동시에 B이다". (두 객체를 합칠 때 유용).

#### 3. 리터럴 타입 (Literal Type)

* `const` 변수처럼 특정 값 자체를 타입으로 사용.
* 예: `type HttpMethod = 'GET' | 'POST' | 'PUT';` (오타 방지에 탁월).

#### 4. Enum (열거형)

* JS에 없는 문법. 상수 집합을 정의할 때 사용.
* *Tip: 최근에는 Tree-shaking 이슈로 Enum 대신 `const object` + `as const` 패턴을 선호하기도 함.*

> **🎯 2단계 실습 과제:**
> 사용자(User) 객체와 게시글(Post) 객체의 타입을 정의해 보세요. 사용자는 '일반'과 '관리자' 권한을 가지며, 게시글은 '임시저장', '발행' 상태를 가집니다.

---

### 3단계: 제네릭과 타입 조작 (Generics & Type Manipulation)

**핵심 목표:** **"타입을 파라미터로 받는 함수"**를 이해하고, 재사용 가능한 유연한 코드를 작성한다.

#### 1. 제네릭 (Generics) 기초

* **개념:** 타입을 미리 지정하지 않고, 사용할 때 정의하는 기법 (`<T>`).
* **적용:** 함수, 인터페이스, 클래스에 제네릭 적용하기.
* **제약 조건 (`extends`):** 아무 타입이나 받지 않고, 특정 조건을 만족하는 타입만 받도록 제한 (`<T extends { length: number }>`).

#### 2. 타입 좁히기 (Type Narrowing)

* JS의 런타임 검사(`if`, `switch`)를 통해 TS가 타입을 확신하게 만드는 과정.
* `typeof`, `instanceof`, `in` 연산자 활용.
* **사용자 정의 타입 가드 (Type Predicates):** `function isString(val: any): val is string` 형태의 함수 작성.

#### 3. 유틸리티 타입 (Utility Types) - 실무 필수

* 기존 타입을 변형해서 새로운 타입을 만드는 TS 내장 도구.
* `Partial<T>`, `Required<T>`, `Readonly<T>`.
* `Pick<T, K>`, `Omit<T, K>`.
* `Record<K, T>`.

#### 4. 고급 타입 조작

* **`keyof` 연산자:** 객체 타입의 키들을 유니온 타입으로 추출.
* **`typeof` 연산자 (타입 컨텍스트):** JS 값(변수, 객체)에서 타입을 추출.

> **🎯 3단계 실습 과제:**
> API 응답을 처리하는 `fetchData<T>(url: string): Promise<T>` 형태의 제네릭 래퍼 함수를 만들어 보세요.

---

### 4단계: 실전 적용 및 생태계 (Ecosystem & Advanced)

**핵심 목표:** 외부 라이브러리를 자유롭게 사용하고, 프레임워크(React/Node) 환경에서 TS를 능숙하게 다룬다.

#### 1. 외부 라이브러리 연동

* **`@types` 패키지:** `npm install @types/lodash` 등 DefinitelyTyped 저장소 활용.
* **`.d.ts` (Declaration File):** 타입 정의 파일의 역할 이해 (구현부 없이 타입만 선언).
* **모듈 보강 (Module Augmentation):** 기존 라이브러리의 타입을 확장하거나 덮어쓰기.

#### 2. 타입 단언 (Type Assertion)

* `as` 키워드: 개발자가 컴파일러보다 타입을 더 잘 알 때 강제로 타입 지정.
* *주의: 남용 시 런타임 에러의 주범이 되므로 제한적으로 사용.*

#### 3. 프레임워크별 패턴 (선택)

* **React:**
* Props에 Interface 적용.
* `useState<User | null>(null)`과 같은 제네릭 훅 사용.
* 이벤트 핸들러 타입 (`React.ChangeEvent<HTMLInputElement>`).


* **Node.js (Express/NestJS):**
* DTO (Data Transfer Object) 패턴과 Class-validator 연동.
* Request/Response 객체 타이핑.
