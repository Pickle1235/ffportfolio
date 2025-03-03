import { useState, useRef } from 'react'
import RightColumn from './components/RightColumn.tsx'
import LeftColumn from './components/LeftColumn.tsx'
import DraggableWindow from './components/DraggableWindow.tsx'
import './css/App.css'
import './fonts/eurostar.ttf'
import './fonts/trump.ttf'
import './fonts/meiryo.ttf'
import { playClickSound, playClickSoundTwo } from "./utils/soundPlayer";
import musicSoundFile from "./assets/music.mp3";

function App() {
  const athledaText : string[] = ['ath', 'leda'];
  const aceText : string[] = ['ace', 'rent', 'a', 'car'];
  const educationText : string[] = ['Purdue', 'University'];
  const summaryText : string[] = 
  ['My name is Peter An.', ''];

  const audioRef = useRef();

  const [loading, setLoading] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [windowContent, setWindowContent] = useState<string[]>(summaryText);
  const [contentType, setContentType] = useState('summary');

  function onChangeMuted(muted: boolean) {
    if (muted) {
      audioRef.current.pause();
    }
    else {
      audioRef.current.play();
    }
    setMuted(muted);
  }

  function onClickContentType(type: string ) {
    setContentType(type);
    switch (type) {
        case 'athleda':
          setWindowContent(athledaText);
          break;
        case 'ace':
          setWindowContent(aceText);
          break;
        case 'education':
          setWindowContent(educationText);
          break;
        case 'summary':
          setWindowContent(summaryText);
          break;
    }
    if (!muted && !windowContent) {
      playClickSoundTwo();
    }
    if (!muted && windowContent) {
      playClickSound();
    }
  } 

  function onClickCloseWindow() {
    setWindowContent([]);
    if (!muted) {
      playCloseSound();
    }
  }

  return (
    <div className='blue-background'>
      <audio
        controls = "controls"
        preload = "auto"
        autobuffer = "true"
        style = {{display: "none"}}
        ref = {audioRef}
        loop
      >
       <source src={musicSoundFile} />
      </audio>
      <video loop autoPlay muted onCanPlayThrough={() => setLoading(false)}>
            <source src="https://dl.dropboxusercontent.com/scl/fi/o1fjuhd3q8dq5jjp7nv06/videoplayback.mp4?rlkey=kpgg55qfq26bu581btclrzxoo&st=gbbe0a92&dl=0" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      {loading && 
        <div className='loading-text-div'>
          <a className='loading-text'>
            Loading...
          </a>
        </div>
      }
      {!loading && <div>
        <div className="main">
          <div className="left">
            <LeftColumn muted={muted}/>
          </div>
          <div className="center">
          </div>
          {
            windowContent.length > 0 && 
            <DraggableWindow
              muted={muted}
              onClickCloseWindow={onClickCloseWindow}
              windowContent={windowContent}
            />
            }
          <div className="right">
            <RightColumn
              muted={muted}
              onChangeMuted={onChangeMuted}
              onClickContentType={onClickContentType}
              contentType={contentType}
            />
          </div>
        </div>
      </div>}
    </div>
  )
}

export default App
