import React from 'react';

interface FilePickerProps {
  onFileSelect: (content: string) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileSelect(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".md" onChange={handleFileChange} />
    </div>
  );
};

export default FilePicker;
