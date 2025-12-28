---
model: claude-4.5-opus
---

# TypeScript Classroom 웹 학습 플랫폼 설계서

## 개요

기존 `ts-classroom` 레슨을 웹 브라우저에서 학습할 수 있는 인터랙티브 플랫폼을 구축합니다.

**기술 스택**: React + Vite + Tailwind CSS + TypeScript

---

## 핵심 기능

### 1. 레슨 뷰어
- 마크다운 README 렌더링
- 코드 하이라이팅
- 레슨 간 네비게이션

### 2. 코드 에디터
- 브라우저 내 TypeScript 코드 편집
- 실시간 타입 에러 표시
- exercise.ts / solution.ts 전환

### 3. 실시간 타입 체크
- 브라우저에서 TypeScript 컴파일러 실행
- 에러 메시지 한국어화 (선택)
- 라인별 에러 하이라이팅

### 4. 코드 실행 (iframe 샌드박스)
- TypeScript → JavaScript 변환 후 실행
- console.log 출력 캡처 및 표시
- 보안 격리된 환경에서 안전하게 실행
- 런타임 에러 캡처 및 표시

### 5. 진도 관리
- 레슨 완료 상태 저장 (LocalStorage)
- 전체 진도율 표시

---

## 프로젝트 구조

```
web/
├── public/
│   └── lessons/                    # 빌드 시 복사되는 레슨 데이터
│       ├── 01-basics-and-primitives/
│       │   ├── README.md
│       │   ├── exercise.ts
│       │   └── solution.ts
│       ├── 02-structural-typing/
│       ├── 03-generics-and-manipulation/
│       └── 04-ecosystem-and-advanced/
│
├── src/
│   ├── main.tsx                    # 엔트리 포인트
│   ├── App.tsx                     # 라우터 설정
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # 상단 헤더
│   │   │   ├── Sidebar.tsx         # 레슨 목록 사이드바
│   │   │   └── Layout.tsx          # 전체 레이아웃
│   │   │
│   │   ├── lesson/
│   │   │   ├── LessonContent.tsx   # README 마크다운 렌더링
│   │   │   ├── LessonNav.tsx       # 이전/다음 레슨 버튼
│   │   │   └── LessonProgress.tsx  # 진도 표시
│   │   │
│   │   ├── editor/
│   │   │   ├── CodeEditor.tsx      # Monaco 에디터 래퍼
│   │   │   ├── EditorTabs.tsx      # exercise/solution 탭
│   │   │   ├── TypeErrors.tsx      # 타입 에러 목록
│   │   │   ├── EditorToolbar.tsx   # 리셋, 복사, 실행 버튼
│   │   │   ├── CodeRunner.tsx      # iframe 샌드박스 코드 실행
│   │   │   └── ConsoleOutput.tsx   # 실행 결과 콘솔 출력
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Badge.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx            # 랜딩/커리큘럼 소개
│   │   ├── LessonPage.tsx          # 개별 레슨 페이지
│   │   └── NotFoundPage.tsx
│   │
│   ├── hooks/
│   │   ├── useLesson.ts            # 레슨 데이터 로드
│   │   ├── useProgress.ts          # 진도 관리
│   │   ├── useTypeCheck.ts         # TypeScript 컴파일러 연동
│   │   ├── useCodeRunner.ts        # 코드 실행 및 결과 관리
│   │   └── useLocalStorage.ts      # LocalStorage 유틸
│   │
│   ├── lib/
│   │   ├── typescript-worker.ts    # Web Worker로 TS 컴파일
│   │   ├── sandbox.ts              # iframe 샌드박스 관리
│   │   ├── lessons.ts              # 레슨 메타데이터
│   │   └── markdown.ts             # 마크다운 파싱 유틸
│   │
│   ├── types/
│   │   └── index.ts                # 공통 타입 정의
│   │
│   └── styles/
│       └── globals.css             # Tailwind 설정
│
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 핵심 의존성

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "@monaco-editor/react": "^4.x",
    "react-markdown": "^9.x",
    "remark-gfm": "^4.x",
    "rehype-highlight": "^7.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```

