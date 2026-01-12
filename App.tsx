import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, Character } from './types';
import { DEFAULT_CHARACTERS } from './constants';

declare const gsap: any;

const PORTFOLIO_IMAGES = [
  { 
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768077772/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.37.10_pzaruc.png', 
    title: 'Natural Brand' 
  },
  { 
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768077770/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.35.16_cj4orm.png', 
    title: 'Creative Session' 
  },
  { 
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222779/IMG_1395_dnyyqo.jpg', 
    title: 'Elegant Portrait' 
  },
  { 
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222779/IMG_1394_frjar5.jpg', 
    title: 'Sophisticated Style' 
  },
  {
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768233357/Gemini_Generated_Image_kh0vzjkh0vzjkh0v_ddoo5b.png',
    title: 'Artistic Vision'
  },
  {
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768233358/Gemini_Generated_Image_cuedz4cuedz4cued_u8vtdz.png',
    title: 'Modern Aesthetic'
  },
  {
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768234454/1_g7ujmn.png',
    title: 'Minimalist Focus'
  },
  {
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768234454/2_orucvg.png',
    title: 'Pure Expression'
  },
  {
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768234456/3_ey6hqi.png',
    title: 'Soft Light'
  },
  {
    url: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768234458/4_pxoo04.png',
    title: 'Creative Essence'
  }
];

