const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith(".heic")) {
    return "Unsupported file type. Please use JPEG, PNG, or WebP.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "File too large. Maximum size is 20MB.";
  }
  return null;
}

export function fileToBase64DataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function resizeImage(dataUri: string, maxDimension = 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      if (width <= maxDimension && height <= maxDimension) {
        resolve(dataUri);
        return;
      }
      const scale = maxDimension / Math.max(width, height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => reject(new Error("Failed to load image for resizing"));
    img.src = dataUri;
  });
}

export function stripDataUriPrefix(dataUri: string): {
  mediaType: string;
  base64Data: string;
} {
  const match = dataUri.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (!match) throw new Error("Invalid data URI format");
  return { mediaType: match[1], base64Data: match[2] };
}
