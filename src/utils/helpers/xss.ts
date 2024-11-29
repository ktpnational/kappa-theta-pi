import DOMPurify from 'dompurify';
import { marked } from 'marked';

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
}

export const sanitizeMarkdown = (markdown: string): string => {
  const htmlContent = marked.parse(markdown);
  return sanitizeHtml(htmlContent);
}

export const sanitizeUrl = (url: string): string => {
  const safeProtocols = ['http:', 'https:', 'mailto:'];
  try {
    const parsedUrl = new URL(url);
    return safeProtocols.includes(parsedUrl.protocol) ? url : '';
  } catch {
  }
    return '';
}

export const validateUserInput = (input: string, maxLength = 500): string => {
  const sanitizedInput = input.replace(/<[^>]*>/g, '');

  return sanitizedInput.slice(0, maxLength);
}
