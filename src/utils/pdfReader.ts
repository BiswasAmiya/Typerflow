import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore - Import worker as URL for Vite
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker using the bundled worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export interface PDFExtractionResult {
  text: string;
  pageCount: number;
  error?: string;
}

/**
 * Extract text from a PDF file
 * @param file - The PDF file to extract text from
 * @returns Promise with extracted text and metadata
 */
export async function extractTextFromPDF(file: File): Promise<PDFExtractionResult> {
  try {
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF document with bundled worker
    const pdf = await pdfjsLib.getDocument({ 
      data: arrayBuffer
    }).promise;
    const pageCount = pdf.numPages;
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Extract text items and join them
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n\n';
    }
    
    // Clean up the text
    const cleanedText = fullText
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, '\n\n') // Clean up multiple newlines
      .trim();
    
    if (!cleanedText) {
      return {
        text: '',
        pageCount,
        error: 'No text found in PDF. The PDF might contain only images or scanned content.'
      };
    }
    
    return {
      text: cleanedText,
      pageCount
    };
  } catch (error) {
    console.error('PDF extraction error:', error);
    return {
      text: '',
      pageCount: 0,
      error: error instanceof Error ? error.message : 'Failed to extract text from PDF'
    };
  }
}

/**
 * Validate if a file is a PDF
 * @param file - File to validate
 * @returns true if file is a PDF
 */
export function isValidPDF(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
