import { useState } from 'react';
import FilePicker from './components/FilePicker';
import MarkdownPreview from './components/MarkdownPreview';

function App() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

## Getting Started

Upload a Markdown file using the file picker on the left, or drag and drop your file.

### Features

- **Syntax Highlighting**: Beautiful code blocks with syntax highlighting
- **Drag & Drop**: Easy file upload experience
- **Live Preview**: See your markdown rendered in real-time
- **GFM Tables**: Full support for GitHub Flavored Markdown tables
- **Mermaid Diagrams**: Render flowcharts, sequence diagrams, and more

### Example Table

| Feature | Status | Description |
|---------|--------|-------------|
| Tables | ✅ Supported | GitHub Flavored Markdown tables |
| Mermaid | ✅ Supported | Flowcharts and diagrams |
| Syntax Highlighting | ✅ Supported | Code blocks with colors |
| Drag & Drop | ✅ Supported | Easy file upload |

### Example Code Block

\`\`\`javascript
// Example code block
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

### Example Mermaid Diagram

\`\`\`mermaid
graph TD
    A[Upload Markdown File] --> B{Parse Content}
    B --> C[Render Preview]
    C --> D[Display Tables]
    C --> E[Highlight Code]
    C --> F[Render Mermaid]
    D --> G[Beautiful Output]
    E --> G
    F --> G
\`\`\`

Start by uploading your first Markdown file!
`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
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
              <h1 className="text-2xl font-bold text-gray-900">Markdown Preview</h1>
              <p className="text-sm text-gray-500">Preview your markdown files instantly</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                <h2 className="text-lg font-semibold text-gray-900">File Selector</h2>
              </div>
              <FilePicker onFileSelect={setMarkdown} />
            </div>
          </aside>

          {/* Preview Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                </div>
              </div>
              <div className="p-8">
                <MarkdownPreview markdown={markdown} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
