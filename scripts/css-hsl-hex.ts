import * as fs from 'node:fs';
import * as path from 'node:path';

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const hslToHex = (h: number, s: number, l: number): string => {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

const processCssContent = (cssContent: string): string => {
  const hslRegex = /(--[a-zA-Z0-9-]+:\s*)(\d+)\s+(\d+)%\s+(\d+)%(?:\s*;|\s*\/\s*\d+%)?/g;

  return cssContent.replace(hslRegex, (_, prefix, h, s, l) => {
    const hexColor = hslToHex(parseInt(h), parseInt(s), parseInt(l));
    return `${prefix}${h} ${s}% ${l}%; /* ${hexColor} */`;
  });
};

const updateCssFile = (filePath: string): void => {
  const cssContent = fs.readFileSync(filePath, 'utf-8');
  const updatedCssContent = processCssContent(cssContent);
  fs.writeFileSync(filePath, updatedCssContent, 'utf-8');
  console.log(`Updated CSS file: ${filePath}`);
};

const cssFilePath = path.join(__dirname, 'src/styles/globals.css');

if (require.main === module) {
  updateCssFile(cssFilePath);
}
