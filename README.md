# 🤖 React AI ChatKit

> A customizable React + TypeScript chat component for AI assistants, SaaS applications, internal tools, and chatbot interfaces.

[![npm version](https://img.shields.io/npm/v/react-ai-chatkit)](https://www.npmjs.com/package/react-ai-chatkit)
[![npm downloads](https://img.shields.io/npm/dm/react-ai-chatkit)](https://www.npmjs.com/package/react-ai-chatkit)
[![License](https://img.shields.io/npm/l/react-ai-chatkit)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mdqasim786/react-ai-chatkit?style=social)](https://github.com/mdqasim786/react-ai-chatkit)

---

## 📸 Preview

<p align="center">
  <img src="./assets/preview.png" alt="React AI ChatKit Preview" width="900" />
</p>

---

## ✨ Features

- 🎨 Light & Dark themes
- 🎨 Custom primary color
- 🤖 AI & User avatars
- 💬 Modern chat interface
- 📝 Markdown rendering
- 📄 Syntax highlighted code blocks
- 📋 Copy message button
- ⌨️ Animated typing indicator
- ⏰ Message timestamps
- 📱 Responsive design
- ⚡ TypeScript support
- 🎯 Highly customizable

---

# 📦 Installation

```bash
npm install react-ai-chatkit
```

or

```bash
yarn add react-ai-chatkit
```

or

```bash
pnpm add react-ai-chatkit
```

---

# 🚀 Quick Start

```tsx
import { AIChatBox } from "react-ai-chatkit";
import type { Message } from "react-ai-chatkit";

const messages: Message[] = [
  {
    id: "1",
    text: "Hello! How can I help you?",
    sender: "ai",
  },
];

export default function App() {
  return (
    <AIChatBox
      messages={messages}
      onSendMessage={(message) => console.log(message)}
    />
  );
}
```

---

# 💡 Why React AI ChatKit?

Building AI chat interfaces from scratch means repeatedly implementing the same features:

- Markdown rendering
- Code blocks
- Copy buttons
- Typing indicators
- Responsive layouts
- Theme support

React AI ChatKit provides these out of the box so you can focus on your AI application instead of rebuilding chat UI.

Perfect for:

- AI SaaS products
- ChatGPT-style applications
- Internal AI tools
- Customer support bots
- AI assistants
- LLM interfaces

---

# ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| messages | Message[] | Required | Chat messages |
| onSendMessage | (message: string) => void | Required | Called when a message is sent |
| title | string | `"React AI ChatKit"` | Header title |
| theme | `"light"` \| `"dark"` | `"dark"` | Theme |
| primaryColor | string | `#7c3aed` | Primary accent color |
| width | string | `"450px"` | Component width |
| height | string | `"520px"` | Component height |
| placeholder | string | `"Type your message..."` | Input placeholder |
| disabled | boolean | `false` | Disable input |
| isTyping | boolean | `false` | Show typing indicator |
| showHeader | boolean | `true` | Show header |
| showAvatars | boolean | `true` | Show avatars |
| showCopyButton | boolean | `true` | Show copy button |
| showSendButton | boolean | `true` | Show send button |
| showTimestamps | boolean | `true` | Show timestamps |

---

# 🎨 Customization

```tsx
<AIChatBox
  title="AI Assistant"
  theme="dark"
  primaryColor="#6366f1"
  width="500px"
  height="600px"
  showHeader
  showAvatars
  showCopyButton
  showTimestamps
/>
```

---

# 📄 Markdown Example

````tsx
const aiMessage = {
  sender: "ai",
  text: `
# Welcome

Here is some code:

\`\`\`tsx
function Button() {
  return <button>Hello</button>;
}
\`\`\`
`,
};
