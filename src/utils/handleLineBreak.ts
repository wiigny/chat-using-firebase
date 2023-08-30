import { RefObject } from "react";
import handleLineTextarea from "./handleLineTextarea";

const handleLineBreak = (ref: RefObject<HTMLTextAreaElement>) => {
  if (ref.current) {
    const textarea = ref.current;
    const caretPos = textarea.selectionStart;
    const text = textarea.value;
    const newText =
      text.substring(0, caretPos) + "\n" + text.substring(caretPos);
    textarea.value = newText;

    handleLineTextarea(ref);
  }
};

export default handleLineBreak;
