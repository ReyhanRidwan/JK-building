/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

interface ScrollToTopProps {
  page: string;
}

export function ScrollToTop({ page }: ScrollToTopProps) {
  useEffect(() => {
    // Standard instant or smooth scroll to the top of the viewport when page state changes
    window.scrollTo({
      top: 0,
      behavior: 'auto' // Instant is cleaner for quick page transitions to prevent lagging scrolling
    });
  }, [page]);

  return null;
}
