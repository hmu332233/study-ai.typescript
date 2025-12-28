import { Link, useParams } from 'react-router-dom';
import { getAllLessonsMeta } from '../../lib/lessons';

export function Sidebar() {
  const { id } = useParams<{ id: string }>();
  const lessons = getAllLessonsMeta();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <Link to="/" className="block mb-6">
          <h1 className="text-xl font-bold text-gray-900">TypeScript Classroom</h1>
        </Link>

        <nav>
          <ul className="space-y-1">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  to={`/lesson/${lesson.id}`}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    id === lesson.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">
                      {lesson.number}
                    </span>
                    <span className="flex-1">{lesson.title}</span>
                  </div>
                  <div className="ml-9 mt-1 text-xs text-gray-500">
                    {lesson.taskCount}개 과제
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
