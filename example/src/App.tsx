import { useState } from "react";
import { AIChatBox } from "react-ai-chatkit";
import type { Message } from "react-ai-chatkit";

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you?",
      sender: "ai",
      timestamp: getCurrentTime(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

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

This is a demo response from react-ai-chatbox.`,
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
    <AIChatBox
      title="React AI Chatbox"
      messages={messages}
      theme="dark"
      primaryColor="#7c3aed"
      width="450px"
      height="520px"
      isTyping={isTyping}
      showAvatars={true}
      showTimestamps={true}
      showHeader={true}
      showSendButton={true}
      sendButtonText="Ask AI"
      emptyStateTitle="How can I help?"
      emptyStateDescription="Ask a question to start the conversation."
      onSendMessage={handleSendMessage}
    />
  );
}

export default App;