---

## 페이지별 상세 설계

### 1. 홈페이지 (`/`)

```
┌─────────────────────────────────────────────────────────────┐
│  [Header]  TypeScript Classroom                    [GitHub] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              TypeScript Classroom                           │
│      JS 개발자를 위한 실무 중심 TypeScript 학습             │
│                                                             │
│              [ 학습 시작하기 ]                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  커리큘럼 개요                                              │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ 1단계        │  │ 2단계        │                        │
│  │ 기본 타입    │  │ 구조적 타입  │                        │
│  │ ○○○○○ 0/8   │  │ ○○○○○ 0/9   │                        │
│  └──────────────┘  └──────────────┘                        │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ 3단계        │  │ 4단계        │                        │
│  │ 제네릭       │  │ 실전 적용    │                        │
│  │ ○○○○○ 0/12  │  │ ○○○○○ 0/10  │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. 레슨 페이지 (`/lesson/:id`)

```
┌─────────────────────────────────────────────────────────────┐
│  [Header]  TypeScript Classroom         [진도: 25%] [GitHub]│
├────────────┬────────────────────────────────────────────────┤
│            │                                                │
│  Sidebar   │   README 영역 (스크롤 가능)                    │
│            │   ─────────────────────────────                │
│  ○ 1단계   │   # 1단계: 환경 설정 및 기본 타입              │
│    ● 과제1 │                                                │
│    ○ 과제2 │   ## 학습 목표                                 │
│    ○ 과제3 │   - tsconfig.json을 이해하고...                │
│    ...     │                                                │
│            │   ## 학습 내용                                 │
│  ○ 2단계   │   ### 1. 컴파일러와 설정                       │
│  ○ 3단계   │   ...                                          │
│  ○ 4단계   │                                                │
│            ├────────────────────────────────────────────────┤
│            │   [exercise.ts] [solution.ts]    [Reset] [Run] │
│            │   ─────────────────────────────────────────────│
│            │   // 과제 1: 기본 타입                         │
│            │   function add(a, b) {  <- Error: 암묵적 any   │
│            │     return a + b;                              │
│            │   }                                            │
│            │                                                │
│            ├────────────────────────────────────────────────┤
│            │   Console Output                    [Clear]    │
│            │   ─────────────────────────────────────────────│
│            │   > add(1, 2): 3                               │
│            │   > reverseString("hello"): olleh              │
│            │                                                │
│            ├────────────────────────────────────────────────┤
│            │   타입 에러: 2개                               │
│            │   ─────────────────────────────────────────────│
│            │   Line 17: 'a' 매개변수에 암묵적 'any' 타입    │
│            │   Line 17: 'b' 매개변수에 암묵적 'any' 타입    │
├────────────┴────────────────────────────────────────────────┤
│  [← 이전 레슨]              [완료로 표시]      [다음 레슨 →]│
└─────────────────────────────────────────────────────────────┘
```

---

## 주요 타입 정의

```typescript
// types/index.ts

export interface Lesson {
  id: string;                    // '01-basics-and-primitives'
  number: number;                // 1
  title: string;                 // '환경 설정 및 기본 타입'
  description: string;           // 핵심 목표 설명
  readme: string;                // README.md 내용
  exercise: string;              // exercise.ts 내용
  solution: string;              // solution.ts 내용
}

export interface LessonMeta {
  id: string;
  number: number;
  title: string;
  description: string;
  taskCount: number;             // 과제 개수
}

export interface Progress {
  lessonId: string;
  completed: boolean;
  lastCode: string;              // 마지막 작성 코드
  completedAt?: Date;
}

export interface TypeCheckResult {
  success: boolean;
  errors: TypeErrorInfo[];
}

export interface TypeErrorInfo {
  line: number;
  column: number;
  message: string;
  code: number;                  // TS error code (예: 7006)
}

export interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  args: unknown[];
  timestamp: number;
}

