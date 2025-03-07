import React from "react";
import '../../css-mobile/RoundButton.css'
import { playHoverSound } from "../../utils/soundPlayer"; 

export default function RoundButton({ onClick, text, muted }: { onClick? : React.MouseEventHandler, text: string, muted: boolean }) {
    function onHover() {
        if (!muted) {
            playHoverSound()
        }
    }
    return (
        <div className="round-button-mobile" onMouseEnter={() => onHover()} onClick={onClick}>
            <button className="button blue-border">{text}</button>
        </div>
    )
}