import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownPreviewProps {
  markdown: string;
}



// 代码块包装组件
interface CodeBlockWrapperProps {
  language: string;
  children: React.ReactNode;
  rawCode: string;
}

const CodeBlockWrapper: React.FC<CodeBlockWrapperProps> = ({ language, children, rawCode }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="code-block-wrapper">
      {language && (
        <span className="code-language-label">
          {language}
        </span>
      )}
      <button
        onClick={handleCopy}
        className={`copy-btn ${copied ? 'copied' : ''}`}
        title={copied ? '已复制!' : '复制代码'}
      >
        {copied ? (
          <span className="copy-btn-content">
            <svg className="copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            已复制
          </span>
        ) : (
          <span className="copy-btn-content">
            <svg className="copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            复制
          </span>
        )}
      </button>
      <pre ref={preRef} style={{ paddingTop: language ? '2.5rem' : undefined }}>
        {children}
      </pre>
    </div>
  );
};

// Mermaid 组件
const MermaidDiagram: React.FC<{ chart: string }> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontSize: 16
        });
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        ref.current.innerHTML = '';
        mermaid.render(id, chart).then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        });
      } catch (error) {
        if (ref.current) {
          ref.current.innerHTML = `<pre class="text-red-600">Invalid Mermaid syntax: ${error}</pre>`;
        }
      }
    }
  }, [chart]);

  return <div ref={ref} className="mermaid-diagram my-4" />;
};

// 递归提取文本内容的辅助函数
const extractTextContent = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join('');
  }
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props.children) {
      return extractTextContent(props.children);
    }
  }
  return '';
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-900 prose-pre:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:italic prose-table:border-collapse prose-table:w-full prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          // 处理 pre 标签，为代码块添加复制按钮
          pre({ children, node }) {
            // 从 node 中提取语言信息
            const codeNode = node?.children?.find(
              (child): child is typeof child & { tagName: string; properties: { className?: string[] } } =>
                'tagName' in child && child.tagName === 'code'
            );

            const className = codeNode?.properties?.className?.join(' ') || '';
            const match = /language-(\w+)/.exec(className);
            const language = match ? match[1] : '';

            // 提取原始代码文本
            const rawCode = extractTextContent(children).replace(/\n$/, '');

            // Mermaid 图表
            if (language === 'mermaid') {
              return <MermaidDiagram chart={rawCode} />;
            }

            return (
              <CodeBlockWrapper language={language} rawCode={rawCode}>
                {children}
              </CodeBlockWrapper>
            );
          },
          code({ className, children, ...props }) {
            // 代码块内的 code 标签直接渲染
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
