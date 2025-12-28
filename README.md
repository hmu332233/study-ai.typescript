# TypeScript Classroom

JS 기초 지식이 있는 사람을 위한 **TypeScript 학습 플랫폼**입니다. 

## 프로젝트 목적
이 프로젝트의 핵심은 **AI 기반으로 학습 콘텐츠와 플랫폼을 직접 구축하고 그 효용성을 검증하는 것**에 있습니다.
- **AI 주도 커리큘럼:** LLM(Gemini 3.0 Pro, Claude 3.5 Opus)이 설계하고 작성한 단계별 학습 콘텐츠를 제공합니다.
- **플랫폼 자가 구축:** 학습자가 가장 효율적으로 실습할 수 있는 전용 인터랙티브 웹 플랫폼을 AI와 함께 개발하여 테스트합니다.
- **효용성 검증:** AI가 생성한 학습 경로가 실제 개발자의 역량 향상에 얼마나 기여하는지 실험하는 오픈 프로젝트입니다.

## 프로젝트 구조

- **[lessons/](./lessons/README.md)**: 단계별 TypeScript 커리큘럼 및 실습 파일
- **[web/](./web/README.md)**: 인터랙티브 학습을 위한 React 기반 웹 플랫폼
- **[context/](./context/progress.md)**: 프로젝트 계획 및 진행 현황 문서

```text
ts-classroom/
├── lessons/
├── web/
└── context/
```

## 커리큘럼 개요

1. **[1단계: 환경 설정 및 기본 타입](./lessons/01-basics-and-primitives)**: `tsconfig`, 기본 타입, 특수 타입 (`any`, `unknown`, `never`)
2. **[2단계: 복잡한 데이터 모델링](./lessons/02-structural-typing)**: Interface vs Type Alias, Union, Intersection, Enum
3. **[3단계: 제네릭과 타입 조작](./lessons/03-generics-and-manipulation)**: Generic, Type Narrowing, Utility Types, `keyof`/`typeof`
4. **[4단계: 실전 적용 및 생태계](./lessons/04-ecosystem-and-advanced)**: 외부 라이브러리 연동, Advanced Patterns (Conditional Types), 모듈 보강

## 시작하기

### 방법 1: 웹 플랫폼 이용 (추천)
브라우저에서 실시간 타입 에러를 확인하며 학습할 수 있습니다.

```bash
pnpm install
cd web
pnpm run dev
```
접속: `http://localhost:5173`

### 방법 2: CLI 환경 이용
에디터(VS Code 등)에서 파일을 직접 수정하며 CLI 명령어로 검증합니다.

```bash
# 의존성 설치
pnpm install

# 특정 단계 실습 실행 (예: 1단계)
pnpm run lesson:01

# 특정 단계 타입 체크
pnpm run check:01
```

## 학습 방법

1. `web` 플랫폼을 실행하거나 `lessons/` 내의 단계별 `README.md`를 읽습니다.
2. `exercise.ts` 파일을 열어 `TODO` 주석이 달린 부분을 완성합니다.
3. 웹 플랫폼의 에러 메시지나 `pnpm run check:XX` 명령어를 통해 타입 안정성을 검증합니다.
4. 어려움이 있을 경우 `solution.ts` 파일을 참고하여 정답을 확인합니다.

---

**목표:** LLM이 설계한 커리큘럼의 효용성을 검증하고, 학습자가 실무 수준의 TypeScript 역량을 최단 시간에 확보하도록 돕습니다.
