import { MouseEvent, RefObject } from "react";

type BinaryDisplayProps = {
  binaryText: string;
  boxRef: RefObject<HTMLDivElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (event: MouseEvent<HTMLDivElement>) => void;
};

export function BinaryDisplay({
  binaryText,
  boxRef,
  onMouseEnter,
  onMouseLeave,
  onMouseMove
}: BinaryDisplayProps) {
  return (
    <div className="binary-wrap">
      <div
        id="box"
        ref={boxRef}
        aria-live="polite"
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {binaryText}
      </div>
    </div>
  );
}
