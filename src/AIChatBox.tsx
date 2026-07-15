import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { AIChatBoxProps } from "./types";
import ReactMarkdown from "react-markdown";

export default function AIChatBox({
  title = "React AI Chatbox",
  messages,
  placeholder = "Type your message...",
  onSendMessage,
  sendButtonText = "Ask AI",
  showHeader = true,
  showSendButton = true,
  showAvatars = true,
  showTimestamps = true,
  emptyStateTitle = "Start a conversation",
  emptyStateDescription = "Send a message to begin chatting.",
  aiAvatar,
  userAvatar,
  theme = "dark",
  primaryColor = "#7c3aed",
  width = "450px",
  height = "520px",
  disabled = false,
  isTyping = false,
  className,
  style,
}: AIChatBoxProps) {
  const [input, setInput] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isDark = theme === "dark";
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, isTyping]);

  const colors = {
    background: isDark ? "#111827" : "#ffffff",
    text: isDark ? "#f9fafb" : "#111827",
    border: isDark ? "#374151" : "#e5e7eb",
    aiBubble: isDark ? "#374151" : "#f3f4f6",
    inputBackground: isDark ? "#1f2937" : "#ffffff",
    mutedText: isDark ? "#9ca3af" : "#6b7280",
  };

  const handleSend = () => {
    const message = input.trim();

    if (!message || disabled) return;

    onSendMessage?.(message);
    setInput("");
  };

  const handleCopyMessage = async (messageId: string, text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);

    window.setTimeout(() => {
      setCopiedMessageId(null);
    }, 1500);
  } catch {
    setCopiedMessageId(null);
  }
};

const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
};

  const cannotSend = disabled || !input.trim();

  return (
    <div
      className={className}
      style={{
        width,
        height,
        maxWidth: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        background: colors.background,
        color: colors.text,
        fontFamily: "Arial, sans-serif",
        ...style,
      }}
    >
{showHeader && (
  <header
    style={{
      padding: "16px",
      borderBottom: `1px solid ${colors.border}`,
      fontSize: "16px",
      fontWeight: 700,
    }}
  >
    {title}
  </header>
)}

      <div 
        className="react-ai-chatbox-messages"
        role="log"
        aria-live="polite"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "auto",
          padding: "16px",
        }}
      >
{messages.length === 0 && !isTyping && (
  <div
    style={{
      flex: 1,
      display: "grid",
      placeItems: "center",
      textAlign: "center",
      padding: "24px",
    }}
  >
    <div>
      <div
        style={{
          width: "48px",
          height: "48px",
          margin: "0 auto 12px",
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: colors.aiBubble,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="7" width="16" height="12" rx="3" />
          <path d="M9 3h6" />
          <path d="M12 3v4" />
          <circle cx="9" cy="13" r="1" fill="currentColor" />
          <circle cx="15" cy="13" r="1" fill="currentColor" />
          <path d="M9 16h6" />
        </svg>
      </div>

      <div
        style={{
          fontSize: "15px",
          fontWeight: 700,
          marginBottom: "6px",
        }}
      >
        {emptyStateTitle}
      </div>

      <div
        style={{
          maxWidth: "240px",
          fontSize: "13px",
          lineHeight: 1.5,
          color: colors.mutedText,
        }}
      >
        {emptyStateDescription}
      </div>
    </div>
  </div>
)}

{messages.map((message) => {
  const isUser = message.sender === "user";
  const avatar = isUser ? userAvatar : aiAvatar;

  return (
    <div
      key={message.id}
      className="react-ai-chatbox-message"
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: "8px",
        maxWidth: "100%",
      }}
    >
      {showAvatars && (
        avatar ? (
          <img
            src={avatar}
            alt={isUser ? "User avatar" : "AI avatar"}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              background: isUser ? primaryColor : colors.aiBubble,
              color: isUser ? "#ffffff" : colors.text,
              fontSize: "11px",
              fontWeight: 700,
              border: `1px solid ${colors.border}`,
            }}
          >
            {isUser ? (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
) : (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="7" width="16" height="12" rx="3" />
    <path d="M9 3h6" />
    <path d="M12 3v4" />
    <circle cx="9" cy="13" r="1" fill="currentColor" />
    <circle cx="15" cy="13" r="1" fill="currentColor" />
    <path d="M9 16h6" />
  </svg>
)}
          </div>
        )
      )}

<div
  className="react-ai-chatbox-message-group"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: isUser ? "flex-end" : "flex-start",
    gap: "4px",
    maxWidth: "calc(100% - 40px)",
    width: isUser ? "auto" : "100%",
  }}
