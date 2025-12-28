import { useEffect, useState } from 'react';
import type * as monaco from 'monaco-editor';

interface TypeErrorInfo {
  line: number;
  column: number;
  message: string;
  code: number;
}

interface TypeErrorsPanelProps {
  editor: monaco.editor.IStandaloneCodeEditor | null;
}

export function TypeErrorsPanel({ editor }: TypeErrorsPanelProps) {
  const [errors, setErrors] = useState<TypeErrorInfo[]>([]);

  useEffect(() => {
    if (!editor) return;

    const model = editor.getModel();
    if (!model) return;

    // 마커(에러) 변경 감지
    const updateErrors = () => {
      const monacoInstance = (window as any).monaco;
      if (!monacoInstance) return;

      const markers = monacoInstance.editor.getModelMarkers({ resource: model.uri });
      const typeErrors: TypeErrorInfo[] = markers
        .filter((marker: any) => marker.severity === monacoInstance.MarkerSeverity.Error)
        .map((marker: any) => ({
          line: marker.startLineNumber,
          column: marker.startColumn,
          message: marker.message,
          code: marker.code?.value || 0
        }));

      console.log('Markers detected:', markers.length);
      console.log('Type errors:', typeErrors.length);
      setErrors(typeErrors);
    };

    // 초기 에러 로드
    updateErrors();

    // 모델 변경 시 에러 업데이트
    const contentDisposable = model.onDidChangeContent(() => {
      setTimeout(updateErrors, 500); // 디바운스
    });

    // 마커 변경 감지 (더 직접적인 방법)
    const monacoInstance = (window as any).monaco;
    const markerDisposable = monacoInstance?.editor.onDidChangeMarkers((uris: any) => {
      if (uris.some((uri: any) => uri.toString() === model.uri.toString())) {
        setTimeout(updateErrors, 100);
      }
    });

    return () => {
      contentDisposable.dispose();
      if (markerDisposable) {
        markerDisposable.dispose();
      }
    };
  }, [editor]);

  const handleErrorClick = (error: TypeErrorInfo) => {
    if (!editor) return;
    editor.revealLineInCenter(error.line);
    editor.setPosition({ lineNumber: error.line, column: error.column });
    editor.focus();
  };

  if (errors.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-700 text-sm">
          ✓ 타입 에러가 없습니다!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 className="text-red-800 font-semibold mb-3">
        타입 에러: {errors.length}개
      </h3>
      <div className="space-y-2">
        {errors.map((error, index) => (
          <button
            key={index}
            onClick={() => handleErrorClick(error)}
            className="w-full text-left p-2 bg-white rounded border border-red-200 hover:border-red-400 transition-colors"
          >
            <div className="flex items-start">
              <span className="text-red-600 font-mono text-sm mr-2">
                Line {error.line}:{error.column}
              </span>
              <span className="text-gray-700 text-sm flex-1">
                {error.message}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
