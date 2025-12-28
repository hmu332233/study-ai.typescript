# 1단계: 환경 설정 및 기본 타입 시스템

## 학습 목표
- `tsconfig.json`을 이해하고 설정할 수 있다
- `any`를 쓰지 않으면서 변수와 함수의 타입을 선언할 수 있다
- 기본 타입과 특수 타입의 차이를 이해한다

## 학습 내용

### 1. 컴파일러와 설정 (`tsconfig.json`)
- TS 동작 방식: `.ts` → 트랜스파일링 → `.js`
- 필수 옵션: `target`, `module`, `strict`, `outDir`, `rootDir`

### 2. 기본 타입과 타입 추론
- Primitive Types: `string`, `number`, `boolean`, `symbol`
- 배열: `string[]` vs `Array<string>`
- 튜플: `[string, number]`
- 타입 추론: 초기값을 통한 자동 타입 결정

### 3. 특수 타입
- `any` vs `unknown`: 타입 검사 포기 vs 안전한 any
- `void` vs `never`: 리턴없음 vs 절대 리턴하지 않음

## 실습 파일

| 파일 | 설명 |
|------|------|
| `exercise.ts` | 초기화 코드 (직접 완성해보세요) |
| `solution.ts` | 완성된 정답 코드 |

## 실습 과제
기존에 작성했던 간단한 JS 유틸리티 함수 5개를 타입스크립트로 변환하고,
`noImplicitAny` 에러를 모두 해결해 보세요.

## 실행 방법
```bash
# 타입 체크
pnpm exec tsc --noEmit -p lessons/01-basics-and-primitives

# 실행 (ts-node 사용)
pnpm exec ts-node lessons/01-basics-and-primitives/exercise.ts
```
