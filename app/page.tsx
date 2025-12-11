'use client';

import React, { useState, useEffect, useRef } from 'react';

// Floating geometric shapes component
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute top-20 left-10 w-16 h-16 animate-float-slow opacity-20" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#0066FF" strokeWidth="2"/>
    </svg>
    <svg className="absolute top-40 right-20 w-24 h-24 animate-float-medium opacity-15" viewBox="0 0 100 100">
      <rect x="20" y="20" width="60" height="60" fill="none" stroke="#00D4AA" strokeWidth="2" transform="rotate(15 50 50)"/>
    </svg>
    <svg className="absolute bottom-32 left-1/4 w-20 h-20 animate-float-fast opacity-20" viewBox="0 0 100 100">
      <polygon points="50,10 90,90 10,90" fill="none" stroke="#FF6B35" strokeWidth="2"/>
    </svg>
    <svg className="absolute top-1/3 right-1/3 w-12 h-12 animate-float-slow opacity-25" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="8" fill="#0066FF"/>
    </svg>
    <svg className="absolute bottom-20 right-10 w-32 h-32 animate-float-medium opacity-10" viewBox="0 0 100 100">
      <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="#0066FF" strokeWidth="1.5"/>
    </svg>
    <svg className="absolute top-60 left-1/3 w-8 h-8 animate-pulse opacity-30" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="6" fill="#00D4AA"/>
    </svg>
  </div>
);

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => setCurrentPage('Home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-bold text-lg">OK</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-gray-900">OKOnline</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${currentPage === item ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {item}
                {currentPage === item && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage('Contact')}
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25"
            >
              Get Started
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="px-6 py-8 space-y-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => { setCurrentPage(item); setMobileMenuOpen(false); }}
              className="block w-full text-left text-lg font-medium text-gray-900 py-2"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Animated Section Component
const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
};

// Stats Counter Component
const StatCounter = ({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
        {count}<span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon, title, description, features, index }: { icon: React.ReactNode; title: string; description: string; features: string[]; index: number }) => (
  <AnimatedSection delay={index * 150}>
    <div className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-100 overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-600/20">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </AnimatedSection>
);

