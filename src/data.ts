/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES } from './constants/images';

export interface Project {
  id: string;
  title: string;
  location: string;
  beforeImg: string;
  afterImg: string;
  gallery: string[];
  challenge: string;
  solution: string;
  year: string;
  client: string;
  duration: string;
}

export interface Service {
  id: string;
  title: string;
  iconName: string; // Will match with Lucide icons dynamically
  description: string;
  image: string;
  features: string[];
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  body: string;
  summary: string;
  author: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'layanan' | 'biaya' | 'waktu';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const SERVICES: Service[] = [
  {
    id: 'bangun-baru',
    title: 'Bangun Rumah Baru',
    iconName: 'Home',
    description: 'Konstruksi rumah tinggal impian dari nol dengan jaminan kualitas struktur kokoh, presisi tinggi, dan sentuhan premium di setiap sudut bangunan.',
    image: IMAGES.serviceNewBuild,
    features: [
      'Pekerjaan Struktur Beton Bertulang Berkualitas Tinggi',
      'Desain Fasad & Denah Fleksibel Sesuai Kebutuhan',
      'Pemilihan Material Kelas Utama (Standard/Medium/Premium)',
      'Manajemen Pengawasan Lapangan Harian Disiplin',
      'Garansi Pemeliharaan Pasca-Selesai Penuh'
    ]
  },
  {
    id: 'renovasi-total',
    title: 'Renovasi Rumah',
    iconName: 'Wrench',
    description: 'Transformasi total maupun parsial hunian lama Anda menjadi tampak modern, fungsional, bebas bocor, dan memiliki nilai estetika tinggi.',
    image: IMAGES.serviceRenovation,
    features: [
      'Pekerjaan Pembetulan Konstruksi Atap & Bebas Bocor',
      'Penambahan Ruang Baru (Tingkat / Ekstensi Belakang)',
      'Peremajaan Layout Interior & Finishing Keramik/Cat',
      'Peningkatan Sistem Mekanikal, Elektrikal & Plumbing',
      'Perbaikan Struktur Retak Rambu-Rambu Keselamatan Tinggi'
    ]
  },
  {
    id: 'arsitektur-interior',
    title: 'Arsitektur & Interior',
    iconName: 'Compass',
    description: 'Jasa pembuatan desain rancangan arsitektural 3D dan tata ruang interior yang menggabungkan keelokan alami, pencahayaan optimal, dan efisiensi ruang.',
    image: IMAGES.serviceArchitecture,
    features: [
      'Gambar Desain 3D Eksterior & Interior Realistis',
      'Pembuatan Gambar Kerja Detail Lengkap (DED)',
      'Perencanaan Layout Ruang & Ergonomi Furnitur',
      'Desain Pencahayaan Alami & Sistem Ventilasi Udara',
      'Visualisasi Rendering Video Animasi Proyek'
    ]
  },
  {
    id: 'jasa-sipil-estimasi',
    title: 'Jasa Sipil & Estimasi RAB',
    iconName: 'Calculator',
    description: 'Perhitungan Anggaran Biaya (RAB) yang transparan, akurat, dan dapat disesuaikan dengan anggaran klien tanpa mengurangi keselamatan struktur bangunan.',
    image: IMAGES.serviceCivil,
    features: [
      'Penyusunan Rencana Anggaran Biaya Detail Sistematis',
      'Survey Topografi, Kondisi Tanah & Leveling Elevasi',
      'Konsultasi Efisiensi Anggaran & Alternatif Material',
      'Pengukuran Akurat Volume Pekerjaan & Logistik',
      'Pekerjaan Infrastruktur Pendukung (Pagar, Carport, Saluran)'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proyek-1',
    title: 'Villa Modern Minimalis Prambanan',
    location: 'Bokoharjo, Prambanan, Sleman',
    beforeImg: IMAGES.project1Before,
    afterImg: IMAGES.project1After,
    gallery: IMAGES.project1Gallery,
    challenge: 'Kontur tanah tidak rata yang sangat dekat dengan kawasan bersejarah Candi Prambanan dan perlunya pemetaan drainase matang guna menghindari risiko perlambatan peresapan air hujan lokal.',
    solution: 'Penerapan pondasi batu kali ganda terstruktur dengan pemadatan hidrolis berkekuatan tinggi serta drainase bawah tanah modular terintegrasi yang menjaga kesuburan tanah sekitar.',
    year: '2025',
    client: 'Bpk. Adi Nugroho',
    duration: '6 Bulan'
  },
  {
    id: 'proyek-2',
    title: 'Renovasi Kedai Kopi Heritage',
    location: 'Cepit, Bokoharjo, Prambanan',
    beforeImg: IMAGES.project2Before,
    afterImg: IMAGES.project2After,
    gallery: IMAGES.project2Gallery,
    challenge: 'Menjaga struktur pilar kayu lama yang bermutu pusaka namun rentan, sekaligus mengintegrasikannya dengan interior industrial modern berpencahayaan alami penuh.',
    solution: 'Pemasangan kolom penguat baja mikro (micro-steel cage) di dalam sasis tiang asli tanpa merusak eksteriornya, dipadu pembukaan dinding kaca tempered tahan panas berdaya hantar rendah.',
    year: '2026',
    client: 'Ibu Rina Lestari',
    duration: '4 Bulan'
  },
  {
    id: 'proyek-3',
    title: 'Rumah Tinggal Klasik Modern Sleman',
    location: 'Sleman, D.I. Yogyakarta',
    beforeImg: IMAGES.project3Before,
    afterImg: IMAGES.project3After,
    gallery: IMAGES.project3Gallery,
    challenge: 'Kebutuhan sirkulasi udara super optimal di daerah Sleman yang berkelembapan tinggi tanpa merusak keindahan arsitektural klasik bergaya Eropa kolonial mewah.',
    solution: 'Mendesain ventilasi silang tersembunyi (hidden cross ventilation) berteknologi double-height ceiling dan penanaman material membran kedap air di dasar beton sasis utama.',
    year: '2025',
    client: 'Dr. Hendrawan Sp.A',
    duration: '8 Bulan'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Panduan Menghitung RAB Bangun Rumah dari Nol',
    category: 'Sipil & Anggaran',
    date: '10 Juni 2026',
    readTime: '5 Menit Baca',
    summary: 'Rencana Anggaran Biaya (RAB) adalah elemen vital dalam mendirikan rumah. Pelajari cara merumuskan rumus volume pekerjaan & taksiran harga material agar proyek tidak over-budget.',
    body: 'Membangun rumah impian memerlukan perhitungan yang jeli agar tidak terjadi pembengkakan biaya di tengah jalan. Langkah pertama adalah mendefinisikan luas bangunan yang akan dibangun, dikalikan dengan estimasi tarif rata-rata konstruksi per meter persegi saat ini. Tentukan pula kualitas spesifikasi material yang diinginkan (Standar, Medium, atau Premium). Komponen utama pembentuk RAB mencakup pekerjaan persiapan (land clearing, direksi keet), pekerjaan struktur (galian, pondasi, sloof, pilar, balok, cor plat), pekerjaan arsitektural atau pasangan dinding, plesteran, kusen, lantai, plafon, hingga mekanikal-elektrikal-plumbing (MEP). Melakukan pencatatan secara detail di aplikasi RAB JK Building akan memudahkan Anda melacak dan menyesuaikan kebutuhan pembangunan.',
    author: 'Ir. Hendra Wijaya',
    image: IMAGES.serviceNewBuild
  },
  {
    id: 'art-2',
    title: 'Memilih Material Fondasi Terbaik untuk Rumah Dua Lantai',
    category: 'Struktur Bangunan',
    date: '31 Mei 2026',
    readTime: '4 Menit Baca',
    summary: 'Fondasi adalah penopang beban utama keseluruhan bangunan dua lantai. Kenali jenis fondasi Footplat (Cakar Ayam) dan batu kali pendukung guna kestabilan abadi.',
    body: 'Struktur fondasi rumah berlantai dua membutuhkan kombinasi daya dukung beban mati dan beban hidup yang seimbang. Fondasi batu kali sangat baik digunakan untuk meneruskan beban dinding secara merata ke permukaan tanah keras yang dangkal. Namun, untuk mengantisipasi gaya lateral dan beban terpusat dari tiang-tiang pilar lantai dua, mutlak diperlukan penambahan Fondasi Footplat atau lazim dikenal sebagai "Cakar Ayam" pada setiap titik kolom utama. Penentuan kedalaman galian dan mutu beton bertulang (minimal K-225) harus dihitung dengan seksama berdasarkan karakteristik daya dukung tanah setempat.',
    author: 'Ir. Hendra Wijaya',
    image: IMAGES.heroSlide1
  },
  {
    id: 'art-3',
    title: '5 Kesalahan Umum Saat Renovasi Rumah & Cara Menghindarinya',
    category: 'Renovasi',
    date: '15 Mei 2026',
    readTime: '6 Menit Baca',
    summary: 'Meremehkan detail struktur lama, tidak membuat kontrak tertulis, hingga tergiur bahan murah. Simak panduan profesional kami demi keamanan keluarga Anda.',
    body: 'Banyak pemilik rumah mengira merenovasi sebagian rumah lebih gampang daripada membuat baru dari nol. Kesalahan fatal pertama adalah meremehkan integritas struktur penumpu lama ketika menambah lantai atau merobohkan dinding partisi. Kesalahan kedua yaitu mengubah desain secara mendadak di tengah masa pengerjaan yang mengakibatkan pembataian efisiensi waktu dan kerugian material. JK Building selalu menyarankan pembuatan Gambar DED dan kesepakatan tertulis mengenai Surat Perjanjian Kerja (SPK) bernilai tetap (lump sum) dan jaminan garansi yang sah agar menghindarkan Anda dari sengkarut perseteruan.',
    author: 'Ir. Hendra Wijaya',
    image: IMAGES.serviceRenovation
  },
  {
    id: 'art-4',
    title: 'Mengenal Tren Arsitektur Rumah Minimalis Tropis di Yogyakarta',
    category: 'Arsitektur',
    date: '28 April 2026',
    readTime: '5 Menit Baca',
    summary: 'Suhu tropis yang bersahabat dipadu udara pegunungan Merapi. Temukan keunikan atap pelana tinggi lekukan ventilasi alami khas Sleman modern.',
    body: 'Di Yogyakarta, khususnya daerah Sleman dan kompleks Prambanan, perpaduan arsitektur vernakular tradisional pendopo dengan gaya minimalis-tropis kontemporer sedang menjadi primadona. Karakteristik utamanya adalah pemakaian dinding batu alam ekspos yang kokoh, sirkulasi silang bervolume tinggi, atap dengan teritisan lebar guna menangkal guyuran hujan lebat dan terik sinar matahari, serta integrasi taman terbuka (void/courtyard) di dalam rumah untuk menjaga kelembapan udara tetap sejuk alami.',
    author: 'Ir. Hendra Wijaya',
    image: IMAGES.serviceArchitecture
  },
  {
    id: 'art-5',
    title: 'Langkah-Langkah Mengurus IMB / PBG Terbaru di Yogyakarta',
    category: 'Edukasi Hukum',
    date: '12 April 2026',
    readTime: '7 Menit Baca',
    summary: 'Mau membangun tanpa rasa cemas? Pelajari transisi IMB ke PBG (Persetujuan Bangunan Gedung) melalui sistem SIMBG resmi pemerintah.',
    body: 'Persetujuan Bangunan Gedung (PBG) kini resmi menggantikan Izin Mendirikan Bangunan (IMB). Setiap proses konstruksi wajib memiliki ini sebelum mendirikan batas fisik di lapangan. Dokumen utama berupa kelengkapan administratif (KTP, sertifikat kepemilikan tanah, bukti pembayaran PBB) serta dokumen teknis yang detail (gambar denah arsitektur lengkap, gambar rencana struktur fondasi-balok-pilar, hingga gambar sanitasi instalasi air). Tim JK Building siap mendampingi Anda melewati sistem SIMBG online pemerintah agar izin keluar dengan cepat dan sah secara hukum.',
    author: 'Ir. Hendra Wijaya',
    image: IMAGES.placeholder
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana proses awal pembangunan rumah di JK Building?',
    answer: 'Proses diawali dengan konsultasi gratis dan pengajuan konsep desain awal atau denah dasar. Dilanjutkan dengan survey lokasi lapangan di daerah Jogja/Sleman untuk meninjau kontur tanah dan batas jalan. Setelah itu kami susun RAB Kasar hingga RAB Detail. Jika disetujui, kami buat Surat Perjanjian Kerja (SPK) resmi sebelum memulai pekerjaan.',
    category: 'layanan'
  },
  {
    id: 'faq-2',
    question: 'Apakah biaya konsultasi dan pembuatan gambar denah di awal gratis?',
    answer: 'Ya, untuk konsultasi awal berupa diskusi rancangan dan estimasi RAB Kasar kami berikan gratis. Untuk pengerjaan paket konstruksi bangun baru penuh di JK Building, biaya jasa arsitektur gambar detail (DED) sepenuhnya digratiskan sebagai bonus.',
    category: 'biaya'
  },
  {
    id: 'faq-3',
    question: 'Berapakah range biaya pembangunan per meter persegi di Jogja saat ini?',
    answer: 'Biaya dipengaruhi spek material: Kelas Standar berkisar Rp 3.200.000 - Rp 3.800.000 /m². Kelas Medium berkisar Rp 3.900.000 - Rp 4.700.000 /m². Kelas Premium (mewah/spesifik) mulai dari Rp 4.800.000 /m². Tentunya opsi ini bisa disesuaikan fleksibel dengan tabungan Anda.',
    category: 'biaya'
  },
  {
    id: 'faq-4',
    question: 'Berapa lama rata-rata durasi pengerjaan rumah dari nol?',
    answer: 'Untuk rumah 1 lantai tipe kecil-menengah berkisar antara 3 - 5 bulan. Untuk rumah tinggal 2 lantai dengan luas di atas 150m², durasi pengerjaan berkisar antara 5 - 8 bulan bergantung pada tingkat kompleksitas struktural dan kondisi cuaca di lapangan.',
    category: 'waktu'
  },
  {
    id: 'faq-5',
    question: 'Bagaimana sistem pembayaran dan termin pembangunan?',
    answer: 'Pembayaran bersifat termin bertahap sesuai progres kemajuan fisik di lokasi ( Down Payment (DP) diawal, termin ke-2 di penyelesaian struktur, termin ke-3 finishing, dan pelunasan 5% setelah masa uji coba unit/retensi berakhir). Klien menerima laporan mingguan terperinci lengkap dengan dokumentasi foto/video.',
    category: 'biaya'
  },
  {
    id: 'faq-6',
    question: 'Apakah ada masa garansi pemeliharaan bangunan?',
    answer: 'Tentu. JK Building menyediakan Jaminan Garansi Pemeliharaan Fisik (terbukti bebas bocor dan retak struktur mikro) selama 3 hingga 6 bulan penuh terhitung dari Berita Acara Serah Terima (BAST) ditandatangani. Ketenangan pikiran Anda adalah prioritas utama kami.',
    category: 'layanan'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Bpk. Adi Nugroho',
    role: 'Pemilik Villa Modern, Prambanan',
    quote: 'JK Building membuktikan komitmentnya dalam membangun villa kami dekat Candi Prambanan. Masalah tanah miring diselesaikan dengan pondasi ganda yang kokoh. Kerja rapi, laporan berkala dikirim transparan tiap minggu!',
    rating: 5
  },
  {
    id: 'testi-2',
    name: 'Ibu Rina Lestari',
    role: 'Founder Kedai Kopi Heritage, Bokoharjo',
    quote: 'Renovasi ruko kuno menjadi cafe berkonsep industrial sangat memuaskan. Sasis aslinya tetap kokoh diperkuat pilar mikro baja. JK Building sangat andal mendengarkan kemauan estetis kami.',
    rating: 5
  },
  {
    id: 'testi-3',
    name: 'Bp. Dr. Hendrawan Sp.A',
    role: 'Pemilik Rumah Klasik, Sleman',
    quote: 'Arsitektur klasik modern Eropa yang kami idamkan dibuat mewah berkat layout ventilasi silang double-height yang diinstal mereka. Rumah tetap sejuk walau di musim panas Yogyakarta. Recommended sekali!',
    rating: 5
  }
];
