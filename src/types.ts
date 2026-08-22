import type { CSSProperties, ReactNode, TextareaHTMLAttributes } from "react";

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
  subtitle?: string;
  header?: ReactNode;
  headerActions?: ReactNode;
  messages: Message[];
  placeholder?: string;
  onSendMessage?: (message: string) => void;

  sendButtonText?: string;
  sendButtonContent?: ReactNode;
  isSending?: boolean;
  showHeader?: boolean;
  showSendButton?: boolean;

  showAvatars?: boolean;
  aiAvatar?: string;
  userAvatar?: string;
  aiAvatarFallback?: ReactNode;
  userAvatarFallback?: ReactNode;

  aiMessageClassName?: string;
  aiMessageStyle?: CSSProperties;
  userMessageClassName?: string;
  userMessageStyle?: CSSProperties;

  theme?: ChatTheme;
  primaryColor?: string;
  width?: string | number;
  height?: string | number;

  disabled?: boolean;
  isTyping?: boolean;

  className?: string;
  style?: CSSProperties;

  showTimestamps?: boolean;
  timestampFormatter?: (timestamp: string) => string;
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  inputContainerClassName?: string;
  inputContainerStyle?: CSSProperties;
  maxInputLength?: number;
  maxLength?: number;
  autoFocus?: boolean;

  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateContent?: ReactNode;
}