// シューティングセクション用の画像
const INSTAGRAM_POSTS = [
  { id: 'p1', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768210283/IMG_1357_dvyi7h.jpg' },
  { id: 'p2', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768210272/IMG_1362_hegtak.jpg' },
  { id: 'p3', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768210271/IMG_1360_mhmwik.jpg' },
  { id: 'p4', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768210260/IMG_1359_dnthxb.jpg' },
  { id: 'p5', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768210294/IMG_1363_bjeczx.jpg' },
  { id: 'p6', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768222780/IMG_1398_oioxib.jpg' },
  { id: 'p7', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768222781/IMG_1397_cd7ijq.jpg' },
  { id: 'p8', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768222783/IMG_1400_oqsbyq.jpg' },
  { id: 'p9', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768222784/IMG_1402_lfgqhh.jpg' },
  { id: 'p10', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768222783/IMG_1401_qw5ik5.jpg' },
  { id: 'p11', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768222785/IMG_1404_xnlup8.jpg' },
  { id: 'p12', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768222785/IMG_1405_ra86hl.jpg' },
  { id: 'p13', url: 'https://www.instagram.com/rinrin_photo.yk/', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/f_auto,q_auto/v1768222831/IMG_1370_bbv3hp.jpg' },
];

// 家具セクション用の画像
const FURNITURE_POSTS = [
  { id: 'f1', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222832/IMG_1371_rzy6va.jpg' },
  { id: 'f2', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222834/IMG_1372_ie6cvs.jpg' },
  { id: 'f3', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222834/IMG_1374_zmftfo.jpg' },
  { id: 'f4', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222835/IMG_1376_vxk9ed.jpg' },
  { id: 'f5', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222824/IMG_1384_efabia.jpg' },
  { id: 'f6', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222825/IMG_1385_gkrux4.jpg' },
  { id: 'f7', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222829/IMG_1386_vren8b.jpg' },
  { id: 'f8', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222829/IMG_1387_clxmsb.jpg' },
  { id: 'f9', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222823/IMG_1380_awdflq.jpg' },
  { id: 'f10', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222823/IMG_1382_fykfr5.jpg' },
  { id: 'f11', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222823/IMG_1378_c4mlsz.jpg' },
  { id: 'f12', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222824/IMG_1383_xjr9xl.jpg' },
  { id: 'f13', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222830/IMG_1388_k0xxff.jpg' },
  { id: 'f14', imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768222831/IMG_1389_tn6uon.jpg' },
];

// プロフィールセクション用のミニフィード
const PROFILE_FEED_POSTS = [
  { 
    id: 'feed1', 
    url: 'https://www.instagram.com/rinrin_photo.yk/', 
    imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768077771/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.36.05_dv6gzr.png' 
  },
  { 
    id: 'feed2', 
    url: 'https://www.instagram.com/rinrin_photo.yk/', 
    imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768077770/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.35.51_ejhar2.png' 
  },
  { 
    id: 'feed3', 
    url: 'https://www.instagram.com/rinrin_photo.yk/', 
    imageUrl: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768075420/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.03.13_gv8lpg.png' 
  }
];

const INSTAGRAM_BASE_URL = 'https://www.instagram.com/rinrin_photo.yk/';

const INSTAGRAM_HIGHLIGHTS = [
  { id: 2, title: 'me', url: INSTAGRAM_BASE_URL, isCustom: true },
  { id: 3, title: 'Voice', url: INSTAGRAM_BASE_URL, img: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768077770/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.35.16_cj4orm.png' },
  { id: 4, title: 'Gallery', url: INSTAGRAM_BASE_URL, img: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768077773/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.39.02_ihugtf.png' },
  { id: 5, title: 'Life', url: INSTAGRAM_BASE_URL, img: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1768077771/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.36.05_dv6gzr.png' },
];

const App: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const profileRef = useRef<HTMLElement>(null);

  // 無限ループ用に画像を複製
  const scrollingShootingPosts = [...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS];
  const scrollingFurniturePosts = [...FURNITURE_POSTS, ...FURNITURE_POSTS];

  useEffect(() => {
    // GSAP Hero Animation - Simultaneous Elegant Reveal from Mask
    if (typeof gsap !== 'undefined' && titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      
      gsap.fromTo(chars, 
        { 
          y: "110%", 
          opacity: 0.5,
          rotateX: -15 
        },
        { 
          y: "0%", 
          opacity: 1, 
          rotateX: 0,
          duration: 2.8, 
          ease: "expo.out", 
          stagger: 0, 
          delay: 0.6 
        }
      );
    }

    // GSAP Highlights Hover Animation logic
    if (typeof gsap !== 'undefined') {
      const highlights = document.querySelectorAll('.highlight-item');
      highlights.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          const circle = el.querySelector('.highlight-circle');
          gsap.to(circle, { scale: 1.15, duration: 0.4, ease: "power2.out" });
          gsap.fromTo(circle, { rotate: -4 }, { rotate: 4, duration: 0.12, repeat: 5, yoyo: true, ease: "power1.inOut" });
        });
        el.addEventListener('mouseleave', () => {
          const circle = el.querySelector('.highlight-circle');
          gsap.to(circle, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.inOut" });
        });
      });
    }

    // Reveal Intersection Observer
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.id === 'about' && typeof gsap !== 'undefined') {
            const ptl = gsap.timeline();
            ptl.fromTo(".profile-img-anim", { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" })
            .fromTo(".profile-text-stagger", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=1.0")
            .fromTo(".profile-line-anim", { width: 0 }, { width: "100%", duration: 1, ease: "expo.out" }, "-=0.5");
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, #about, #tips, #furniture, #contact').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-6 mix-blend-difference text-white">
        <div className="serif text-xl md:text-2xl tracking-[0.5em] font-light uppercase">RIN RIN</div>
        <div className="hidden md:flex gap-12 text-[10px] tracking-[0.3em] font-medium uppercase">
          <a href="#about" className="hover:text-gold transition-colors">Profile</a>
          <a href="#message" className="hover:text-gold transition-colors">Message</a>
          <a href="#community" className="hover:text-gold transition-colors">Community</a>
          <a href="#tips" className="hover:text-gold transition-colors">Shooting</a>
          <a href="#furniture" className="hover:text-gold transition-colors">Furniture</a>
          <a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover grayscale brightness-50 hero-bg-animate"
            style={{ 
              backgroundImage: `url('https://res.cloudinary.com/dxr2aeoze/image/upload/v1768075420/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-11_5.03.13_gv8lpg.png')`,
              backgroundPosition: 'center 15%' 
            }}
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/20" />
        <div className="relative z-20 text-white">
          <span className="font-medium tracking-[0.4em] uppercase font-sans block mb-6 text-[10px] md:text-sm opacity-90">
            selfbrand shooting studio
          </span>
          <h1 ref={titleRef} className="animation-container serif text-7xl md:text-[10rem] font-light uppercase leading-none mb-12">
            <span className="char">R</span><span className="char">I</span><span className="char">N</span>
            <span className="char">R</span><span className="char">I</span><span className="char">N</span>
          </h1>
          <div className="gold-line max-w-[150px] md:max-w-[320px] mx-auto opacity-60"></div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70 z-20">
          <i className="fas fa-chevron-down text-lg"></i>
        </div>
      </section>

      {/* Profile Section */}
      <section id="about" ref={profileRef} className="py-24 md:py-40 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-center md:items-start overflow-hidden border-b border-slate-50">
        <div className="flex-shrink-0">
          <div className="w-80 h-[28rem] md:w-[28rem] md:h-[36rem] relative group profile-img-anim">
            <img 
              src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1768155657/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-12_3.17.11_pntqeo.png" 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-105 shadow-sm rounded-sm transition-all duration-1000 group-hover:grayscale-0"
              alt="Profile"
            />
          </div>
        </div>
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <span className="profile-text-stagger text-[9px] tracking-[0.4em] font-medium text-[#c5a059] uppercase block">Discover</span>
            <h2 className="profile-text-stagger serif text-5xl md:text-7xl font-light tracking-tight lowercase text-balance">profile</h2>
            <div className="profile-line-anim gold-line opacity-30 mt-4 origin-left"></div>
          </div>
          <div className="space-y-10">
            <div className="space-y-8 font-light">
              <div className="profile-text-stagger space-y-1">
                <p className="text-[10px] md:text-[12px] tracking-[0.2em] text-slate-400 font-bold uppercase font-sans">Photographer / Branding Consultant</p>
              </div>
            </div>
            <div className="profile-text-stagger pt-4">
              <span className="text-[8px] tracking-[0.3em] font-bold text-slate-300 uppercase block mb-4">Instagram Feed</span>
              <div className="grid grid-cols-3 gap-3 max-w-[400px]">
                {PROFILE_FEED_POSTS.map((post) => (
                  <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-sm border border-black/5 bg-slate-50 transition-all duration-500 shadow-sm">
                    <img src={post.imageUrl} alt="Instagram Feed" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section id="message" className="py-32 md:py-48 px-8 bg-[#fdfbf7] relative border-b border-black/5 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-16 text-center reveal">
          <div className="space-y-4">
            <span className="text-[10px] md:text-[12px] tracking-[0.5em] font-medium text-black uppercase block mb-2">Philosophy & Journey</span>
            <div className="h-[0.5px] bg-black/20 max-w-[30px] mx-auto mt-4"></div>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-white/40 backdrop-blur-sm border border-black/5 p-8 md:p-14 shadow-sm rounded-sm relative group transition-all duration-1000 space-y-16">
              <div className="grid md:grid-cols-2 gap-12 text-left items-start handwriting">
                 <ul className="space-y-6 text-[13px] md:text-[15px] tracking-widest font-light leading-loose list-none">
                  <li><span className="w-0.5 h-0.5 bg-black/30 inline-block mr-2"></span> Niigata Tokyo Nagano</li>
                  <li><span className="w-0.5 h-0.5 bg-black/30 inline-block mr-2"></span> Family of 4</li>
                  <li><span className="w-0.5 h-0.5 bg-black/30 inline-block mr-2"></span> Arts Fashion Chocolate</li>
                </ul>
                <div className="space-y-6 text-[10px] md:text-[11px] tracking-wide leading-relaxed">
                  <div className="space-y-4">
                    <h3 className="text-[9px] tracking-[0.2em] border-b border-black/10 pb-1 font-medium uppercase font-sans">STORY</h3>
                    <p>高校の頃にファッション誌が好きで写真に目覚め都内の写真専門学校へ</p>
                    <p>卒業後は都内フォトスタジオに3年勤め約3,000人以上撮影 ライティングやレタッチなどを学び、現在はセルフブランディングコンサルタントとして起業</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section: 'me' */}
      <section id="community" className="py-40 md:py-64 bg-white relative overflow-hidden">
        <div className="absolute top-20 md:top-0 -left-20 md:-left-32 text-[70vw] md:text-[50vw] font-bold text-slate-50/70 select-none pointer-events-none serif leading-none z-0 animate-float-me opacity-30 md:opacity-80">
          me
        </div>
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-16">
            <div className="reveal relative pr-8 pb-8 md:pr-12 md:pb-12 group/me">
              <div className="aspect-[4/5] bg-slate-50 overflow-hidden relative shadow-2xl rounded-sm animate-soft-float">
                <img src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1768209448/%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%83%86%E3%82%99%E3%82%B5%E3%82%99%E3%82%A4%E3%83%B3_4_qertko.png" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/me:grayscale-0" alt="Community me" />
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
                   <p className="handwriting text-lg md:text-2xl text-black/80 leading-relaxed tracking-wide text-balance">自分自身にフォーカスする時間を。</p>
                </div>
              </div>
              <div className="reveal pl-4 space-y-10">
                <div className="handwriting text-black/60 leading-[2.5] text-[11px] md:text-[13px] font-light max-w-md">
                  <p className="mb-8">フォトコミュニティー『me』はひな子とフォトグラファーりんりんによる <span className="text-black font-medium border-b border-black/5">“こんなの撮ってみたかった”</span> を叶える撮影会コミュニティーです。</p>
                </div>
                <div className="pt-6">
                  <a href={INSTAGRAM_BASE_URL} target="_blank" className="group relative inline-flex items-center gap-6 py-4 px-10 bg-black text-white rounded-full overflow-hidden transition-all hover:bg-gold active:scale-95 shadow-xl">
                    <span className="relative z-10 text-[10px] tracking-[0.3em] uppercase font-bold">meへ参加</span>
                    <i className="fas fa-arrow-right text-[10px] relative z-10 group-hover:translate-x-2 transition-transform"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal mt-20 px-4">
            <video 
              width="100%" height="auto" preload="metadata" muted loop playsInline autoPlay 
              poster="https://res.cloudinary.com/dxr2aeoze/video/upload/f_auto,q_auto,so_0/v1768210062/画面収録_2026-01-12_18.24.12_hybn1c.jpg"
              style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px', height: 'auto', aspectRatio: '9 / 16', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#eee' }}
              className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
            >
              <source src="https://res.cloudinary.com/dxr2aeoze/video/upload/f_auto,q_auto/v1768210062/画面収録_2026-01-12_18.24.12_hybn1c.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Shooting Section (Infinite Horizontal Scroll) */}
      <section id="tips" className="py-32 md:py-48 bg-[#f9f8f4] relative border-y border-black/5 overflow-hidden">
        <div className="text-center space-y-6 mb-16 px-8 reveal">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#c5a059]/30"></div>
            <span className="text-[10px] tracking-[0.6em] font-bold text-[#c5a059] uppercase font-sans">Educational Series</span>
            <div className="h-[1px] w-12 bg-[#c5a059]/30"></div>
          </div>
          <h2 className="serif text-6xl md:text-8xl font-light tracking-tighter text-black leading-tight text-balance">shooting.</h2>
        </div>

        {/* Instagram Highlights */}
        <div className="flex gap-8 md:gap-16 px-4 py-12 mb-20 max-w-full overflow-x-auto no-scrollbar scroll-smooth overflow-y-visible justify-center items-center">
          {INSTAGRAM_HIGHLIGHTS.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="highlight-item flex flex-col items-center gap-4 group no-underline flex-shrink-0">
              <div className="highlight-circle relative w-16 h-16 md:w-24 md:h-24 rounded-full p-[3.5px] bg-gradient-to-tr from-[#E0C3FC] to-[#8EC5FC] shadow-lg overflow-visible">
                <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-white flex items-center justify-center">
                  {item.isCustom ? (
                    <div className="w-full h-full bg-[#e0f2fe] flex items-center justify-center group-hover:bg-[#bae6fd] transition-colors duration-500">
                      <span className="serif italic text-2xl md:text-3xl text-[#0c4a6e] lowercase">me</span>
                    </div>
                  ) : (
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  )}
                </div>
              </div>
              <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-slate-400 font-sans uppercase">{item.title}</span>
            </a>
          ))}
        </div>

        <div className="relative w-full overflow-hidden py-10">
          <div className="scroll-track flex gap-6 md:gap-12 px-6 md:px-12">
            {scrollingShootingPosts.map((post, idx) => (
              <div key={`${post.id}-${idx}`} className="flex-shrink-0 animate-soft-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                <a 
                  href={post.url} target="_blank" rel="noopener noreferrer" 
                  className="group relative block h-[300px] md:h-[450px] w-auto overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-700 border border-black/5 rounded-sm"
                >
                  <img 
                    src={post.imageUrl} 
                    alt="Shooting" 
                    className="h-full w-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Furniture Section (New) */}
      <section id="furniture" className="py-32 md:py-48 bg-white relative border-b border-black/5 overflow-hidden">
        <div className="text-center space-y-6 mb-16 px-8 reveal">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-black/10"></div>
            <span className="text-[10px] tracking-[0.6em] font-bold text-slate-400 uppercase font-sans">Curated Objects</span>
            <div className="h-[1px] w-12 bg-black/10"></div>
          </div>
          <h2 className="serif text-6xl md:text-8xl font-light tracking-tighter text-black leading-tight text-balance">FURNITURE.</h2>
        </div>

        <div className="relative w-full overflow-hidden py-10">
          <div className="scroll-track flex gap-6 md:gap-12 px-6 md:px-12">
            {scrollingFurniturePosts.map((post, idx) => (
              <div key={`${post.id}-${idx}`} className="flex-shrink-0 animate-soft-float" style={{ animationDelay: `${idx * 0.3}s` }}>
                <div className="group relative block h-[300px] md:h-[450px] w-auto overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-700 border border-black/5 rounded-sm cursor-default">
                  <img 
                    src={post.imageUrl} 
                    alt="Furniture" 
                    className="h-full w-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-8 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-24">
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#c5a059] uppercase block mb-4">Selected Works</span>
            <h2 className="serif text-4xl md:text-6xl font-light tracking-tight lowercase text-balance">portfolio</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PORTFOLIO_IMAGES.map((img, idx) => (
              <div key={idx} className="reveal group relative overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-700 rounded-sm border border-black/5">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                </div>
                <div className="mt-4 flex justify-between items-center px-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">{img.title}</span>
                  <div className="w-4 h-px bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 md:py-48 px-8 bg-white text-center border-t border-black/5 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 reveal">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.4em] font-bold text-[#c5a059] uppercase block">Inquiry</span>
            <h2 className="serif text-5xl md:text-7xl font-light lowercase">contact</h2>
            <div className="gold-line max-w-[80px] mx-auto opacity-40 mt-6"></div>
          </div>
          
          <div className="space-y-8">
            <p className="handwriting text-lg md:text-2xl text-black/80 tracking-wide">
              お仕事依頼はこちら
            </p>
            
            <div className="pt-8">
              <a 
                href={INSTAGRAM_BASE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-8 py-5 px-14 bg-black text-white rounded-full overflow-hidden transition-all hover:bg-[#c5a059] active:scale-95 shadow-2xl"
              >
                <span className="relative z-10 text-[11px] tracking-[0.4em] uppercase font-bold">Contact Me</span>
                <i className="fab fa-instagram text-lg relative z-10 group-hover:rotate-12 transition-transform"></i>
              </a>
            </div>
            
            <p className="text-[9px] tracking-[0.2em] text-slate-400 font-sans uppercase">
              Usually responds within 24 hours via Instagram DM
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 border-t border-slate-100 flex flex-col items-center gap-12 bg-white text-center">
        <div className="serif text-3xl tracking-[0.5em] font-light uppercase">RIN RIN studio</div>
        <div className="text-[10px] text-slate-300 font-medium tracking-[0.3em]">&copy; 2024 RIN RIN | STUDIO. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
};

export default App;