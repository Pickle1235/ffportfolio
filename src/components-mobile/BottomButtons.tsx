import '../css-mobile/BottomButtons.css';
import { playHoverSound, playClickSound } from '../utils/soundPlayer';
import resumeIcon from '../assets/resume.svg';
import linkedInIcon from '../assets/linkedin.svg';
import gitHubIcon from '../assets/github.svg';

export default function RightColumn({ muted }: { muted: boolean }) {
  function onHover() {
    if (!muted) {
      playHoverSound();
    }
  }

  const redirectResume = () => {
    if (!muted) {
      playClickSound();
    }
    window.open(
      'https://drive.google.com/file/d/10yKRLL3NEnEh-VRon5C7I1fbRgTwzU3D/view?usp=drive_link',
      '_blank',
      'noopener,noreferrer',
    );
  };

  const redirectLinkedIn = () => {
    if (!muted) {
      playClickSound();
    }
    window.open(
      'https://www.linkedin.com/in/peter-an/',
      '_blank',
      'noopener,noreferrer',
    );
  };

  const redirectGitHub = () => {
    if (!muted) {
      playClickSound();
    }
    window.open(
      'https://github.com/Pickle1235/',
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="bottom-buttons-mobile">
      <button
        className="circle-button-mobile circle-button-color-mobile"
        onMouseEnter={() => onHover()}
        onClick={redirectResume}
      >
        <img className="circle-button-image-mobile" src={resumeIcon} />
      </button>
      <button
        className="circle-button-mobile circle-button-color-mobile"
        onMouseEnter={() => onHover()}
        onClick={redirectLinkedIn}
      >
        <img className="circle-button-image-mobile" src={linkedInIcon} />
      </button>
      <button
        className="circle-button-mobile circle-button-color-mobile"
        onMouseEnter={() => onHover()}
        onClick={redirectGitHub}
      >
        <img className="circle-button-image-mobile" src={gitHubIcon} />
      </button>
    </div>
  );
}
