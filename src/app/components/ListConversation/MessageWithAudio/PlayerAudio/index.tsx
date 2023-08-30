"use client";

import Button from "@/components/Button";

import { useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import styles from "../../styles.module.scss";

import formatTime from "@/utils/formatTime";
import ProgressBar from "../ProgressBar";

export default function PlayerAudio({
  src,
  duration,
}: {
  src: string;
  duration: number;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const maxDuration = formatTime(duration);

  const handlePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current?.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={styles.playerAudio}>
      <audio
        hidden
        controls
        ref={audioRef}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          setCurrentTime(formatTime(Math.floor(e.currentTarget.currentTime)));
        }}
        preload="auto"
      >
        <source src={src} type="audio/mpeg" />
      </audio>

      <p>{currentTime ? currentTime : maxDuration}</p>

      <ProgressBar audioRef={audioRef}>
        <Button onClick={handlePlayPause}>
          {playing ? (
            <BsFillPauseFill size={30} />
          ) : (
            <BsFillPlayFill size={30} />
          )}
        </Button>
      </ProgressBar>
    </div>
  );
}
