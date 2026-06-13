/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  Construction,
  MessageSquareShare
} from 'lucide-react';

export function ContactView() {
  // FORM STATE
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('bangun-baru');
  const [message, setMessage] = useState('');

  // API STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [errorResponse, setErrorResponse] = useState<string | null>(null);

  // Address variables
  const addressStr = 'Cepit, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessResponse(null);
    setErrorResponse(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          projectType,
          message
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessResponse(data.message);
        // Clear inputs after success
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        setErrorResponse(data.message || 'Maju gagal. Silahkan coba lagi.');
      }
    } catch (err) {
      setErrorResponse('Gagal menghubungi server JK Building Api.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* HEADER SECTION */}
      <section className="py-16 border-b border-zinc-900 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center md:text-left">
          <span className="text-[10px] tracking-[0.25em] font-mono font-black text-orange-500 uppercase block mb-2">
            FORM KONSULTASI RESMI
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
            HUBUNGI INSYINYUR JK BUILDING
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl mt-2 leading-relaxed">
            Mulailah merencanakan rumah impian Anda. Isi detail formulir di bawah, dan tim teknik sipil kami akan
            menghubungi Anda dalam waktu kurang dari 24 jam.
          </p>
        </div>
      </section>

      {/* TWO-COLUMN LAYOUT */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN: INFO KONTAK IN ZINC-900 BOX */}
          <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-orange-500 tracking-widest block mb-2">
                  MARKETING OFFICE
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight text-white">
                  INFORMASI KANTOR PUSAT
                </h3>
              </div>

              {/* Grid of contact coordinates */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">alamat lengkap</h4>
                    <p className="text-zinc-200 text-xs font-medium leading-relaxed mt-1">
                      {addressStr}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">hotline whatsapp</h4>
                    <a
                      href="https://wa.me/6285601448180"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-400 text-sm font-black block mt-1"
                    >
                      +62 856-0144-8180
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">surel korespondensi</h4>
                    <a
                      href="mailto:info@jkbuilding.co.id"
                      className="text-zinc-200 text-xs font-medium block mt-1 hover:text-orange-500 transition-colors"
                    >
                      info@jkbuilding.co.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">jam operasional</h4>
                    <p className="text-zinc-300 text-xs font-medium block mt-1">
                      Senin - Sabtu: 08.00 - 16.00 WIB
                      <span className="block text-[10px] text-zinc-500 mt-0.5">Minggu & Tanggal Merah Libur</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 text-[10px] text-zinc-500 tracking-widest font-mono uppercase text-center lg:text-left">
              JK BUILDING • SLEMAN YOGYAKARTA
            </div>
          </div>

          {/* RIGHT COLUMN: CLEAN FORM DIRECTIVES */}
          <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-base font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <MessageSquareShare className="w-5 h-5 text-orange-500" />
              FORMULIR PENGAJUAN KONSULTASI & RAB
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                    Nama Lengkap Anda *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition-all font-bold"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                    No. WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition-all font-mono font-bold"
                    placeholder="Contoh: +62 856-xxxx-xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                  Alamat Surat Elektronik (Surel/Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition-all font-medium"
                  placeholder="Contoh: budi@gmail.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                  Rencana Jenis Proyek Pekerjaan
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3.5 text-xs outline-none text-white transition-all font-bold cursor-pointer uppercase tracking-wider"
                >
                  <option value="bangun-baru">BANGUN RUMAH BARU DARI NOL</option>
                  <option value="renovasi">RENOVASI RUMAH TOTAL ATAU PARSIAL</option>
                  <option value="arsitektur">KONSULTASI GAMBAR ARSITEK & INTERIOR</option>
                  <option value="jasa-sipil">PEKERJAAN INFRASTRUKTUR & LAINNYA</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                  Uraikan Kebutuhan Detail Proyek Anda *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition-all leading-relaxed font-medium"
                  placeholder="Jelaskan perkiraan luas tanah, lokasi kecamatan Jogja, sisa anggaran tabungan Anda, maupun tenggat penyelesaian..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3.5 bg-orange-600 hover:bg-orange-750 disabled:bg-zinc-800 text-white hover:text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 shadow-md shadow-orange-950/20 cursor-pointer"
                >
                  {isSubmitting ? (
                    'MENGIRIMKAN DATA KE SERVER...'
                  ) : (
                    <>
                      KIRIM PERMINTAAN KONSULTASI SECARA AMAN
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {successResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-green-950/40 border border-green-500/20 rounded-xl flex gap-3 text-green-400 text-xs md:text-sm leading-relaxed"
                >
                  <CheckCircle className="w-5 h-5 shrink-0 text-green-500 mt-0.5" />
                  <div>
                    <h5 className="font-extrabold uppercase text-white mb-1">Pendaftaran Konsultasi Berhasil!</h5>
                    <p>{successResponse}</p>
                  </div>
                </motion.div>
              )}

              {errorResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-red-950/40 border border-red-500/20 rounded-xl flex gap-3 text-red-400 text-xs md:text-sm leading-relaxed"
                >
                  <HelpCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                  <div>
                    <h5 className="font-extrabold uppercase text-white mb-1">Gagal Mengirimkan Form</h5>
                    <p>{errorResponse}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* LOWER PLACEHOLDER MAP USING STYLISH STATIS GRAPHIC AND ACTIONABLE OVERLAYS */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-black tracking-[0.25em] text-orange-500 uppercase block mb-1">
              PETA LOKASI CEpit BOKOHARJO
            </span>
            <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight">
              INTERAKTIF LOCATION PIN OVERLAY
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm max-w-xl">
              Gunakan radar penunjuk arah taktis di bawah ini untuk melihat kedekatan kantor kami dengan candi Prambanan Jogja.
            </p>
          </div>

          {/* Gorgeous Blueprints grid styled map placeholder */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-[21/9] min-h-[250px] bg-zinc-950 flex items-center justify-center">
            {/* Custom SVG backdrop of blueprint mapping curves */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20 stroke-orange-500/15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
              {/* Fake topography contour vectors */}
              <path d="M-100 100 C 100 200, 300 150, 500 300 S 800 200, 1200 400" fill="none" strokeWidth="2" />
              <path d="M-50 150 C 120 230, 340 180, 520 330 S 820 220, 1240 430" fill="none" strokeWidth="1" />
              <path d="M100 50 C 300 120, 400 90, 600 200 S 900 150, 1300 250" fill="none" strokeWidth="1.5" />
            </svg>

            {/* Pulsing interactive pin element */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Radar rings */}
              <div className="absolute w-24 h-24 rounded-full bg-orange-600/10 animate-ping -mt-6 border border-orange-500/20 duration-1000" />
              <div className="absolute w-12 h-12 rounded-full bg-orange-600/20 animate-ping -mt-1 border border-orange-400/20 duration-1000 delay-300" />

              <motion.div
                initial={{ y: -10 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                className="w-12 h-12 bg-orange-600 border border-white hover:bg-white hover:text-orange-600 transition-colors duration-300 rounded-full flex items-center justify-center text-white cursor-pointer shadow-2xl relative"
                onClick={() => window.open('https://maps.google.com/?q=Cepit,+Bokoharjo,+Prambanan,+Sleman')}
              >
                <MapPin className="w-6 h-6 animate-pulse" />
              </motion.div>

              <div className="text-center mt-4 max-w-xs bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl">
                <h4 className="text-xs font-black uppercase text-white tracking-wider">JK BUILDING JOGJA</h4>
                <p className="text-zinc-400 text-[10px] mt-0.5">Cepit, Bokoharjo, Prambanan</p>
                <span className="text-[9px] font-mono font-bold text-orange-500 block mt-1.5 uppercase hover:underline cursor-pointer" onClick={() => window.open('https://maps.google.com/?q=Cepit,+Bokoharjo,+Prambanan,+Sleman')}>
                  BUKA DI GOOGLE MAPS →
                </span>
              </div>
            </div>

            {/* Fake overlay HUD identifiers to give premium construction theme */}
            <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded text-[9px] font-mono text-zinc-500 uppercase">
              GRID: SLEMAN_7.790_110.490
            </div>
            <div className="absolute bottom-4 right-4 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded text-[9px] font-mono text-orange-500 font-bold uppercase">
              STATUS: MARKER LIVE
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
