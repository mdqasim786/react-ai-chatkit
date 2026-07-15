# react-ai-chatkit

A reusable React chatkit component for AI assistants, SaaS applications, and chatbot interfaces.

## Installation

```bash
npm install react-ai-chatkit
```

## Usage

```tsx
import { useState } from "react";
import { AIChatBox } from "react-ai-chatkit";

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
| `title` | `string` | No | Chatkit heading |
| `messages` | `Message[]` | Yes | Messages displayed in the chatkit |
| `placeholder` | `string` | No | Input placeholder |
| `onSendMessage` | `(message: string) => void` | No | Called when a message is submitted |

## License

MIT

