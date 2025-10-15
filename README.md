# AI Chatbot with Next.js

An advanced chatbot application built with Next.js, AI SDK, and AI Elements. Features include reasoning display, web search with citations, model selection, and file attachments.

## Features

- **Multiple AI Models**: Switch between GPT-4o and DeepSeek R1
- **Web Search**: Enable web search for up-to-date information with source citations
- **Reasoning Display**: View the model's reasoning process (when supported)
- **File Attachments**: Upload and send files with your messages
- **Real-time Streaming**: See responses as they're generated
- **Markdown Support**: Rich text formatting in responses
- **Copy & Regenerate**: Easily copy responses or regenerate them

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or update the `.env.local` file in the root directory:

```env
# Required: Add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here

# Optional: For AI Gateway
AI_GATEWAY_API_KEY=your_ai_gateway_key_here

# Optional: For DeepSeek model
DEEPSEEK_API_KEY=your_deepseek_key_here
```

To get an API key:
- **OpenAI**: Visit [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **AI Gateway**: Visit [Vercel AI Gateway](https://vercel.com/ai/api-keys)

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
chatbot-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API route handler
│   ├── globals.css               # Global styles & theme
│   └── page.tsx                  # Main chat interface
├── components/
│   ├── ai-elements/              # Custom AI UI components
│   │   ├── conversation.tsx      # Chat conversation container
│   │   ├── message.tsx           # Message bubbles
│   │   ├── prompt-input.tsx      # Input with attachments
│   │   ├── response.tsx          # Markdown response renderer
│   │   ├── reasoning.tsx         # Reasoning display
│   │   ├── sources.tsx           # Web search sources
│   │   ├── actions.tsx           # Action buttons
│   │   └── loader.tsx            # Loading indicator
│   └── ui/
│       └── button.tsx            # Base button component
├── lib/
│   └── utils.ts                  # Utility functions
└── .env.local                    # Environment variables
```

## Usage

1. **Start Chatting**: Type your message in the input box at the bottom
2. **Select Model**: Choose between GPT-4o or DeepSeek R1 from the dropdown
3. **Enable Web Search**: Click the "Search" button to search the web for information
4. **Add Attachments**: Click the menu button (⋯) and select "Add attachments"
5. **Copy Response**: Click the copy icon on any assistant message
6. **Regenerate**: Click the refresh icon to regenerate the last response

## Customization

### Adding More Models

Edit [app/page.tsx](app/page.tsx:48-57):

```typescript
const models = [
  {
    name: 'GPT 4o',
    value: 'openai/gpt-4o',
  },
  {
    name: 'Your Model',
    value: 'provider/model-name',
  },
];
```

### Modifying Theme Colors

Edit [app/globals.css](app/globals.css) to customize colors:

```css
:root {
  --primary: #0f172a;
  --secondary: #f1f5f9;
  /* Add more colors */
}
```

### Changing System Prompt

Edit [app/api/chat/route.ts](app/api/chat/route.ts:30):

```typescript
system: 'Your custom system prompt here'
```

## Troubleshooting

### "API key not found" error
Make sure you've added your API key to `.env.local` and restarted the dev server.

### Components not styling correctly
Ensure all dependencies are installed: `npm install`

### File attachments not working
Check browser console for errors. File handling requires proper MIME type support.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **AI SDK** - Vercel's AI SDK for streaming responses
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **React Markdown** - Markdown rendering
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Icon library

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## Deploy on Vercel

The easiest way to deploy your chatbot is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
