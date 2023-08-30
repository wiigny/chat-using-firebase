import Button from "@/components/Button";
import useAuth from "@/hook/useAuth";
import useConversation from "@/hook/useConversation";
import sendAudio from "@/utils/sendAudio";
import getBlobDuration from "get-blob-duration";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdOutlineMic, MdSend } from "react-icons/md";
import { BiSolidTrashAlt } from "react-icons/bi";
import { storage } from "@/firebase";
import formatTime from "@/utils/formatTime";
import styles from "../styles.module.scss";
import clsx from "clsx";

interface MicRecordProps {
  isRecording: boolean;
  setIsRecording: Dispatch<SetStateAction<boolean>>;
}

export default function MicRecord({
  isRecording,
  setIsRecording,
}: MicRecordProps) {
  const { conversation } = useConversation();

  const { user } = useAuth();

  const [countMicTime, setCountMicTime] = useState(0);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  useEffect(() => {
    if (isRecording) {
      const counter = setInterval(() => {
        setCountMicTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(counter);
    } else {
      setCountMicTime(0);
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: false,
        },
      });

      const mediaRecord = new MediaRecorder(stream);

      setMediaRecorder(mediaRecord);

      mediaRecord.onstop = () => {
        stream.getTracks().map((track) => track.stop());
      };

      mediaRecord.start();
      setIsRecording(true);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecord = async (sendRecord: boolean) => {
    if (mediaRecorder) {
      mediaRecorder.stop();

      setIsRecording(false);

      mediaRecorder.ondataavailable = async (event) => {
        if (sendRecord) {
          const blob = new Blob([event.data], { type: "audio/mpeg" });

          const duration = (await getBlobDuration(blob)).toFixed();

          const storageRef = ref(
            storage,
            `audios/${conversation?.chatId}/${new Date().getTime()}.mp3`
          );

          await uploadBytes(storageRef, blob);

          const fileUrl = await getDownloadURL(storageRef);

          sendAudio(fileUrl, conversation!, user!, duration);
        }
      };
    }
  };

  return (
    <div className={clsx(styles.micRecorder, isRecording && styles.micAnimate)}>
      {isRecording ? (
        <>
          <Button onClick={() => stopRecord(false)}>
            <BiSolidTrashAlt size={28} />
          </Button>

          <p>{formatTime(countMicTime)}</p>

          <Button
            onClick={() => stopRecord(true)}
            className={styles.micRecorderButtonSend}
          >
            <MdSend size={20} />
          </Button>
        </>
      ) : (
        <Button onClick={startRecording}>
          <MdOutlineMic size={28} />
        </Button>
      )}
    </div>
  );
}
