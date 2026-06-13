/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { IMAGES } from '../constants/images';
import { OptimizedImage } from './OptimizedImage';
import { Shield, Eye, Flame, Award, HeartHandshake, CheckCircle } from 'lucide-react';

export function AboutView() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* HEADER SECTION */}
      <section className="py-16 border-b border-zinc-900 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center md:text-left">
          <span className="text-[10px] tracking-[0.25em] font-mono font-black text-orange-500 uppercase block mb-2">
            PROFIL PERUSAHAAN KAMI
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
            TENTANG JK BUILDING JOGJAKARTA
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl mt-2 leading-relaxed">
            Berakar di Prambanan Sleman, kami membangun hunian berstruktur kokoh yang mengedepankan kualitas pilar cakar ayam, transparansi sasis, dan kenyamanan interior.
          </p>
        </div>
      </section>

      {/* FOUNDER SPOTLIGHT (Fokus 1 Orang: Ir. Hendra Wijaya) */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Big Artistic Photo Card (Left Desk) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group"
            >
              <OptimizedImage
                src={IMAGES.aboutFounder}
                alt="Ir. Hendra Wijaya - CEO & Founder JK Building"
                aspectRatio="aspect-[3/4]"
                loading="lazy"
                className="group-hover:scale-105 transition-transform duration-[4000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-orange-500 font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                  CEO & FOUNDER
                </span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Ir. Hendra Wijaya
                </h3>
                <p className="text-zinc-400 text-xs mt-0.5">
                  Ikatan Ahli Konstruksi Sipil Yogyakarta
                </p>
              </div>
            </motion.div>
          </div>

          {/* Inspirational Quote & Details (Right Desk) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block">
                PESAN DARI PENDIRI
              </span>
              <div className="h-1.5 w-12 bg-orange-600 rounded" />
            </div>

            {/* Quote block */}
            <blockquote className="border-l-4 border-orange-500 pl-6 space-y-4 py-1">
              <p className="text-lg md:text-xl text-zinc-200 italic font-medium leading-relaxed">
                “Sebuah bangunan tidak sekadar didirikan oleh semen dan besi, melainkan dirajut oleh kepercayaan konsumen, kepresisian kalkulasi, serta tanggung jawab sipil untuk generasi mendatang.”
              </p>
              <cite className="block text-xs font-mono font-black text-white uppercase not-italic">
                — Ir. Hendra Wijaya, Direktur Utama
              </cite>
            </blockquote>

            <div className="text-zinc-400 text-xs md:text-sm leading-relaxed space-y-4">
              <p>
                JK Building didirikan atas misi menghadirkan jasa pemborong bangunan yang menjunjung tinggi etika kejujuran struktural di Provinsi Daerah Istimewa Yogyakarta. Kami menyadari bahwa proses mendirikan rumah seringkali dihantui rasa was-was dari pemilik mengenai manipulasi kualitas besi pilar dan penggelembungan komparatif biaya material.
              </p>
              <p>
                Oleh sebab itu, kami di sini menerapkan standard pembukuan anggaran RAB yang transparan dan dapat ditrace langsung oleh klien. Didukung kru teknik sipil berlisensi, kami mendedikasikan pilar cakar ayam berkekuatan tekan tinggi di setiap tapak pilar JK Building.
              </p>
            </div>

            {/* Quick credentials columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-900">
              <div className="flex gap-2.5">
                <Award className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase text-white">Lisensi SBU</h4>
                  <p className="text-zinc-500 text-[10px]">Sertifikasi Badan Usaha Sipil</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <Shield className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase text-white">Bahan SNI</h4>
                  <p className="text-zinc-500 text-[10px]">Material Lulus Uji Menara Kayu</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <HeartHandshake className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase text-white">Garansi Fisik</h4>
                  <p className="text-zinc-500 text-[10px]">6 Bulan Proteksi Bebas Bocor</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* VISION & MISSION DISPLAYED WITH STAGGER ANIMATIONS */}
      <section className="py-20 bg-zinc-900/60 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block mb-2">
              PRINSIP OPERASIONAL
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              VISI LOKAL & MISI ADAPTIF KAMI
            </h2>
            <div className="h-1.5 w-16 bg-orange-600 mx-auto mt-4 rounded" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
          >
            {/* Vision Card */}
            <motion.div
              variants={itemVariants}
              className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-2xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black uppercase text-white tracking-widest">
                  VISI UTAMA KAMI
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed italic">
                  “Menjadi perusahaan kontraktor sipil terdepan di Daerah Istimewa Yogyakarta yang dipercaya karena integritas akurasi RAB, kepresisian estetika arsitektur, dan kepatuhan absolut terhadap aspek keselamatan struktural.”
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex items-center gap-2 text-zinc-500 text-[11px] font-mono">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                Diuji secara berkala oleh Standard Sipil.
              </div>
            </motion.div>

            {/* Mission Card containing list points staggered */}
            <motion.div
              variants={itemVariants}
              className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-2xl space-y-6"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-widest mb-4">
                MISI KERJA HARIAN KAMI
              </h3>
              
              <ul className="space-y-4">
                {[
                  'Menjamin tidak adanya pemotongan kualitas besi pondasi (zero structure compromise) demi keuntungan sempit.',
                  'Menyusun Rencana Anggaran Biaya (RAB) yang presisi, mendalam, dan transparan bagi semua tingkat ekonomi klien.',
                  'Memakai tukang bangunan lokal terverifikasi di wilayah Sleman & Bantul yang cakap di bidang pemasangan bata & plasteran presisi.',
                  'Menyerahkan bangunan secara tepat jadwal dengan jaminan garansi pemeliharaan kebocoran atap yang tegas.'
                ].map((pt, i) => (
                  <li key={`milestone-${i}`} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 font-bold font-mono text-[10px] flex items-center justify-center border border-orange-500/20 shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">{pt}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TEAM CONSTRUCTION REPRESENTATION ILLUSTRATION */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block">
              DEDIKASI KRU LAPANGAN
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-white leading-tight">
              TUKANG BANGUNAN DISIPLIN JOGJAKARTA
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              Tim konstruktor lapangan JK Building merupakan praktisi bersertifikasi yang berdisiplin penuh terhadap kerapian pengerjaan nat ubin, ketebalan luluhan cor beton, serta kedataran level semen (leveling) menggunakan waterpass laser digital demi struktur seimbang seumur hidup.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
              <OptimizedImage
                src={IMAGES.aboutTeam}
                alt="Tim Konstruksi JK Building sedang Mengerjakan Tapak Pilar"
                aspectRatio="aspect-video"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
