/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  Building,
  Wrench,
  Hammer,
  FileText,
  User,
  Clock,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { IMAGES } from '../constants/images';
import { SERVICES, ARTICLES, TESTIMONIALS, FAQ_DATA, Article } from '../data';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { OptimizedImage } from './OptimizedImage';

interface HomeViewProps {
  onNavigate: (page: string) => void;
  onReadArticle: (article: Article) => void;
}

export function HomeView({ onNavigate, onReadArticle }: HomeViewProps) {
  // HERO SLIDER STATE
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [IMAGES.heroSlide1, IMAGES.heroSlide2];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // CALCULATOR RAB STATE
  const [areaSize, setAreaSize] = useState<number | string>('100');
  const [floorsCount, setFloorsCount] = useState<number>(1);
  const [materialQuality, setMaterialQuality] = useState<string>('medium');
  const [rabResult, setRabResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calcError, setCalcError] = useState<string | null>(null);

  // FAQ ACCORDION INDICES
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  // Trigger Backend-Powered RAB calculation with client-side fallback
  const handleCalculateRAB = async (e: FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setCalcError(null);

    try {
      const response = await fetch('/api/rab/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          areaSize,
          floorsCount,
          materialQuality
        })
      });

      if (response.ok) {
        const resJson = await response.json();
        if (resJson.success) {
          setRabResult(resJson.data);
          setIsCalculating(false);
          return;
        }
      }
      throw new Error('Fallback to local calculation');
    } catch (err) {
      // Robust local calculation so that this always works regardless of hosting environment!
      const area = parseFloat(areaSize.toString());
      const floors = parseInt(floorsCount.toString(), 10);

      if (!isNaN(area) && area > 0 && !isNaN(floors) && floors > 0) {
        let ratePerMeter = 3500000;
        let qualityLabel = 'Standar';

        if (materialQuality === 'medium') {
          ratePerMeter = 4400000;
          qualityLabel = 'Medium';
        } else if (materialQuality === 'premium') {
          ratePerMeter = 5300000;
          qualityLabel = 'Premium';
        }

        let floorMultiplier = 1.0;
        if (floors === 2) {
          floorMultiplier = 1.85;
        } else if (floors >= 3) {
          floorMultiplier = 2.65 * (floors / 3);
        }

        const totalEstimatedCost = area * ratePerMeter * floorMultiplier;

        const breakdown = {
          struktur: Math.round(totalEstimatedCost * 0.40),
          finishing: Math.round(totalEstimatedCost * 0.35),
          atapPlafon: Math.round(totalEstimatedCost * 0.15),
          mep: Math.round(totalEstimatedCost * 0.10)
        };

        setRabResult({
          area,
          floors,
          materialQuality: qualityLabel,
          ratePerMeter,
          totalEstimatedCost: Math.round(totalEstimatedCost),
          breakdown
        });
      } else {
        setCalcError('Parameter ukuran bangunan atau lantai tidak valid.');
      }
    } finally {
      setIsCalculating(false);
    }
  };

  // Run calculation immediately on load so user sees calculations with resilient fallback
  useEffect(() => {
    fetch('/api/rab/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ areaSize: 100, floorsCount: 1, materialQuality: 'medium' })
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        if (d.success) {
          setRabResult(d.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        // Fallback calculation for initial load
        const area = 100;
        const floors = 1;
        const ratePerMeter = 4400000; // Medium
        const totalEstimatedCost = area * ratePerMeter * 1.0;
        setRabResult({
          area,
          floors,
          materialQuality: 'Medium',
          ratePerMeter,
          totalEstimatedCost,
          breakdown: {
            struktur: Math.round(totalEstimatedCost * 0.40),
            finishing: Math.round(totalEstimatedCost * 0.35),
            atapPlafon: Math.round(totalEstimatedCost * 0.15),
            mep: Math.round(totalEstimatedCost * 0.10)
          }
        });
      });
  }, []);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="bg-zinc-950 text-white selection:bg-orange-600">
      {/* 2-SLIDE AUTOMATIC FADE HERO SECTION */}
      <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
        {/* Background Fade slides */}
        {heroSlides.map((slideUrl, idx) => (
          <div
            key={`hero-slide-${idx}`}
            className="absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: currentHeroSlide === idx ? 1 : 0, zIndex: currentHeroSlide === idx ? 1 : 0 }}
          >
            <img
              src={slideUrl}
              alt={`JK Building Slide ${idx + 1}`}
              className="w-full h-full object-cover scale-105 transition-transform duration-[6000ms] ease-out"
              style={{ transform: currentHeroSlide === idx ? 'scale(1)' : 'scale(1.05)' }}
            />
          </div>
        ))}

        {/* Elegant Black Overlay */}
        <div className="absolute inset-0 bg-zinc-950/75 z-[2]" />

        {/* Hero Teks Layout */}
        <div className="relative z-[3] max-w-4xl mx-auto px-4 md:px-6 text-center select-none">
          {/* Upper Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center border border-orange-500/30 bg-zinc-900/60 backdrop-blur-md rounded-full px-5 py-2 mb-6"
          >
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-orange-500 uppercase">
              “KOKOH, PRESISI, DAN DIBANGUN UNTUK GENERASI.”
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-5"
          >
            “Wujudkan Rumah Impian Anda<br />
            dari Nol Hingga Sempurna.”
          </motion.h1>

          {/* Sub-description with low-contrast styled italic */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-zinc-400 text-xs md:text-sm lg:text-base italic max-w-3xl mx-auto leading-relaxed mb-10"
          >
            “Kami percaya struktur yang kuat berawal dari perencanaan yang matang. Dari bangun baru hingga renovasi total, kami hadir memastikan setiap sudut hunian Anda kokoh, fungsional, dan bernilai tinggi.”
          </motion.p>

          {/* CTA Button capsule oval */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center rounded-full border border-white hover:border-orange-500/80 bg-transparent text-white hover:text-orange-500 text-xs md:text-sm font-black uppercase tracking-widest py-3.5 px-8 transition-all duration-300 transform active:scale-95 group shadow-lg"
            >
              Mulai Konsultasi Proyek
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Bottom wave border deco */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent z-[3]" />
      </section>

      {/* SERVICE HIGHLIGHTS (4 grid) */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block mb-2">
              LAYANAN UNGGULAN KAMI
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              INTEGRITAS JASA KONSTRUKSI
            </h2>
            <div className="h-1.5 w-16 bg-orange-600 mx-auto mt-4 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv, idx) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => onNavigate('services')}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-950/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    {srv.id === 'bangun-baru' && <Building className="w-6 h-6" />}
                    {srv.id === 'renovasi-total' && <Wrench className="w-6 h-6" />}
                    {srv.id === 'arsitektur-interior' && <Hammer className="w-6 h-6" />}
                    {srv.id === 'jasa-sipil-estimasi' && <Calculator className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase group-hover:text-orange-500 transition-colors duration-300 mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                    {srv.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-orange-500 text-xs font-mono font-black uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                  Detail Layanan
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT SHORTCUT & BEFORE AFTER SLIDER */}
      <section className="py-20 bg-zinc-900/50 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block mb-1">
                KARYA NYATA JK BUILDING
              </span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                RENOVASI SEBELUM & SESUDAH
              </h2>
            </div>
            <div>
              <button
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2 text-nowrap bg-zinc-800 hover:bg-orange-600 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all duration-300 group shadow-md"
              >
                Lihat Semua Proyek
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left/Desktop Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-orange-500 text-xs font-mono font-bold tracking-wider uppercase block">
                SOROTAN TRANSFORMATION
              </span>
              <h3 className="text-xl md:text-2xl font-black uppercase text-white leading-snug">
                RESTRUKTURISASI RUKO RETRO MENJADI KEDAI MODERN
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Di JK Building, kami bangga dapat merevitalisasi bangunan tua yang kritis menjadi sasis kokoh dengan interior menawan. Contoh pengerjaan ini membuktikan dedikasi struktur kami menjaga aset tanpa melalaikan modernitas.
              </p>
              <div className="space-y-3.5">
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-600/20 text-orange-500 flex items-center justify-center shrink-0 text-xs font-black">1</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white">Integrasi Pondasi Cakar Ayam</h4>
                    <p className="text-zinc-400 text-[11px]">Sistem cakar ayam kami menjamin daya tekan lateral di Prambanan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-600/20 text-orange-500 flex items-center justify-center shrink-0 text-xs font-black">2</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white">Finishing Presisi Millimeter</h4>
                    <p className="text-zinc-400 text-[11px]">Setiap nat ubin, tepi pilar, dan kusen jendela diukur presisi laser.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Slider */}
            <div className="lg:col-span-7">
              <BeforeAfterSlider beforeSrc={IMAGES.homeBefore} afterSrc={IMAGES.homeAfter} />
            </div>
          </div>
        </div>
      </section>

      {/* KALKULATOR RAB KASAR (FULL-STACK LIVE COMPUTE) */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block mb-2">
              ESTIMASI BUDGET TRANSPARAN
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              KALKULATOR PREDIKSI ESTIMASI RAB
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
              Dapatkan ancar-ancar rancangan anggaran biaya (RAB) kasar secara langsung yang diproses real-time oleh server kalkulator JK Building Jogja.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input Form Column (Kiri/Desktop) */}
            <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <form onSubmit={handleCalculateRAB} className="space-y-6">
                <div>
                  <label className="block text-xs font-extrabold text-orange-500 uppercase tracking-widest mb-2.5">
                    Luas Total Bangunan (m²)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="15"
                      max="1000"
                      value={areaSize}
                      onChange={(e) => setAreaSize(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3.5 text-sm outline-none text-white font-mono font-bold transition-all"
                      placeholder="Contoh: 120"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-xs font-bold">
                      METER PERSEGI
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-orange-500 uppercase tracking-widest mb-2.5">
                    Jumlah Lantai
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((fl) => (
                      <button
                        key={`floor-sel-${fl}`}
                        type="button"
                        onClick={() => setFloorsCount(fl)}
                        className={`py-3 rounded-xl border font-bold text-xs transition-all duration-300 ${
                          floorsCount === fl
                            ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                        }`}
                      >
                        {fl} Lantai
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-orange-500 uppercase tracking-widest mb-2.5">
                    Kualitas & Spesifikasi Material
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        key: 'standard',
                        label: 'Standar Pro',
                        desc: 'Bebas bocor, ubin keramik lokal, cat awet, atap galvalum'
                      },
                      {
                        key: 'medium',
                        label: 'Medium Premium (Rekomendasi)',
                        desc: 'Granit Homogeneous, cat weather-shield, baja ringan SNI'
                      },
                      {
                        key: 'premium',
                        label: 'Luxury Premium',
                        desc: 'Granit slab impor, kusen kayu jati/alumunium YKK, pilar baja'
                      }
                    ].map((item) => (
                      <button
                        key={`quality-sel-${item.key}`}
                        type="button"
                        onClick={() => setMaterialQuality(item.key)}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                          materialQuality === item.key
                            ? 'bg-orange-600/10 border-orange-500 text-white'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                            materialQuality === item.key ? 'border-orange-500 bg-orange-600' : 'border-zinc-700'
                          }`}
                        >
                          {materialQuality === item.key && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                          )}
                        </span>
                        <div>
                          <span className="text-xs font-bold block">{item.label}</span>
                          <span className="text-[10px] text-zinc-400 block mt-0.5">{item.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-800 text-white font-black uppercase text-xs tracking-widest py-4 rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-orange-950/20"
                >
                  {isCalculating ? 'MEMPROSES DI SERVER...' : 'HITUNG BIAYA SEKARANG'}
                </button>
              </form>

              {calcError && (
                <div className="mt-4 p-3 bg-red-950/40 border border-red-800/20 text-red-400 text-xs rounded-xl">
                  {calcError}
                </div>
              )}
            </div>

            {/* Dashboard Hasil Perhitungan Column (Kanan/Desktop) */}
            <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              {rabResult ? (
                <div className="space-y-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] tracking-widest font-mono text-zinc-400 uppercase">
                        ESTIMASI TOTAL ANGGARAN KASAR (RAB)
                      </span>
                      <span className="px-2.5 py-1 bg-orange-600/20 text-orange-500 text-[10px] font-bold rounded uppercase">
                        SPESIFIKASI {rabResult.materialQuality}
                      </span>
                    </div>

                    <div className="text-2xl md:text-3xl font-black text-orange-500 font-mono tracking-tight my-2">
                      {formatRupiah(rabResult.totalEstimatedCost)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-zinc-950 rounded-xl border border-zinc-800/80 my-4">
                      <div>
                        <span className="text-zinc-500 text-[10px] block">Luas Terhitung</span>
                        <span className="text-sm font-black font-mono text-white">
                          {rabResult.area} m² ({rabResult.floors} Lantai)
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] block">Biaya Rata-Rata</span>
                        <span className="text-sm font-black font-mono text-white">
                          {formatRupiah(rabResult.ratePerMeter)} / m²
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-white mb-3">
                      ALOKASI DISTRIBUSI ANGGARAN (STANDAR PU PR)
                    </h4>

                    {/* Breakdown Graphs with customized colors and bars */}
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Pek. Struktur & Fondasi Cakar Ayam (40%)',
                          val: rabResult.breakdown.struktur,
                          percent: 40,
                          bg: 'bg-orange-500'
                        },
                        {
                          title: 'Pek. Pasangan Dinding & Finishing Premium (35%)',
                          val: rabResult.breakdown.finishing,
                          percent: 35,
                          bg: 'bg-zinc-100'
                        },
                        {
                          title: 'Pek. Rangka Atap Baja Ringan & Plafon (15%)',
                          val: rabResult.breakdown.atapPlafon,
                          percent: 15,
                          bg: 'bg-orange-600'
                        },
                        {
                          title: 'Pek. Mekanikal, Elektrikal & Plumbing (10%)',
                          val: rabResult.breakdown.mep,
                          percent: 10,
                          bg: 'bg-zinc-600'
                        }
                      ].map((bar, i) => (
                        <div key={`calc-bar-${i}`} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-medium text-zinc-300">
                            <span>{bar.title}</span>
                            <span className="font-mono font-bold text-white">
                              {formatRupiah(bar.val)}
                            </span>
                          </div>
                          <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`${bar.bg} h-full rounded-full transition-all duration-1000`}
                              style={{ width: `${bar.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-4">
                    <a
                      href={`https://wa.me/6285601448180?text=${encodeURIComponent(
                        `Halo JK Building Jogjakarta, saya ingin berkonsultasi mengenai estimasi RAB kasar bangunan saya:\n\n` +
                        `• Luas Bangunan: ${rabResult.area} m² (${rabResult.floors} Lantai)\n` +
                        `• Jenis Material: Spesifikasi ${rabResult.materialQuality}\n` +
                        `• Biaya Rata-rata: ${formatRupiah(rabResult.ratePerMeter)} / m²\n` +
                        `• Estimasi Total RAB: ${formatRupiah(rabResult.totalEstimatedCost)}\n\n` +
                        `Apakah saya bisa berkonsultasi lebih lanjut mengenai detail pembangunan dan membuat janji survey lokasi? Terima kasih.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-orange-600 hover:bg-orange-750 active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-orange-650/10 cursor-pointer text-center"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      Lanjut ke WhatsApp untuk Membahas Hasil RAB ini
                    </a>

                    <p className="text-[10px] text-zinc-500 italic text-center leading-relaxed block">
                      *Estimasi ini bersifat acuan kasar awal. Silakan jadwalkan survey lapangan gratis melalui WhatsApp agar tim ahli teknik sipil kami dapat menyusun kontrak harga borongan final yang mengikat secara aman.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8 text-zinc-500 text-xs">
                  Mengalkulasi hasil perhitungan anggaran...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (STREET CERTIFIED 3 ITEMS - VERTICAL ON MOBILE) */}
      <section className="py-20 bg-zinc-900/40 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block mb-2">
              APRESIASI PELANGGAN
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              TESTIMONI KLIEN KAMI
            </h2>
            <div className="h-1.5 w-16 bg-orange-600 mx-auto mt-4 rounded" />
          </div>

          {/* Grid layout: stacked on mobile, row on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testi, idx) => (
              <motion.div
                key={testi.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-orange-500 mb-4">
                    {Array.from({ length: testi.rating }).map((_, i) => (
                      <span key={`star-${i}`} className="text-base">★</span>
                    ))}
                  </div>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed italic mb-6">
                    “{testi.quote}”
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 text-orange-500 font-extrabold flex items-center justify-center border border-zinc-700 text-xs uppercase">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">{testi.name}</h4>
                    <p className="text-zinc-500 text-[10px] uppercase font-mono">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTIKEL EDUKASI (UP TO 3 ITEMS ON HOME) */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block mb-2">
                EDUKASI TEKNOLOGI SIPIL
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                ARTIKEL & INFORMASI CONSTRUKSI
              </h2>
            </div>
            <div>
              <button
                onClick={() => onNavigate('contact')} // Directly switches to contact or articles can be clicked
                className="flex items-center gap-1.5 text-orange-500 hover:text-orange-400 text-xs font-mono font-black uppercase tracking-wider"
              >
                Konsultasi Gratis Sekarang
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((art, idx) => (
              <motion.article
                key={art.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => onReadArticle(art)}
                className="group bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-500/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <OptimizedImage
                    src={art.image}
                    alt={art.title}
                    aspectRatio="aspect-video"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3.5">
                      <span className="px-2 py-0.5 bg-orange-600/10 text-orange-500 text-[9px] font-bold tracking-widest rounded uppercase">
                        {art.category}
                      </span>
                      <span className="text-zinc-500 text-[10px] font-mono">
                        {art.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white uppercase group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-snug mb-3">
                      {art.title}
                    </h3>

                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/50 mt-4">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-500">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                  <span className="text-orange-500 text-xs font-black uppercase tracking-wider group-hover:translate-x-1.5 transition-all duration-300 inline-flex items-center gap-1">
                    Baca Artikel →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BUTTON BAR */}
      <section className="bg-orange-600 py-12 relative overflow-hidden">
        {/* Subtle decorative layout blurs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight">
              KONSULTASIKAN RUMAH IMPIAN ANDA SEKARANG
            </h2>
            <p className="text-white/80 text-xs md:text-sm font-medium">
              Tim teknik sipil JK Building siap melayani survey lokasi gratis di Daerah Istimewa Yogyakarta.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/6285601448180"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-zinc-900 text-white font-black uppercase text-xs tracking-widest py-3.5 px-7 rounded-sm flex items-center gap-2 transition-all duration-300 shadow-xl"
            >
              <PhoneCall className="w-4 h-4 text-orange-500" />
              +62 856-0144-8180
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white hover:bg-zinc-100 text-orange-600 font-black uppercase text-xs tracking-widest py-3.5 px-7 rounded-sm transition-all duration-300 shadow-xl"
            >
              Ajukan Penawaran
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
