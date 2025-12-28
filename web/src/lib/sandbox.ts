// lib/sandbox.ts
import type { ConsoleLog, RunResult } from '../types';

export interface SandboxMessage {
  type: 'console' | 'complete' | 'error' | 'ready';
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
              parent.postMessage({ type: 'console', logs: [...logs] }, '*');
            };
          });
          
          // 메시지 수신 (코드 실행 요청)
          window.addEventListener('message', (event) => {
            if (event.data.type === 'run') {
              logs.length = 0;  // 로그 초기화
              try {
                eval(event.data.code);
                parent.postMessage({ type: 'complete', logs: [...logs] }, '*');
              } catch (e) {
                parent.postMessage({ 
                  type: 'error', 
                  error: e.message,
                  logs: [...logs]
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

export function destroySandbox(iframe: HTMLIFrameElement) {
  iframe.remove();
}
