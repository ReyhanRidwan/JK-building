/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Phone,
  MapPin,
  Mail,
  Hammer,
  ArrowUp,
  MessageCircle,
  Clock,
  Sparkles,
  Building2,
  ChevronRight
} from 'lucide-react';

// Subcomponents
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { ServicesView } from './components/ServicesView';
import { AboutView } from './components/AboutView';
import { FaqView } from './components/FaqView';
import { ContactView } from './components/ContactView';
import { ScrollToTop } from './components/ScrollToTop';
import { InteractiveMap } from './components/InteractiveMap';
import { ArticleReaderModal } from './components/ArticleReaderModal';

// Dataset types
import { Article } from './data';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  // Monitor window scrolling to style the sticky glass navbar and toggle the Back To Top floating chevron
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }

      if (window.scrollY > 420) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (viewKey: string) => {
    setActiveView(viewKey);
    setMobileMenuOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nav links items metadata
  const navLinks = [
    { key: 'home', label: 'Home' },
    { key: 'projects', label: 'Projects' },
    { key: 'services', label: 'Services' },
    { key: 'about', label: 'About Us' },
    { key: 'faq', label: 'FAQ' },
    { key: 'contact', label: 'Contact' }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans min-h-screen flex flex-col justify-between selection:bg-orange-600">
      {/* Scroll to Top Trigger Helper */}
      <ScrollToTop page={activeView} />

      {/* HEADER TOP INFO BAR */}
      <div className="bg-zinc-900 border-b border-zinc-800/80 text-[10px] md:text-xs text-zinc-400 py-2.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 hover:text-orange-500 transition-colors">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <a href="https://wa.me/6285601448180" target="_blank" rel="noopener noreferrer">
                +62 856-0144-8180
              </a>
            </span>
            <span className="flex items-center gap-1.5 hover:text-orange-500 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Prambanan, Sleman, Yogyakarta</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-zinc-400 uppercase text-[9px] font-bold">
              KONSULTASI GRATIS JOGJA ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* STICKY GLASS NAVIGATION BAR */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          navbarScrolled
            ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-850 py-3 shadow-lg'
            : 'bg-zinc-950/40 backdrop-blur-sm border-b border-zinc-900/30 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Black Uppercase Typography */}
          <div
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-sm bg-orange-600 flex items-center justify-center text-white font-black group-hover:bg-white group-hover:text-orange-600 transition-colors duration-300 relative">
              <Hammer className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-black uppercase tracking-tighter text-white block">
                JK BUILDING
              </span>
              <span className="text-[9px] tracking-[0.25em] font-mono text-zinc-500 uppercase block -mt-1 font-bold">
                CONSTRUCTION & ENG.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeView === link.key;
              return (
                <button
                  key={`nav-link-${link.key}`}
                  onClick={() => handleNavigate(link.key)}
                  className={`text-xs uppercase tracking-widest font-extrabold px-4 py-2.5 transition-all duration-300 relative rounded ${
                    isActive
                      ? 'text-orange-500 bg-zinc-900'
                      : 'text-zinc-300 hover:text-orange-500 hover:bg-zinc-900/40'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-orange-600 rounded"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Actions Call Button */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/6285601448180"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-750 text-white font-black text-xs uppercase tracking-wider py-3 px-5 rounded-sm transition-all duration-300 inline-block"
            >
              Hubungi Pemborong
            </a>
          </div>

          {/* Mobile Hamburg Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-300 hover:text-orange-500 focus:outline-none p-1 shrink-0"
              title="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2 flex flex-col">
                {navLinks.map((link) => {
                  const isActive = activeView === link.key;
                  return (
                    <button
                      key={`mob-nav-link-${link.key}`}
                      onClick={() => handleNavigate(link.key)}
                      className={`text-left text-xs uppercase tracking-wider font-black py-3 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-orange-600/10 text-orange-500 border-l-2 border-orange-500 pl-3'
                          : 'text-zinc-300 hover:bg-zinc-850 pl-2'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <div className="pt-4 border-t border-zinc-800 mt-4">
                  <a
                    href="https://wa.me/6285601448180"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-orange-600 text-white font-black uppercase text-xs tracking-widest py-3.5 rounded-xl block shadow-lg shadow-orange-950/20"
                  >
                    +62 856-0144-8180 (WhatsApp)
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* CORE VIEWPORT SUBRENDER CABINET */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={`page-view-${activeView}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {activeView === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onReadArticle={(art) => setReadingArticle(art)}
              />
            )}
            {activeView === 'projects' && <ProjectsView onNavigate={handleNavigate} />}
            {activeView === 'services' && <ServicesView onNavigate={handleNavigate} />}
            {activeView === 'about' && <AboutView />}
            {activeView === 'faq' && <FaqView />}
            {activeView === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* GLOBAL GOOGLE MAPS INTERACTIVE SECTION ON BOTTOM OF ALL PAGES */}
      <InteractiveMap />

      {/* FOOTER: Contact Info, Quick Navigation, Company brief */}
      <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
            
            {/* Brief column (Lg: 5 span) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-sm bg-orange-600 flex items-center justify-center text-white font-black">
                  <Building2 className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="text-lg font-black uppercase tracking-tighter text-white block">
                    JK BUILDING
                  </span>
                  <span className="text-[10px] tracking-[0.25em] font-mono text-zinc-500 uppercase block -mt-1 font-bold">
                    EST. 2018 CEpit
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
                JK Building merupakan perusahaan jasa pemborong konstruksi, arsitektur, dan renovasi perumahan terpercaya di Prambanan, Sleman, Yogyakarta. Kami membangun pilar rumah kokoh untuk diwariskan ke generasi masa depan Anda.
              </p>

              <div className="text-[10px] text-zinc-500 border border-zinc-900 bg-zinc-900/30 p-3 rounded-lg leading-relaxed inline-block max-w-sm">
                Tegas menolak manipulasi volume semen, pemakaian besi banci non-SNI, dan penyelewengan logistik bahan bangunan. Kejujuran struktur adalah nyawa JK Building.
              </div>
            </div>

            {/* Quick links columns (Lg: 3 span) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white text-xs font-black uppercase tracking-widest block">
                NAVIGASI TAUTAN CEPAT
              </h4>
              <div className="h-0.5 bg-orange-600 w-12 rounded" />
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 font-semibold text-xs text-zinc-300">
                {navLinks.map((item) => (
                  <li key={`footer-link-${item.key}`}>
                    <button
                      onClick={() => handleNavigate(item.key)}
                      className="hover:text-orange-500 transition-colors duration-300 inline-flex items-center gap-1 group cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-orange-500" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact coordinates column (Lg: 4 span) */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-white text-xs font-black uppercase tracking-widest block">
                KOORDINAT KANTOR
              </h4>
              <div className="h-0.5 bg-orange-600 w-12 rounded" />
              <div className="space-y-3">
                <p className="flex items-start gap-2 text-zinc-300 leading-relaxed text-xs">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>Cepit, Bokoharjo, Kec. Prambanan, Sleman, D.I. Yogyakarta 55572</span>
                </p>
                <p className="flex items-center gap-2 text-zinc-300 text-xs">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a
                    href="https://wa.me/6285601448180"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-500 transition-colors font-bold font-mono"
                  >
                    +62 856-0144-8180 (WhatsApp)
                  </a>
                </p>
                <p className="flex items-center gap-2 text-zinc-300 text-xs">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <a
                    href="mailto:info@jkbuilding.co.id"
                    className="hover:text-orange-500 transition-colors font-semibold"
                  >
                    info@jkbuilding.co.id
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* LOWER META INFO BAR */}
          <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[10px] font-mono">
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} JK BUILDING. Hak Cipta Dilindungi Undang-Undang.
            </p>
            <div className="flex gap-4">
              <span className="hover:text-zinc-400 cursor-pointer">Sleman, D.I.Y.</span>
              <span>•</span>
              <span className="hover:text-zinc-400 cursor-pointer">Syarat & Ketentuan</span>
              <span>•</span>
              <span className="hover:text-zinc-400 cursor-pointer">Kebijakan Privasi</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING DIRECT WHATSAPP CHAT WIDGET */}
      <a
        href="https://wa.me/6285601448180"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-orange-600 border border-white hover:bg-orange-750 text-white rounded-full p-4 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group shrink-0"
        title="Hubungi Kami Sekarang"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-500 font-black uppercase text-[10px] tracking-widest whitespace-nowrap pl-0 group-hover:pl-3">
          WA: +62 856-0144-8180
        </span>
      </a>

      {/* FLOATING ACTION BACK-TO-TOP BUTTON */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleScrollToTop}
            className="fixed bottom-24 right-6 z-40 bg-zinc-900/90 hover:bg-orange-600 border border-zinc-805 text-zinc-350 hover:text-white rounded-full p-3 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105"
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* GLOBAL FLOATING IMMERSIVE MODAL ARTICLE READER */}
      <AnimatePresence>
        {readingArticle && (
          <ArticleReaderModal
            article={readingArticle}
            onClose={() => setReadingArticle(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
