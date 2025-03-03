import React from "react";
import '../../css/RoundButton.css'
import { playHoverSound } from "../../utils/soundPlayer"; 

export default function RoundButton({ onClick, text, muted }: { onClick? : React.MouseEventHandler, text: string, muted: boolean }) {
    function onHover() {
        if (!muted) {
            playHoverSound()
        }
    }
    return (
        <div className="round-button" onMouseEnter={() => onHover()} onClick={onClick}>
            <button className="button blue-border">{text}</button>
        </div>
    )
}