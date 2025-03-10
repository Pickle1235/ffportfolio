import '../css-mobile/Window.css';
import * as React from 'react';
import { useState, useRef } from 'react';
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
  const [position, setPosition] = useState({
    x: width / 2 - (width * 0.8) / 2,
    y: height / 2 - (height * 0.6 + width * 0.006) / 2,
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  function onHover() {
    if (!muted) {
      playHoverSound();
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);

    const touch = e.touches[0]; // Get the first touch point

    dragStart.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  };

  const handleMove = (x: number, y: number) => {
    if (!isDragging) return;
    setPosition({
      x: x - dragStart.current.x,
      y: y - dragStart.current.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);

      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
      window.addEventListener('touchcancel', handleEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);

      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };
  }, [isDragging]);

  const renderTexts = (): React.ReactNode => {
    return windowContent.map((windowContent, i) => (
      <p key={i} className={i ? 'extra-margin' : ''}>
        {windowContent}
      </p>
    ));
  };

  return (
    <div
      className="window-mobile"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className="drag-bar-mobile"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <a className="trump grey-text">{windowTitle}</a>
        <img
          onMouseEnter={() => onHover()}
          onClick={onClickCloseWindow}
          src={closeButton}
        ></img>
      </div>
      <div className="line-container-mobile">
        <div className="glow-mobile" />
        <div className="line2-mobile" />
      </div>

      <div className="meiryo grey-text text-area-mobile">{renderTexts()}</div>
    </div>
  );
}
