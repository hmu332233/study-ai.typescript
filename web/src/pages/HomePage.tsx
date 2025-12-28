import { Link } from 'react-router-dom';
import { getAllLessonsMeta } from '../lib/lessons';
import { useProgress } from '../hooks/useProgress';

export function HomePage() {
  const lessons = getAllLessonsMeta();
  const { getOverallProgress, getLessonProgress } = useProgress();
  const overallProgress = getOverallProgress(lessons.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">TypeScript Classroom</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                진도: <span className="font-semibold text-blue-600">{overallProgress}%</span>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          TypeScript Classroom
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          JS 개발자를 위한 실무 중심 TypeScript 학습
        </p>
        <Link
          to={`/lesson/${lessons[0].id}`}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          학습 시작하기
        </Link>
      </div>

      {/* Curriculum Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">커리큘럼 개요</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl font-bold">
                    {lesson.number}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {lesson.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {lesson.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">과제: {lesson.taskCount}개</span>
                    {getLessonProgress(lesson.id)?.completed ? (
                      <span className="text-green-600 font-semibold">✓ 완료</span>
                    ) : (
                      <span className="text-gray-400">미완료</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
