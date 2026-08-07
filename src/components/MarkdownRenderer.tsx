import { Children, isValidElement } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { ExtraProps } from "react-markdown";
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  isDark: boolean;
}

const languagePattern = /language-(\w+)/;

function toCodeString(children: ReactNode): string {
  return Children.toArray(children).map(String).join("");
}

export default function MarkdownRenderer({
  content,
  isDark,
}: MarkdownRendererProps) {
  return (
    <div className="react-ai-chatbox-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            const child = Children.toArray(children)[0];

            if (isValidElement(child) && child.type === "code") {
              const { className, children: codeChildren } = child.props as {
                className?: string;
                children?: ReactNode;
              };
              const match = languagePattern.exec(className ?? "");

              return (
                <CodeBlock
                  code={toCodeString(codeChildren).replace(/\n$/, "")}
                  language={match?.[1] ?? ""}
                  isDark={isDark}
                />
              );
            }

            return <>{children}</>;
          },
          a({
            children,
            href,
            node: _node,
            ...props
          }: AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={href}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
