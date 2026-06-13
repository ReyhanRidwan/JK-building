/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Clock, User, Calendar, BookOpen, Share2 } from 'lucide-react';
import { Article } from '../data';
import { OptimizedImage } from './OptimizedImage';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
}

export function ArticleReaderModal({ article, onClose }: ArticleReaderModalProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.4 }}
        className="relative bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {/* Header Cover Banner */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden">
          <OptimizedImage
            src={article.image}
            alt={article.title}
            aspectRatio="aspect-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />

          {/* Floated Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/85 hover:bg-orange-650 hover:text-white border border-zinc-800 text-zinc-300 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer"
            title="Tutup Artikel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="px-3 py-1 bg-orange-600/10 text-orange-500 text-[10px] font-black tracking-widest rounded-full uppercase border border-orange-500/20">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-zinc-500 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </div>
          </div>

          <h1 className="text-xl md:text-3xl font-black uppercase text-white tracking-tight leading-snug">
            {article.title}
          </h1>

          {/* Author info & Read time */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-zinc-850 text-orange-500 flex items-center justify-center font-bold text-xs uppercase border border-zinc-800">
                {article.author.charAt(4)}
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono text-zinc-500 block">Penulis Ahli</span>
                <span className="text-white text-xs font-bold font-mono">{article.author}</span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 text-zinc-400 text-xs font-mono">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Summary Callout Banner */}
          <div className="p-4 bg-orange-600/10 border-l-4 border-orange-500 rounded text-xs md:text-sm text-zinc-300 leading-relaxed italic">
            “ {article.summary} ”
          </div>

          {/* Extended body split nicely into conceptual blocks */}
          <div className="text-zinc-300 text-xs md:text-sm leading-relaxed space-y-4">
            {article.body.split('\n\n').map((paragraph, pIdx) => (
              <p key={`p-${pIdx}`} className="font-medium">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Bottom sharing footer */}
          <div className="pt-6 border-t border-zinc-800/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
              <BookOpen className="w-4 h-4 text-orange-500 animate-pulse" />
              JK Edukasi Sipil Jasa Konstruksi
            </div>
            <button
              onClick={() => {
                const textToCopy = `Baca "${article.title}" oleh JK Building Prambanan!`;
                navigator.clipboard.writeText(window.location.href);
                alert('Tautan artikel disalin ke papan klip komputer Anda.');
              }}
              className="flex items-center gap-1.5 bg-zinc-800 hover:bg-orange-600 hover:text-white border border-zinc-700 text-zinc-400 text-xs font-extrabold uppercase py-2 px-4 rounded-lg transition-all duration-300"
            >
              <Share2 className="w-3.5 h-3.5" />
              Bagikan
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
