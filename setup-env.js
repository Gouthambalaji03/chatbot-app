const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment for OpenAI API...\n');

const envPath = path.join(__dirname, '.env.local');
const envContent = `# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Instructions:
# 1. Replace 'your_openai_api_key_here' with your actual OpenAI API key
# 2. Get your API key from: https://platform.openai.com/api-keys
# 3. Make sure you have credits in your OpenAI account
# 4. Restart the development server after adding the key

# Example:
# OPENAI_API_KEY=sk-1234567890abcdef1234567890abcdef1234567890abcdef
`;

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file already exists');
  console.log('📝 Please check if your OPENAI_API_KEY is set correctly\n');
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
  console.log('📝 Please edit .env.local and add your OpenAI API key\n');
}

console.log('🚀 Next steps:');
console.log('1. Get your OpenAI API key from: https://platform.openai.com/api-keys');
console.log('2. Edit .env.local and replace "your_openai_api_key_here" with your actual key');
console.log('3. Run: npm run dev');
console.log('4. Test the chatbot with a message\n');

console.log('💡 If you need help:');
console.log('- Check the SETUP.md file for detailed instructions');
console.log('- Visit /api/test to verify your API key is working');
console.log('- Check the browser console for any error messages');
