import '../css/LeftColumn.css'
import '../fonts/eurostar.ttf'
import '../fonts/trump.ttf'
import { playHoverSound, playClickSound } from "../utils/soundPlayer";

export default function LeftColumn( {muted} : { muted : boolean} ) {

        function onHover() {
            if (!muted) {
                playHoverSound()
            }
        }

            function onClick() {
                if (!muted) {
                    playClickSound()
                }
            }

        return (
            <div className="left-column">
                <div className="row">
                    <a className="eurostar blue-border white-text">■ NAME</a><br />
                    <a className="tabbed-text trump blue-border white-text">Peter An</a>
                </div>
                <div className="row">
                    <a className="eurostar blue-border white-text">■ DEGREE</a><br />
                    <a className="tabbed-text trump blue-border white-text">Bachelor's Degree in Computer Science</a>
                </div>
                <div className="row">
                    <a className="eurostar blue-border white-text">■ PROFESSION</a><br />
                    <a className="tabbed-text trump blue-border white-text">Software Engineer</a>
                </div>
                <div className="row">
                    <a className="eurostar blue-border white-text">■ EMAIL</a><br />
                    <a href="mailto:peteran1236@gmail.com" onMouseEnter={() => onHover()} onClick={() => onClick()} className="tabbed-text no-hyperlink-style trump blue-border white-text clickable">peteran1236@gmail.com</a>
                </div>
            </div>
            
    )
}