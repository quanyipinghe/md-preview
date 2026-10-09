import React, { useCallback, useEffect, useRef, useState } from 'react';

interface FilePickerProps {
  onFileSelect: (content: string) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!/\.(md|markdown)$/i.test(file.name)) {
      setError(`不支持 ${file.name},仅支持 .md / .markdown 文件`);
      return;
    }
    file.text()
      .then((content) => {
        onFileSelect(content);
        setFileName(file.name);
        setError('');
      })
      .catch(() => setError(`读取 ${file.name} 失败`));
  }, [onFileSelect]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // 清空后再次选择同一个文件才会触发 onChange
    event.target.value = '';
  };

  // 整个页面都可以接收拖拽，避免拖偏时浏览器直接跳转打开文件
  useEffect(() => {
    const hasFiles = (e: DragEvent) => e.dataTransfer?.types.includes('Files');

    const handleDragOver = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      // relatedTarget 为空说明拖出了窗口
      if (e.relatedTarget === null) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer?.files?.[0];
      if (file) {
        handleFile(file);
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [handleFile]);

  return (
    <div className="flex items-center gap-3 min-w-0 ml-auto">
      {error ? (
        <span role="alert" className="text-sm text-red-600 truncate">
          {error}
        </span>
      ) : fileName && (
        <span className="text-sm text-gray-600 font-medium truncate">
          {fileName}
        </span>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        title="也可以把文件拖到页面任意位置"
        className="shrink-0 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
      >
        打开文件
      </button>

      {isDragging && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-blue-50/90 border-4 border-dashed border-blue-500">
          <span className="text-xl font-semibold text-blue-600">
            松开以预览 Markdown 文件
          </span>
        </div>
      )}
    </div>
  );
};

export default FilePicker;
