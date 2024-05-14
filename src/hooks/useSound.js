import { useEffect, useRef } from "react";

export const useSound = () => {
  const soundRef = useRef();

  useEffect(() => {
    soundRef.current = new Audio("../assets/Short-notification-sound.mp3");
  }, []);

  const playSound = () => {
    soundRef.current.play();
  };

  const pauseSound = () => {
    soundRef.current.pause();
  };

  return {
    playSound,
    pauseSound,
  };
};
