# TypeScript Classroom

JS 기초 지식이 있는 사람을 위한 **실무 중심 TypeScript 학습 프로젝트**입니다.
LLM이 추천 및 만들어준 커리큘럼을 따라 단계별로 TypeScript의 핵심 개념을 익히는 목적으로 만들어졌습니다.

커리큘럼 개요 생성: gemini 3.0 pro
커리큘럼 세부 작성: claude opus 4.5

LLM이 만들어준 커리큘럼이 실제로 효용이 있는지, 학습자가 쉽게 따라올 수 있는지 검증하는 것이 주요 목표입니다.

## 학습 구조

```
lessons/
├── 01-basics-and-primitives/     # 1단계: 환경 설정 및 기본 타입
├── 02-structural-typing/         # 2단계: 복잡한 데이터 모델링
├── 03-generics-and-manipulation/ # 3단계: 제네릭과 타입 조작
└── 04-ecosystem-and-advanced/    # 4단계: 실전 적용 및 생태계
```

각 디렉토리에는:
- `README.md` - 학습 내용 및 목표
- `exercise.ts` - 직접 완성해볼 초기 코드
- `solution.ts` - 완성된 정답 코드

## 시작하기

```bash
# 의존성 설치
pnpm install

# 각 단계별 실습 실행
pnpm run lesson:01  # 1단계 실행
pnpm run lesson:02  # 2단계 실행
pnpm run lesson:03  # 3단계 실행
pnpm run lesson:04  # 4단계 실행

# 각 단계별 타입 체크
pnpm run check:01   # 1단계 타입 체크
pnpm run check:02   # 2단계 타입 체크
pnpm run check:03   # 3단계 타입 체크
pnpm run check:04   # 4단계 타입 체크
```

## 커리큘럼 개요

### 1단계: 환경 설정 및 기본 타입 시스템
- `tsconfig.json` 이해
- 기본 타입과 타입 추론
- 특수 타입 (`any`, `unknown`, `void`, `never`)

### 2단계: 복잡한 데이터 모델링
- Interface & Type Alias
- Union & Intersection
- Literal Type & Enum

### 3단계: 제네릭과 타입 조작
- 제네릭 기초 및 제약 조건
- 타입 좁히기 (Type Narrowing)
- 유틸리티 타입 (`Partial`, `Pick`, `Omit` 등)
- `keyof`, `typeof` 연산자

### 4단계: 실전 적용 및 생태계
- 외부 라이브러리 연동 (`@types`)
- 타입 단언 (Type Assertion)
- 고급 패턴 (Discriminated Union, Conditional Types)
- 모듈 보강 및 선언 파일

## 학습 방법

1. 각 단계의 `README.md`를 읽고 개념을 이해합니다
2. `exercise.ts`를 열어 TODO 주석을 따라 코드를 완성합니다
3. `pnpm run check:XX`로 타입 에러를 확인합니다
4. 막히면 `solution.ts`를 참고합니다
5. 모든 타입 에러가 해결되면 다음 단계로 진행합니다

## 참고 자료

- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
