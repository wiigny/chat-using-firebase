"use client";

import styles from "./styles.module.scss";
import useConversation from "@/hook/useConversation";
import sendMessage from "@/utils/sendMessage";
import useAuth from "@/hook/useAuth";
import { GrEmoji } from "react-icons/gr";
import { KeyboardEvent, useRef, useState } from "react";
import { MdSend } from "react-icons/md";

import Picker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
} from "emoji-picker-react";
import SendImagesInConversation from "./SendImages";
import handleLineBreak from "@/utils/handleLineBreak";
import handleLineTextarea from "@/utils/handleLineTextarea";
import MicRecord from "./MicRecord";
import Button from "@/components/Button";
import Form from "@/components/Form";

export default function FormConversation() {
  const { user } = useAuth();
  const { setNewMessage, newMessage, conversation } = useConversation();

  const [openEmoji, setOpenEmoji] = useState(false);

  const [isRecording, setIsRecording] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.key === "Enter" && event.ctrlKey) {
        handleLineBreak(textareaRef);
      } else {
        event.preventDefault();

        sendMessage(
          newMessage,
          conversation!,
          user!,
          textareaRef,
          setNewMessage
        );
      }
    }
  };

  const addEmoji = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <>
      {openEmoji && !isRecording && (
        <div>
          <Picker
            onEmojiClick={addEmoji}
            width={"100%"}
            height={"320px"}
            previewConfig={{
              showPreview: false,
            }}
            suggestedEmojisMode={SuggestionMode.RECENT}
            emojiStyle={EmojiStyle.GOOGLE}
            autoFocusSearch={false}
          />
        </div>
      )}

      <div className={styles.sendConversation}>
        {!isRecording && (
          <>
            <div>
              <Button type="button" onClick={() => setOpenEmoji(!openEmoji)}>
                <GrEmoji size={28} color={openEmoji ? "#008069" : ""} />
              </Button>

              <SendImagesInConversation />
            </div>

            <Form>
              <textarea
                ref={textareaRef}
                onInput={() => handleLineTextarea(textareaRef)}
                placeholder="Message"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
            </Form>
          </>
        )}

        {newMessage ? (
          <Button
            onClick={() =>
              sendMessage(
                newMessage,
                conversation!,
                user!,
                textareaRef,
                setNewMessage
              )
            }
          >
            <MdSend size={24} />
          </Button>
        ) : (
          <MicRecord
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        )}
      </div>
    </>
  );
}
