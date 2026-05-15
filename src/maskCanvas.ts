import { CANVAS_SIZE } from "./constants";

export type MaskState = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  maskData: Uint8ClampedArray | null;
  mouseX: number;
  mouseY: number;
  isHovering: boolean;
};

export function createMaskState() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) return null;

  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  return {
    canvas,
    context,
    maskData: null,
    mouseX: CANVAS_SIZE / 2,
    mouseY: CANVAS_SIZE / 2,
    isHovering: false
  } satisfies MaskState;
}

export function paintTextMask(mask: MaskState, text: string) {
  const { context } = mask;
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";

  const centerX = CANVAS_SIZE / 2;
  const centerY = CANVAS_SIZE / 2 - 18;
  let fontSize = 900;

  while (fontSize > 44) {
    context.font = `900 italic ${fontSize}px Georgia`;
    const metrics = context.measureText(text);
    if (metrics.width < CANVAS_SIZE * 0.84 && fontSize < CANVAS_SIZE * 0.72) break;
    fontSize -= 18;
  }

  [
    [0, 0],
    [-7, 0],
    [7, 0],
    [0, -7],
    [0, 7],
    [-5, -5],
    [5, 5],
    [-5, 5],
    [5, -5]
  ].forEach(([offsetX, offsetY]) => {
    context.fillText(text, centerX + offsetX, centerY + offsetY);
  });

  mask.maskData = context.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE).data;
}

export function drawMaskTexture(
  mask: MaskState,
  isInsideSolidRegion: (x: number, y: number) => boolean
) {
  const { context, canvas } = mask;
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  const image = context.createImageData(CANVAS_SIZE, CANVAS_SIZE);
  const { data } = image;
  const time = performance.now() * 0.001;

  for (let y = 0; y < CANVAS_SIZE; y++) {
    for (let x = 0; x < CANVAS_SIZE; x++) {
      const index = (y * CANVAS_SIZE + x) * 4;
      const inside = isInsideSolidRegion(x, y);
      const shimmer = Math.sin((x + y) * 0.012 + time * 2) * 22;

      data[index] = inside ? 150 + shimmer : 80;
      data[index + 1] = inside ? 235 : 130;
      data[index + 2] = inside ? 255 : 210;
      data[index + 3] = inside ? 255 : 18;
    }
  }

  context.putImageData(image, 0, 0);
  return canvas.toDataURL();
}
