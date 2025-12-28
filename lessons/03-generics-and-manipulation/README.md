# 3단계: 제네릭과 타입 조작 (Generics & Type Manipulation)

## 학습 목표
- **"타입을 파라미터로 받는 함수"**를 이해한다
- 재사용 가능한 유연한 코드를 작성할 수 있다
- 유틸리티 타입과 타입 좁히기를 활용할 수 있다

## 학습 내용

### 1. 제네릭 (Generics) 기초
- **개념**: 타입을 미리 지정하지 않고, 사용할 때 정의하는 기법 (`<T>`)
- **적용**: 함수, 인터페이스, 클래스에 제네릭 적용
- **제약 조건 (`extends`)**: 특정 조건을 만족하는 타입만 받도록 제한

### 2. 타입 좁히기 (Type Narrowing)
- JS의 런타임 검사를 통해 TS가 타입을 확신하게 만드는 과정
- `typeof`, `instanceof`, `in` 연산자 활용
- **사용자 정의 타입 가드**: `val is Type` 형태

### 3. 유틸리티 타입 (Utility Types)
- `Partial<T>`, `Required<T>`, `Readonly<T>`
- `Pick<T, K>`, `Omit<T, K>`
- `Record<K, T>`

### 4. 고급 타입 조작
- **`keyof` 연산자**: 객체 타입의 키들을 유니온 타입으로 추출
- **`typeof` 연산자**: 값에서 타입을 추출

## 실습 파일

| 파일 | 설명 |
|------|------|
| `exercise.ts` | 초기화 코드 (직접 완성해보세요) |
| `solution.ts` | 완성된 정답 코드 |

## 실습 과제
API 응답을 처리하는 `fetchData<T>(url: string): Promise<T>` 형태의 제네릭 래퍼 함수를 만들어 보세요.

## 실행 방법
```bash
# 타입 체크
pnpm run check:03

# 실행
pnpm run lesson:03
```
