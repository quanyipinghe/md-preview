import { useCallback, useState } from 'react';
import FilePicker from './components/FilePicker';
import MarkdownPreview from './components/MarkdownPreview';

function App() {
  // 打开过文件后隐藏页头与卡片边框，预览铺满整个窗口
  const [fileOpened, setFileOpened] = useState(false);
  const [markdown, setMarkdown] = useState(`# 欢迎使用 Markdown 预览

## 开始使用

点击右上角的「打开文件」,或者把 Markdown 文件拖到页面任意位置。

### 功能

- **代码高亮**: 代码块自动语法高亮,支持一键复制
- **拖拽打开**: 整个页面都可以接收拖拽
- **GFM 表格**: 完整支持 GitHub Flavored Markdown 表格
- **Mermaid 图表**: 渲染流程图、时序图等

### 表格示例

| 功能 | 状态 | 说明 |
|------|------|------|
| 表格 | ✅ 支持 | GitHub Flavored Markdown 表格 |
| Mermaid | ✅ 支持 | 流程图与各类图表 |
| 代码高亮 | ✅ 支持 | 带配色的代码块 |
| 拖拽打开 | ✅ 支持 | 拖到页面任意位置 |

### 代码块示例

\`\`\`javascript
// 示例代码块
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

### Mermaid 图表示例

\`\`\`mermaid
graph TD
    A[打开 Markdown 文件] --> B{解析内容}
    B --> C[渲染预览]
    C --> D[显示表格]
    C --> E[代码高亮]
    C --> F[渲染 Mermaid]
    D --> G[最终效果]
    E --> G
    F --> G
\`\`\`
`);

  const handleFileSelect = useCallback((content: string) => {
    setMarkdown(content);
    setFileOpened(true);
  }, []);

  return (
    <div className={`min-h-screen ${fileOpened ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {/* Header: 打开文件后收成右上角的悬浮按钮 */}
      <header
        className={fileOpened
          ? 'fixed top-3 right-4 z-20 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-md border border-gray-200 px-3 py-2'
          : 'sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200'}
      >
        <div className={fileOpened ? 'flex items-center gap-2' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4'}>
          {!fileOpened && (
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Markdown 预览</h1>
                <p className="hidden sm:block text-sm text-gray-500">即开即看的 Markdown 文档预览</p>
              </div>
            </div>
          )}
          <FilePicker onFileSelect={handleFileSelect} />
        </div>
      </header>

      {/* Preview Area */}
      <main className={`${fileOpened ? 'px-6 sm:px-10 py-8' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <div className={fileOpened ? '' : 'bg-white rounded-xl shadow-sm border border-gray-200 p-8'}>
          <MarkdownPreview markdown={markdown} />
        </div>
      </main>
    </div>
  );
}

export default App;
