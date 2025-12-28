import type { ConsoleLog } from '../../types';

interface ConsoleOutputProps {
  logs: ConsoleLog[];
  error?: string;
  onClear: () => void;
}

export function ConsoleOutput({ logs, error, onClear }: ConsoleOutputProps) {
  return (
    <div className="h-full bg-gray-900 text-gray-100 font-mono text-sm rounded-lg overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700 flex-shrink-0">
        <span className="text-gray-400 font-semibold">Console Output</span>
        <button 
          onClick={onClear}
          className="text-gray-500 hover:text-gray-300 text-xs px-2 py-1 rounded hover:bg-gray-800"
        >
          Clear
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1">
        {logs.length === 0 && !error && (
          <span className="text-gray-500">
            실행 결과가 여기에 표시됩니다...
          </span>
        )}
        
        {logs.map((log, i) => (
          <div 
            key={i} 
            className={`py-1 ${
              log.type === 'error' ? 'text-red-400' :
              log.type === 'warn' ? 'text-yellow-400' :
              log.type === 'info' ? 'text-blue-400' :
              'text-gray-100'
            }`}
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
          <div className="text-red-400 py-1 border-t border-red-900 mt-2 pt-2">
            <span className="text-red-500 mr-2 font-bold">Error:</span>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
