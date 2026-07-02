import type { Area } from "react-easy-crop";
import {
  DEFAULT_ADJUSTMENTS,
  type ImageAdjustments,
} from "@/lib/image-editor/types";

export function buildFilterCss(adjustments: ImageAdjustments): string {
  return [
    `brightness(${adjustments.brightness}%)`,
    `contrast(${adjustments.contrast}%)`,
    `saturate(${adjustments.saturation}%)`,
    `grayscale(${adjustments.grayscale}%)`,
    `sepia(${adjustments.sepia}%)`,
    `hue-rotate(${adjustments.hueRotate}deg)`,
  ].join(" ");
}

export function mergeAdjustments(
  base: ImageAdjustments,
  patch: Partial<ImageAdjustments>,
): ImageAdjustments {
  return { ...base, ...patch };
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) +
      Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) +
      Math.abs(Math.cos(rotRad) * height),
  };
}

async function getCroppedCanvas(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
): Promise<HTMLCanvasElement> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Impossible d'initialiser le canvas");
  }

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Impossible d'initialiser le canvas de recadrage");
  }

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return croppedCanvas;
}

function applyAdjustmentsToCanvas(
  sourceCanvas: HTMLCanvasElement,
  adjustments: ImageAdjustments,
): HTMLCanvasElement {
  const output = document.createElement("canvas");
  output.width = sourceCanvas.width;
  output.height = sourceCanvas.height;

  const ctx = output.getContext("2d");
  if (!ctx) {
    throw new Error("Impossible d'appliquer les filtres");
  }

  ctx.filter = buildFilterCss(adjustments);
  ctx.drawImage(sourceCanvas, 0, 0);

  return output;
}

export async function renderEditedImage(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number,
  adjustments: ImageAdjustments = DEFAULT_ADJUSTMENTS,
  outputSize = 512,
): Promise<Blob> {
  const croppedCanvas = await getCroppedCanvas(imageSrc, pixelCrop, rotation);
  const filteredCanvas = applyAdjustmentsToCanvas(croppedCanvas, adjustments);

  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = outputSize;
  finalCanvas.height = outputSize;

  const ctx = finalCanvas.getContext("2d");
  if (!ctx) {
    throw new Error("Impossible de générer l'image finale");
  }

  const size = Math.min(filteredCanvas.width, filteredCanvas.height);
  const offsetX = (filteredCanvas.width - size) / 2;
  const offsetY = (filteredCanvas.height - size) / 2;

  ctx.drawImage(
    filteredCanvas,
    offsetX,
    offsetY,
    size,
    size,
    0,
    0,
    outputSize,
    outputSize,
  );

  return new Promise((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Échec de la génération de l'image"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.92,
    );
  });
}

export async function createPreviewUrl(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number,
  adjustments: ImageAdjustments,
  previewSize = 240,
): Promise<string> {
  const blob = await renderEditedImage(
    imageSrc,
    pixelCrop,
    rotation,
    adjustments,
    previewSize,
  );
  return URL.createObjectURL(blob);
}

export function blobToFile(blob: Blob, fileName: string): File {
  const extension = blob.type === "image/png" ? "png" : "jpg";
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  return new File([blob], `${baseName}-edited.${extension}`, {
    type: blob.type || "image/jpeg",
    lastModified: Date.now(),
  });
}
