import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface MessagePart {
  type: string;
  text: string;
}

interface UIMessage {
  role: 'user' | 'assistant' | 'system';
  parts?: MessagePart[];
  content?: string;
  id?: string;
}

export async function POST(req: Request) {
  const {
    messages,
    model,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch?: boolean;
  } = await req.json();

  // Configure the AI provider
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Select the model to use
  const modelName = model.split('/')[1] || 'gpt-4o';

  // Convert UIMessage format to the format expected by streamText
  const convertedMessages = messages.map((msg) => {
    if (msg.parts) {
      // If message has parts, extract text from parts
      const textParts = msg.parts.filter(part => part.type === 'text');
      const content = textParts.map(part => part.text).join('\n');
      return {
        role: msg.role,
        content: content,
      };
    }
    // If message already has content, use it
    return {
      role: msg.role,
      content: msg.content || '',
    };
  });

  const result = streamText({
    model: openai(modelName),
    messages: convertedMessages,
    system:
      'You are a helpful assistant that can answer questions and help with tasks',
  });

  return result.toTextStreamResponse();
}