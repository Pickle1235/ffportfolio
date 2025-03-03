import clickSoundFile from "../assets/click1.mp3";
import clickSoundFileTwo from "../assets/click2.mp3";
import closeSoundFile from "../assets/close.mp3";
import hoverSoundFile from "../assets/hover.mp3";

export const playClickSound = () => {
  const audio = new Audio(clickSoundFile);
  audio.play().catch(error => console.error("Error playing audio:", error));
};

export const playClickSoundTwo = () => {
  const audio = new Audio(clickSoundFileTwo);
  audio.play().catch(error => console.error("Error playing audio:", error));
}

export const playCloseSound = () => {
  const audio = new Audio(closeSoundFile);
  audio.play().catch(error => console.error("Error playing audio:", error));
}

export const playHoverSound = () => {
  const audio = new Audio(hoverSoundFile);
  audio.currentTime = 0;
  audio.play().catch((error) => console.error("Error playing sound:", error));
};