import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language: string;
  isDark: boolean;
}

export default function CodeBlock({ code, language, isDark }: CodeBlockProps) {
  const label = language || "text";

  return (
    <div
      className="react-ai-chatbox-code-block"
      style={{
        position: "relative",
        marginTop: "10px",
        marginBottom: "10px",
        borderRadius: "12px",
        overflow: "hidden",
        border: isDark ? "1px solid #374151" : "1px solid #d1d5db",
      }}
    >
      <div
        className="react-ai-chatbox-code-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
          padding: "6px 8px 6px 12px",
          background: isDark ? "#1f2937" : "#f3f4f6",
          borderBottom: isDark ? "1px solid #374151" : "1px solid #d1d5db",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            color: isDark ? "#9ca3af" : "#4b5563",
          }}
        >
          {label}
        </span>

        <CopyButton text={code} />
      </div>

      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "13px",
          maxWidth: "100%",
          boxSizing: "border-box",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
