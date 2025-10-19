# Chatbot Setup Instructions

## Required Environment Variables

To make the chatbot work, you need to set up your OpenAI API key:

### 1. Create Environment File
Create a file named `.env.local` in the root directory of your project.

### 2. Add Your OpenAI API Key
Add the following line to `.env.local`:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 3. Get Your API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the key and replace `your_actual_openai_api_key_here` in the `.env.local` file

### 4. Restart the Development Server
After adding the API key, restart your development server:
```bash
npm run dev
```

## Troubleshooting

If you're still not getting responses:

1. **Check the browser console** for error messages
2. **Verify the API key** is correctly set in `.env.local`
3. **Check the terminal** for server-side error messages
4. **Ensure you have credits** in your OpenAI account

## Example .env.local file:
```
OPENAI_API_KEY=sk-1234567890abcdef1234567890abcdef1234567890abcdef
```
