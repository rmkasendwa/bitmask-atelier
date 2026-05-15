import { CANVAS_SIZE, GRID_HEIGHT, GRID_WIDTH } from "./constants";

type SolidRegionTester = (x: number, y: number) => boolean;
type SolidCharacterGenerator = (x: number, y: number) => string;

export function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

export function createInitialBinary() {
  const random = seededRandom(42);
  let result = "";

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      result += random() > 0.04 ? "1" : "0";
    }
    result += "\n";
  }

  return result;
}

export function generateSolidCharacter(sampleX: number, sampleY: number) {
  const noise = Math.sin(sampleX * 0.12) * Math.cos(sampleY * 0.12);
  const probability = 0.9 + noise * 0.04;

  return Math.random() > probability ? "1" : "0";
}

export function generateMaskedBinary(
  isInsideSolidRegion: SolidRegionTester,
  generateCharacter: SolidCharacterGenerator
) {
  let result = "";

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const sampleX = (x / GRID_WIDTH) * CANVAS_SIZE;
      const sampleY = (y / GRID_HEIGHT) * CANVAS_SIZE;

      result += isInsideSolidRegion(sampleX, sampleY)
        ? generateCharacter(sampleX, sampleY)
        : Math.random() > 0.04
          ? "1"
          : "0";
    }
    result += "\n";
  }

  return result;
}

export function mutateBinaryText(
  current: string,
  isInsideSolidRegion: SolidRegionTester,
  generateCharacter: SolidCharacterGenerator
) {
  const chars = current.split("");
  let next = "";
  let i = 0;

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const char = chars[i];
      const sampleX = (x / GRID_WIDTH) * CANVAS_SIZE;
      const sampleY = (y / GRID_HEIGHT) * CANVAS_SIZE;

      if (char !== "\n" && Math.random() > 0.986) {
        next += isInsideSolidRegion(sampleX, sampleY)
          ? generateCharacter(sampleX, sampleY)
          : Math.random() > 0.04
            ? "1"
            : "0";
      } else {
        next += char;
      }
      i++;
    }
    next += "\n";
    i++;
  }

  return next;
}
