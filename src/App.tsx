import { useState } from 'react';
import FilePicker from './components/FilePicker';
import MarkdownPreview from './components/MarkdownPreview';

function App() {
  const [markdown, setMarkdown] = useState('# Hello, World!');

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">File Selector</h2>
        <FilePicker onFileSelect={setMarkdown} />
      </div>
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Markdown Preview</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <MarkdownPreview markdown={markdown} />
        </div>
      </div>
    </div>
  );
}

export default App;
