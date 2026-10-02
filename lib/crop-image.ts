import type { Area } from "react-easy-crop";

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

/**
 * Crops an image based on react-easy-crop pixel coordinates and resizes the output
 * to targetSize x targetSize (default 512x512) as a high-quality JPEG blob.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  targetSize = 512
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not initialize canvas 2D context.");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetSize,
    targetSize
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas conversion to Blob failed."));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.92
    );
  });
}
