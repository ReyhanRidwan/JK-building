/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { OptimizedImage } from './OptimizedImage';
import { Home, Wrench, Compass, Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesViewProps {
  onNavigate: (page: string) => void;
}

export function ServicesView({ onNavigate }: ServicesViewProps) {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* HEADER DIV */}
      <section className="relative py-16 border-b border-zinc-900 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center md:text-left">
          <span className="text-[10px] tracking-[0.25em] font-mono font-black text-orange-500 uppercase block mb-2">
            LAYANAN SPESIALIS KONSTRUKSI
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
            SOLUSI BANGUNAN KOKOH & PRESISI
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl mt-2 leading-relaxed">
            Dari renovasi atap parsial hingga pembangunan gedung residensial bertingkat penuh, JK Building
            menyediakan sasis pengerjaan terakreditasi SNI.
          </p>
        </div>
      </section>

      {/* 2-COLUMN SERVICE GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/20 hover:shadow-[0_20px_50px_rgba(234,88,12,0.15)] transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Visual support image */}
                <OptimizedImage
                  src={srv.image}
                  alt={srv.title}
                  aspectRatio="aspect-video"
                  loading="lazy"
                  className="group-hover:scale-105 transition-transform duration-[3000ms]"
                />

                <div className="p-6 md:p-8 space-y-6">
                  {/* Icon & title bar */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                      {srv.id === 'bangun-baru' && <Home className="w-6 h-6" />}
                      {srv.id === 'renovasi-total' && <Wrench className="w-6 h-6" />}
                      {srv.id === 'arsitektur-interior' && <Compass className="w-6 h-6" />}
                      {srv.id === 'jasa-sipil-estimasi' && <Calculator className="w-6 h-6" />}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-orange-500 transition-colors">
                      {srv.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="h-px bg-zinc-800/80 my-4" />

                  {/* Bullet features */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-mono font-black text-orange-500 tracking-widest block">
                      RUANG LINGKUP & GARANSI FISIK:
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {srv.features.map((feat, fIdx) => (
                        <li key={`feat-${fIdx}`} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Consultation trigger line */}
              <div className="p-6 md:p-8 pt-0 mt-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-zinc-950 hover:bg-orange-600 border border-zinc-800 hover:border-orange-500 text-zinc-400 hover:text-white font-extrabold uppercase text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Konsultasikan Kebutuhan Ini
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ADDITIONAL ACCREDITATIONS HEADER */}
      <section className="bg-zinc-900 border-t border-zinc-800 py-16 text-zinc-400 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-mono text-zinc-500 uppercase block">
            AKREDITASI & KOMITMAN PREMIUM
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            MUTU STRUKTUR TANPA REKAYASA BIAYA
          </h2>
          <p className="text-xs md:text-sm max-w-xl mx-auto leading-relaxed text-zinc-400">
            Kami tegas menolak pemakaian besi non-ulir banci di pilar utama, dan hanya mengaplikasikan material kayu legal berkualitas tinggi. Kepercayaan pelanggan adalah aset abadi kami.
          </p>
        </div>
      </section>
    </div>
  );
}
