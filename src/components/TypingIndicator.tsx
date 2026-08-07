interface TypingIndicatorProps {
  isDark: boolean;
}

export default function TypingIndicator({ isDark }: TypingIndicatorProps) {
  const dotColor = isDark ? "#d1d5db" : "#6b7280";

  return (
    <div
      className="react-ai-chatbox-typing"
      role="status"
      aria-label="AI is typing"
      style={{ color: dotColor }}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  );
}
