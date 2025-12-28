import Editor, { type OnMount, useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onMount?: OnMount;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, onMount, readOnly = false }: CodeEditorProps) {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // TypeScript 컴파일러 옵션 설정
      // @ts-ignore - Monaco의 타입 정의 문제로 인한 우회
      const tsDefaults = monaco.languages.typescript.typescriptDefaults;
      
      if (tsDefaults) {
        tsDefaults.setCompilerOptions({
          target: 99, // ES2020
          allowNonTsExtensions: true,
          moduleResolution: 2, // NodeJs
          module: 1, // CommonJS
          noEmit: true,
          esModuleInterop: true,
          strict: true,
          noImplicitAny: true,
          strictNullChecks: true,
          strictFunctionTypes: true,
          strictPropertyInitialization: true,
          noImplicitThis: true,
          alwaysStrict: true,
        });

        // 진단(diagnostics) 옵션 설정
        tsDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
        });
      }
    }
  }, [monaco]);

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      value={value}
      onChange={(value) => onChange(value || '')}
      onMount={onMount}
      theme="vs-dark"
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}
