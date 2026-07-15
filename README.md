# react-ai-chatbox

A reusable React chatbox component for AI assistants, SaaS applications, and chatbot interfaces.

## Installation

```bash
npm install react-ai-chatbox
```

## Usage

```tsx
import { useState } from "react";
import { AIChatBox } from "react-ai-chatbox";

function App() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I am your AI assistant.",
      sender: "ai" as const,
    },
  ]);

  return (
    <AIChatBox
      title="AI Assistant"
      messages={messages}
      onSendMessage={(message) => {
        setMessages((previousMessages) => [
          ...previousMessages,
          {
            id: Date.now().toString(),
            text: message,
            sender: "user",
          },
        ]);
      }}
    />
  );
}

export default App;
```

## Props

| Prop | Type | Required | Description |
|---|---|---:|---|
| `title` | `string` | No | Chatbox heading |
| `messages` | `Message[]` | Yes | Messages displayed in the chatbox |
| `placeholder` | `string` | No | Input placeholder |
| `onSendMessage` | `(message: string) => void` | No | Called when a message is submitted |

## License

MIT

