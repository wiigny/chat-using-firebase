"use client";

import useConversation from "@/hook/useConversation";
import Wave from "react-wavify";
import styles from "./styles.module.scss";
import { PiChatsThin } from "react-icons/pi";

export default function Wavify() {
  const { conversation } = useConversation();

  return (
    !conversation && (
      <div className={styles.wavify}>
        <div></div>

        <div>
          <PiChatsThin size={120} />

          <p>
            Welcome to chat <span>👋😄</span>
          </p>
        </div>

        <Wave
          fill="url(#gradient)"
          options={{
            speed: 0.2,
            amplitude: 30,
          }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="5%" stopColor="#f0f2f5" />
              <stop offset="95%" stopColor="#0b947b" />
            </linearGradient>
          </defs>
        </Wave>
      </div>
    )
  );
}
