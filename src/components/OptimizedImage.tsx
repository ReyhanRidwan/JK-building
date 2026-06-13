/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { IMAGES } from '../constants/images';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  aspectRatio?: string; // Default to aspect-video to prevent layout shift
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  aspectRatio = 'aspect-video',
  loading = 'lazy'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(IMAGES.placeholder);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-zinc-800 ${aspectRatio} ${wrapperClassName}`}
    >
      {/* Skeleton screen loader shown until the image is loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-800 flex items-center justify-center">
          <div className="h-6 w-12 bg-zinc-700/50 rounded" />
        </div>
      )}

      <motion.img
        src={imgSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.02
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
}
