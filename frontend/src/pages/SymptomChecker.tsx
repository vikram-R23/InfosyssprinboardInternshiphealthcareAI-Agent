import { useState } from 'react';
import { 
  UserCircle, 
  Info, 
  Bot, 
  MoreVertical, 
  Paperclip, 
  Send, 
  Home, 
  MessageSquare, 
  LineChart, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect } from 'react';
type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export default function SymptomChecker() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [patientId, setPatientId] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setPatientId(user.id);
      }
    });
  }, []);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello. I am the CareTriage AI Health Assistant. I'm here to help you assess your symptoms. Please note that I am an AI and this is not a substitute for professional medical advice in an emergency.\n\nTo get started, could you briefly describe what's bothering you today?"
    }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/triage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_id: patientId || "demo-user-123", // Use real ID if available
          message: userMessage
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // The backend returns a structured TriageResponse
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: 'ai', 
        text: data.ai_explanation || "I've analyzed your symptoms. Based on my assessment, your urgency level is " + data.urgency_level + ". We recommend visiting the " + data.recommended_department + "."
      }]);

      // If it's a final triage decision, wait a moment and route to results
      if (data.urgency_level) {
        setTimeout(() => navigate('/result'), 3000);
      }

    } catch (error) {
      console.error('Error hitting FastAPI backend:', error);
      // Fallback for demo if backend isn't running due to memory constraints
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          sender: 'ai', 
          text: "I'm having trouble connecting to my medical database (FastAPI backend is offline). For demo purposes, let's assume I've assessed your symptoms as Medium Risk. Routing you to your triage results..."
        }]);
        setTimeout(() => navigate('/result'), 3000);
      }, 1500);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans h-screen flex flex-col overflow-hidden antialiased">
      
      {/* Top Navigation */}
      <header className="flex justify-between items-center w-full px-6 md:px-10 py-4 max-w-5xl mx-auto sticky top-0 bg-white/80 backdrop-blur-xl shadow-sm z-50 border-b border-slate-200">
        <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          CareTriage AI
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            <UserCircle className="w-6 h-6" />
          </button>
          <button className="text-slate-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            <Info className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full relative pt-4 pb-20 md:pb-4 px-4 md:px-6">
        
        {/* Chat Header */}
        <div className="bg-white rounded-t-2xl p-4 flex items-center justify-between shadow-sm border border-slate-200 border-b-slate-100 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">AI Health Assistant</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-medium text-slate-500">Live</span>
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-slate-50">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Canvas */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 bg-slate-50 border-x border-slate-200 flex flex-col gap-6">
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : ''}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mt-1 shadow-sm border border-blue-200">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div className={`p-4 shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' : 'bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-200'}`}>
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {/* AI Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mt-1 shadow-sm border border-blue-200">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white text-slate-700 p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200 flex items-center gap-1.5 h-12">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Footer */}
        <div className="bg-white rounded-b-2xl p-4 shadow-sm border border-slate-200 border-t-slate-100 z-10">
          <div className="flex items-center gap-2 md:gap-3">
            <button className="text-slate-400 hover:text-blue-600 transition-colors p-2.5 rounded-full hover:bg-slate-50 flex-shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-grow relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your symptoms..." 
                className="w-full bg-slate-50 text-slate-900 text-sm md:text-base rounded-xl py-3 pl-4 pr-12 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors p-3 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 disabled:opacity-50" 
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-lg md:hidden">
        <button className="flex flex-col items-center justify-center text-slate-500 p-2 hover:bg-slate-50 transition-all rounded-lg active:scale-95">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-blue-100 text-blue-700 rounded-xl p-2 px-4 transition-all active:scale-95">
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1">Chat</span>
        </button>
        <button className="flex flex-col items-center justify-center text-slate-500 p-2 hover:bg-slate-50 transition-all rounded-lg active:scale-95">
          <LineChart className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Insights</span>
        </button>
        <button className="flex flex-col items-center justify-center text-slate-500 p-2 hover:bg-slate-50 transition-all rounded-lg active:scale-95">
          <FileText className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Records</span>
        </button>
      </nav>
    </div>
  );
}