export interface RunResult {
  success: boolean;
  logs: ConsoleLog[];
  error?: string;                // 런타임 에러 메시지
}
```

---

## 코드 실행 아키텍처 (iframe 샌드박스)

### 실행 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│  메인 애플리케이션                                               │
│  ┌─────────────────┐    ┌──────────────────┐                   │
│  │  Monaco Editor  │───>│  TypeScript      │                   │
│  │  (TS 코드)      │    │  Compiler        │                   │
│  └─────────────────┘    │  (TS → JS 변환)  │                   │
│                         └────────┬─────────┘                   │
│                                  │ JS 코드                      │
│                                  ▼                              │
│                         ┌──────────────────┐                   │
│                         │  postMessage()   │                   │
│                         └────────┬─────────┘                   │
└──────────────────────────────────┼──────────────────────────────┘
                                   │
                                   ▼
┌──────────────────────────────────────────────────────────────────┐
│  iframe (sandbox="allow-scripts")                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  // console.log 오버라이드                                  │ │
│  │  const logs = [];                                          │ │
│  │  console.log = (...args) => {                              │ │
│  │    logs.push({ type: 'log', args });                       │ │
│  │    parent.postMessage({ type: 'console', logs }, '*');     │ │
│  │  };                                                        │ │
│  │                                                            │ │
│  │  try {                                                     │ │
│  │    eval(jsCode);  // 사용자 코드 실행                       │ │
│  │    parent.postMessage({ type: 'complete', logs }, '*');    │ │
│  │  } catch (e) {                                             │ │
│  │    parent.postMessage({ type: 'error', message: e }, '*'); │ │
│  │  }                                                         │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### iframe 샌드박스 보안

```html
<iframe
  sandbox="allow-scripts"
  src="about:blank"
  style="display: none;"
/>
```

**sandbox 속성**:
- `allow-scripts`: JavaScript 실행 허용
- 기본적으로 차단됨:
  - `allow-same-origin`: 부모 페이지 접근 불가
  - `allow-forms`: 폼 제출 불가
  - `allow-popups`: 팝업 생성 불가
  - `allow-top-navigation`: 상위 프레임 이동 불가

### sandbox.ts 구현

```typescript
// lib/sandbox.ts

export interface SandboxMessage {
  type: 'console' | 'complete' | 'error';
  logs?: ConsoleLog[];
  error?: string;
}

export function createSandbox(): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.sandbox.add('allow-scripts');
  iframe.style.display = 'none';
  iframe.srcdoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <script>
          const logs = [];
          
          // console 메서드 오버라이드
          ['log', 'error', 'warn', 'info'].forEach(method => {
            const original = console[method];
            console[method] = (...args) => {
              logs.push({ 
                type: method, 
                args: args.map(arg => {
                  try {
                    return JSON.parse(JSON.stringify(arg));
                  } catch {
                    return String(arg);
                  }
                }),
                timestamp: Date.now()
              });
              parent.postMessage({ type: 'console', logs }, '*');
            };
          });
          
          // 메시지 수신 (코드 실행 요청)
          window.addEventListener('message', (event) => {
            if (event.data.type === 'run') {
              logs.length = 0;  // 로그 초기화
              try {
                eval(event.data.code);
                parent.postMessage({ type: 'complete', logs }, '*');
              } catch (e) {
                parent.postMessage({ 
                  type: 'error', 
                  error: e.message,
                  logs 
                }, '*');
              }
            }
          });
          
          // 준비 완료 알림
          parent.postMessage({ type: 'ready' }, '*');
        </script>
      </head>
      <body></body>
    </html>
  `;
  document.body.appendChild(iframe);
  return iframe;
}

export function runInSandbox(
  iframe: HTMLIFrameElement, 
  jsCode: string
): Promise<RunResult> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({ 
        success: false, 
        logs: [], 
        error: '실행 시간 초과 (5초)' 
      });
    }, 5000);
    
    const handler = (event: MessageEvent<SandboxMessage>) => {
      if (event.source !== iframe.contentWindow) return;
      
      if (event.data.type === 'complete') {
        clearTimeout(timeout);
        window.removeEventListener('message', handler);
        resolve({ success: true, logs: event.data.logs || [] });
      }
      
      if (event.data.type === 'error') {
        clearTimeout(timeout);
        window.removeEventListener('message', handler);
        resolve({ 
          success: false, 
          logs: event.data.logs || [],
          error: event.data.error 
        });
      }
    };
    
    window.addEventListener('message', handler);
    iframe.contentWindow?.postMessage({ type: 'run', code: jsCode }, '*');
  });
}
```

