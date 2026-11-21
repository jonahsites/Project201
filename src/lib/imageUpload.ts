export interface ProcessedImageUpload {
  id: string;
  name: string;
  mimeType: string;
  dataUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
}

const MAX_DIMENSION = 1400;
const MAX_DATA_URL_LENGTH = 720_000;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image file.'));
      }
    };
    reader.onerror = () => reject(new Error('Could not read the selected image.'));
    reader.readAsDataURL(file);
  });
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Invalid image format.'));
    img.src = src;
  });
}

export async function processImageFile(file: File): Promise<ProcessedImageUpload> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose a valid image file (PNG, JPG, WebP, or GIF).');
  }

  const rawDataUrl = await readFileAsDataUrl(file);
  const safeId = `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  // Keep small SVGs or small PNGs directly if under limit
  if (file.type === 'image/svg+xml') {
    if (rawDataUrl.length > MAX_DATA_URL_LENGTH) {
      throw new Error('SVG file is too large. Please use an SVG under 500KB.');
    }
    return {
      id: safeId,
      name: file.name.slice(0, 140),
      mimeType: file.type,
      dataUrl: rawDataUrl,
      width: 512,
      height: 512,
      sizeBytes: rawDataUrl.length,
    };
  }

  const img = await loadImageElement(rawDataUrl);
  const origWidth = img.naturalWidth || 800;
  const origHeight = img.naturalHeight || 600;

  // If already compact, keep original quality
  if (rawDataUrl.length <= 280_000 && origWidth <= MAX_DIMENSION && origHeight <= MAX_DIMENSION) {
    return {
      id: safeId,
      name: file.name.slice(0, 140),
      mimeType: file.type,
      dataUrl: rawDataUrl,
      width: origWidth,
      height: origHeight,
      sizeBytes: rawDataUrl.length,
    };
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(origWidth, origHeight));
  const targetWidth = Math.max(1, Math.round(origWidth * scale));
  const targetHeight = Math.max(1, Math.round(origHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Browser canvas is unavailable for image processing.');
  }
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // Preserve transparency if PNG, otherwise compress as WebP/JPEG
  const outputMime = file.type === 'image/png' ? 'image/webp' : 'image/jpeg';
  let quality = 0.86;
  let compressed = canvas.toDataURL(outputMime, quality);

  while (compressed.length > MAX_DATA_URL_LENGTH && quality > 0.35) {
    quality -= 0.12;
    compressed = canvas.toDataURL(outputMime, quality);
  }

  // Final resize fallback if still large
  if (compressed.length > MAX_DATA_URL_LENGTH) {
    const smallerCanvas = document.createElement('canvas');
    smallerCanvas.width = Math.max(1, Math.round(targetWidth * 0.65));
    smallerCanvas.height = Math.max(1, Math.round(targetHeight * 0.65));
    const sCtx = smallerCanvas.getContext('2d');
    if (sCtx) {
      sCtx.drawImage(canvas, 0, 0, smallerCanvas.width, smallerCanvas.height);
      compressed = smallerCanvas.toDataURL('image/jpeg', 0.78);
    }
  }

  if (compressed.length > 780_000) {
    throw new Error('Image is still too large after compression. Please try a smaller image.');
  }

  return {
    id: safeId,
    name: file.name.slice(0, 140),
    mimeType: outputMime,
    dataUrl: compressed,
    width: targetWidth,
    height: targetHeight,
    sizeBytes: compressed.length,
  };
}
