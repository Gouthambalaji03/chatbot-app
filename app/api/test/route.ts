export async function GET() {
  const hasApiKey = !!process.env.OPENAI_API_KEY;
  
  return new Response(JSON.stringify({
    hasApiKey,
    message: hasApiKey 
      ? 'OpenAI API key is configured' 
      : 'OpenAI API key is missing. Please set OPENAI_API_KEY in your environment variables.'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
