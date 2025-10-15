import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, model, webSearch } = body;

  // Configure the AI provider based on the model
  // You'll need to set up your API keys in .env.local
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY,
  });

  // Select the model to use
  const selectedModel = webSearch ? 'gpt-4o' : model.split('/')[1] || 'gpt-4o';

  const result = streamText({
    model: openai(selectedModel),
    messages: messages,
    system:
      'You are a helpful assistant that can answer questions and help with tasks',
  });

  return result.toTextStreamResponse();
}
