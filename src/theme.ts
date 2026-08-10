import type { ChatTheme } from "./types";

export interface ChatColors {
  background: string;
  text: string;
  border: string;
  aiBubble: string;
  inputBackground: string;
  mutedText: string;
  success: string;
}

export function getChatColors(theme: ChatTheme): ChatColors {
  const isDark = theme === "dark";

  return {
    background: isDark ? "#111827" : "#ffffff",
    text: isDark ? "#f9fafb" : "#111827",
    border: isDark ? "#374151" : "#e5e7eb",
    aiBubble: isDark ? "#374151" : "#f3f4f6",
    inputBackground: isDark ? "#1f2937" : "#ffffff",
    mutedText: isDark ? "#9ca3af" : "#6b7280",
    success: "#10b981",
  };
}