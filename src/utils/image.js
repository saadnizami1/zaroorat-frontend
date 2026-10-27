// Shrinks large phone photos before upload: much faster on mobile data and
// comfortably under the server's 8MB limit. Anything the browser can't decode
// (or that is already small) is returned untouched.
const MAX_DIMENSION = 2000;
const SKIP_BELOW_BYTES = 900 * 1024;

const decode = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("decode failed"));
    };
    img.src = url;
  });

export const compressImage = async (file, { maxDimension = MAX_DIMENSION, quality = 0.85 } = {}) => {
  if (!file || !file.type?.startsWith("image/") || file.type === "image/gif") return file;
  if (file.size < SKIP_BELOW_BYTES) return file;

  try {
    const img = await decode(file);
    const scale = Math.min(1, maxDimension / Math.max(img.naturalWidth, img.naturalHeight));
    const width = Math.round(img.naturalWidth * scale);
    const height = Math.round(img.naturalHeight * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff"; // transparent PNG areas would otherwise turn black
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    return file;
  }
};
