/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

export function InteractiveMap() {
  const address = 'Cepit, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572';
  const whatsappNumber = '+62 856-0144-8180';
  const encodedAddress = encodeURIComponent(address);
  const mapIframeUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="relative w-full py-10 bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-[10px] tracking-[0.2em] font-bold text-orange-500 uppercase block mb-1">
              LOKASI KANTOR KAMI
            </span>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
              JK BUILDING HEADQUARTERS
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mt-1">
              Hubungi kami atau kunjungi kantor utama kami di Prambanan untuk mendiskusikan
              perencanaan konstruksi, renovasi, dan estimasi anggaran RAB proyek Anda.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://maps.google.com/?q=Cepit,+Bokoharjo,+Prambanan,+Sleman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-xs font-bold uppercase py-3 px-5 rounded-full transition-all duration-300 shadow-md shadow-orange-900/20"
            >
              <Navigation className="w-3.5 h-3.5" />
              Petunjuk Arah Google Maps
            </a>
          </div>
        </div>

        {/* Map Layout Container */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[350px]">
            {/* Embedded Iframe */}
            <div className="col-span-1 lg:col-span-3 h-[350px] lg:h-auto min-h-[350px] relative bg-zinc-900">
              <iframe
                id="gmap-canvas"
                title="JK Building Map"
                src={mapIframeUrl}
                className="w-full h-full border-0 grayscale invert opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Info Sidebar */}
            <div className="col-span-1 bg-zinc-900 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-800">
              <div className="space-y-5">
                <div>
                  <h3 className="text-orange-500 text-xs font-black uppercase tracking-wider mb-2">
                    ALAMAT RESMI
                  </h3>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <p className="text-zinc-300 text-xs font-medium leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-orange-500 text-xs font-black uppercase tracking-wider mb-2">
                    SALES & CONSULTING
                  </h3>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-white shrink-0" />
                    <a
                      href="https://wa.me/6285601448180"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 text-xs font-bold hover:text-orange-500 transition-colors"
                    >
                      {whatsappNumber}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-orange-500 text-xs font-black uppercase tracking-wider mb-2">
                    EMAIL PERUSAHAAN
                  </h3>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-white shrink-0" />
                    <a
                      href="mailto:info@jkbuilding.co.id"
                      className="text-zinc-300 text-xs font-medium hover:text-orange-500 transition-colors inline-block break-all"
                    >
                      info@jkbuilding.co.id
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-zinc-800/60 mt-4 text-center lg:text-left">
                <span className="inline-block px-2.5 py-1 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400">
                  Kabupaten Sleman, D.I.Y.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
