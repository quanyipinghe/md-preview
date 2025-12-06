import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  return (
    <div className="prose">
      <ReactMarkdown rehypePlugins={[[rehypeHighlight]]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
