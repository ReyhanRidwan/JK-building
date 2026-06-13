/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Optimizes Cloudinary URL by inserting the requested path transformation
 * "/upload/f_auto,q_auto,w_1200,c_limit/" for maximum compression without losing details.
 */
export function optimizeCloudinaryUrl(url: string): string {
  if (!url) return '';
  if (url.includes('cloudinary.com')) {
    // Replace /image/upload/q_auto/f_auto/ or /image/upload/ with /upload/f_auto,q_auto,w_1200,c_limit/
    // The directive is: "menambahkan path: /upload/f_auto,q_auto,w_1200,c_limit/"
    let optimized = url;
    if (optimized.includes('/image/upload/q_auto/f_auto/')) {
      optimized = optimized.replace('/image/upload/q_auto/f_auto/', '/image/upload/f_auto,q_auto,w_1200,c_limit/');
    } else if (optimized.includes('/image/upload/')) {
      optimized = optimized.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_1200,c_limit/');
    } else if (optimized.includes('/upload/')) {
      // Just in case it's in another format
      optimized = optimized.replace('/upload/', '/upload/f_auto,q_auto,w_1200,c_limit/');
    }
    return optimized;
  }
  return url;
}

export const IMAGES = {
  // Home Slider
  heroSlide1: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941841/slide2_vlhgia.jpg'),
  heroSlide2: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941396/john-fornander-Id7u0EkTjBE-unsplash_p7ftfx.jpg'),

  // Services Highlight Section Background / Banner
  servicesHighlightBg: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941746/naksha-banwao-3ddHcjHmiGw-unsplash_jdslxv.jpg'),

  // Home Before After (Project Shortcut slider)
  homeBefore: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941823/sebastian-herrmann-ysqlsEnWpLg-unsplash_pbv806.jpg'),
  homeAfter: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941801/ronnie-george-S0-e9aITeHc-unsplash_ogymgo.jpg'),

  // Project 1
  project1Before: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941813/sandy-millar-u1KG_wZTnkg-unsplash_kglxsg.jpg'),
  project1After: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941396/john-fornander-Id7u0EkTjBE-unsplash_p7ftfx.jpg'),
  project1Gallery: [
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941380/iwood-R5v8Xtc0ecg-unsplash_nfr6rt.jpg'),
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941776/roberto-nickson-emqnSQwQQDo-unsplash_vrhxtd.jpg'),
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941755/naksha-banwao-nAFuA8t5K9Y-unsplash_v8sxdy.jpg'),
  ],

  // Project 2
  project2Before: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941769/olek-buzunov-cm-gqu42F20-unsplash_gmblqa.jpg'),
  project2After: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941852/spacejoy-4xRP0Ajk9ys-unsplash_olxzns.jpg'),
  project2Gallery: [
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941832/serhat-beyazkaya-ayWgRkCk2sQ-unsplash_whjzpo.jpg'),
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941380/iwood-R5v8Xtc0ecg-unsplash_nfr6rt.jpg'),
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941885/zac-gudakov-ztWpwTEx728-unsplash_b2wvie.jpg'),
  ],

  // Project 3
  project3Before: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941363/house_decoration_fgbtju.jpg'),
  project3After: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941867/spacejoy-YI2YkyaREHk-unsplash_t2s8ka.jpg'),
  project3Gallery: [
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941396/john-fornander-Id7u0EkTjBE-unsplash_p7ftfx.jpg'),
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941859/spacejoy-9M66C_w_ToM-unsplash_kqkwhw.jpg'),
    optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941100/collov-home-design-4_jQL4JCS98-unsplash_borowp.jpg'),
  ],

  // Services page images
  serviceNewBuild: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941841/slide2_vlhgia.jpg'),
  serviceRenovation: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941859/spacejoy-9M66C_w_ToM-unsplash_kqkwhw.jpg'),
  serviceArchitecture: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941852/spacejoy-4xRP0Ajk9ys-unsplash_olxzns.jpg'),
  serviceCivil: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941346/etienne-girardet-sgYamIzhAhg-unsplash_vvnxjq.jpg'),

  // About us page images
  aboutTeam: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778941792/ronnakorn-triraganon-IvEYfb-3B70-unsplash_fwhdz6.jpg'),
  aboutFounder: optimizeCloudinaryUrl('https://res.cloudinary.com/di6ziqvtp/image/upload/q_auto/f_auto/v1778943896/15ba0e3c10587844c0e73ad425d1adcd_gedrjd.jpg'),

  // Fallback / Placeholder Image
  placeholder: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop'
};
