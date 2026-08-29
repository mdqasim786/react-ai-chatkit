import { useState } from "react";
import { AIChatBox } from "react-ai-chatkit";
import type { ChatTheme, Message } from "react-ai-chatkit";

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const welcomeMessage: Message = {
  id: "1",
  text: `# Welcome to React AI ChatKit

This box renders **Markdown**, syntax-highlighted code blocks and tables.

Here is a **TypeScript** example:

\`\`\`tsx
function Button({ label }: { label: string }) {
  return <button>{label}</button>;
}
\`\`\`

And a small table:

| Feature   | Status |
| --------- | ------ |
| Markdown  | ✅     |
| Copy      | ✅     |

> Tip: press **Enter** to send, **Shift + Enter** for a new line.

Try switching the theme with the button in the header.`,
  sender: "ai",
  timestamp: getCurrentTime(),
};

function App() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<ChatTheme>("dark");

  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: getCurrentTime(),
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setIsTyping(true);

    window.setTimeout(() => {
      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        text: `You said: **${message}**

\`\`\`js
console.log("Hello from the chat!");
\`\`\`

- Copy this message or the code block
- Watch the typing indicator and the send button spinner`,
        sender: "ai",
        timestamp: getCurrentTime(),
      };

      setMessages((previousMessages) => [...previousMessages, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AIChatBox
      title="React AI Chatbox"
      subtitle="Customization demo"
      messages={messages}
      theme={theme}
      primaryColor={theme === "dark" ? "#8b5cf6" : "#7c3aed"}
      width="450px"
      height="540px"
      isTyping={isTyping}
      isSending={isTyping}
      showAvatars
      showTimestamps
      showHeader
      showSendButton
      showCopyButton
      autoFocus
      aiAvatarFallback={<span>🤖</span>}
      userAvatarFallback={<span>🙂</span>}
      emptyStateTitle="How can I help?"
      emptyStateDescription="Ask a question to start the conversation."
      placeholder="Type a message (max 200)..."
      maxLength={200}
      sendButtonText="Send"
      sendButtonLabel="Send message"
      sendButtonContent={
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22l-4-9-9-4z" />
        </svg>
      }
      headerActions={
        <button
          type="button"
          onClick={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid rgba(128,128,128,0.4)",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            background: "transparent",
            color: "inherit",
          }}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      }
      onSendMessage={handleSendMessage}
    />
  );
}

export default App;