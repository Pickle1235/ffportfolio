import { useState, useRef, useEffect } from 'react';
import Desktop from './components/Desktop.tsx';
import Mobile from './components-mobile/Mobile.tsx';
import './App.css';
import './fonts/eurostar.ttf';
import './fonts/trump.ttf';
import './fonts/meiryo.ttf';
import {
  playClickSound,
  playClickSoundTwo,
  playCloseSound,
} from './utils/soundPlayer';
import musicSoundFile from './assets/music.mp3';

function App() {
  const athledaText: string[] = [
    'My first job after graduating was with the athLEDA Foundation, a startup dedicated to helping student-athletes navigate their careers beyond sports. Since not all athletes turn professional, the company connects them with mentors to explore alternative career paths after graduation.',
    'As a Full Stack Developer, I was the sole developer and IT specialist for the company. I built the website, backend server, and database while also handling DevOps tasks, including server and infrastructure management using AWS.',
    'Meeting the CEO’s requirements required me to learn quickly and adapt to new technologies. Without a mentor to guide me, I had to rely on self-learning and problem-solving to deliver results. This experience strengthened my ability to work independently, quickly adapt to new challenges, and take ownership of complex technical projects.',
  ];
  const aceText: string[] = [
    'I currently work as a .NET Developer at ACE Rent A Car, where I contribute to the Pricing Software Development team. While my primary focus is backend development in C#, I also write SQL queries and develop frontend pages using Blazor.',
    'In this role, I have gained experience working with large, complex codebases—learning how to read, maintain, and enhance existing code while implementing new features. I also collaborate closely with management to ensure that our solutions align with business needs.',
    'Working with a system that processes hundreds of millions of data points daily has strengthened my ability to write optimized, high-performance SQL queries. I have developed a keen eye for efficiency, ensuring that data retrieval and processing are both fast and scalable to meet business demands.',
  ];
  const educationText: string[] = [
    'I graduated from Purdue University in May 2022 with a degree in Computer Science. During my time at Purdue, I built lasting friendships and gained invaluable experience that shaped my growth as a developer.',
    'One of the most impactful courses I took was the Software Engineering Senior Project, where I collaborated with five classmates on a project of our choosing. Despite not knowing each other initially, we quickly formed a strong, cohesive team.',
    "We decided to build BoilerPlate, a website designed to enhance Purdue students' dining experience. The platform allowed students to review dining court meals and share real-time feedback in a live comment section. Using agile methodology, we effectively managed our tasks and responsibilities. Although we didn’t fully complete the project within the semester, we were proud of what we achieved in just four months. More importantly, I learned the value of teamwork, adaptability, and supporting one another in a collaborative environment.",
  ];
  const summaryText: string[] = [
    'Hello, my name is Peter An. I am a software developer specializing in full-stack development. Whether you need a high-performance backend server, a user-friendly mobile application, a responsive website, or an optimized SQL query, I can deliver efficient and scalable solutions.',
    'I have a deep passion for programming, technology, and gaming. I take pride in my work and enjoy staying up-to-date with the latest advancements in the industry. In my free time, I love exploring new tech, using my folding phone (perfect for productivity and entertainment), and playing Final Fantasy XIV—a game that even inspired the design of this website.',
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [contentType, setContentType] = useState('summary');

  const [muted, setMuted] = useState<boolean>(true);
  const [windowContent, setWindowContent] = useState<string[]>(summaryText);
  const [windowTitle, setWindowTitle] = useState<string>('Summary');

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth / window.innerHeight < 1) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    if (window.innerWidth / window.innerHeight < 1) {
      setWindowContent([]);
      setContentType('');
    }
  }, []);

  async function readyPage() {
    setLoading(false);
  }

  function onChangeMuted(muted: boolean) {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setMuted(muted);
  }

  function onClickContentType(type: string) {
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

  useEffect(() => {
    if (window.innerWidth / window.innerHeight < 0.8) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <div className="blue-background">
      <audio
        controls
        preload="auto"
        style={{ display: 'none' }}
        ref={audioRef}
        loop
      >
        <source src={musicSoundFile} />
      </audio>
      <video loop autoPlay muted onCanPlayThrough={() => readyPage()}>
        <source
          src="https://dl.dropboxusercontent.com/scl/fi/o1fjuhd3q8dq5jjp7nv06/videoplayback.mp4?rlkey=kpgg55qfq26bu581btclrzxoo&st=gbbe0a92&dl=0"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {isMobile && (
        <Mobile
          onClickCloseWindow={onClickCloseWindow}
          windowContent={windowContent}
          windowTitle={windowTitle}
          muted={muted}
          loading={loading}
          onClickContentType={onClickContentType}
          onChangeMuted={onChangeMuted}
          contentType={contentType}
        />
      )}
      {!isMobile && (
        <Desktop
          onClickCloseWindow={onClickCloseWindow}
          windowContent={windowContent}
          windowTitle={windowTitle}
          muted={muted}
          loading={loading}
          onClickContentType={onClickContentType}
          onChangeMuted={onChangeMuted}
          contentType={contentType}
        />
      )}
    </div>
  );
}

export default App;
