import '../css/RightColumn.css'
import { useState } from "react";
import RoundButton from './MiniComponents/RoundButton.tsx';
import '../fonts/trump.ttf'
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeOnIcon from '@mui/icons-material/VolumeUp';
import { playHoverSound, playClickSound } from "../utils/soundPlayer";

export default function RightColumn({ onClickContentType, onChangeMuted, contentType, muted }: { onClickContentType? : (type: string) => void, onChangeMuted? : (type: boolean) => void, contentType : string, muted : boolean }) {
    const [isAboutMe, setIsAboutMe] = useState<boolean>(true);

    function onHover() {
        if (!muted) {
            playHoverSound()
        }
    }
    
    return (
        <div className="right-column">
            <div className="row center-vertical width-80">
                <RoundButton onClick={OnClickAboutMe} text="About Me" muted={muted}></RoundButton>
                <RoundButton onClick={OnClickExperience} text="Experience" muted={muted}></RoundButton>
                <div className="icon no-line-height">
                    {muted && <VolumeOffIcon onClick={() => onChangeMuted?.(false)} className="icon"/>}
                    {!muted && <VolumeOnIcon onClick={() => onChangeMuted?.(true)} className="icon"/>}
                </div>
            </div>

            <div className="row">
                <div className="eurostar blue-border white-text">
                    {isAboutMe && <a>■ ABOUT ME</a>}
                    {!isAboutMe && <a>■ EXPERIENCE</a>}
                </div>
            </div>

            <div>
                <hr className="line"/>
            </div>
            <div className="select-rows">
                {isAboutMe && <div>
                    {contentType != 'summary' && <a className="select trump blue-border white-text" onMouseEnter={() => onHover()} onClick={() => onClickContentType?.('summary')}>Summary</a>}
                    {contentType == 'summary' && <a className="select trump green-border white-text" onMouseEnter={() => onHover()} onClick={() => onClickContentType?.('summary')}>Summary</a>}
                    <br/>
                    {contentType != 'education' && <a className="select trump blue-border white-text" onMouseEnter={() => onHover()} onClick={() => onClickContentType?.('education')}>Education</a>}
                    {contentType == 'education' && <a className="select trump green-border white-text" onMouseEnter={() => onHover()} onClick={() => onClickContentType?.('education')}>Education</a>}
                </div>}
                {!isAboutMe && <div>
                    {contentType != 'ace' && <a className="select trump blue-border white-text" onMouseEnter={() => onHover()} onClick={() => onClickContentType?.('ace')}>Ace Rent A Car</a>}
                    {contentType == 'ace' && <a className="select trump green-border white-text" onMouseEnter={() => onHover()} onClick={() => onClickContentType?.('ace')}>Ace Rent A Car</a>}
                    <br/>
                    {contentType != 'athleda' && <a className="select trump blue-border white-text" onMouseEnter={() => onHover()} onClick={() => onClickContentType?.('athleda')}>The athLEDA Foundation</a>}
                    {contentType == 'athleda' && <a className="select trump green-border white-text" onMouseEnter={() => onHover()} onClick={() => onClickContentType?.('athleda')}>The athLEDA Foundation</a>}
                </div>}
            </div>
        </div>
    )

    function OnClickAboutMe() {
        if (!muted) {
            playClickSound();
        }
        setIsAboutMe(true);
    }

    function OnClickExperience() {
        if (!muted) {
            playClickSound();
        }
        setIsAboutMe(false);
    }
}