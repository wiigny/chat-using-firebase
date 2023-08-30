import { ConversationContext } from "@/contexts/ConversationContext";
import { useContext } from "react";

export default function useConversation() {
  return useContext(ConversationContext);
}
