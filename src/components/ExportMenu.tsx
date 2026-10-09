import React from 'react';

// Word 的 HTML 渲染不认 Tailwind 依赖的 CSS 变量，单独给一份它能识别的样式
const WORD_CSS = `
body { font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif; font-size: 11pt; line-height: 1.6; }
table { border-collapse: collapse; }
th, td { border: 1px solid #999; padding: 4pt 8pt; }
th { background: #f3f4f6; }
pre { background: #f3f4f6; padding: 8pt; font-family: Consolas, "Courier New", monospace; font-size: 10pt; }
code { font-family: Consolas, "Courier New", monospace; }
blockquote { border-left: 3pt solid #3b82f6; margin-left: 0; padding-left: 10pt; color: #555; }
`;

// Word 正文区宽度约 6 英寸
const WORD_MAX_IMAGE_WIDTH = 576;

const getPreview = () => document.getElementById('preview') as HTMLElement;

const cloneContent = () => {
  const clone = getPreview().cloneNode(true) as HTMLElement;
  clone.querySelectorAll('.copy-btn').forEach((el) => el.remove());
  return clone;
};

const download = (content: string, type: string, extension: string) => {
  // 加 BOM，避免 Word 把 UTF-8 中文当成本地编码打开
  const url = URL.createObjectURL(new Blob(['﻿', content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${document.title}.${extension}`;
  link.click();
  URL.revokeObjectURL(url);
};

const exportHtml = () => {
  const css = [...document.styleSheets]
    .flatMap((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText);
      } catch {
        // 跨域样式表读不到规则，跳过
        return [];
      }
    })
    .join('\n');

  const doc = document.implementation.createHTMLDocument(document.title);
  doc.documentElement.lang = document.documentElement.lang;
  const meta = doc.createElement('meta');
  meta.setAttribute('charset', 'UTF-8');
  const style = doc.createElement('style');
  style.textContent = css;
  doc.head.prepend(meta);
  doc.head.append(style);
  doc.body.style.padding = '2rem';
  doc.body.append(cloneContent());

  download(`<!doctype html>\n${doc.documentElement.outerHTML}`, 'text/html', 'html');
};

// Word 不渲染内联 SVG，把 Mermaid 图表栅格化成 PNG
const svgToPng = async (svg: SVGSVGElement): Promise<HTMLImageElement> => {
  const { width, height } = svg.getBoundingClientRect();
  const copy = svg.cloneNode(true) as SVGSVGElement;
  copy.setAttribute('width', `${width}`);
  copy.setAttribute('height', `${height}`);
  copy.style.maxWidth = '';

  const source = new Image();
  source.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(copy))}`;
  await source.decode();

  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const context = canvas.getContext('2d')!;
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(source, 0, 0, canvas.width, canvas.height);

  const ratio = Math.min(1, WORD_MAX_IMAGE_WIDTH / width);
  const image = document.createElement('img');
  image.src = canvas.toDataURL('image/png');
  image.width = Math.round(width * ratio);
  image.height = Math.round(height * ratio);
  return image;
};

// ponytail: 导出的是 Word 能直接打开的 HTML 格式 .doc，不是真正的 .docx；
// 排版只保留结构和基础样式，需要原生 docx 时再引入 docx 库
const exportWord = async () => {
  const content = cloneContent();
  content.querySelectorAll('.code-language-label').forEach((el) => el.remove());
  // 去掉为语言标签预留的顶部内边距
  content.querySelectorAll('pre').forEach((el) => el.removeAttribute('style'));
  content.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((el) => {
    el.replaceWith(el.checked ? '☑ ' : '☐ ');
  });

  const liveDiagrams = getPreview().querySelectorAll<SVGSVGElement>('.mermaid-diagram svg');
  const clonedDiagrams = content.querySelectorAll('.mermaid-diagram svg');
  await Promise.all([...liveDiagrams].map(async (svg, index) => {
    try {
      clonedDiagrams[index].replaceWith(await svgToPng(svg));
    } catch {
      // 个别浏览器不允许把含 foreignObject 的 SVG 画到 canvas 再导出
      clonedDiagrams[index].replaceWith('[图表无法导出,请改用导出 PDF 或 HTML]');
    }
  }));

  download(
    `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${document.title.replace(/[<&]/g, '')}</title><style>${WORD_CSS}</style></head><body>${content.innerHTML}</body></html>`,
    'application/msword',
    'doc'
  );
};

const ITEMS = [
  // PDF 走浏览器打印: 在打印对话框里选「另存为 PDF」
  { label: 'PDF', hint: '在打印对话框中选择「另存为 PDF」', action: () => window.print() },
  { label: 'HTML', hint: '单个自包含的 HTML 文件', action: exportHtml },
  { label: 'Word', hint: 'Word / WPS 可直接打开的 .doc 文件', action: exportWord },
];

const ExportMenu: React.FC = () => {
  return (
    <details className="export-menu relative shrink-0">
      <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer select-none px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
        导出
      </summary>
      <div className="absolute right-0 mt-2 w-28 py-1 bg-white rounded-lg shadow-lg border border-gray-200">
        {ITEMS.map(({ label, hint, action }) => (
          <button
            key={label}
            type="button"
            title={hint}
            onClick={(e) => {
              e.currentTarget.closest('details')?.removeAttribute('open');
              action();
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            {label}
          </button>
        ))}
      </div>
    </details>
  );
};

export default ExportMenu;
