import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { AIChatBoxProps } from "./types";
import MarkdownRenderer from "./components/MarkdownRenderer";
import TypingIndicator from "./components/TypingIndicator";
import { copyToClipboard } from "./utils";

const COPY_FEEDBACK_MS = 2000;

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
  showCopyButton = true,
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
  inputProps,
  className,
  style,
}: AIChatBoxProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      160
    )}px`;
  }, [input]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

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

  const handleCopyMessage = async (
    messageId: string,
    text: string
  ): Promise<void> => {
    const ok = await copyToClipboard(text);
    if (!ok) return;

    setCopiedMessageId(messageId);

    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedMessageId(null);
      copyTimerRef.current = null;
    }, COPY_FEEDBACK_MS);
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    inputProps?.onChange?.(event);
    setInput(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    inputProps?.onKeyDown?.(event);

    if (event.defaultPrevented) return;

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const cannotSend = disabled || !input.trim();

  return (
    <div
      className={className}
      data-theme={theme}
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
        aria-relevant="additions"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          overflowY: "auto",
          padding: "16px",
          minWidth: 0,
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
          const isCopied = copiedMessageId === message.id;
          const copyLabel = isCopied ? "Copied" : "Copy message";

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
                minWidth: 0,
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
                  minWidth: 0,
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
                      lineHeight: 1.5,
                      overflowWrap: "anywhere",
                      whiteSpace: isUser ? "pre-wrap" : "normal",
                    }}
                  >
                    {isUser ? (
                      message.text
                    ) : (
                      <MarkdownRenderer
                        content={message.text}
                        isDark={isDark}
                      />
                    )}
                  </div>

                  {showCopyButton && (
                    <button
                      type="button"
                      className="react-ai-chatbox-copy-button react-ai-chatbox-message-copy-button"
                      aria-label={copyLabel}
                      aria-live="polite"
                      title={copyLabel}
                      onClick={() => handleCopyMessage(message.id, message.text)}
                      style={{
                        width: "28px",
                        height: "28px",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                        padding: 0,
                        border: `1px solid ${isCopied ? "#10b981" : colors.border}`,
                        borderRadius: "8px",
                        background: isCopied
                          ? "rgba(16,185,129,0.15)"
                          : colors.inputBackground,
                        color: isCopied ? "#10b981" : colors.mutedText,
                        cursor: "pointer",
                      }}
                    >
                      {isCopied ? (
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
                  )}
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
              maxWidth: "90%",
              minWidth: 0,
            }}
          >
            {showAvatars && (
              aiAvatar ? (
                <img
                  src={aiAvatar}
                  alt="AI avatar"
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
                    background: colors.aiBubble,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  🤖
                </div>
              )
            )}

            <div
              style={{
                padding: "10px 14px",
                borderRadius: "14px",
                background: colors.aiBubble,
              }}
            >
              <TypingIndicator isDark={isDark} />
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
          minWidth: 0,
        }}
      >
        <textarea
          ref={textareaRef}
          className="react-ai-chatbox-textarea"
          {...inputProps}
          value={input}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={placeholder}
          rows={1}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            minWidth: 0,
            resize: "none",
            overflowY: "auto",
            padding: "10px 12px",
            minHeight: "44px",
            maxHeight: "160px",
            border: `1px solid ${colors.border}`,
            borderRadius: "10px",
            outline: "none",
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
            title={sendButtonText}
            style={{
              padding: "10px 14px",
              border: "none",
              borderRadius: "10px",
              background: primaryColor,
              color: "#ffffff",
              fontWeight: 600,
              cursor: cannotSend ? "not-allowed" : "pointer",
              opacity: cannotSend ? 0.5 : 1,
              flexShrink: 0,
            }}
          >
            {sendButtonText}
          </button>
        )}
      </div>
    </div>
  );
}