### useCodeRunner.ts 훅

```typescript
// hooks/useCodeRunner.ts

import { useState, useRef, useEffect, useCallback } from 'react';
import ts from 'typescript';
import { createSandbox, runInSandbox, RunResult } from '../lib/sandbox';

export function useCodeRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
  useEffect(() => {
    // 컴포넌트 마운트 시 샌드박스 생성
    iframeRef.current = createSandbox();
    
    return () => {
      // 클린업
      iframeRef.current?.remove();
    };
  }, []);
  
  const run = useCallback(async (tsCode: string) => {
    if (!iframeRef.current || isRunning) return;
    
    setIsRunning(true);
    setResult(null);
    
    try {
      // TypeScript → JavaScript 변환
      const jsCode = ts.transpileModule(tsCode, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.None,
          strict: false,  // 실행 시에는 strict 해제
        }
      }).outputText;
      
      // 샌드박스에서 실행
      const result = await runInSandbox(iframeRef.current, jsCode);
      setResult(result);
    } catch (error) {
      setResult({
        success: false,
        logs: [],
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    } finally {
      setIsRunning(false);
    }
  }, [isRunning]);
  
  const clearResult = useCallback(() => {
    setResult(null);
  }, []);
  
  return { run, isRunning, result, clearResult };
}
```

### ConsoleOutput.tsx 컴포넌트

