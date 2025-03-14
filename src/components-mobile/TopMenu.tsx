import '../css-mobile/TopMenu.css';
import '../fonts/trump.ttf';
import { useState } from 'react';
import { playHoverSound, playClickSound } from '../utils/soundPlayer';
import RoundButton from './MiniComponents/RoundButton.tsx';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeOnIcon from '@mui/icons-material/VolumeUp';

export default function TopMenu({
  onClickContentType,
  onChangeMuted,
  contentType,
  muted,
}: {
  onClickContentType?: (type: string) => void;
  onChangeMuted?: (type: boolean) => void;
  contentType: string;
  muted: boolean;
}) {
  const [isAboutMe, setIsAboutMe] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function onHover() {
    if (!muted) {
      playHoverSound();
    }
  }

  function onSelect(contentType: string) {
    onClickContentType?.(contentType);
    setIsMenuOpen(false);
  }

  return (
    <div className="top-menu-mobile">
      <div className="row center-vertical width-80-mobile">
        <RoundButton
          onClick={OnClickAboutMe}
          text="About Me"
          muted={muted}
        ></RoundButton>
        <RoundButton
          onClick={OnClickExperience}
          text="Experience"
          muted={muted}
        ></RoundButton>
        <div className="icon no-line-height">
          {muted && (
            <VolumeOffIcon
              onClick={() => onChangeMuted?.(false)}
              className="icon"
            />
          )}
          {!muted && (
            <VolumeOnIcon
              onClick={() => onChangeMuted?.(true)}
              className="icon"
            />
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="select-window-mobile width-80-mobile">
          <div className="bruh">
            {isAboutMe && (
              <div className="bruh">
                {contentType != 'summary' && (
                  <a
                    className="select trump blue-border white-text"
                    onMouseEnter={() => onHover()}
                    onClick={() => onSelect('summary')}
                  >
                    Summary
                  </a>
                )}
                {contentType == 'summary' && (
                  <a
                    className="select trump green-border white-text"
                    onMouseEnter={() => onHover()}
                    onClick={() => onSelect('summary')}
                  >
                    Summary
                  </a>
                )}
                <br />
                {contentType != 'education' && (
                  <a
                    className="select trump blue-border white-text"
                    onMouseEnter={() => onHover()}
                    onClick={() => onSelect('education')}
                  >
                    Education
                  </a>
                )}
                {contentType == 'education' && (
                  <a
                    className="select trump green-border white-text"
                    onMouseEnter={() => onHover()}
                    onClick={() => onSelect('education')}
                  >
                    Education
                  </a>
                )}
              </div>
            )}
            {!isAboutMe && (
              <div className="bruh">
                {contentType != 'ace' && (
                  <a
                    className="select trump blue-border white-text"
                    onMouseEnter={() => onHover()}
                    onClick={() => onSelect('ace')}
                  >
                    Ace Rent A Car
                  </a>
                )}
                {contentType == 'ace' && (
                  <a
                    className="select trump green-border white-text"
                    onMouseEnter={() => onHover()}
                    onClick={() => onSelect('ace')}
                  >
                    Ace Rent A Car
                  </a>
                )}
                <br />
                {contentType != 'alfreeda' && (
                  <a
                    className="select trump blue-border white-text"
                    onMouseEnter={() => onHover()}
                    onClick={() => onSelect('alfreeda')}
                  >
                    The Alfreeda Foundation
                  </a>
                )}
                {contentType == 'alfreeda' && (
                  <a
                    className="select trump green-border white-text"
                    onMouseEnter={() => onHover()}
                    onClick={() => onSelect('alfreeda')}
                  >
                    The Alfreeda Foundation
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  function OnClickAboutMe() {
    if (!muted) {
      playClickSound();
    }
    if (isAboutMe && isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
      setIsAboutMe(true);
    }
  }

  function OnClickExperience() {
    if (!muted) {
      playClickSound();
    }
    if (!isAboutMe && isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
      setIsAboutMe(false);
    }
  }
}
