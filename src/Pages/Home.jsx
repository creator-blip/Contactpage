import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { Star } from 'lucide-react';
import Form from '../Components/Form';
import Testimonial from '../Components/Testimonial';
import Thankyou from '../Components/Thankyou';

const Home = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [statCardsVisible, setStatCardsVisible] = useState(false);
  const statsMobileRef = React.useRef(null);

  // Detect if we're on mobile/tablet view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for mobile stats animation
  useEffect(() => {
    if (!isMobileView || !statsMobileRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatCardsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(statsMobileRef.current);
    return () => observer.disconnect();
  }, [isMobileView]);

  const countries = [
    { name: 'US', code: 'us' },
    { name: 'AU', code: 'au' },
    { name: 'CA', code: 'ca' },
    { name: 'UK', code: 'gb' },
    { name: 'NZ', code: 'nz' },
    { name: 'DE', code: 'de' },
  ];

  const tickerStyle = `
    @keyframes smoothScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(-50%)); }
    }
    .ticker-wrapper {
      overflow: hidden;
      width: 100%;
      position: relative;
    }
    .ticker-wrapper::before, .ticker-wrapper::after {
      content: '';
      position: absolute;
      top: 0;
      width: 80px;
      height: 100%;
      z-index: 10;
      pointer-events: none;
      display: none;
    }
    @media (max-width: 1024px) {
      .ticker-wrapper::before, .ticker-wrapper::after {
        display: block;
      }
      .ticker-wrapper::before {
        left: 0;
        background: linear-gradient(to right, rgba(240,235,255,1), rgba(255,255,255,0));
      }
      .ticker-wrapper::after {
        right: 0;
        background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));
      }
    }
    @media (min-width: 1025px) {
      .ticker-wrapper::before, .ticker-wrapper::after {
        display: block;
      }
      .ticker-wrapper::before {
        left: 0;
        background: linear-gradient(to right, rgba(250,245,255,0.8), transparent);
      }
      .ticker-wrapper::after {
        right: 0;
        background: linear-gradient(to left, rgba(255,255,255,0.8), transparent);
      }
    }
    .ticker-content {
      display: flex;
       gap: 2rem;
      animation: smoothScroll 5s linear infinite;
      max-width: max-content;
    }
    .ticker-item {
      display: flex;
      flex-direction: column;
      align-items: center;
  
  
      flex-shrink: 0;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .animate-fadeInUp {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }

    .animate-slideInLeft {
      animation: slideInLeft 0.6s ease-out forwards;
    }

    .animate-slideInRight {
      animation: slideInRight 0.6s ease-out forwards;
    }

    .animate-scaleIn {
      animation: scaleIn 0.5s ease-out forwards;
    }

    .animation-delay-100 {
      animation-delay: 0.1s;
    }

    .animation-delay-200 {
      animation-delay: 0.2s;
    }

    .animation-delay-300 {
      animation-delay: 0.3s;
    }

    .animation-delay-400 {
      animation-delay: 0.4s;
    }

    .animation-delay-500 {
      animation-delay: 0.5s;
    }

    .animation-delay-600 {
      animation-delay: 0.6s;
    }

    .opacity-0 {
      opacity: 0;
    }
  `;

  const FormComponent = () => (
    <div className="w-full bg-transparent rounded-3xl sm:m-6 md:p-8 lg:p-12 xl:p-14 2xl:p-16 animate-slideInRight">
      <div className="ticker-wrapper mb-2 sm:mb-3 lg:mb-4">
        <div className="ticker-content ">
          {countries.concat(countries).map((country, idx) => (
            <div key={`${country.code}-${idx}`} className="ticker-item">
              <div className="w-10 h-10 rounded-full bg-transparent shadow-sm border border-black p-1 flex items-center justify-center overflow-hidden">
                <img
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
                  alt={`${country.name} flag`}
                  className="w-full rounded-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-sm mt-1 text-slate-500 uppercase font-bold">{country.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Form />
    </div>
  );
{/* desktop statcard */}
  const StatsGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="opacity-0 animate-scaleIn animation-delay-100">
        <StatCard value="15+" label="Years of experience" color="bg-gradient-to-tl from-[#1D318A] to-[#428699] font-manrope opacity-80 text-white" />
      </div>
      <div className="opacity-0 animate-scaleIn animation-delay-200">
        <StatCard value="200+" label="Partner Institutions" color="bg-slate-50 border font-manrope border-black" />
      </div>
      <div className="opacity-0 animate-scaleIn animation-delay-300">
        <StatCard value="5000+" label="Trusted Guidance" color="bg-gradient-to-tl from-[#1D318A] to-[#428699] font-manrope opacity-80 text-white" />
      </div>
      <div className="opacity-0 animate-scaleIn animation-delay-400">
        <StatCard value="99%" label="Visa Success Rate" color="bg-slate-50 font-manrope border border-black" />
      </div>
    </div>
  );
{/* mobile statcard */}
  const StatsMobile = () => (
    <div ref={statsMobileRef} className="grid grid-cols-2 gap-2">
      <div className={statCardsVisible ? "opacity-0 animate-scaleIn animation-delay-100" : ""}>
        <StatCard value="15+" label="Years of experience" color="bg-gradient-to-tl from-[#1D318A] to-[#428699] font-manrope opacity-80 text-white" />
      </div>
      <div className={statCardsVisible ? "opacity-0 animate-scaleIn animation-delay-200" : ""}>
        <StatCard value="200+" label="Partner Institutions" color="bg-slate-50 border font-manrope border-slate-400" />
      </div>
      <div className={statCardsVisible ? "opacity-0 animate-scaleIn animation-delay-300" : ""}>
        <StatCard value="5000+" label="Trusted Guidance" color="bg-white border font-manrope border-slate-400 text-slate-900" />
      </div>
      <div className={statCardsVisible ? "opacity-0 animate-scaleIn animation-delay-400" : ""}>
        <StatCard value="99%" label="Visa Success Rate" color="bg-gradient-to-tl from-[#1D318A] to-[#428699] font-manrope opacity-80 text-white" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#DBF0FF] via-[#FFFFFF] to-[#ede6fd] font-sans text-slate-800">
      <style>{tickerStyle}</style>
      <div className="max-w-8xl mx-auto px-4 py-8 md:px-12  sm:py-10 lg:px-24  xl:px-32  2xl:px-40  flex flex-col lg:flex-row gap-12 xl:gap-16 2xl:gap-20 items-start">

        {/* Left Column: Content */}
        <div className="lg:w-1/2 space-y-5 xl:space-y-6 2xl:space-y-6 w-full">
          <header className="space-y-4 sm:space-y-8 lg:space-y-12 xl:space-y-14 2xl:space-y-16"> 
            <div className="flex items-center gap-3 lg:hidden opacity-0 animate-fadeIn animation-delay-100">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Client" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 mt-1 font-manrope text-xs">Trusted By Clients Across Study, Work <br /> Visitor & Spouse Visas</p>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-5xl font-bold font-manrope tracking-tight leading-tight sm:leading-snug text-slate-700 opacity-0 animate-fadeInUp">
              Expert Guidance For Every Visa Pathway
            </h1>

            

            {/* Mobile/Tablet Only Benefits - After heading */}
            <ul className="space-y-2 sm:space-y-3 block lg:hidden">
              <div className="opacity-0 animate-slideInLeft animation-delay-200">
                <BenefitItem text="Clear and simple visa application support" />
              </div>
              <div className="opacity-0 animate-slideInLeft animation-delay-300">
                <BenefitItem text="Personalized support for all visa needs" />
              </div>
              <div className="opacity-0 animate-slideInLeft animation-delay-400">
                <BenefitItem text="End-to-end visa assistance from start to finish" />
              </div>
            </ul>

            {/* Desktop Only Trusted By Clients */}
            <div className="hidden lg:flex items-center gap-3 opacity-0 animate-fadeIn animation-delay-200">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Client" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-500 font-manrope text-md">Trusted By Clients Across Study, Work, Visitor & Spouse Visas</p>
              </div>
            </div>
          </header>

          {/* Mobile/Tablet Form - After benefits */}
          <div className="block lg:hidden opacity-0 animate-fadeIn animation-delay-500">
            <FormComponent />
          </div>          
          <p className="text-lg xl:text-lg font-semibold p-2 tracking-normal font-manrope text-slate-700 leading-relaxed opacity-0 animate-fadeInUp animation-delay-300">
            Clear, honest advice to help you choose the right visa, avoid costly mistakes, and move forward with confidence.
          </p>

          {/* Stats Grid - Mobile/Tablet: Swipeable with white/colored bg */}
          <div className="block lg:hidden">
            <StatsMobile />
          </div>

          {/* Stats Grid - Desktop Only (original colors) */}
          <div className="hidden lg:block">
            <StatsGrid />
          </div>

          {/* Mobile/Tablet Testimonial - After stats */}
          <div className="block lg:hidden opacity-0 animate-fadeIn animation-delay-600">
            <Testimonial />
          </div>

          {/* Benefits List - Desktop Only */}
          <ul className="space-y-4 hidden lg:block">
            <div className="opacity-0 animate-slideInLeft animation-delay-400">
              <BenefitItem text="Clear and simple visa application support, guiding you through every step with ease and confidence." />
            </div>
            <div className="opacity-0 animate-slideInLeft animation-delay-500">
              <BenefitItem text="Personalized support for all your visa needs, ensuring tailored solutions for a smooth and hassle-free process." />
            </div>
            <div className="opacity-0 animate-slideInLeft animation-delay-600">
              <BenefitItem text="End-to-end visa assistance from start to finish, providing complete support and expert advice throughout the entire journey." />
            </div>
          </ul>

          {/* INTEGRATED SOCIAL PROOF SECTION */}
          <div className="pt-5 border-t border-slate-200 opacity-0 animate-fadeInUp animation-delay-500">
            {/* Mobile: Single row with smaller items */}
            <div className="flex lg:hidden items-center justify-between w-full gap-3">
              {/* mobile YouTube */}
              <a
                href="https://www.youtube.com/@AmratpalaVision"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group cursor-pointer flex-1"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <span className="text-sm font-bold font-manrope text-slate-900 tracking-tight text-center leading-tight">
                  35K+ Youtube subscribers
                </span>
              </a>

              {/* mobile Google Reviews */}
              <div className="flex flex-col items-center cursor-default flex-1">
                <div className="flex items-baseline gap-1">
                  <img src="./images/Google-rating-ico.webp" alt="google ratings" className='h-16' />
                </div>
              </div>

              {/*mobile Instagram */}
              <a
                href="https://instagram.com/amratpalavision_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group cursor-pointer flex-1"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <span className="text-sm font-bold font-manrope text-slate-900 tracking-tight text-center leading-tight">
                  17K+ Instagram Followers
                </span>
              </a>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden lg:flex flex-wrap items-center justify-between w-full gap-8 sm:gap-4">
              {/* Desktop YouTube */}
              <a
                href="https://www.youtube.com/@AmratpalaVision"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <span className="text-sm font-bold font-manrope text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  35K+ Youtube Subscribers
                </span>
              </a>

              {/* Desktop Google Reviews */}
              <div className="flex flex-col items-center cursor-default">
                <div className="flex items-baseline gap-1 mb-1">
                  <img src="./images/Google-rating-ico.webp" alt="google ratings" className='h-20' />
                </div>
              </div>

              {/* Desktop Instagram */}
              <a
                href="https://instagram.com/amratpalavision_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <span className="text-xs font-bold font-manrope text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  17K+ Instagram Followers
                </span>
              </a>
            </div>

            <div className="w-full flex justify-center border-t border-slate-100 mt-10">
              <div className="text-center py-4 text-sm font-manrope text-slate-500">
                Copyright © 2012 - 2026 Amratpal A Vision®. All rights reserved.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form - Desktop Only */}
        <div className="lg:w-1/2 w-full hidden lg:block">
          <FormComponent />
        </div>
      </div>


    </div>
  );
};

// Sub-components
const StatCard = ({ value, label, color }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    const suffix = value.replace(/\d/g, '');
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let currentValue = 0;
    const increment = Math.ceil(numericValue / 90);
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        setDisplayValue(numericValue + suffix);
        clearInterval(interval);
      } else {
        setDisplayValue(currentValue.toLocaleString() + suffix);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className={`p-4 xl:p-5 2xl:p-4 rounded-lg flex flex-col justify-between h-22 ${color} transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-default`}>
      <span className="text-2xl xl:text-2xl 2xl:text-2xl mb-3 font-bold transition-all duration-300">{displayValue}</span>
      <span className="text-md xl:text-lg 2xl:text-lg font-manrope leading-tight font-semibold opacity-90">{label}</span>
    </div>
  );
};

const BenefitItem = ({ text }) => (
  <div className=''>
  <li className="flex gap-2 sm:gap-3 items-start">
    <span className="material-symbols-outlined text-violet-800 shrink-0">check_circle</span>
    <p className="text-md sm:text-base lg:text-lg xl:text-lg 2xl:text-md font-semibold font-manrope text-slate-900">{text}</p>
  </li>
  </div>
);

export default Home;