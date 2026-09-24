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
    
    // Extract text from each page with improved line detection
    for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Group text items by Y position to detect lines
      const lines: Map<number, Array<{str: string, x: number}>> = new Map();
      
      textContent.items.forEach((item: any) => {
        if (!item.str || item.str.trim() === '') return;
        
        const y = Math.round(item.transform[5]); // Y coordinate
        const x = item.transform[4]; // X coordinate
        
        if (!lines.has(y)) {
          lines.set(y, []);
        }
        lines.get(y)!.push({ str: item.str, x });
      });
      
      // Sort lines by Y position (top to bottom)
      const sortedYPositions = Array.from(lines.keys()).sort((a, b) => b - a);
      
      const pageLines: string[] = [];
      sortedYPositions.forEach(y => {
        const lineItems = lines.get(y)!;
        // Sort items by X position (left to right)
        lineItems.sort((a, b) => a.x - b.x);
        
        // Join text items with appropriate spacing
        let lineText = '';
        let lastX = 0;
        
        lineItems.forEach((item, idx) => {
          // Add space if there's a gap between items
          if (idx > 0 && item.x - lastX > 10) {
            lineText += ' ';
          }
          lineText += item.str;
          lastX = item.x + item.str.length * 5;
        });
        
        pageLines.push(lineText);
      });
      
      fullText += pageLines.join('\n') + '\n\n';
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
