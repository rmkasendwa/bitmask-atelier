import { KeyboardEvent } from "react";
import { PRESETS } from "../constants";

type BinaryControlsProps = {
  inputValue: string;
  onInputChange: (value: string) => void;
  onApply: () => void;
  onPreset: (preset: string) => void;
  onSurprise: () => void;
};

export function BinaryControls({
  inputValue,
  onInputChange,
  onApply,
  onPreset,
  onSurprise
}: BinaryControlsProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onApply();
  };

  return (
    <>
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          maxLength={18}
          placeholder="Enter text or a symbol..."
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" aria-label="Surprise me" onClick={onSurprise}>
          Surprise
        </button>
        <button id="applyBtn" type="button" onClick={onApply}>
          Apply
        </button>
      </div>

      <div className="presets" aria-label="Preset text">
        {PRESETS.map((preset) => (
          <button className="preset" type="button" key={preset} onClick={() => onPreset(preset)}>
            {preset}
          </button>
        ))}
      </div>
    </>
  );
}
