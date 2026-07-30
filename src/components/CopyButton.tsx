import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({
  text,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        padding: "6px 10px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}