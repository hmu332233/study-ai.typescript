import { useState, useEffect, useCallback } from 'react';
import type { Progress } from '../types';

const STORAGE_KEY = 'ts-classroom-progress';

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, Progress>>({});

  // LocalStorage에서 진도 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      } catch (error) {
        console.error('Failed to parse progress from localStorage', error);
      }
    }
  }, []);

  // 진도 저장
  const saveProgress = useCallback((lessonId: string, data: Partial<Progress>) => {
    setProgress((prev: Record<string, Progress>) => {
      const updated = {
        ...prev,
        [lessonId]: {
          ...prev[lessonId],
          lessonId,
          completed: prev[lessonId]?.completed || false,
          lastCode: prev[lessonId]?.lastCode || '',
          ...data
        }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 레슨 완료 표시
  const markComplete = useCallback((lessonId: string, completed: boolean) => {
    saveProgress(lessonId, {
      completed,
      completedAt: completed ? new Date() : undefined
    });
  }, [saveProgress]);

  // 코드 저장
  const saveCode = useCallback((lessonId: string, code: string) => {
    saveProgress(lessonId, { lastCode: code });
  }, [saveProgress]);

  // 전체 진도율 계산
  const getOverallProgress = useCallback((totalLessons: number): number => {
    const completedCount = Object.values(progress).filter((p: Progress) => p.completed).length;
    return Math.round((completedCount / totalLessons) * 100);
  }, [progress]);

  // 특정 레슨 진도 가져오기
  const getLessonProgress = useCallback((lessonId: string): Progress | undefined => {
    return progress[lessonId];
  }, [progress]);

  return {
    progress,
    markComplete,
    saveCode,
    getOverallProgress,
    getLessonProgress
  };
}
