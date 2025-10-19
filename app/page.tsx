'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { Action, Actions } from '@/components/ai-elements/actions';
import { Fragment, useState, useCallback, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Response } from '@/components/ai-elements/response';
import { CopyIcon, GlobeIcon, PlusIcon, MessageSquareIcon } from 'lucide-react';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';

const models = [
  {
    name: 'GPT 4o',
    value: 'openai/gpt-4o',
  },
  {
    name: 'Deepseek R1',
    value: 'deepseek/deepseek-r1',
  },
];

interface Chat {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[];
  createdAt: Date;
}

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const { messages, sendMessage, status, setMessages } = useChat({
    onError: (error) => {
      console.error('Chat error:', error);
      // Show error message to user
      alert('Error: ' + error.message + '. Please check your OpenAI API key configuration.');
    },
    onFinish: (message) => {
      console.log('Chat finished:', message);
    },
  });

  // Create a new chat
  const createNewChat = useCallback(() => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]);
    setInput('');
  }, [setMessages]);

  // Switch to a specific chat
  const switchToChat = useCallback((chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  }, [chats, setMessages]);

  // Update chat title based on first message
  const updateChatTitle = useCallback((chatId: string, firstMessage: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, title: firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '') }
        : chat
    ));
  }, []);

  // Save messages to current chat
  const saveMessagesToChat = useCallback(() => {
    if (currentChatId && messages.length > 0) {
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...messages] }
          : chat
      ));
      
      // Update title if this is the first user message
      const firstUserMessage = messages.find(m => m.role === 'user');
      if (firstUserMessage && firstUserMessage.parts?.[0] && 'text' in firstUserMessage.parts[0]) {
        updateChatTitle(currentChatId, firstUserMessage.parts[0].text);
      }
    }
  }, [currentChatId, messages, updateChatTitle]);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesToChat();
    }
  }, [messages, saveMessagesToChat]);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    console.log('Sending message to OpenAI API:', message.text);
    console.log('Current model:', model);

    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: message.text || 'Sent with attachments' }],
    }, {
      body: {
        model: model,
        webSearch: webSearch,
      },
    });
    setInput('');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 dark:bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-700">
          <button 
            onClick={createNewChat}
            className="w-full flex items-center gap-3 px-3 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            New chat
          </button>
        </div>
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Recent</div>
            <div className="space-y-1">
              {chats.length === 0 ? (
                <div className="text-gray-500 text-sm px-3 py-2">
                  No conversations yet
                </div>
              ) : (
                chats.map((chat) => (
                  <button 
                    key={chat.id}
                    onClick={() => switchToChat(chat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm truncate ${
                      currentChatId === chat.id 
                        ? 'bg-gray-700 text-white' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <MessageSquareIcon className="w-4 h-4 inline mr-2 flex-shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">ChatGPT</h1>
          </div>
          <div className="flex items-center gap-2">
            <PromptInputModelSelect
              onValueChange={(value) => {
                setModel(value);
              }}
              value={model}
            >
              <PromptInputModelSelectTrigger className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                {models.map((model) => (
                  <PromptInputModelSelectItem key={model.value} value={model.value}>
                    {model.name}
                  </PromptInputModelSelectItem>
                ))}
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full px-6">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquareIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">How can I help you today?</h2>
                <p className="text-gray-500 dark:text-gray-400">Start a new conversation to get started.</p>
              </div>
            </div>
          ) : (
            <Conversation className="h-full">
              <ConversationContent>
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.role === 'assistant' && message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter(
                              (part) => part.type === 'source-url',
                            ).length
                          }
                        />
                        {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                      </Sources>
                    )}
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <Fragment key={`${message.id}-${i}`}>
                              <Message from={message.role as 'user' | 'assistant'}>
                                <MessageContent>
                                  <Response>
                                    {part.text}
                                  </Response>
                                </MessageContent>
                              </Message>
                              {message.role === 'assistant' && i === message.parts.length - 1 && (
                                <Actions className="mt-2">
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                            </Fragment>
                          );
                        case 'reasoning':
                          return (
                            <Reasoning
                              key={`${message.id}-${i}`}
                              className="w-full"
                              isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                ))}
                {status === 'submitted' && <Loader />}
                {status === 'error' && (
                  <div className="text-red-500 text-center py-4">
                    Error: Failed to get response. Please check your OpenAI API key configuration.
                  </div>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto">
            <PromptInput onSubmit={handleSubmit} className="w-full" globalDrop multiple>
              <PromptInputBody>
                <PromptInputAttachments>
                  {(file, index) => <PromptInputAttachment data={{ file, index }} />}
                </PromptInputAttachments>
                <PromptInputTextarea
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  placeholder="Message ChatGPT..."
                  className="min-h-[24px] max-h-[200px] py-3"
                />
              </PromptInputBody>
              <PromptInputToolbar>
                <PromptInputTools>
                  <PromptInputButton
                    variant={webSearch ? 'default' : 'ghost'}
                    onClick={() => setWebSearch(!webSearch)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <GlobeIcon size={16} />
                    <span>Search</span>
                  </PromptInputButton>
                  <PromptInputActionAddAttachments />
                </PromptInputTools>
                <PromptInputSubmit 
                  disabled={!input && !status} 
                  status={status}
                  className="bg-green-600 hover:bg-green-700 text-white"
                />
              </PromptInputToolbar>
            </PromptInput>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotDemo;