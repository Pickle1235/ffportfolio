import { useState, useRef, useEffect } from 'react'
import Desktop from './components/Desktop.tsx'
import Mobile from './components-mobile/Mobile.tsx'
import './App.css'
import './fonts/eurostar.ttf'
import './fonts/trump.ttf'
import './fonts/meiryo.ttf'
import { playClickSound, playClickSoundTwo, playCloseSound } from "./utils/soundPlayer";
import musicSoundFile from "./assets/music.mp3";

function App() {
  const athledaText : string[] = [
    "My first job out of college was with the athLEDA Foundation, a startup company whose mission is to help student athletes with their future. Not all student athletes end up playing professionally after graduating, so the company sets up the students with mentors to help guide them to an alternative future.", 
    "My title was Full Stack Developer, but my duty also included some DevOps work. I was the only primary developer and IT worker for the company, and I built the website, server, and the database while also managing the server and infrastructure using AWS.",
    "I had to learn a lot to meet the CEO's requirements, but without a mentor at the company to guide me, it was challenging. However, this experience taught me to be an independent developer, capable of quickly adapting to new technologies without relying on others."
  ];
  const aceText : string[] = [
    "I currently work for ACE Rent A Car in pricing software development team. My title is .NET Developer, but I also write SQL queries and frontend pages in Blazor as much as I write backend codes in C#.",
    "In this position, I learned how to learn a large code written by other people, maintain old code, add new features, and work closely with the management."
  ];
  const educationText : string[] = [
    "I graduated from Purdue University in May of 2022 with a degree in Computer Science. I formed amazing friendships and learned valuable lessons during my time at Purdue.",
    "My favorite course was one of the last requirements for my degree: Software Engineering Senior Project. In that class, I got to work with 5 other classmates in a project of our choosing. Even though I did not know anything about these guys, I couldn't have asked for better teammates.",
    "We were allowed to create any software we wanted, and everyone agreed to go with my idea: BoilerPlate, a website to improve Purdue students' dining experience. It was a website where students could come review food from the dining courts and share their experience in live comment section.",
    "We used agile methodology to split work evenly and manage our project. Even though we were not able to finish our project, we were happy with what we were able to do in four months, and I learned how to work as a team that supports each other."
  ];
  const summaryText : string[] = [
    "My name is Peter An. I am a software developer specialized in full stack development. You can ask me to build a fast back end server, develop a user friendly mobile application, create a responsive website, or write an efficient SQL query. I can do them all.",
    "I love programming, technology, and gaming. I enjoy what I do for living, I like my folding phone (great for watching videos and taking notes!), and my favorite game is Final Fantasy XIV (it inspired the design of this website)."
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [contentType, setContentType] = useState('summary');

  const [muted, setMuted] = useState<boolean>(true);
  const [windowContent, setWindowContent] = useState<string[]>(summaryText);
  const [windowTitle, setWindowTitle] = useState<string>('Summary');

  const [isMobile, setIsMobile] = useState(false)
 
  const handleResize = () => {
    if ((window.innerWidth / window.innerHeight) < 1) {
        setIsMobile(true);
    } else {
        setIsMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    if ((window.innerWidth / window.innerHeight) < 1) {
      setWindowContent([]);
      setContentType('');
    }
  }, [])

  async function readyPage() {
    if ((window.innerWidth / window.innerHeight) < 0.8) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    setLoading(false);
  }

  function onChangeMuted(muted: boolean) {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      }
      else {
        audioRef.current.play();
      }
    }
    setMuted(muted);
  }

  function onClickContentType(type: string ) {
    setContentType(type);
    switch (type) {
        case 'athleda':
          setWindowContent(athledaText);
          setWindowTitle('The athLEDA Foundation');
          break;
        case 'ace':
          setWindowContent(aceText);
          setWindowTitle('ACE Rent A Car');
          break;
        case 'education':
          setWindowContent(educationText);
          setWindowTitle('Education');
          break;
        case 'summary':
          setWindowContent(summaryText);
          setWindowTitle('Summary');
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
    setContentType('');
    if (!muted) {
      playCloseSound();
    }
  }

  return (
    <div className='blue-background'>
      <audio
        controls
        preload = "auto"
        style = {{display: "none"}}
        ref = {audioRef}
        loop
      >
       <source src={musicSoundFile} />
      </audio>
      <video loop autoPlay muted onCanPlayThrough={() => readyPage()}>
        <source src="https://dl.dropboxusercontent.com/scl/fi/o1fjuhd3q8dq5jjp7nv06/videoplayback.mp4?rlkey=kpgg55qfq26bu581btclrzxoo&st=gbbe0a92&dl=0" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      {isMobile && 
        <Mobile
          onClickCloseWindow = {onClickCloseWindow}
          windowContent = {windowContent}
          windowTitle = {windowTitle}
          muted = {muted}
          loading = {loading}
          onClickContentType = {onClickContentType}
          onChangeMuted = {onChangeMuted}
          contentType = {contentType}
        />
      }
      {!isMobile &&
        <Desktop
          onClickCloseWindow = {onClickCloseWindow}
          windowContent = {windowContent}
          windowTitle = {windowTitle}
          muted = {muted}
          loading = {loading}
          onClickContentType = {onClickContentType}
          onChangeMuted = {onChangeMuted}
          contentType = {contentType}
        />
      }
    </div>
  )
}

export default App
