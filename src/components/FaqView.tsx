/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA, FAQItem } from '../data';
import { HelpCircle, ChevronDown, AlignLeft, PiggyBank, CalendarRange } from 'lucide-react';

export function FaqView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'layanan' | 'biaya' | 'waktu'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = [
    { key: 'all', label: 'Semua Pertanyaan', icon: HelpCircle },
    { key: 'layanan', label: 'Layanan & Teknis', icon: AlignLeft },
    { key: 'biaya', label: 'Biaya & RAB', icon: PiggyBank },
    { key: 'waktu', label: 'Waktu & Garansi', icon: CalendarRange }
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* HEADER DIV */}
      <section className="py-16 border-b border-zinc-900 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center md:text-left">
          <span className="text-[10px] tracking-[0.25em] font-mono font-black text-orange-500 uppercase block mb-2">
            PUSAT INFORMASI KONSUMEN
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
            FAQ & JAWABAN SINGKAT JK BUILDING
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl mt-2 leading-relaxed">
            Temukan jawaban langsung mengenai durasi pengerjaan bangun baru, legalitas perizinan PBG/SIMBG, perhitungan termin RAB, dan cakupan wilayah asuransi kami.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Categories select sidebar (Kiri/Desktop) */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[9px] uppercase font-mono font-black text-orange-500 tracking-wider block mb-3 pl-3">
              KATEGORI PERTANYAAN
            </span>

            <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-3 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={`cat-${cat.key}`}
                    onClick={() => {
                      setActiveCategory(cat.key as any);
                      // Auto-open first item in new active list
                      const firstInCat = FAQ_DATA.find(
                        (f) => cat.key === 'all' || f.category === cat.key
                      );
                      if (firstInCat) {
                        setOpenFaqId(firstInCat.id);
                      }
                    }}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs font-bold whitespace-nowrap transition-all duration-300 w-full shrink-0 ${
                      isActive
                        ? 'bg-orange-600 border border-orange-500 text-white shadow-lg'
                        : 'bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 text-zinc-400 font-medium'
                    }`}
                  >
                    <CatIcon className="w-4 h-4 shrink-0" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion Lists (Kanan/Desktop) */}
          <div className="md:col-span-8 space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <motion.div
                    key={faq.id}
                    layout // Animates layout repositioning elegantly when siblings shrink/grow
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-zinc-900 ${
                      isOpen
                        ? 'border-orange-500/30 shadow-lg shadow-orange-950/5'
                        : 'border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    {/* Collapsible header */}
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-orange-500 animate-pulse' : 'bg-zinc-650'}`} />
                        <h4 className="text-xs md:text-sm font-bold uppercase tracking-tight text-white leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 shrink-0 transform transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-orange-500' : ''
                        }`}
                      />
                    </button>

                    {/* Smooth expansional slide container */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="border-t border-zinc-800/60"
                        >
                          <div className="px-5 py-4 pb-5 text-zinc-400 text-xs md:text-sm leading-relaxed bg-zinc-950/30">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* FOOTNOTE REDIRECT */}
      <section className="bg-zinc-900 border-t border-zinc-800 py-12 text-zinc-400 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-3.5">
          <p className="text-xs leading-relaxed">
            Menemukan pertanyaan spesifik yang belum terjawab di atas?
          </p>
          <a
            href="https://wa.me/6285601448180"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-orange-500 text-xs font-black uppercase tracking-wider transition-colors duration-300"
          >
            Hubungi Technical Support Kami via WhatsApp
            <span>→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
