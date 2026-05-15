import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  createInitialBinary,
  generateMaskedBinary,
  generateSolidCharacter,
  mutateBinaryText
} from "../binaryText";
import { CANVAS_SIZE, CIRCLE_RADIUS, DEFAULT_TEXT } from "../constants";
import { createMaskState, drawMaskTexture, MaskState, paintTextMask } from "../maskCanvas";

export function useBinaryMask() {
  const [binaryText, setBinaryText] = useState(createInitialBinary);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<MaskState | null>(null);

  const isInsideText = useCallback((x: number, y: number) => {
    const mask = maskRef.current;
    if (!mask?.maskData) return false;

    const px = Math.max(0, Math.min(CANVAS_SIZE - 1, Math.floor(x)));
    const py = Math.max(0, Math.min(CANVAS_SIZE - 1, Math.floor(y)));
    const index = (py * CANVAS_SIZE + px) * 4;

    return mask.maskData[index + 3] > 20;
  }, []);

  const isInsideSolidRegion = useCallback(
    (x: number, y: number) => {
      const mask = maskRef.current;
      if (!mask) return false;

      const dx = x - mask.mouseX;
      const dy = y - mask.mouseY;
      const insideCircle = mask.isHovering && Math.sqrt(dx * dx + dy * dy) < CIRCLE_RADIUS;

      return isInsideText(x, y) || insideCircle;
    },
    [isInsideText]
  );

  const regenerateTextWithMask = useCallback(() => {
    setBinaryText(generateMaskedBinary(isInsideSolidRegion, generateSolidCharacter));
  }, [isInsideSolidRegion]);

  const createMask = useCallback(
    (text: string) => {
      const mask = maskRef.current;
      if (!mask) return;

      paintTextMask(mask, text);
      regenerateTextWithMask();
    },
    [regenerateTextWithMask]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const mask = maskRef.current;
      const box = boxRef.current;
      if (!mask || !box) return;

      const rect = box.getBoundingClientRect();
      mask.mouseX = ((event.clientX - rect.left) / rect.width) * CANVAS_SIZE;
      mask.mouseY = ((event.clientY - rect.top) / rect.height) * CANVAS_SIZE;
      regenerateTextWithMask();
    },
    [regenerateTextWithMask]
  );

  const handleMouseEnter = useCallback(() => {
    if (!maskRef.current) return;

    maskRef.current.isHovering = true;
    regenerateTextWithMask();
  }, [regenerateTextWithMask]);

  const handleMouseLeave = useCallback(() => {
    if (!maskRef.current) return;

    maskRef.current.isHovering = false;
    regenerateTextWithMask();
  }, [regenerateTextWithMask]);

  useEffect(() => {
    maskRef.current = createMaskState();
    createMask(DEFAULT_TEXT);
  }, [createMask]);

  useEffect(() => {
    let frameId = 0;
    const draw = () => {
      const mask = maskRef.current;
      const box = boxRef.current;

      if (mask && box) {
        box.style.backgroundImage = `url(${drawMaskTexture(mask, isInsideSolidRegion)})`;
      }

      frameId = window.requestAnimationFrame(draw);
    };

    frameId = window.requestAnimationFrame(draw);

    return () => window.cancelAnimationFrame(frameId);
  }, [isInsideSolidRegion]);

  useEffect(() => {
    let frameId = 0;
    const mutateBinary = () => {
      setBinaryText((current) =>
        mutateBinaryText(current, isInsideSolidRegion, generateSolidCharacter)
      );

      frameId = window.requestAnimationFrame(mutateBinary);
    };

    frameId = window.requestAnimationFrame(mutateBinary);

    return () => window.cancelAnimationFrame(frameId);
  }, [isInsideSolidRegion]);

  return {
    binaryText,
    boxRef,
    createMask,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove
  };
}
