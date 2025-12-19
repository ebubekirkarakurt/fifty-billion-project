
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Welcome, Architect. I am your Deep Reasoning Advisor. How shall we allocate your $50,000,000,000 fortune today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await GeminiService.getAdvisorResponse(input, messages);
      setMessages(prev => [...prev, { role: 'model', content: response || "I seem to have lost my train of thought. Let us try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Error communicating with the neural advisory. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-slate-800 p-3 border-b border-slate-700 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Strategic Advisor (Gemini 3 Pro)
        </span>
        <span className="text-[10px] text-slate-500 font-mono">Thinking Mode Enabled</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-amber-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-lg rounded-bl-none text-slate-400 text-xs italic">
              Advisor is calculating deep systemic impacts...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for strategy..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GeminiAssistant;
