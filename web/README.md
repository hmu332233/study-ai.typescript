# TypeScript Classroom Web

TypeScript 학습을 위한 인터랙티브 웹 플랫폼입니다. `lessons/` 디렉토리에 정의된 커리큘럼을 브라우저에서 직접 실습하고 타입 에러를 확인할 수 있는 환경을 제공합니다.

## 주요 기능

- **인터랙티브 에디터**: Monaco Editor를 사용하여 브라우저에서 직접 TypeScript 코드를 작성합니다.
- **실시간 타입 체크**: 코드 작성 시 발생하는 TypeScript 타입 에러를 실시간으로 확인합니다.
- **학습 가이드**: 각 단계별 학습 목표와 설명(README)을 에디터 옆에서 바로 읽으며 실습합니다.
- **콘솔 출력**: `console.log` 결과를 웹 UI에서 즉시 확인합니다.

## 기술 스택

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **Editor**: Monaco Editor (@monaco-editor/react)
- **Markdown**: react-markdown (rehype-highlight, remark-gfm)
- **Routing**: React Router 7

## 시작하기

`web` 디렉토리 내에서 다음 명령어를 실행합니다.

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev
```

브라우저에서 `http://localhost:5173`에 접속하여 학습을 시작하세요.

## 학습 구조 연동

웹 플랫폼은 프로젝트 루트의 `lessons/` 폴더 구조를 기반으로 작동합니다.

1. **Lesson 리스트**: `lessons/` 내의 01~04 단계별 폴더를 자동으로 로드합니다.
2. **콘텐츠 로드**:
   - `README.md`: 학습 설명 영역에 표시됩니다.
   - `exercise.ts`: 초기 편집기 코드로 설정됩니다.
   - `solution.ts`: 정답 확인 시 참조됩니다.

## 관련 문서

- [전체 프로젝트 커리큘럼](../lessons/README.md)
- [플랫폼 개발 계획](../context/PLATFORM_PLAN.md)
