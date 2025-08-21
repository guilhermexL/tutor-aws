'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle, CheckCircle, BrainCircuit, Home, Linkedin } from 'lucide-react';

interface Message {
  type: 'user' | 'bot' | 'error';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'error'>('checking');
  const [currentPage, setCurrentPage] = useState<'chat' | 'settings'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll para o final das mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Verificar status da API
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await fetch('http://localhost:8080/health');
      if (response.ok) {
        setApiStatus('online');
      } else {
        setApiStatus('error');
      }
    } catch (error) {
      setApiStatus('error');
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = { 
      type: 'user', 
      content: inputText, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Dados recebidos da API:", data); 

        const botMessage: Message = {
          type: 'bot',
          content: data.response ? String(data.response) : 'Sem resposta do LLM.', 
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Erro na resposta da API');
      }
    } catch (error) {
      const errorMessage: Message = {
        type: 'error',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Verifique se a API está rodando.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'online': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Loader2 className="w-4 h-4 animate-spin" />;
    }
  };

  const renderSettingsPage = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <BrainCircuit className="w-16 h-16 mx-auto mb-4 text-purple-400" />
        <h2 className="text-2xl font-bold mb-4">Motivações</h2>
        <p className="text-white/60 mb-8">A ideia de projeto é aproximar os estudos das certificações AWS para todos.</p>
        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">Participantes</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span>Danilo Dias</span>
              <a 
                href="https://www.linkedin.com/in/danilo-dias-biodev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-white"/>
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Guilherme Santos</span>
              <a 
                href="https://www.linkedin.com/in/guilhermee-santos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-white"/>
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Ludy Mila Guimarães</span>
              <a 
                href="https://www.linkedin.com/in/ludymilaguimar%C3%A3es13/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-white"/>
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>José Alan</span>
              <a 
                href="https://www.linkedin.com/in/alan-pires-engenharia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-white"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChatPage = () => (
    <>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-white/60 mt-20">
            <Bot className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h2 className="text-xl font-semibold mb-2">Bem-vindo ao seu Tutor!</h2>
            <p>Digite uma mensagem para começar a conversar</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type !== 'user' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'
              }`}>
                {message.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
            )}
            
            <div className={`max-w-[70%] p-4 rounded-2xl ${
              message.type === 'user' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : message.type === 'error'
                ? 'bg-red-500/10 border border-red-500/20 text-red-200'
                : 'bg-white/10 backdrop-blur-sm text-white border border-white/10'
            }`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-60 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white border border-white/10 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>O tutor está pensando...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 backdrop-blur-lg border-t border-white/10">
        <div className="flex gap-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            rows={3}
            disabled={isLoading || apiStatus === 'error'}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading || apiStatus === 'error'}
            className="self-end px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Tutor AI</h1>
                <div className={`flex items-center gap-2 text-sm ${getStatusColor()}`}>
                  {getStatusIcon()}
                  <span>
                    {apiStatus === 'online' ? 'Online' : 
                     apiStatus === 'error' ? 'API Offline' : 'Verificando...'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-3">
              <nav className="flex gap-2">
                <button
                  onClick={() => setCurrentPage('chat')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 'chat' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Chat</span>
                </button>
                <button
                  onClick={() => setCurrentPage('settings')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 'settings' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <BrainCircuit className="w-4 h-4" />
                  <span className="hidden sm:inline">Saiba mais</span>
                </button>
              </nav>
              
              {currentPage === 'chat' && (
                <button
                  onClick={clearChat}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
                >
                  Limpar Chat
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        {currentPage === 'chat' ? renderChatPage() : renderSettingsPage()}

        {/* Footer */}
        <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 p-4">
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Desenvolvido por <span className="text-purple-400 font-medium">Guilherme</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}