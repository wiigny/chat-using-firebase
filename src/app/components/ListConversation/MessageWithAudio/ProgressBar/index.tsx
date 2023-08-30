"use client";

import { ReactNode, RefObject, useEffect, useRef } from "react";
import styles from "../../styles.module.scss";

export default function ProgressBar({
  children,
  audioRef,
}: {
  children: ReactNode;
  audioRef: RefObject<HTMLAudioElement>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    const audio = audioRef.current;

    if (!input || !audio) {
      return;
    }

    const updateRange = () => {
      const progress = (audio.currentTime / audio.duration) * 100;

      input.style.backgroundSize = `${progress}% 100%`;

      input.value = String(progress);
    };

    const updateTrack = (event: Event) => {
      const newAudioCurrentTime = (audio.duration * +input.value) / 100;

      audio.currentTime = +newAudioCurrentTime.toFixed(2);
    };

    audio.addEventListener("timeupdate", updateRange);
    input.addEventListener("input", updateTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateRange);
      input.removeEventListener("input", updateTrack);
    };
  }, [audioRef]);

  return (
    <div className={styles.progressBar}>
      {children}
      <input ref={inputRef} type="range" name="progress" defaultValue={0} />
    </div>
  );
}
