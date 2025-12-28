import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ts from 'typescript';
import { getLesson } from '../lib/lessons';
import { LessonContent } from '../components/lesson/LessonContent';
import { CodeEditor } from '../components/editor/CodeEditor';
import { TypeErrorsPanel } from '../components/editor/TypeErrorsPanel';
import { ConsoleOutput } from '../components/editor/ConsoleOutput';
import { Sidebar } from '../components/layout/Sidebar';
import { createSandbox, runInSandbox, destroySandbox } from '../lib/sandbox';
import { useProgress } from '../hooks/useProgress';
import type { Lesson, RunResult } from '../types';
import type * as monaco from 'monaco-editor';

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'practice'>('content');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { markComplete, getLessonProgress, saveCode } = useProgress();

  useEffect(() => {
    if (id) {
      const loadedLesson = getLesson(id);
      setLesson(loadedLesson);
      if (loadedLesson) {
        // 저장된 코드가 있으면 불러오기, 없으면 exercise 사용
        const savedProgress = getLessonProgress(id);
        setCode(savedProgress?.lastCode || loadedLesson.exercise);
        setShowSolution(false);
      }
    }
  }, [id, getLessonProgress]);

  // 코드 변경 시 자동 저장
  useEffect(() => {
    if (id && code && !showSolution) {
      const timeoutId = setTimeout(() => {
        saveCode(id, code);
      }, 1000); // 1초 디바운스

      return () => clearTimeout(timeoutId);
    }
  }, [id, code, showSolution, saveCode]);

  // iframe 샌드박스 생성 및 정리
  useEffect(() => {
    iframeRef.current = createSandbox();
    return () => {
      if (iframeRef.current) {
        destroySandbox(iframeRef.current);
      }
    };
  }, []);

  const handleRunCode = async () => {
    if (!iframeRef.current || isRunning) return;
    
    setIsRunning(true);
    setRunResult(null);
    
    try {
      // TypeScript → JavaScript 변환
      const jsCode = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.None,
          strict: false,
        }
      }).outputText;
      
      // 샌드박스에서 실행
      const result = await runInSandbox(iframeRef.current, jsCode);
      setRunResult(result);
    } catch (error) {
      setRunResult({
        success: false,
        logs: [],
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    } finally {
      setIsRunning(false);
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">레슨을 찾을 수 없습니다</h2>
          <p className="text-gray-600">요청하신 레슨이 존재하지 않습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">
            {lesson.number}. {lesson.title}
          </h1>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{lesson.description}</p>
            <button
              onClick={() => {
                if (id) {
                  markComplete(id, !getLessonProgress(id)?.completed);
                }
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                id && getLessonProgress(id)?.completed
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {id && getLessonProgress(id)?.completed ? '✓ 완료됨' : '완료로 표시'}
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-300 mb-6">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'content'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📖 학습 내용
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'practice'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💻 실습 및 실행
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden container mx-auto px-4 pb-6">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="h-full overflow-y-auto bg-white rounded-lg shadow p-8">
              <LessonContent content={lesson.readme} />
            </div>
          )}

          {/* Practice Tab */}
          {activeTab === 'practice' && (
            <div className="h-full flex flex-col gap-4">
              {/* Code Editor Section */}
              <div className="flex-[3] bg-white rounded-lg shadow overflow-hidden flex flex-col">
                <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center flex-shrink-0">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCode(lesson.exercise);
                        setShowSolution(false);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        !showSolution
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Exercise
                    </button>
                    <button
                      onClick={() => {
                        setCode(lesson.solution);
                        setShowSolution(true);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        showSolution
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Solution
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isRunning ? 'Running...' : 'Run'}
                    </button>
                    <button
                      onClick={() => setCode(showSolution ? lesson.solution : lesson.exercise)}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    onMount={(editor) => setEditor(editor)}
                    readOnly={showSolution}
                  />
                </div>
              </div>

              {/* Type Errors Section */}
              <div className="flex-1 min-h-0">
                <TypeErrorsPanel editor={editor} />
              </div>

              {/* Console Output Section */}
              <div className="flex-1 min-h-0">
                {runResult ? (
                  <ConsoleOutput
                    logs={runResult.logs}
                    error={runResult.error}
                    onClear={() => setRunResult(null)}
                  />
                ) : (
                  <div className="h-full bg-gray-900 text-gray-100 font-mono text-sm rounded-lg overflow-hidden">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <span className="text-gray-400 font-semibold">Console Output</span>
                    </div>
                    <div className="p-4">
                      <span className="text-gray-500">실행 결과가 여기에 표시됩니다...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