```typescript
// components/editor/ConsoleOutput.tsx

interface ConsoleOutputProps {
  logs: ConsoleLog[];
  error?: string;
  onClear: () => void;
}

export function ConsoleOutput({ logs, error, onClear }: ConsoleOutputProps) {
  return (
    <div className="bg-gray-900 text-gray-100 font-mono text-sm">
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-700">
        <span className="text-gray-400">Console Output</span>
        <button 
          onClick={onClear}
          className="text-gray-500 hover:text-gray-300"
        >
          Clear
        </button>
      </div>
      
      <div className="p-3 max-h-48 overflow-y-auto">
        {logs.length === 0 && !error && (
          <span className="text-gray-500">
            실행 결과가 여기에 표시됩니다...
          </span>
        )}
        
        {logs.map((log, i) => (
          <div 
            key={i} 
            className={cn(
              'py-0.5',
              log.type === 'error' && 'text-red-400',
              log.type === 'warn' && 'text-yellow-400',
              log.type === 'info' && 'text-blue-400',
            )}
          >
            <span className="text-gray-500 mr-2">{'>'}</span>
            {log.args.map((arg, j) => (
              <span key={j} className="mr-2">
                {typeof arg === 'object' 
                  ? JSON.stringify(arg, null, 2) 
                  : String(arg)}
              </span>
            ))}
          </div>
        ))}
        
        {error && (
          <div className="text-red-400 py-1">
            <span className="text-red-500 mr-2">Error:</span>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 핵심 컴포넌트 설계

### CodeEditor.tsx

Monaco Editor를 활용한 코드 에디터:

```typescript
interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  errors: TypeErrorInfo[];
  readOnly?: boolean;
}
```

**기능**:
- TypeScript 언어 지원
- 에러 위치에 빨간 물결선 표시
- 마우스 호버 시 에러 메시지 툴팁
- 자동 완성 및 타입 힌트

### useTypeCheck.ts

브라우저에서 TypeScript 타입 체크:

```typescript
function useTypeCheck(code: string): {
  errors: TypeErrorInfo[];
  isChecking: boolean;
}
```

**구현 방식**:
1. Monaco Editor 내장 TypeScript 서비스 활용
2. 또는 Web Worker에서 `typescript` 패키지 직접 실행

### useProgress.ts

LocalStorage 기반 진도 관리:

```typescript
function useProgress(): {
  progress: Record<string, Progress>;
  markComplete: (lessonId: string) => void;
  saveCode: (lessonId: string, code: string) => void;
  getOverallProgress: () => number;  // 0-100%
}
```

---

## 개발 단계별 계획

### Phase 1: 기본 구조 (1-2일)

1. Vite + React + TypeScript 프로젝트 초기화
2. Tailwind CSS 설정
3. 라우팅 구조 설정 (React Router)
4. 기본 레이아웃 컴포넌트 구현
5. 레슨 데이터 로드 로직 구현

### Phase 2: 콘텐츠 렌더링 (1-2일)

1. 마크다운 렌더러 구현 (react-markdown)
2. 코드 구문 강조 적용
3. 사이드바 레슨 목록 구현
4. 레슨 네비게이션 구현

### Phase 3: 코드 에디터 (2-3일)

1. Monaco Editor 통합
2. exercise/solution 탭 전환
3. 코드 리셋 기능
4. 코드 복사 기능

### Phase 4: 타입 체크 (2-3일)

1. Monaco TypeScript 서비스 연동
2. 실시간 에러 표시
3. 에러 목록 패널 구현
4. 에러 클릭 시 해당 라인으로 이동

### Phase 5: 코드 실행 (2일)

1. iframe 샌드박스 구현
2. TypeScript → JavaScript 변환
3. console.log 캡처 및 표시
4. 런타임 에러 처리
5. 실행 타임아웃 처리

### Phase 6: 진도 관리 (1일)

1. LocalStorage 진도 저장
2. 진도 표시 UI
3. 완료 상태 토글

### Phase 7: 마무리 (1-2일)

1. 반응형 디자인 적용
2. 다크 모드 지원 (선택)
3. 성능 최적화
4. 배포 설정 (Vercel/Netlify)

---

## 레슨 데이터 관리 방식

### 옵션 A: 빌드 시 JSON 번들링 (권장)

```typescript
// lib/lessons.ts
import lesson01Readme from '../../lessons/01-basics-and-primitives/README.md?raw';
import lesson01Exercise from '../../lessons/01-basics-and-primitives/exercise.ts?raw';
import lesson01Solution from '../../lessons/01-basics-and-primitives/solution.ts?raw';

export const lessons: Lesson[] = [
  {
    id: '01-basics-and-primitives',
    number: 1,
    title: '환경 설정 및 기본 타입',
    description: 'tsconfig.json을 이해하고, any를 쓰지 않으면서 변수와 함수의 타입을 선언할 수 있다.',
    readme: lesson01Readme,
    exercise: lesson01Exercise,
    solution: lesson01Solution,
  },
  // ... 나머지 레슨
];
```

**장점**: 
- 타입 안전성
- 빌드 시 최적화
- 추가 서버 불필요

### 옵션 B: 런타임 fetch

```typescript
async function loadLesson(id: string): Promise<Lesson> {
  const [readme, exercise, solution] = await Promise.all([
    fetch(`/lessons/${id}/README.md`).then(r => r.text()),
    fetch(`/lessons/${id}/exercise.ts`).then(r => r.text()),
    fetch(`/lessons/${id}/solution.ts`).then(r => r.text()),
  ]);
  return { id, readme, exercise, solution, ... };
}
```

**장점**:
- 레슨 추가 시 재빌드 불필요
- 동적 콘텐츠 로드 가능

---

## 확장 가능성

### 향후 추가 기능

1. **테스트 통합**: 과제별 테스트 케이스 실행
2. **힌트 시스템**: 막혔을 때 단계별 힌트 제공
3. **LLM 통합**: AI 코드 리뷰 또는 설명 요청
4. **공유 기능**: 작성한 코드 URL로 공유
5. **다국어 지원**: 영어 버전 추가

---

## 참고 자료

- [Monaco Editor React](https://github.com/suren-atoyan/monaco-react)
- [Vite 공식 문서](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
