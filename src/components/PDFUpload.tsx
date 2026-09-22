import React, { useState, useRef } from 'react';
import { extractTextFromPDF, isValidPDF, formatFileSize } from '../utils/pdfReader';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../utils/colors';

interface PDFUploadProps {
  onTextExtracted: (text: string) => void;
  onError: (error: string) => void;
}

export default function PDFUpload({ onTextExtracted, onError }: PDFUploadProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);

  const handleFile = async (file: File) => {
    // Validate file type
    if (!isValidPDF(file)) {
      onError('Please upload a valid PDF file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      onError('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);
    setExtractedText('');

    try {
      const result = await extractTextFromPDF(file);
      
      if (result.error) {
        onError(result.error);
        setIsProcessing(false);
        return;
      }

      setExtractedText(result.text);
      setPageCount(result.pageCount);
      onTextExtracted(result.text);
      setIsProcessing(false);
    } catch (error) {
      onError('Failed to process PDF. Please try another file.');
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setExtractedText('');
    setPageCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!uploadedFile && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            isDragging ? 'scale-105' : ''
          }`}
          style={{
            borderColor: isDragging ? colors.lemonade : (isDark ? colors.dark.border : colors.light.border),
            backgroundColor: isDragging 
              ? (isDark ? `${colors.lemonade}10` : `${colors.electric}10`)
              : (isDark ? colors.dark.bgTertiary : colors.light.bgTertiary)
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="text-4xl mb-3">📄</div>
          <p className="font-medium mb-1" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
            {isProcessing ? 'Processing PDF...' : 'Upload your typing test PDF'}
          </p>
          <p className="text-sm" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
            Drag and drop or click to browse
          </p>
          <p className="text-xs mt-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
            PDF files only • Max 10MB
          </p>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="flex items-center justify-center gap-3 p-4 rounded-xl" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent" style={{ borderColor: colors.lemonade, borderTopColor: 'transparent' }}></div>
          <span style={{ color: isDark ? colors.dark.text : colors.light.text }}>Extracting text from PDF...</span>
        </div>
      )}

      {/* Uploaded File Info */}
      {uploadedFile && !isProcessing && (
        <div className="rounded-xl p-4" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary, border: `1px solid ${isDark ? colors.dark.border : colors.light.border}` }}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📄</div>
              <div>
                <p className="font-medium text-sm" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
                  {uploadedFile.name}
                </p>
                <p className="text-xs" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                  {formatFileSize(uploadedFile.size)} • {pageCount} page{pageCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="text-sm px-3 py-1 rounded-lg transition-all"
              style={{
                color: colors.coral,
                backgroundColor: `${colors.coral}20`
              }}
            >
              Remove
            </button>
          </div>

          {/* Extracted Text Preview */}
          {extractedText && (
            <div className="mt-4">
              <p className="text-xs font-medium mb-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                Extracted Text Preview:
              </p>
              <div 
                className="rounded-lg p-3 max-h-40 overflow-y-auto text-xs font-mono"
                style={{ 
                  backgroundColor: isDark ? colors.dark.bgSecondary : colors.light.bgSecondary,
                  color: isDark ? colors.dark.text : colors.light.text,
                  border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
                }}
              >
                {extractedText.substring(0, 500)}
                {extractedText.length > 500 && '...'}
              </div>
              <p className="text-xs mt-2" style={{ color: colors.lemonadeDark }}>
                ✓ {extractedText.length} characters extracted
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
