import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  isDark: boolean;
}

export default function MarkdownRenderer({
  content,
  isDark,
}: MarkdownRendererProps) {

console.log("MarkdownRenderer is rendering");

  return (
    <ReactMarkdown
    remarkPlugins={[remarkGfm]}
      components={{
        code({ children, className, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          if (match) {
            return (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={match[1]}
                isDark={isDark}
              />
            );
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}