import type { CSSProperties } from "react";
import type { TextareaHTMLAttributes } from "react";

export type ChatTheme = "light" | "dark";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp?: string;
}

export interface AIChatBoxProps {
  showCopyButton?: boolean;
  
  title?: string;
  messages: Message[];
  placeholder?: string;
  onSendMessage?: (message: string) => void;

  sendButtonText?: string;
  showHeader?: boolean;
  showSendButton?: boolean;

  showAvatars?: boolean;
  aiAvatar?: string;
  userAvatar?: string;
  
  theme?: ChatTheme;
  primaryColor?: string;
  width?: string | number;
  height?: string | number;

  disabled?: boolean;
  isTyping?: boolean;

  className?: string;
  style?: CSSProperties;

  showTimestamps?: boolean;
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>

  emptyStateTitle?: string;
  emptyStateDescription?: string;
}