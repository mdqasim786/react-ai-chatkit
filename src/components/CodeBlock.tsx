import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language: string;
  isDark: boolean;
}

export default function CodeBlock({
  code,
  language,
  isDark,
}: CodeBlockProps) {

    console.log("CodeBlock rendered");
    
  return (
    <div
      style={{
        position: "relative",
        marginTop: "10px",
        marginBottom: "10px",
        borderRadius: "12px",
        overflow: "hidden",
        border: isDark ? "1px solid #374151" : "1px solid #d1d5db",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          background: isDark ? "#1f2937" : "#f3f4f6",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {language || "text"}
        </span>

        <CopyButton text={code} />
      </div>

      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "14px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}