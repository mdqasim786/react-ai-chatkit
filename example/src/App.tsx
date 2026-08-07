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

This box renders **Markdown**, syntax-highlighted code blocks, lists and more.

Here is a **TypeScript** example:

\`\`\`tsx
function Button({ label }: { label: string }) {
  return <button>{label}</button>;
}
\`\`\`

And a **CSS** example:

\`\`\`css
.button {
  color: white;
  background: #7c3aed;
  border-radius: 8px;
}
\`\`\`

Try these features:

- Send a message with **Enter** (Shift + Enter for a new line)
- Copy a message or a code block with the **copy** button
- Switch between **dark** and **light** themes

> Tip: keep the messages short to see the typing indicator.

Long URLs wrap cleanly: https://github.com/mdqasim786/react-ai-chatkit/blob/main/README.md?tab=readme-ov-file#readme`,
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

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setIsTyping(true);

    window.setTimeout(() => {
      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        text: `You said: **${message}**

Here is a JavaScript example:

\`\`\`js
console.log("Hello from the chat!");
\`\`\`

Some **highlights** of this release:

1. Copy feedback with a check icon
2. Accessible buttons and labels
3. Responsive layout for small screens

> The typing indicator animates while the AI is "thinking".`,
        sender: "ai",
        timestamp: getCurrentTime(),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);

      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
      <button
        type="button"
        onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          cursor: "pointer",
          background: "#f3f4f6",
          fontWeight: 600,
        }}
      >
        Switch to {theme === "dark" ? "light" : "dark"} theme
      </button>

      <AIChatBox
        title="React AI Chatbox"
        messages={messages}
        theme={theme}
        primaryColor="#7c3aed"
        width="450px"
        height="520px"
        isTyping={isTyping}
        showAvatars={true}
        showTimestamps={true}
        showHeader={true}
        showSendButton={true}
        showCopyButton={true}
        sendButtonText="Ask AI"
        emptyStateTitle="How can I help?"
        emptyStateDescription="Ask a question to start the conversation."
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;
