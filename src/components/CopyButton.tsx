import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "../utils";

interface CopyButtonProps {
  text: string;
}

const COPIED_RESET_MS = 2000;

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (!ok) return;

    setCopied(true);
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimerRef.current = null;
    }, COPIED_RESET_MS);
  };

  const label = copied ? "Copied" : "Copy code";

  return (
    <button
      type="button"
      className="react-ai-chatbox-copy-button react-ai-chatbox-code-copy-button"
      aria-label={label}
      aria-live="polite"
      title={label}
      onClick={handleCopy}
      style={{
        width: "28px",
        height: "28px",
        border: "1px solid",
        background: "transparent",
        cursor: "pointer",
        color: copied ? "#10b981" : undefined,
        borderColor: copied ? "#10b981" : undefined,
      }}
    >
      {copied ? (
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
  );
}
