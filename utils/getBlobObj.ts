import { b64FileList } from "@/types";

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;

function calculateSize(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
) {
  let width = img.width;
  let height = img.height;
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }
  return [width, height];
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () =>
      reader.result &&
      typeof reader.result === "string" &&
      resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const getBlobObj = (
  file: File | string,
  isFlash: boolean
): Promise<b64FileList> =>
  new Promise((resolve, reject) => {
    let blobURL;
    if (typeof file !== "string") {
      blobURL = URL.createObjectURL(file);
    } else {
      blobURL = file;
    }
    const img = new window.Image();
    img.src = blobURL;
    img.crossOrigin = "anonymous";
    img.onerror = function () {
      URL.revokeObjectURL(img.src);
      // Handle the failure properly
    };
    img.onload = function () {
      URL.revokeObjectURL(img.src);
      const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          async (blob) => {
            if (blob) {
              const b64 = await blobToBase64(blob);
              // Handle the compressed image. es. upload or save in local state

              resolve({
                url: URL.createObjectURL(blob),
                b64: b64,
                w: newWidth,
                h: newHeight,
                isFlash: isFlash,
              });
            } else {
              reject(Error("Something went wrong"));
              // do something here about error uploading
            }
          },
          MIME_TYPE,
          QUALITY
        );
      } else {
        reject(Error("Something went wrong"));
        //do something here with an error about uploading
      }
    };
  });
