import '../css/Window.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import closeButton from '../assets/close.png';
import useWindowDimensions from '../utils/useWindowDimensions';
import { playHoverSound } from '../utils/soundPlayer';
export default function DraggableWindow({
  onClickCloseWindow,
  windowContent,
  windowTitle,
  muted,
}: {
  onClickCloseWindow?: () => void;
  windowContent: string[];
  windowTitle: string;
  muted: boolean;
}) {
  const { height, width } = useWindowDimensions();

  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const [position, setPosition] = useState({
    x: width / 2 - (width * 0.306) / 2,
    y: height / 2 - (height * 0.6 + width * 0.006) / 2,
  });

  function onHover() {
    if (!muted) {
      playHoverSound();
    }
  }

  const updatePosition = useCallback((x: number, y: number) => {
    if (!isDragging.current) return;
    setPosition({ x: x - dragStart.current.x, y: y - dragStart.current.y });
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    },
    [updatePosition],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    },
    [updatePosition],
  );

  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleStart = useCallback(
    (x: number, y: number) => {
      isDragging.current = true;
      dragStart.current = {
        x: x - position.x,
        y: y - position.y,
      };
    },
    [position],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const moveHandler = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent) {
        handleMouseMove(e);
      } else if (e instanceof TouchEvent) {
        handleTouchMove(e);
      }
    };

    const endHandler = () => handleEnd();

    window.addEventListener('mousemove', moveHandler, { passive: true });
    window.addEventListener('mouseup', endHandler, { passive: true });
    window.addEventListener('touchmove', moveHandler, { passive: true });
    window.addEventListener('touchend', endHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', endHandler);
    };
  }, [handleMouseMove, handleTouchMove, handleEnd]);

  const renderTexts = (): React.ReactNode => {
    return windowContent.map((content, i) => (
      <p key={i} className={i ? 'extra-margin' : ''}>
        {content}
      </p>
    ));
  };

  return (
    <div
      className="window"
      style={{
        left: position.x,
        top: position.y,
        touchAction: 'none', // Prevents unintended scrolling on touch devices
      }}
    >
      <div
        className="drag-bar"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <a className="trump grey-text">{windowTitle}</a>
        <img
          onMouseEnter={onHover}
          onClick={onClickCloseWindow}
          src={closeButton}
          alt="Close"
        />
      </div>
      <div className="line-container">
        <div className="glow" />
        <div className="line2" />
      </div>

      <div className="meiryo grey-text text-area">{renderTexts()}</div>
    </div>
  );
}
