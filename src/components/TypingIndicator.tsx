interface TypingIndicatorProps {
  isDark: boolean;
}

export default function TypingIndicator({
  isDark,
}: TypingIndicatorProps) {
  const dotColor = isDark ? "#d1d5db" : "#6b7280";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "6px 2px",
      }}
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "999px",
            background: dotColor,
            animation: `react-ai-chatbox-bounce 1.4s infinite`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}