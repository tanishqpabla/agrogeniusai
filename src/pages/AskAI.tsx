import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, MicOff, Bot, User, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  'How to control aphids in wheat?',
  'Best time to sow mustard?',
  'Why are my tomato leaves turning yellow?',
  'How to increase milk production in cows?',
];

// Mock AI responses
const mockResponses: Record<string, string> = {
  'aphids': `**Aphid Control in Wheat** 🌾

**Cause:** Aphids are small sap-sucking insects that attack wheat during cool, humid weather.

**Solution:**
1. Spray Imidacloprid 17.8% SL @ 0.5ml/L water
2. Apply in early morning or evening
3. Repeat after 10-15 days if needed

**Prevention:**
• Plant resistant varieties like HD-2967
• Avoid excessive nitrogen fertilizer
• Encourage natural predators like ladybugs

💡 **Pro Tip:** Early detection is key - check your crop weekly!`,

  'mustard': `**Best Time to Sow Mustard** 🌻

**Optimal Sowing Period:**
• North India: October 15 - November 15
• Best results: Last week of October

**Why This Timing?**
• Cool weather (15-25°C) needed for germination
• Avoids frost damage during flowering
• Ensures proper pod formation

**Preparation Steps:**
1. Prepare field with 2-3 ploughings
2. Apply FYM @ 10 tons/hectare
3. Seed rate: 4-5 kg/hectare
4. Row spacing: 30-45 cm

🌡️ **Weather Check:** Ensure no heavy rain forecast for first week after sowing!`,

  'yellow': `**Yellow Leaves in Tomatoes** 🍅

**Common Causes:**
1. **Nitrogen Deficiency** - Oldest leaves yellow first
2. **Overwatering** - Roots can't absorb nutrients
3. **Magnesium Deficiency** - Yellowing between veins

**Solutions:**

*For Nitrogen Deficiency:*
• Apply Urea @ 2g/L as foliar spray
• Add well-decomposed compost

*For Overwatering:*
• Reduce irrigation frequency
• Ensure proper drainage

*For Magnesium:*
• Spray Magnesium Sulphate @ 5g/L

**Prevention:**
• Regular soil testing
• Balanced fertilizer application
• Proper irrigation scheduling`,

  'milk': `**Increasing Milk Production** 🐄

**Immediate Steps:**

1. **Nutrition:**
   • Increase green fodder to 25-30 kg/day
   • Add 2-3 kg concentrate feed
   • Ensure clean drinking water always available

2. **Management:**
   • Milk 3 times daily if possible
   • Maintain clean and comfortable shed
   • Regular grooming and exercise

3. **Supplements:**
   • Mineral mixture @ 50g/day
   • Salt @ 30g/day
   • Jaggery @ 100g for energy

**Expected Results:**
Following these practices can increase milk by 15-20% within 2-3 weeks.

🏥 **Health Tip:** Regular deworming every 3 months is essential!`,
};

const getAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('aphid') || lowerQuery.includes('pest') || lowerQuery.includes('insect')) {
    return mockResponses['aphids'];
  }
  if (lowerQuery.includes('mustard') || lowerQuery.includes('sow') || lowerQuery.includes('sarson')) {
    return mockResponses['mustard'];
  }
  if (lowerQuery.includes('yellow') || lowerQuery.includes('tomato') || lowerQuery.includes('leaf')) {
    return mockResponses['yellow'];
  }
  if (lowerQuery.includes('milk') || lowerQuery.includes('cow') || lowerQuery.includes('buffalo') || lowerQuery.includes('dairy')) {
    return mockResponses['milk'];
  }
  
  return `**Thank you for your question!** 🌾

I understand you're asking about: "${query}"

**General Advice:**
1. For specific crop issues, please share more details like crop name, growth stage, and symptoms
2. For pest problems, describe the appearance and affected plant parts
3. For soil/fertilizer queries, mention your soil type and current practices

**Quick Tips:**
• Regular field monitoring is essential
• Always use recommended doses of inputs
• Consult local Krishi Vigyan Kendra for personalized advice

📞 **Kisan Call Center:** 1800-180-1551 (Toll Free)

How else can I help you today?`;
};

const AskAI = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please try Chrome.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!isListening) {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-primary p-4 flex items-center gap-4 sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Agro AI Assistant</h1>
            <p className="text-white/80 text-xs">Powered by AI • Ask anything</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Hello, Farmer! 🙏</h2>
            <p className="text-muted-foreground mb-6">
              Ask me anything about farming, crops, pests, or animal care
            </p>
            
            {/* Suggested Questions */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
              {suggestedQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(q)}
                  className="block w-full bg-card border rounded-xl p-3 text-left text-sm text-foreground hover:bg-muted transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-card border rounded-bl-md'
                  }`}
                >
                  <div className={`text-sm whitespace-pre-wrap ${message.role === 'assistant' ? 'prose prose-sm' : ''}`}>
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('**') ? 'font-semibold' : ''}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    ))}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-card border rounded-2xl rounded-bl-md p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-lg mx-auto flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-xl h-12 w-12 flex-shrink-0 ${isListening ? 'bg-red-100 border-red-300' : ''}`}
            onClick={toggleVoice}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 text-red-500" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your farming question..."
            className="h-12 rounded-xl"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            size="icon"
            className="rounded-xl h-12 w-12 flex-shrink-0"
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        {isListening && (
          <p className="text-center text-sm text-red-500 mt-2 animate-pulse">
            🎤 Listening... Speak now
          </p>
        )}
      </div>
    </div>
  );
};

export default AskAI;
