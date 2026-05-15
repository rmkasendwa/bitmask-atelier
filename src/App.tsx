import { useCallback, useState } from "react";
import { BinaryControls } from "./components/BinaryControls";
import { BinaryDisplay } from "./components/BinaryDisplay";
import { FooterNote } from "./components/FooterNote";
import { Header } from "./components/Header";
import { DEFAULT_TEXT, SURPRISES } from "./constants";
import { useBinaryMask } from "./hooks/useBinaryMask";
import { useClock } from "./hooks/useClock";

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_TEXT);
  const clockLabel = useClock();
  const {
    binaryText,
    boxRef,
    createMask,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove
  } = useBinaryMask();

  const applyText = useCallback(() => {
    createMask(inputValue.trim() || DEFAULT_TEXT);
  }, [createMask, inputValue]);

  const surprise = useCallback(() => {
    const next = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
    setInputValue(next);
    createMask(next);
  }, [createMask]);

  const handlePreset = useCallback(
    (preset: string) => {
      setInputValue(preset);
      createMask(preset);
    },
    [createMask]
  );

  return (
    <div className="stage">
      <div className="stars" />

      <Header clockLabel={clockLabel} />

      <main>
        <section className="composer" aria-label="Binary text generator">
          <div className="intro-strip">
            <span>React Router SSR</span>
            <span>Canvas alpha mask</span>
            <span>Generative binary field</span>
          </div>

          <BinaryControls
            inputValue={inputValue}
            onInputChange={setInputValue}
            onApply={applyText}
            onPreset={handlePreset}
            onSurprise={surprise}
          />

          <BinaryDisplay
            binaryText={binaryText}
            boxRef={boxRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          />
        </section>
      </main>

      <FooterNote />
    </div>
  );
}
