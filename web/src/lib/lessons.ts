// lib/lessons.ts
import type { Lesson, LessonMeta } from '../types';

// Vite의 import.meta.glob을 사용하여 레슨 파일들을 동적으로 로드
// Vite는 프로젝트 루트(web/) 기준으로 경로를 해석합니다
const readmeModules = import.meta.glob('../../../lessons/*/README.md', { as: 'raw', eager: true });
const exerciseModules = import.meta.glob('../../../lessons/*/exercise.ts', { as: 'raw', eager: true });
const solutionModules = import.meta.glob('../../../lessons/*/solution.ts', { as: 'raw', eager: true });

console.log('Loaded modules:', {
  readme: Object.keys(readmeModules),
  exercise: Object.keys(exerciseModules),
  solution: Object.keys(solutionModules)
});

// 레슨 메타데이터 (수동으로 관리)
export const lessonsMeta: LessonMeta[] = [
  {
    id: '01-basics-and-primitives',
    number: 1,
    title: '환경 설정 및 기본 타입',
    description: 'tsconfig.json을 이해하고, any를 쓰지 않으면서 변수와 함수의 타입을 선언할 수 있다.',
    taskCount: 8
  },
  {
    id: '02-structural-typing',
    number: 2,
    title: '구조적 타이핑',
    description: '인터페이스, 타입 별칭, 유니온, 교차 타입을 이해하고 활용할 수 있다.',
    taskCount: 9
  },
  {
    id: '03-generics-and-manipulation',
    number: 3,
    title: '제네릭 및 타입 조작',
    description: '제네릭과 타입 조작을 통해 재사용 가능한 타입 안전 코드를 작성할 수 있다.',
    taskCount: 12
  },
  {
    id: '04-ecosystem-and-advanced',
    number: 4,
    title: '실전 적용',
    description: 'TypeScript를 실제 프로젝트에 적용하고 고급 패턴을 이해한다.',
    taskCount: 10
  }
];

// 레슨 ID로 전체 레슨 데이터 로드
export function getLesson(id: string): Lesson | null {
  const meta = lessonsMeta.find(l => l.id === id);
  if (!meta) {
    console.error(`Meta not found for lesson: ${id}`);
    return null;
  }

  // import.meta.glob이 반환하는 키를 찾기 위해 모든 키를 순회
  const readmeKey = Object.keys(readmeModules).find(key => key.includes(`/${id}/README.md`));
  const exerciseKey = Object.keys(exerciseModules).find(key => key.includes(`/${id}/exercise.ts`));
  const solutionKey = Object.keys(solutionModules).find(key => key.includes(`/${id}/solution.ts`));

  const readme = readmeKey ? readmeModules[readmeKey] as string : null;
  const exercise = exerciseKey ? exerciseModules[exerciseKey] as string : null;
  const solution = solutionKey ? solutionModules[solutionKey] as string : null;

  if (!readme || !exercise || !solution) {
    console.error(`Missing files for lesson ${id}`, {
      readmeKey,
      exerciseKey,
      solutionKey,
      availableReadme: Object.keys(readmeModules),
      availableExercise: Object.keys(exerciseModules),
      availableSolution: Object.keys(solutionModules)
    });
    return null;
  }

  return {
    ...meta,
    readme,
    exercise,
    solution
  };
}

// 모든 레슨 메타데이터 가져오기
export function getAllLessonsMeta(): LessonMeta[] {
  return lessonsMeta;
}

// 이전/다음 레슨 ID 가져오기
export function getAdjacentLessons(currentId: string): { prev: string | null; next: string | null } {
  const index = lessonsMeta.findIndex(l => l.id === currentId);
  
  return {
    prev: index > 0 ? lessonsMeta[index - 1].id : null,
    next: index < lessonsMeta.length - 1 ? lessonsMeta[index + 1].id : null
  };
}
