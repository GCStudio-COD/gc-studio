"use client";

import React, { useState, useEffect, useRef } from 'react';

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  isHtml?: boolean;
  options?: string[];
};

type ChatState = 
  | 'IDLE'
  | 'WEBSITE_BIZ_TYPE' | 'WEBSITE_GOAL' | 'WEBSITE_BUDGET'
  | 'ECOM_SALES_VOLUME'
  | 'BRAND_SERVICES' | 'BRAND_ESTABLISHED'
  | 'SEO_GOAL'
  | 'GROWTH_CHALLENGE'
  | 'LEAD_START' | 'LEAD_NAME' | 'LEAD_COMPANY' | 'LEAD_EMAIL' | 'LEAD_PHONE' | 'LEAD_COMPLETE';

type ChatContext = {
  bizType?: string;
  goal?: string;
  budget?: string;
  ecomVolume?: string;
  brandService?: string;
  brandStatus?: string;
  seoGoal?: string;
  growthChallenge?: string;
  leadName?: string;
  leadCompany?: string;
  leadEmail?: string;
  leadPhone?: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  const initialMessage: Message = {
    id: '1',
    role: 'bot',
    text: 'Hi there! I am the Digital Consultant here at GC Studio. I can help you find the perfect solution for your business. What are you looking for today?',
    options: ["I need a website", "E-commerce Consultation", "Branding Services", "SEO Services", "Business Growth"]
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatState, setChatState] = useState<ChatState>('IDLE');
  const [context, setContext] = useState<ChatContext>({});

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const addBotMessage = (text: string, options?: string[], isHtml?: boolean) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'bot', text, options, isHtml }
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 500); // 0.8s - 1.3s delay
  };

  const handleUserInput = (input: string) => {
    const text = input.trim();
    if (!text) return;

    // Add user message to UI
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', text }
    ]);
    setInputText("");

    // --- STATE MACHINE ENGINE ---
    
    // 1. LEAD CAPTURE FLOW (highest priority if active)
    if (chatState === 'LEAD_START') {
        if (text.toLowerCase() === 'yes' || text.toLowerCase() === 'sure' || text.toLowerCase() === 'ok') {
            setChatState('LEAD_NAME');
            addBotMessage("Great! Let's start with your Name:");
        } else {
            setChatState('IDLE');
            addBotMessage("No problem! Let me know if you need anything else.", initialMessage.options);
        }
        return;
    }
    if (chatState === 'LEAD_NAME') {
        setContext(p => ({ ...p, leadName: text }));
        setChatState('LEAD_COMPANY');
        addBotMessage("Got it. What is your Company Name?");
        return;
    }
    if (chatState === 'LEAD_COMPANY') {
        setContext(p => ({ ...p, leadCompany: text }));
        setChatState('LEAD_EMAIL');
        addBotMessage("Perfect. What is your Email Address?");
        return;
    }
    if (chatState === 'LEAD_EMAIL') {
        setContext(p => ({ ...p, leadEmail: text }));
        setChatState('LEAD_PHONE');
        addBotMessage("Thanks. Lastly, what is your Phone Number?");
        return;
    }
    if (chatState === 'LEAD_PHONE') {
        setContext(p => ({ ...p, leadPhone: text }));
        setChatState('LEAD_COMPLETE');
        addBotMessage(`Thanks ${context.leadName}! Our team will review your requirements and reach out to you at ${context.leadEmail} shortly.`);
        
        setTimeout(() => {
            setChatState('IDLE');
            addBotMessage("Is there anything else I can help you with today?", initialMessage.options);
        }, 3000);
        return;
    }

    // 2. WEBSITE DISCOVERY FLOW
    if (chatState === 'WEBSITE_BIZ_TYPE') {
        setContext(p => ({ ...p, bizType: text }));
        setChatState('WEBSITE_GOAL');
        addBotMessage("What is your primary goal?", [
            "Generate Leads", "Sell Products Online", "Increase Brand Awareness", 
            "Get More Calls", "Online Booking", "Portfolio Showcase", 
            "Customer Support", "Improve Credibility"
        ]);
        return;
    }
    if (chatState === 'WEBSITE_GOAL') {
        setContext(p => ({ ...p, goal: text }));
        setChatState('WEBSITE_BUDGET');
        addBotMessage("What is your estimated budget?", [
            "₹5,000 - ₹15,000", "₹15,000 - ₹30,000", "₹30,000 - ₹75,000", 
            "₹75,000 - ₹2,00,000", "₹2,00,000+"
        ]);
        return;
    }
    if (chatState === 'WEBSITE_BUDGET') {
        setContext(p => ({ ...p, budget: text }));
        
        // Provide Recommendation based on Budget
        let recommendationHTML = "";
        if (text === "₹5,000 - ₹15,000") {
            recommendationHTML = `<strong>Recommendation: Single Page / Landing Page</strong><br/><br/><strong>Benefits:</strong> Low Cost, Fast Loading, Good for Small Businesses.<br/><strong>Tech Stack:</strong> HTML, CSS, JavaScript, Tailwind.`;
        } else if (text === "₹15,000 - ₹30,000") {
            recommendationHTML = `<strong>Recommendation: WordPress Website</strong><br/><br/><strong>Benefits:</strong> Easy Content Updates, SEO Friendly, Blog Support, Cost Effective.<br/><strong>Tech Stack:</strong> WordPress, Elementor.`;
        } else if (text === "₹30,000 - ₹75,000") {
            recommendationHTML = `<strong>Recommendation: Custom Business Website</strong><br/><br/><strong>Benefits:</strong> Better Performance, Higher Security, Modern UX.<br/><strong>Tech Stack:</strong> React, Next.js, Node.js.`;
        } else {
            recommendationHTML = `<strong>Recommendation: Custom Web Application</strong><br/><br/><strong>Benefits:</strong> Enterprise Grade, Fully Customizable, Advanced Integrations, Scalable.<br/><strong>Tech Stack:</strong> Next.js, Node.js, PostgreSQL, Strapi CMS, AWS.`;
        }
        
        addBotMessage(recommendationHTML, undefined, true);
        
        setTimeout(() => {
            setChatState('LEAD_START');
            addBotMessage("Would you like a free consultation with our experts to discuss this?", ["Yes", "No"]);
        }, 2000);
        return;
    }

    // 3. E-COMMERCE FLOW
    if (chatState === 'ECOM_SALES_VOLUME') {
        setContext(p => ({ ...p, ecomVolume: text }));
        
        let recHTML = "";
        if (text === "Under 100 orders") {
            recHTML = `<strong>Recommendation: Shopify</strong><br/><br/><strong>Advantages:</strong> Quick Setup, Minimal Maintenance, Secure, Easy Product Management.`;
        } else if (text === "100-500 orders" || text === "500-2000 orders") {
            recHTML = `<strong>Recommendation: WooCommerce</strong><br/><br/><strong>Advantages:</strong> Full Ownership, Lower Monthly Costs, More Customization.`;
        } else {
            recHTML = `<strong>Recommendation: Custom E-commerce</strong><br/><br/><strong>Tech Stack:</strong> Next.js, Node.js, PostgreSQL, Stripe<br/><strong>Advantages:</strong> Unlimited Customization, Faster Performance, Custom Workflows.`;
        }

        addBotMessage(recHTML, undefined, true);
        
        setTimeout(() => {
            setChatState('LEAD_START');
            addBotMessage("Would you like a free consultation with our experts to discuss this?", ["Yes", "No"]);
        }, 2000);
        return;
    }

    // 4. BRANDING FLOW
    if (chatState === 'BRAND_SERVICES') {
        setContext(p => ({ ...p, brandService: text }));
        setChatState('BRAND_ESTABLISHED');
        addBotMessage("How established is your business?", ["New Startup", "Growing Business", "Established Company"]);
        return;
    }
    if (chatState === 'BRAND_ESTABLISHED') {
        setContext(p => ({ ...p, brandStatus: text }));
        
        let recHTML = "";
        if (text === "New Startup") {
            recHTML = `<strong>Recommendation for Startups</strong><br/><br/><strong>Needs:</strong> Logo, Color Palette, Typography, Business Card.`;
        } else if (text === "Growing Business") {
            recHTML = `<strong>Recommendation for Growth</strong><br/><br/><strong>Needs:</strong> Brand Guidelines, Social Media Templates, Marketing Materials.`;
        } else {
            recHTML = `<strong>Recommendation for Enterprises</strong><br/><br/><strong>Needs:</strong> Complete Brand Strategy, Rebranding, Brand Audit, SEO Consultation.`;
        }

        addBotMessage(recHTML, undefined, true);
        
        setTimeout(() => {
            setChatState('LEAD_START');
            addBotMessage("Would you like a free consultation with our branding experts?", ["Yes", "No"]);
        }, 2000);
        return;
    }

    // 5. SEO FLOW
    if (chatState === 'SEO_GOAL') {
        setContext(p => ({ ...p, seoGoal: text }));
        
        let recHTML = "";
        if (text === "Local Visibility") {
            recHTML = `<strong>Focus On: Local SEO</strong><br/>Google Business Profile, Reviews, Location Pages.`;
        } else if (text === "More Website Traffic" || text === "More Leads") {
            recHTML = `<strong>Focus On: Service & Content SEO</strong><br/>Service Pages, Blog Content, Technical SEO.`;
        } else {
            recHTML = `<strong>Focus On: E-commerce SEO</strong><br/>Product SEO, Category SEO, Schema Markup.`;
        }

        addBotMessage(recHTML, undefined, true);
        
        setTimeout(() => {
            setChatState('LEAD_START');
            addBotMessage("Would you like a free SEO audit and consultation?", ["Yes", "No"]);
        }, 2000);
        return;
    }

    // 6. GROWTH FLOW
    if (chatState === 'GROWTH_CHALLENGE') {
        setContext(p => ({ ...p, growthChallenge: text }));
        
        let recHTML = "";
        if (text === "Not Getting Leads" || text === "No Online Presence") {
            recHTML = `<strong>Solutions:</strong> Landing Pages, Lead Forms, Google Ads, SEO.`;
        } else if (text === "Low Website Traffic" || text === "High Marketing Costs") {
            recHTML = `<strong>Solutions:</strong> SEO, Content Marketing, Social Media.`;
        } else if (text === "Poor Branding") {
            recHTML = `<strong>Solutions:</strong> Brand Identity, Logo Refresh, Consistent Marketing Assets.`;
        } else {
            recHTML = `<strong>Solutions:</strong> Conversion Optimization, Better Product Pages, Retargeting Ads.`;
        }

        addBotMessage(recHTML, undefined, true);
        
        setTimeout(() => {
            setChatState('LEAD_START');
            addBotMessage("Would you like a free strategy session to discuss this?", ["Yes", "No"]);
        }, 2000);
        return;
    }

    // --- IDLE STATE (Trigger Word Matching) ---
    const lowerInput = text.toLowerCase();
    
    if (lowerInput.includes("website") || lowerInput.includes("build") || lowerInput.includes("project")) {
        setChatState('WEBSITE_BIZ_TYPE');
        addBotMessage("Great! Let me understand your business first. What type of business do you have?", [
            "Restaurant", "Travel Agency", "Real Estate", "Educational Institute", 
            "Healthcare", "E-commerce Store", "Corporate Business", "Startup", "Personal Brand", "Other"
        ]);
        return;
    }
    
    if (lowerInput.includes("ecom") || lowerInput.includes("ecommerce") || lowerInput.includes("store") || lowerInput.includes("shop")) {
        setChatState('ECOM_SALES_VOLUME');
        addBotMessage("Let's look at your E-commerce needs. What is your expected monthly sales volume?", [
            "Under 100 orders", "100-500 orders", "500-2000 orders", "2000+ orders"
        ]);
        return;
    }

    if (lowerInput.includes("brand") || lowerInput.includes("logo") || lowerInput.includes("identity")) {
        setChatState('BRAND_SERVICES');
        addBotMessage("What branding services do you need?", [
            "Logo Design", "Brand Identity", "Social Media Design", "Packaging Design", "Complete Branding"
        ]);
        return;
    }

    if (lowerInput.includes("seo") || lowerInput.includes("traffic") || lowerInput.includes("rank")) {
        setChatState('SEO_GOAL');
        addBotMessage("What is your main SEO goal?", [
            "More Website Traffic", "More Leads", "Local Visibility", "E-commerce Sales"
        ]);
        return;
    }

    if (lowerInput.includes("growth") || lowerInput.includes("sales") || lowerInput.includes("lead")) {
        setChatState('GROWTH_CHALLENGE');
        addBotMessage("What is your biggest challenge right now?", [
            "Not Getting Leads", "Low Website Traffic", "Poor Branding", "Low Sales", "No Online Presence", "High Marketing Costs"
        ]);
        return;
    }

    // Default Fallback
    addBotMessage("I can guide you through tailored solutions for your business. Please select an area to start:", initialMessage.options);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a] border border-zinc-800 text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110 hover:border-zinc-600 ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        aria-label="Open Chat"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rotating dashed outer circle */}
          <circle 
            cx="12" cy="12" r="8.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeDasharray="3 3" 
            className="animate-[spin_6s_linear_infinite] origin-center" 
          />
          {/* Solid inner circle */}
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
      </button>

      {/* Chat Window Panel */}
      <div 
        className={`absolute bottom-0 right-0 w-[calc(100vw-3rem)] sm:w-[380px] h-[550px] max-h-[calc(100vh-6rem)] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-zinc-200 overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto' : 'scale-[0.8] opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-zinc-900 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">Digital Consultant</h3>
              <p className="text-xs text-zinc-400 font-medium">GC Studio</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 bg-[#fafafa]">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[14px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-zinc-900 text-white rounded-br-sm' 
                    : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm'
                }`}
              >
                {msg.isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
              
              {/* Render clickable options if present */}
              {msg.options && msg.options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                    {msg.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleUserInput(opt)}
                            className="bg-white border border-zinc-200 text-zinc-700 text-xs font-medium px-4 py-2 rounded-full hover:border-zinc-400 hover:bg-zinc-50 transition-colors shadow-sm"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-zinc-200 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-zinc-200 shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleUserInput(inputText); }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm rounded-full pl-5 pr-12 py-3.5 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-1.5 w-9 h-9 bg-zinc-900 text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-opacity hover:bg-zinc-800"
            >
              <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Powered by GC Engine</span>
          </div>
        </div>
      </div>

    </div>
  );
}
