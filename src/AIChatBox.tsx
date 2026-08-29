import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { AIChatBoxProps } from "./types";
import { getChatColors } from "./theme";
import Avatar from "./components/Avatar";
import MarkdownRenderer from "./components/MarkdownRenderer";
import MessageActions from "./components/MessageActions";
import TypingIndicator from "./components/TypingIndicator";
import { RobotIcon, UserIcon } from "./components/Icons";
import { copyToClipboard } from "./utils";

const COPY_FEEDBACK_MS = 2000;

export default function AIChatBox({
  title = "React AI Chatbox",
  subtitle,
  header,
  headerActions,
  messages,
  placeholder = "Type your message...",
  onSendMessage,
  sendButtonText = "Ask AI",
  sendButtonContent,
  sendButtonLabel = "Send",
  isSending = false,
  showHeader = true,
  showSendButton = true,
  showAvatars = true,
  showTimestamps = true,
  showCopyButton = true,
  emptyStateTitle = "Start a conversation",
  emptyStateDescription = "Send a message to begin chatting.",
  emptyStateContent,
  aiAvatar,
  userAvatar,
  aiAvatarFallback,
  userAvatarFallback,
  aiMessageClassName,
  aiMessageStyle,
  userMessageClassName,
  userMessageStyle,
  theme = "dark",
  primaryColor = "#7c3aed",
  width = "450px",
  height = "520px",
  disabled = false,
  isTyping = false,
  inputProps,
  inputClassName,
  inputStyle,
  inputContainerClassName,
  inputContainerStyle,
  maxInputLength,
  maxLength,
  autoFocus = false,
  timestampFormatter,
  className,
  style,
}: AIChatBoxProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const isDark = theme === "dark";
  const colors = getChatColors(theme);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
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

  const handleSend = () => {
    const message = input.trim();

    if (!message || disabled || isSending || isTyping) return;

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

  const cannotSend = disabled || isSending || isTyping || !input.trim();
  const isBusy = disabled || isTyping;

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
          className="react-ai-chatbox-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "16px",
            borderBottom: `1px solid ${colors.border}`,
            minWidth: 0,
          }}
        >
          {header ? (
            <div style={{ minWidth: 0, width: "100%" }}>{header}</div>
          ) : (
            <>
              <div style={{ minWidth: 0 }}>
                <div
                  className="react-ai-chatbox-header-title"
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {title}
                </div>
                {subtitle && (
                  <div
                    className="react-ai-chatbox-header-subtitle"
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      color: colors.mutedText,
                      marginTop: "2px",
                    }}
                  >
                    {subtitle}
                  </div>
                )}
              </div>
              {headerActions && (
                <div
                  className="react-ai-chatbox-header-actions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  {headerActions}
                </div>
              )}
            </>
          )}
        </header>
      )}

      <div
        ref={messagesContainerRef}
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
            className="react-ai-chatbox-empty-state"
            style={{
              flex: 1,
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              padding: "24px",
              minWidth: 0,
            }}
          >
            {emptyStateContent ? (
              emptyStateContent
            ) : (
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
                  <RobotIcon size={22} />
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
            )}
          </div>
        )}

        {messages.map((message) => {
          const isUser = message.sender === "user";
          const isCopied = copiedMessageId === message.id;
          const copyLabel = isCopied ? "Copied!" : "Copy";
          const messageClassName = isUser
            ? userMessageClassName
            : aiMessageClassName;
          const messageStyle = isUser ? userMessageStyle : aiMessageStyle;

          return (
            <div
              key={message.id}
              className={["react-ai-chatbox-message", messageClassName]
                .filter(Boolean)
                .join(" ")}
              style={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                display: "flex",
                flexDirection: isUser ? "row-reverse" : "row",
                alignItems: "flex-start",
                gap: "8px",
                maxWidth: "100%",
                minWidth: 0,
                ...messageStyle,
              }}
            >
              {showAvatars && (
                <Avatar
                  src={isUser ? userAvatar : aiAvatar}
                  alt={isUser ? "User avatar" : "AI avatar"}
                  fallback={
                    isUser
                      ? (userAvatarFallback ?? <UserIcon />)
                      : (aiAvatarFallback ?? <RobotIcon />)
                  }
                  background={isUser ? primaryColor : colors.aiBubble}
                  color={isUser ? "#ffffff" : colors.text}
                  border={colors.border}
                />
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
                    <MessageActions
                      copied={isCopied}
                      copyLabel={copyLabel}
                      colors={colors}
                      onCopy={() => handleCopyMessage(message.id, message.text)}
                    />
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
                    {timestampFormatter
                      ? timestampFormatter(message.timestamp)
                      : message.timestamp}
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
              <Avatar
                src={aiAvatar}
                alt="AI avatar"
                fallback={aiAvatarFallback ?? <RobotIcon />}
                background={colors.aiBubble}
                color={colors.text}
                border={colors.border}
              />
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
      </div>

      <div
        className={["react-ai-chatbox-footer", inputContainerClassName]
          .filter(Boolean)
          .join(" ")}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          padding: "12px",
          borderTop: `1px solid ${colors.border}`,
          minWidth: 0,
          ...inputContainerStyle,
        }}
      >
        <textarea
          ref={textareaRef}
          className={["react-ai-chatbox-textarea", inputClassName]
            .filter(Boolean)
            .join(" ")}
          {...inputProps}
          value={input}
          autoFocus={autoFocus}
          disabled={isBusy}
          placeholder={placeholder}
          aria-label={placeholder}
          rows={1}
          maxLength={maxLength ?? maxInputLength}
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
            cursor: isBusy ? "not-allowed" : "text",
            opacity: isBusy ? 0.6 : 1,
            ...inputStyle,
          }}
        />

        {showSendButton && (
          <button
            type="button"
            className="react-ai-chatbox-send-button"
            disabled={cannotSend}
            onClick={handleSend}
            title={sendButtonLabel}
            aria-label={isSending ? "Sending..." : sendButtonLabel}
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
            {isSending ? (
              <span
                className="react-ai-chatbox-send-spinner"
                aria-hidden="true"
              />
            ) : (
              sendButtonContent ?? sendButtonText
            )}
          </button>
        )}
      </div>
    </div>
  );
}