>
<div
  style={{
    position: "relative",
    display: "flex",
    flexDirection: isUser ? "row-reverse" : "row",
    alignItems: "center",
    gap: "4px",
    maxWidth: "100%",
    minWidth: 0,
  }}
>
<div
  style={{
    width: isUser ? "fit-content" : "100%",
    maxWidth: "100%",
     minWidth: 0,
    padding: "10px 12px",
    borderRadius: "14px",
    background: isUser ? primaryColor : colors.aiBubble,
    color: isUser ? "#ffffff" : colors.text,
    fontSize: "14px",
    lineHeight: 1.4,
    overflowWrap: "anywhere",
    whiteSpace: isUser ? "pre-wrap" : "normal",
  }}
>
  {isUser ? (
    message.text
  ) : (
    <div className="react-ai-chatbox-markdown">
      <ReactMarkdown>
        {message.text}
      </ReactMarkdown>
    </div>
  )}
</div>

  <button
    type="button"
    className="react-ai-chatbox-copy-button"
    aria-label="Copy message"
    title="Copy message"
    onClick={() => handleCopyMessage(message.id, message.text)}
    style={{
      width: "28px",
      height: "28px",
      display: "grid",
      placeItems: "center",
      flexShrink: 0,
      padding: 0,
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      background: colors.inputBackground,
      color: colors.mutedText,
      cursor: "pointer",
    }}
  >
    {copiedMessageId === message.id ? (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    ) : (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="10" height="10" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    )}
  </button>
</div>

  {showTimestamps && message.timestamp && (
    <span
      style={{
        fontSize: "11px",
        color: colors.mutedText,
        paddingInline: "4px",
        marginTop: "2px",
      }}
    >
      {message.timestamp}
    </span>
  )}
</div>
    </div>
  );
})}

{isTyping && (
  <div
    style={{
      alignSelf: "flex-start",
      display: "flex",
      alignItems: "flex-end",
      gap: "8px",
    }}
  >
    {showAvatars && (
      <div
        aria-hidden="true"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          background: colors.aiBubble,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="7" width="16" height="12" rx="3" />
          <path d="M9 3h6" />
          <path d="M12 3v4" />
          <circle cx="9" cy="13" r="1" fill="currentColor" />
          <circle cx="15" cy="13" r="1" fill="currentColor" />
          <path d="M9 16h6" />
        </svg>
      </div>
    )}

    <div
      className="react-ai-chatbox-typing"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "12px 14px",
        borderRadius: "14px",
        background: colors.aiBubble,
      }}
      aria-label="AI is typing"
    >
      <span />
      <span />
      <span />
    </div>
  </div>
)}
          <div ref={messagesEndRef} />
      </div>

<div
  className="react-ai-chatbox-footer"
  style={{
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
    padding: "12px",
    borderTop: `1px solid ${colors.border}`,
  }}
>
<textarea
  className="react-ai-chatbox-textarea"
  value={input}
  disabled={disabled}
  placeholder={placeholder}
  aria-label={placeholder}
  rows={1}
  onChange={(event) => setInput(event.target.value)}
  onKeyDown={handleKeyDown}
  style={{
    flex: 1,
    minWidth: 0,
    minHeight: "42px",
    maxHeight: "110px",
    padding: "10px 12px",
    border: `1px solid ${colors.border}`,
    borderRadius: "10px",
    outline: "none",
    resize: "none",
    overflowY: "auto",
    boxSizing: "border-box",
    background: colors.inputBackground,
    color: colors.text,
    fontFamily: "inherit",
    fontSize: "14px",
    lineHeight: 1.4,
  }}
/>
        
{showSendButton && (
  <button
    type="button"
    className="react-ai-chatbox-send-button"
    disabled={cannotSend}
    onClick={handleSend}
    style={{
      padding: "10px 14px",
      border: "none",
      borderRadius: "10px",
      background: primaryColor,
      color: "#ffffff",
      fontWeight: 600,
      cursor: cannotSend ? "not-allowed" : "pointer",
      opacity: cannotSend ? 0.5 : 1,
    }}
  >
    {sendButtonText}
  </button>
)}
      </div>
    </div>
  );
}