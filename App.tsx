
import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, Character, Message } from './types';
import { DEFAULT_CHARACTERS } from './constants';
import { CharacterChatService } from './services/geminiService';

const PORTFOLIO_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&q=80&w=800', title: 'Natural Portrait' },
  { url: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80&w=800', title: 'Brand Story' },
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', title: 'Studio Session' },
  { url: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=800', title: 'Lifestyle Branding' },
  { url: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?auto=format&fit=crop&q=80&w=800', title: 'Product Aesthetics' },
  { url: 'https://images.unsplash.com/photo-1481326329074-851606557cf1?auto=format&fit=crop&q=80&w=800', title: 'Atmosphere' }
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatService, setChatService] = useState<CharacterChatService | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rinrin = DEFAULT_CHARACTERS[0];

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const service = new CharacterChatService(rinrin);
    service.initChat();
    setChatService(service);
    setMessages([{ role: 'model', text: rinrin.greeting, timestamp: new Date() }]);

    // Initialize Instagram Embeds
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !chatService || isLoading) return;

    const userMessage: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(currentInput);
      const botMessage: Message = { role: 'model', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: Message = { role: 'model', text: `申し訳ありません。エラーが発生しました。: ${err.message}`, timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-6 mix-blend-difference text-white">
        <div className="serif text-lg md:text-xl tracking-[0.3em] font-light">RIN RIN</div>
        <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] font-medium uppercase">
          <a href="#about" className="hover:text-gold transition-colors">Profile</a>
          <a href="#message" className="hover:text-gold transition-colors">Message</a>
          <a href="#community" className="hover:text-gold transition-colors">Community</a>
          <a href="#tips" className="hover:text-gold transition-colors">Shooting Tips</a>
          <a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a>
          <a href="#club" className="hover:text-gold transition-colors">Studio Chat</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-[#fdfbf7]">
        <div className="reveal">
          <span className="text-black font-medium tracking-[0.2em] uppercase font-sans block mb-6 text-[10px] md:text-sm opacity-60">
            selfbrand shooting studio
          </span>
          <h1 className="text-5xl md:text-9xl font-bold tracking-[0.3em] md:tracking-[0.6em] uppercase leading-tight mb-12 font-sans mr-[-0.3em] md:mr-[-0.6em]">
            RINRIN
          </h1>
          <div className="gold-line max-w-[200px] md:max-w-[320px] mx-auto opacity-40"></div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-300">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* Profile Section */}
      <section id="about" className="py-32 md:py-40 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-center md:items-start">
        <div className="reveal flex-shrink-0">
          <div className="w-40 h-56 md:w-56 md:h-72 relative group">
            <img 
              src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-04_18.59.16_xedy7u.png" 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-105 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-0 shadow-sm rounded-sm"
            />
            <img 
              src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1768075420/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.03.13_gv8lpg.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 shadow-sm rounded-sm scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0"
            />
            <div className="absolute top-4 left-4 -right-4 -bottom-4 border-[0.5px] border-slate-200 -z-10 group-hover:border-[#c5a059]/30 transition-colors duration-700"></div>
          </div>
        </div>
        <div className="reveal flex-1 space-y-10">
          <div className="space-y-4">
            <span className="text-[9px] tracking-[0.4em] font-medium text-[#c5a059] uppercase block">Discover</span>
            <h2 className="serif text-5xl md:text-6xl font-light tracking-tight lowercase text-balance">profile</h2>
          </div>
          <div className="space-y-8">
            <div className="space-y-6 font-light">
              <p className="text-balance font-medium text-slate-800 text-sm md:text-base">お洒落な女性のための出張撮影会</p>
              <ul className="space-y-3 list-none pl-0 handwriting text-[10px] md:text-[11px] tracking-widest text-slate-500 leading-loose">
                <li className="flex items-baseline gap-2 text-balance"><span className="text-[8px] text-[#c5a059] font-sans">•</span><span>パーティー / 商品物撮り etc</span></li>
                <li className="flex items-baseline gap-2 text-balance"><span className="text-[8px] text-[#c5a059] font-sans">•</span><span>フォトコミュニティー『me』共同主催</span></li>
                <li className="flex items-baseline gap-2 text-balance"><span className="text-[8px] text-[#c5a059] font-sans">•</span><span>過去3,000名以上撮影経験あり</span></li>
                <li className="flex items-baseline gap-2 text-balance"><span className="text-[8px] text-[#c5a059] font-sans">•</span><span>東京・長野 | 全国出張撮影（安曇野市在住）</span></li>
                <li className="flex items-baseline gap-2 text-balance"><span className="text-[8px] text-[#c5a059] font-sans">•</span><span>グループ撮影会ご相談下さい</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section id="message" className="py-32 md:py-48 px-8 bg-[#fdfbf7] relative overflow-hidden border-b border-black/5">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
           <div className="absolute top-10 left-10 w-48 h-48 border border-black rotate-45"></div>
           <div className="absolute bottom-10 right-10 w-72 h-72 border border-black -rotate-12"></div>
        </div>
        <div className="max-w-3xl mx-auto space-y-12 text-center reveal">
          <div className="space-y-4">
            <span className="text-[7px] md:text-[8px] tracking-[0.5em] font-medium text-black uppercase block mb-2">Philosophy & Journey</span>
            <h2 className="handwriting text-lg md:text-xl font-light tracking-[0.2em] text-black">message</h2>
            <div className="h-[0.5px] bg-black/20 max-w-[30px] mx-auto mt-4"></div>
          </div>
          <div className="handwriting text-black leading-[2.2] space-y-10 text-balance text-[10px] md:text-[11px] font-light">
            <div className="space-y-6">
              <p className="text-sm md:text-base leading-relaxed tracking-wide text-balance">
                こんにちは<br />
                シンプルお洒落フォトが大好きな<br />
                フォトグラファーりんりんです
              </p>
              <div className="space-y-2">
                <p className="text-balance">フォトグラファーならではの視点で<br />スマホでOKな</p>
                <div className="flex flex-col items-center gap-2 py-4">
                  <span className="block border-b border-black/5 pb-1 tracking-widest text-balance">ファンを増やす垢抜けフォトのコツ</span>
                  <span className="block border-b border-black/5 pb-1 tracking-widest text-balance">自撮り&他撮りのコツ</span>
                  <span className="block border-b border-black/5 pb-1 tracking-widest text-balance">商品の魅力の伝え方</span>
                </div>
              </div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm border border-black/5 p-6 md:p-12 shadow-sm rounded-sm relative group transition-all duration-1000">
              <div className="absolute inset-2 border border-black/5 -z-10"></div>
              <div className="space-y-8 not-italic text-center">
                <div className="space-y-2">
                  <p className="text-[6px] md:text-[7px] tracking-[0.4em] text-slate-400 uppercase font-sans">Personal Anthology</p>
                  <p className="text-base md:text-lg handwriting font-light pt-1 text-black">〈 りんりん 金山由佳里 〉</p>
                  <p className="text-[6px] md:text-[7px] tracking-[0.3em] text-black font-bold uppercase font-sans">Photographer / Branding Consultant</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-left items-start max-w-lg mx-auto handwriting">
                   <ul className="space-y-3 text-[8px] md:text-[9px] tracking-widest font-light leading-loose list-none">
                    <li className="flex gap-2 items-center"><span className="w-0.5 h-0.5 bg-black/30"></span> Niigata Tokyo Nagano</li>
                    <li className="flex gap-2 items-center"><span className="w-0.5 h-0.5 bg-black/30"></span> Family of 4</li>
                    <li className="flex gap-2 items-center"><span className="w-0.5 h-0.5 bg-black/30"></span> Arts Fashion Chocolate</li>
                    <li className="flex gap-2 items-center"><span className="w-0.5 h-0.5 bg-black/30"></span> Hot Yoga Journey</li>
                  </ul>
                  <div className="space-y-4 text-[9px] md:text-[10px] tracking-wide leading-relaxed">
                    <div className="space-y-3">
                      <h3 className="text-[8px] tracking-[0.2em] border-b border-black/10 pb-1 font-medium uppercase font-sans">STORY</h3>
                      <p className="text-balance">高校の頃にファッション誌が好きで写真に目覚め都内の写真専門学校へ</p>
                      <p className="text-balance">卒業後は都内フォトスタジオに3年勤め約3,000人以上撮影 ライティングやレタッチなどを学んできました</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section: 'me' */}
      <section id="community" className="py-40 md:py-64 bg-white relative overflow-hidden">
        {/* Massive Floating Background Decor - Adjusted for mobile overlap */}
        <div className="absolute top-10 md:top-0 -left-16 md:-left-32 text-[60vw] md:text-[50vw] font-bold text-slate-50/70 select-none pointer-events-none serif leading-none z-0 animate-float-me opacity-40 md:opacity-80">
          me
        </div>
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="reveal relative pr-8 pb-8 md:pr-12 md:pb-12 lg:pr-16 lg:pb-16 group/me">
              <div className="aspect-[4/5] bg-slate-50 overflow-hidden relative shadow-2xl rounded-sm">
                <img 
                  src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1768075420/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.03.13_gv8lpg.png" 
                  className="w-full h-full object-cover grayscale brightness-110 transition-all duration-700 group-hover/me:grayscale-0 group-hover/me:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 aspect-square border-4 md:border-8 border-white shadow-xl overflow-hidden rounded-sm hidden sm:block transition-all hover:scale-105 duration-700 bg-white">
                <img 
                  src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1768077771/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.36.28_epbzmw.png" 
                  className="w-full h-full object-contain grayscale group-hover/me:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute top-0 left-0 -mt-4 -ml-4 md:-mt-8 md:-ml-8 w-1/3 aspect-[3/2] bg-black p-2 md:p-4 text-white text-[7px] md:text-[8px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-sans hidden md:flex items-center justify-center">
                Seasonal Collective
              </div>
            </div>
            <div className="space-y-12">
              <div className="reveal space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-[0.5px] w-12 bg-black/20"></div>
                  <span className="text-[8px] md:text-[9px] tracking-[0.5em] font-medium text-slate-400 uppercase font-sans">Photo community</span>
                </div>
                <h2 className="serif text-7xl md:text-[12rem] font-light tracking-tighter text-black leading-none lowercase">me</h2>
                <div className="pl-4">
                   <p className="handwriting text-lg md:text-2xl text-black/80 leading-relaxed tracking-wide text-balance">
                    メンバーのみんなが主役 Photoを通して自分自身にフォーカスする時間を。
                   </p>
                </div>
              </div>
              <div className="reveal pl-4 space-y-10">
                <div className="handwriting text-black/60 leading-[2.5] text-[11px] md:text-[13px] font-light max-w-md">
                  <p className="mb-8 text-balance">フォトコミュニティー『me』はひな子とフォトグラファーりんりんによる <span className="text-black font-medium border-b border-black/5">“こんなの撮ってみたかった”</span> を叶える撮影会コミュニティーです。</p>
                  <p className="mb-8 text-balance">春夏秋冬ファッションを楽しむようにシーズナルな撮影やスタジオ撮影を東京で行っています。</p>
                </div>
                <div className="pt-6">
                  <a href="#" className="group relative inline-flex items-center gap-6 py-4 px-10 bg-black text-white rounded-full overflow-hidden transition-all hover:bg-gold active:scale-95 shadow-xl">
                    <span className="relative z-10 text-[10px] tracking-[0.3em] uppercase font-bold">meへ参加</span>
                    <i className="fas fa-arrow-right text-[10px] relative z-10 group-hover:translate-x-2 transition-transform"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shooting Tips Section */}
      <section id="tips" className="py-32 md:py-40 bg-[#f9f8f4] relative overflow-hidden border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-20 items-center">
            <div className="flex-1 space-y-12 md:space-y-16 reveal">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-[8px] tracking-[0.5em] font-bold text-[#c5a059] uppercase font-sans">01 / Educational</span>
                  <div className="h-[1px] w-20 bg-[#c5a059]/30"></div>
                </div>
                <h2 className="serif text-5xl md:text-8xl font-light tracking-tighter text-black leading-tight">
                  shooting <br />
                  <span className="italic pl-12 md:pl-24 text-[#c5a059]">tips.</span>
                </h2>
              </div>
              <div className="space-y-10 pl-4 md:pl-12">
                <div className="handwriting text-black/70 text-base md:text-xl leading-relaxed space-y-6">
                  <p className="border-l-2 border-[#c5a059] pl-6 italic">「何気ない日常を、最高の1枚に。」</p>
                  <p className="text-balance leading-[2.2] text-[12px] md:text-[14px]">
                    フォトグラファー視点で教える、スマホひとつで叶う<br />
                    垢抜けフォトの法則。光の読み方から構図の秘密まで、<br />
                    Instagramにて定期的に公開しています。
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center reveal relative z-10">
              {/* Responsive Container for Instagram */}
              <div className="w-full max-w-[480px] bg-white p-2 md:p-4 shadow-2xl rounded-sm relative group">
                <div className="absolute -top-12 md:-top-10 -right-2 md:-right-6 handwriting text-[10px] md:text-[11px] text-[#c5a059] rotate-12 bg-white px-4 py-2 shadow-sm border border-black/5 z-20">
                  Favorite Shot ✨
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 md:w-24 h-16 md:h-24 border border-[#c5a059]/20 -z-10 rotate-45"></div>
                
                <div className="overflow-hidden rounded-sm border border-black/5 bg-white w-full">
                  {/* Clean Feed-only Instagram Embed */}
                  <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink="https://www.instagram.com/p/DTKp5hGD-J-/" 
                    data-instgrm-version="14" 
                    style={{ 
                      background: '#FFF', 
                      border: 0, 
                      borderRadius: '3px', 
                      boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
                      margin: '1px', 
                      maxWidth: '100%', 
                      minWidth: '280px', 
                      padding: 0, 
                      width: 'calc(100% - 2px)' 
                    }}
                  >
                    <div style={{ padding: '16px' }}>
                      <a href="https://www.instagram.com/p/DTKp5hGD-J-/" target="_blank" style={{ color:'#c9c8cd', fontFamily:'Arial,sans-serif', fontSize:'14px', fontStyle:'normal', fontWeight:'normal', lineHeight:'17px', textDecoration:'none' }}>
                        Loading Instagram Post...
                      </a>
                    </div>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-8 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-24">
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#c5a059] uppercase block mb-4">Selected Works</span>
            <h2 className="serif text-4xl md:text-6xl font-light tracking-tight lowercase">portfolio</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
            {PORTFOLIO_IMAGES.map((img, idx) => (
              <div key={idx} className="reveal group relative overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-700">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <span className="serif italic text-xl block translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-balance">{img.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Section */}
      <section id="club" className="bg-[#1a1a1a] py-32 text-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-24">
            <h2 className="serif text-4xl md:text-6xl font-light mb-6 text-[#c5a059] tracking-tight lowercase">creative consultation</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm tracking-wide font-light text-balance">rinrinによるパーソナル・カウンセリング。</p>
          </div>
          <div id="contact" className="reveal flex flex-col lg:flex-row gap-12 h-[600px]">
            <div className="lg:w-1/3 space-y-8 flex flex-col justify-center">
              <div className="flex items-center gap-6">
                <img src={rinrin.avatarUrl} className="w-20 h-20 rounded-full border border-[#c5a059]/30 p-1 object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div><h3 className="serif text-2xl lowercase tracking-tight">rinrin</h3></div>
              </div>
              <p className="text-sm text-slate-400 font-light leading-relaxed serif italic text-balance">「写真は心の鏡。言葉は魂の響き。」</p>
            </div>
            <div className="lg:w-2/3 bg-white/5 rounded-3xl border border-white/10 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar" ref={scrollRef}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#c5a059] text-white rounded-tr-none' : 'bg-white/10 text-slate-200 border border-white/5 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 p-3 bg-white/5 rounded-full px-5">
                      <div className="w-1 h-1 bg-gold rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10 bg-white/5">
                <div className="relative flex items-center">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="rinrinにメッセージを送る..." className="w-full bg-transparent border border-white/20 rounded-full py-4 px-6 pr-16 text-sm text-white outline-none" />
                  <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 w-10 h-10 bg-[#c5a059] text-white rounded-full flex items-center justify-center transition-all"><i className="fas fa-paper-plane text-xs"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 border-t border-slate-100 flex flex-col items-center gap-12 bg-white">
        <div className="serif text-3xl tracking-[0.5em] font-light uppercase">RIN RIN studio</div>
        <div className="text-[10px] text-slate-300 font-medium tracking-[0.3em]">&copy; 2024 RIN RIN | STUDIO. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
};

export default App;
