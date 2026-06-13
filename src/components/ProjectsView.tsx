/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PROJECTS } from '../data';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ProjectGalleryCarousel } from './ProjectGalleryCarousel';
import { Calendar, User, Clock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface ProjectsViewProps {
  onNavigate: (page: string) => void;
}

export function ProjectsView({ onNavigate }: ProjectsViewProps) {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* FULL ORANGE HEADER WITH DECORATIVE BLUR EFFECTS */}
      <section className="relative py-20 bg-orange-600 overflow-hidden">
        {/* Glowing floating blur circle 1 */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        {/* Glowing floating blur circle 2 */}
        <div className="absolute bottom-4 right-12 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] tracking-[0.2em] font-mono font-black text-black/80 bg-white/25 backdrop-blur-md rounded px-3 py-1 uppercase inline-block mb-3">
              PORTOFOLIO RESMI
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter"
          >
            PROYEK PILIHAN JK BUILDING
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/95 text-xs md:text-sm max-w-2xl mt-2 leading-relaxed"
          >
            Kami mendedikasikan pengerjaan fisik struktur terbaik di setiap rincian bangun baru,
            pemeliharaan pilar cakar ayam, and perapian interior kelas tinggi.
          </motion.p>
        </div>
      </section>

      {/* PORTFOLIO LISTING */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-24">
        {PROJECTS.map((proj, idx) => {
          // Alternates left and right on desktop to create a gorgeous visual rhythm
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="border-b border-zinc-900 pb-20 last:border-0 last:pb-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* INFO COL (Kiri/Desktop - Alternated or not) */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-orange-500 font-mono text-xs font-bold uppercase">
                      <MapPin className="w-3.5 h-3.5" />
                      {proj.location}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                      {proj.title}
                    </h2>
                    <div className="h-1 w-12 bg-orange-600 mt-3" />
                  </div>

                  {/* Project metadata pills */}
                  <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-zinc-900 rounded-xl border border-zinc-800 text-[11px]">
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase font-mono">Tahun</span>
                      <span className="text-white font-bold block">{proj.year}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase font-mono">Durasi</span>
                      <span className="text-white font-bold block">{proj.duration}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase font-mono">Klien</span>
                      <span className="text-white font-bold block truncate">{proj.client}</span>
                    </div>
                  </div>

                  {/* Challenges and solutions (Italic as requested) */}
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl border-l-2 border-red-500/80">
                      <h4 className="text-xs font-black uppercase tracking-wider text-red-500 mb-1.5 flex items-center gap-1.5">
                        TANTANGAN UTAMA
                      </h4>
                      <p className="text-zinc-300 text-xs md:text-sm leading-relaxed italic">
                        “{proj.challenge}”
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-900 rounded-xl border-l-2 border-green-500/80">
                      <h4 className="text-xs font-black uppercase tracking-wider text-green-500 mb-1.5 flex items-center gap-1.5">
                        SOLUSI & INTEGRITAS STRUKTUR
                      </h4>
                      <p className="text-zinc-300 text-xs md:text-sm leading-relaxed italic">
                        “{proj.solution}”
                      </p>
                    </div>
                  </div>

                  {/* Professional trust card */}
                  <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-orange-500 shrink-0" />
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      Proyek ini menggunakan perhitungan teknik sipil berstandar nasional dengan
                      material terakreditasi SNI dan diawasi tenaga ahli berlisensi JK Building.
                    </p>
                  </div>
                </div>

                {/* VISUALS COL (Kanan/Desktop - Before After Slider + Carousel below) */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-4">
                    <BeforeAfterSlider beforeSrc={proj.beforeImg} afterSrc={proj.afterImg} />
                    
                    <ProjectGalleryCarousel images={proj.gallery} projectId={proj.id} />
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-zinc-900 border-t border-zinc-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block">
            SIAP MEMULAI JASA PEMBANGUNAN?
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            MILIKI STRUKTUR KOKOH & PRESISI SEKARANG
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Konsultasikan dengan Ir. Hendra Wijaya dan tim arsitek handal kami untuk menyusun
            visualisasi 3D dan estimasi RAB gratis lokasi Yogyakarta.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-black uppercase text-xs tracking-widest py-3.5 px-8 rounded-sm transition-all duration-300 group shadow-lg"
            >
              Mulai Konsultasi Gratis
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