// Client Logo Component
const ClientLogos = () => {
  const logos = [
    'amplience.jpg', 'finbourne.jpg', 'ground.jpg', 'innerworks.jpg',
    'modelml.jpg', 'ppro.jpg', 'qio.jpg', 'vertice.jpg'
  ];

  // Duplicate the logos array for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex gap-6 items-center animate-scroll">
        {duplicatedLogos.map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-16 w-40 flex items-center justify-center transition-all duration-300"
          >
            <img
              src={`/company_logos/${logo}`}
              alt={logo.replace('.jpg', '')}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Home Page
const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <FloatingShapes />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="max-w-4xl">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-8">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-700">Tech-Enabled Marketing</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8">
              The Global
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Marketer
              </span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-2xl">
              We transform SaaS & Mobile Apps into market leaders through precision-targeted Meta Ads, intelligent WhatsApp automation, and revenue-driving email campaigns.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentPage('Contact')}
                className="group px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/25 flex items-center gap-3"
              >
                Start Your Project
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button 
                onClick={() => setCurrentPage('Services')}
                className="px-8 py-4 bg-white text-gray-900 font-medium rounded-full border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Explore Services
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    {/* Problem/Solution Sections */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <AnimatedSection>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">The Problem</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lost in the noise of digital chaos?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Most marketing agencies deliver vanity metrics. You need real growth—qualified leads, engaged users, and revenue that scales. Stop burning budget on campaigns that don't convert.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="bg-gray-50 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-bl-full" />
              <ul className="space-y-4 relative">
                {['Scattered campaigns with no cohesion', 'Agencies that don\'t understand SaaS', 'Generic strategies, generic results', 'No visibility into what\'s working'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection delay={100}>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 relative overflow-hidden order-2 lg:order-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full" />
              <ul className="space-y-4 relative">
                {['Unified strategy across all channels', 'Deep SaaS & App expertise', 'Creative that stands out', 'Real-time performance dashboards'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">The Solution</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Clarity meets creativity.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We combine data-driven precision with bold creative execution. Every campaign is engineered for growth, every message crafted for conversion. One team, one vision, real results.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Numbers that speak for themselves
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              12 years of relentless growth, hundreds of success stories, and counting.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10">
            <StatCounter value={12} suffix="+" label="Years Experience" />
          </div>
          <div className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10">
            <StatCounter value={340} suffix="+" label="Projects Delivered" />
          </div>
          <div className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10">
            <StatCounter value={200} suffix="+" label="Happy Clients" />
          </div>
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Three channels. One mission.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Integrated marketing that drives real business outcomes.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          <ServiceCard
            index={0}
            icon={
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Meta Ads"
            description="Precision-targeted campaigns that turn scrollers into customers. Full-funnel strategy for maximum ROI."
            features={['Lead Generation', 'Retargeting Campaigns', 'Creative Strategy', 'Performance Analytics']}
          />
          <ServiceCard
            index={1}
            icon={
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            }
            title="WhatsApp Marketing"
            description="Direct-to-customer messaging at scale. Automate conversations, nurture leads, close deals."
            features={['API Integration', 'Broadcast Campaigns', 'Marketing Automation', 'Conversational Flows']}
          />
          <ServiceCard
            index={2}
            icon={
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Email Marketing"
            description="Revenue-driving sequences that engage, nurture, and convert. Every email engineered for impact."
            features={['Lifecycle Automation', 'Drip Campaigns', 'Behavioral Triggers', 'A/B Testing']}
          />
        </div>

        <AnimatedSection delay={400}>
          <div className="text-center mt-16">
            <button 
              onClick={() => setCurrentPage('Services')}
              className="group inline-flex items-center gap-3 text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors"
            >
              Explore all services
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Clients Section */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">Trusted By</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Growing brands across US & UK
            </h2>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <ClientLogos />
        </AnimatedSection>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-32 bg-gradient-to-br from-blue-600 to-cyan-500 relative overflow-hidden">
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="20" cy="20" r="20" fill="white"/>
          <circle cx="80" cy="80" r="30" fill="white"/>
        </svg>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Ready to scale?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Let's discuss how we can transform your marketing into a growth engine. No fluff, just results.
          </p>
          <button 
            onClick={() => setCurrentPage('Contact')}
            className="group px-10 py-5 bg-white text-blue-600 font-semibold text-lg rounded-full hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Get Your Free Strategy Call
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

// About Page
const AboutPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <div className="min-h-screen pt-20">
    {/* Hero */}
    <section className="relative py-32 overflow-hidden">
      <FloatingShapes />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <AnimatedSection>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">About Us</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              We believe in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                clarity over complexity.
              </span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded 12 years ago with a simple mission: cut through the noise and deliver marketing that actually works. Today, we're a tech-enabled agency helping SaaS and mobile apps conquer the US and UK markets.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Story Section */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-50 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/30">
                      <span className="text-5xl font-bold text-white">OK</span>
                    </div>
                    <p className="text-blue-600 font-semibold">OKOnline HQ</p>
                  </div>
                </div>
                <svg className="absolute top-10 right-10 w-20 h-20 opacity-20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#0066FF" strokeWidth="2"/>
                </svg>
                <svg className="absolute bottom-10 left-10 w-16 h-16 opacity-20" viewBox="0 0 100 100">
                  <rect x="20" y="20" width="60" height="60" fill="none" stroke="#00D4AA" strokeWidth="2" transform="rotate(15 50 50)"/>
                </svg>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">Our Story</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              From startup hustle to global reach
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                We started as a small team obsessed with one question: why do most marketing campaigns fail? The answer was clear—too many agencies prioritize complexity over clarity, vanity metrics over real results.
              </p>
              <p>
                So we built something different. A tech-enabled agency that combines human creativity with data-driven precision. Every campaign we run is designed to move the needle—whether that's qualified leads, app installs, or revenue growth.
              </p>
              <p>
                Today, we serve ambitious SaaS companies and mobile apps across the US and UK, helping them cut through the digital noise and connect with customers who matter.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              What drives us every day
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Clarity', desc: 'Simple strategies that work. No jargon, no fluff.' },
            { title: 'Creativity', desc: 'Bold ideas that stand out in crowded feeds.' },
            { title: 'Precision', desc: 'Data-driven decisions, not guesswork.' },
            { title: 'Results', desc: 'We measure success by your growth, not ours.' }
          ].map((value, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6 text-white font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Team Section */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">The Team</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet the minds behind the magic
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A lean team of strategists, creatives, and tech enthusiasts united by one goal—your growth.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Alex Chen', role: 'Founder & Strategy' },
            { name: 'Sarah Mitchell', role: 'Head of Creative' },
            { name: 'James Rodriguez', role: 'Performance Lead' }
          ].map((member, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div className="group text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:from-blue-50 group-hover:to-cyan-50 transition-all duration-300">
                  <span className="text-4xl font-bold text-gray-300 group-hover:text-blue-400 transition-colors">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Let's build something great together
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Ready to see what clarity and creativity can do for your brand?
          </p>
          <button 
            onClick={() => setCurrentPage('Contact')}
            className="group px-10 py-5 bg-white text-gray-900 font-semibold text-lg rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Start the Conversation
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

// Services Page
const ServicesPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <div className="min-h-screen pt-20">
    {/* Hero */}
    <section className="relative py-32 overflow-hidden">
      <FloatingShapes />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <AnimatedSection>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">Services</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Marketing that
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                moves needles.
              </span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <p className="text-xl text-gray-600 leading-relaxed">
              Three powerful channels, one unified strategy. We integrate Meta Ads, WhatsApp, and Email to create marketing systems that generate, nurture, and convert leads at scale.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Meta Ads Section */}
    <section id="meta-ads" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/30">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">Service 01</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meta Ads
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Precision-targeted campaigns that turn scrollers into customers. We build full-funnel strategies across Facebook and Instagram that deliver qualified leads—not just clicks.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {['Lead Generation', 'Full-Funnel Strategy', 'Creative Development', 'Audience Research', 'Retargeting Campaigns', 'Performance Analytics'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 aspect-square flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="150" fill="none" stroke="#0066FF" strokeWidth="1" strokeDasharray="10 10" />
                  <circle cx="200" cy="200" r="100" fill="none" stroke="#00D4AA" strokeWidth="1" strokeDasharray="5 5" />
                </svg>
              </div>
              <div className="text-center relative">
                <div className="text-8xl font-bold text-blue-600/20 mb-4">01</div>
                <p className="text-blue-600 font-semibold">Lead Generation Excellence</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* WhatsApp Section */}
    <section id="whatsapp" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection delay={200} className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 aspect-square flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <path d="M50 200 Q200 50 350 200 Q200 350 50 200" fill="none" stroke="#25D366" strokeWidth="2"/>
                  <path d="M100 200 Q200 100 300 200 Q200 300 100 200" fill="none" stroke="#128C7E" strokeWidth="1"/>
                </svg>
              </div>
              <div className="text-center relative">
                <div className="text-8xl font-bold text-green-600/20 mb-4">02</div>
                <p className="text-green-600 font-semibold">Conversational Commerce</p>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="order-1 lg:order-2">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-green-500/30">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-4 block">Service 02</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                WhatsApp Marketing
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Direct-to-customer messaging at scale. We build automated WhatsApp flows that engage prospects, nurture leads, and close deals—all through the world's most personal channel.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {['API Integration', 'Broadcast Campaigns', 'Marketing Automation', 'Conversational Flows', 'Lead Qualification', 'Customer Support Bots'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Email Section */}
    <section id="email" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-purple-600/30">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-widest mb-4 block">Service 03</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Email Marketing
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Revenue-driving sequences that engage, nurture, and convert. Every email is engineered for impact—from welcome series to win-back campaigns, we build systems that print money.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {['Lifecycle Automation', 'Drip Campaigns', 'Behavioral Triggers', 'A/B Testing', 'Deliverability Optimization', 'Revenue Attribution'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 aspect-square flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <rect x="50" y="100" width="300" height="200" rx="20" fill="none" stroke="#9333EA" strokeWidth="2"/>
                  <path d="M50 120 L200 220 L350 120" fill="none" stroke="#EC4899" strokeWidth="2"/>
                </svg>
              </div>
              <div className="text-center relative">
                <div className="text-8xl font-bold text-purple-600/20 mb-4">03</div>
                <p className="text-purple-600 font-semibold">Revenue-Driving Sequences</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Process Section */}
    <section className="py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4 block">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              How we work
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Discovery', desc: 'Deep dive into your business, audience, and goals.' },
            { step: '02', title: 'Strategy', desc: 'Custom roadmap built for your specific needs.' },
            { step: '03', title: 'Execute', desc: 'Launch campaigns with precision and creativity.' },
            { step: '04', title: 'Optimize', desc: 'Continuous improvement driven by data.' }
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="relative">
                <div className="text-6xl font-bold text-gray-300/40 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 h-px bg-gradient-to-r from-blue-600/50 to-transparent" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 bg-gradient-to-br from-blue-600 to-cyan-500">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to transform your marketing?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Let's discuss which services are right for your business.
          </p>
          <button 
            onClick={() => setCurrentPage('Contact')}
            className="group px-10 py-5 bg-white text-blue-600 font-semibold text-lg rounded-full hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Schedule a Strategy Call
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <FloatingShapes />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <AnimatedSection>
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">Contact</span>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
                  Let's start
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    something great.
                  </span>
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p className="text-xl text-gray-600 leading-relaxed mb-12">
                  Ready to transform your marketing? Drop us a line and we'll get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email us at</p>
                      <p className="text-lg font-semibold text-gray-900">hello@okonline.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Serving clients in</p>
                      <p className="text-lg font-semibold text-gray-900">United States & United Kingdom</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={300}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-gray-200/50">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                        placeholder="john@company.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                        placeholder="Your Company"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your project</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none resize-none"
                        placeholder="What are your marketing goals?"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      Send Message
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer Component
const Footer = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <footer className="bg-gray-900 py-20">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <button onClick={() => setCurrentPage('Home')} className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">OK</span>
            </div>
            <span className="text-xl font-semibold text-white">OKOnline</span>
          </button>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            The Global Marketer. Tech-enabled marketing for SaaS and mobile apps ready to scale in the US and UK markets.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Services</h4>
          <ul className="space-y-3">
            {['Meta Ads', 'WhatsApp Marketing', 'Email Marketing'].map((item) => (
              <li key={item}>
                <button onClick={() => setCurrentPage('Services')} className="text-gray-400 hover:text-white transition-colors">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-3">
            {[{name: 'About', page: 'About'}, {name: 'Contact', page: 'Contact'}].map((item) => (
              <li key={item.name}>
                <button onClick={() => setCurrentPage(item.page)} className="text-gray-400 hover:text-white transition-colors">
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © 2024 OKOnline. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'Home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'About': return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'Services': return <ServicesPage setCurrentPage={setCurrentPage} />;
      case 'Contact': return <ContactPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
      `}</style>
      
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
