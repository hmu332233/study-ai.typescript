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
