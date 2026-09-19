import type { ChatColors } from "../theme";
import { CheckIcon, CopyIcon, RefreshIcon } from "./Icons";

interface MessageActionsProps {
  copied: boolean;
  copyLabel: string;
  colors: ChatColors;
  onCopy: () => void;
  onRegenerate?: () => void;
  regenerateLabel?: string;
}

export default function MessageActions({
  copied,
  copyLabel,
  colors,
  onCopy,
  onRegenerate,
  regenerateLabel = "Regenerate",
}: MessageActionsProps) {
  return (
    <div
      className="react-ai-chatbox-message-actions"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        flexShrink: 0,
      }}
    >
      <button
        type="button"
        className="react-ai-chatbox-copy-button react-ai-chatbox-message-copy-button"
        aria-label={copyLabel}
        aria-live="polite"
        title={copyLabel}
        onClick={onCopy}
        style={{
          width: "28px",
          height: "28px",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          padding: 0,
          border: `1px solid ${copied ? colors.success : colors.border}`,
          borderRadius: "8px",
          background: copied
            ? "rgba(16,185,129,0.15)"
            : colors.inputBackground,
          color: copied ? colors.success : colors.mutedText,
          cursor: "pointer",
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      {onRegenerate && (
        <button
          type="button"
          className="react-ai-chatbox-copy-button react-ai-chatbox-message-copy-button"
          aria-label={regenerateLabel}
          title={regenerateLabel}
          onClick={onRegenerate}
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
          <RefreshIcon />
        </button>
      )}
    </div>
  );
}
