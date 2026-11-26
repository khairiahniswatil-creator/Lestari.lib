import type { CatalogBook, CommunityOrg, ForumPost } from '../types/library';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_botanical_archive_1795660286511.jpg';
export const CURATION_IMAGE_PATH = '/src/assets/images/curation_field_guides_1795660287819.jpg';
export const COMMUNITY_IMAGE_PATH = '/src/assets/images/community_urban_garden_1795660288472.jpg';

export interface ClusterBlueprint {
  cluster: Exclude<CatalogBook['cluster'], 'Semua'>;
  sharePercent: number;
  targetAudience: string;
  selectionCriteria: string;
  keyFormats: string;
  exampleSources: string;
}

export const CLUSTER_BLUEPRINTS: ClusterBlueprint[] = [
  {
    cluster: 'E-Book Ekologi',
    sharePercent: 25,
    targetAudience: 'Mahasiswa, guru, dan pembaca umum',
    selectionCriteria:
      'Kajian sistem ekosistem tropis, keanekaragaman hayati, krisis iklim, dan keadilan ekologis berbasis data ilmiah mutakhir.',
    keyFormats: 'EPUB 3 reflowable, PDF/A terkompresi (<12 MB)',
    exampleSources: 'BRIN Press, Yayasan KEHATI, Project Gutenberg, OAPEN',
  },
  {
    cluster: 'Jurnal Penelitian',
    sharePercent: 20,
    targetAudience: 'Peneliti, akademisi, dan pembuat kebijakan daerah',
    selectionCriteria:
      'Artikel peer-reviewed dengan lisensi Open Access penuh, mencakup valuasi karbon, restorasi gambut, dan ekohidrologi.',
    keyFormats: 'PDF teks-terpilih + sitasi BibTeX/RIS otomatis',
    exampleSources: 'DOAJ, Portal Garuda, IPB/UGM Open Repository, bioRxiv',
  },
  {
    cluster: 'Modul Daur Ulang',
    sharePercent: 20,
    targetAudience: 'Pengelola bank sampah, pegiat komunitas, dan rumah tangga',
    selectionCriteria:
      'Panduan langkah-demi-langkah ekonomi sirkular: komposting Takakura, maggot BSF, bank sampah digital, dan daur ulang kertas.',
    keyFormats: 'PDF bergambar ringan & lembar kerja cetak-opsional A5',
    exampleSources: 'Ditjen PSLB3 KLHK, Greeneration Foundation, Zero Waste Indonesia',
  },
  {
    cluster: 'Panduan Berkebun',
    sharePercent: 20,
    targetAudience: 'Warga urban, kelompok tani wanita, dan sekolah adiwiyata',
    selectionCriteria:
      'Teknik agroekologi perkotaan, pemupukan organik cair, pembuatan pestisida nabati, dan konservasi benih lokal.',
    keyFormats: 'EPUB interaktif & kartu tanam ringkas siap unduh luring',
    exampleSources: 'Kementerian Pertanian Open Docs, FAO Open Knowledge, Komunitas Kebun',
  },
  {
    cluster: 'Cerita Anak Alam',
    sharePercent: 15,
    targetAudience: 'Anak usia 5–12 tahun, orang tua, dan pendongeng sekolah',
    selectionCriteria:
      'Fabel konservasi satwa endemik Indonesia, petualangan menjaga sungai, dan buku bergambar dwibahasa tanpa muatan menggurui.',
    keyFormats: 'Fixed-layout EPUB & PDF ramah layar ponsel/tablet',
    exampleSources: 'StoryWeaver (Pratham Books), Let’s Read Asia, Badan Bahasa Kemendikbud',
  },
];

export interface AcquisitionChannel {
  id: string;
  channelName: string;
  partnerExamples: string;
  legalMechanism: string;
  acquisitionWorkflow: string;
  cadence: string;
}

export const ACQUISITION_CHANNELS: AcquisitionChannel[] = [
  {
    id: 'gov-klhk',
    channelName: '01. Kemitraan Instansi Pemerintah & Lembaga Riset',
    partnerExamples: 'KLHK RI, BRIN, BMKG, Badan Restorasi Gambut & Mangrove, KKP',
    legalMechanism: 'Perjanjian Kerja Sama (MoU) Lisensi Non-Eksklusif & Publikasi Domain Pemerintah (UU No. 14/2008 KIP)',
    acquisitionWorkflow:
      'Permohonan resmi repositori publikasi penyuluhan, laporan Status Lingkungan Hidup Indonesia (SLHI), serta modul Sekolah Adiwiyata.',
    cadence: 'Sinkronisasi triwulanan',
  },
  {
    id: 'ngo-conservation',
    channelName: '02. Kolaborasi NGO & Organisasi Konservasi',
    partnerExamples: 'Yayasan KEHATI, WALHI, WWF Indonesia, WRI Indonesia, Yayasan Terumbu Karang',
    legalMechanism: 'Surat Izin Distribusi Pendidikan Non-Komersial & Lisensi CC BY-NC 4.0',
    acquisitionWorkflow:
      'Pertukaran nilai: perpustakaan menyediakan kanal diseminasi luas dan laporan metrik pembacaan sebagai dampak program NGO.',
    cadence: 'Peninjauan bulanan',
  },
  {
    id: 'open-repos',
    channelName: '03. Pemanenan Repositori Jurnal Terbuka (OAI-PMH)',
    partnerExamples: 'DOAJ, Garuda Kemendikbudristek, Biodiversity Heritage Library, Repositori IPB/UGM/ITB',
    legalMechanism: 'Standar Akses Terbuka (BOAI) & Pemanenan Metadata Otomatis OAI-PMH / REST API',
    acquisitionWorkflow:
      'Penjadwalan panen metadata otomatis berdasarkan kata kunci taksonomi ekologi, diikuti kurasi manual abstrak berbahasa Indonesia/Inggris.',
    cadence: 'Panen otomatis mingguan',
  },
  {
    id: 'cc-children',
    channelName: '04. Platform Buku Berlisensi Creative Commons & Domain Publik',
    partnerExamples: 'StoryWeaver, Let’s Read Asia, Wikimedia Commons, Wikibooks, OAPEN Library',
    legalMechanism: 'Creative Commons (CC0, CC BY 4.0, CC BY-SA 4.0) yang mengizinkan adaptasi dan terjemahan lokal',
    acquisitionWorkflow:
      'Kurasi buku cerita anak alam berlisensi CC BY, penerjemahan sukarelawan ke Bahasa Indonesia & bahasa daerah, lalu atribusi penuh penulis/ilustrator.',
    cadence: 'Kurasi berkelanjutan',
  },
];

export interface LicenseComplianceRow {
  license: string;
  cost: string;
  canRedistribute: string;
  canTranslateAdapt: string;
  mandatoryCondition: string;
  libraryRule: string;
}

export const LICENSE_MATRIX: LicenseComplianceRow[] = [
  {
    license: 'CC0 / Domain Publik',
    cost: 'Gratis',
    canRedistribute: 'Ya, tanpa batas',
    canTranslateAdapt: 'Ya, bebas diadaptasi',
    mandatoryCondition: 'Tetap mencantumkan arsip asal secara etis',
    libraryRule: 'Akses serentak tak terbatas (99+ lisensi)',
  },
  {
    license: 'CC BY 4.0',
    cost: 'Gratis',
    canRedistribute: 'Ya, tanpa batas',
    canTranslateAdapt: 'Ya (wajib catat perubahan)',
    mandatoryCondition: 'Atribusi nama pencipta, tautan sumber & lisensi',
    libraryRule: 'Akses serentak tak terbatas + kotak sitasi otomatis',
  },
  {
    license: 'CC BY-SA 4.0',
    cost: 'Gratis',
    canRedistribute: 'Ya, tanpa batas',
    canTranslateAdapt: 'Ya, hasil adaptasi wajib CC BY-SA',
    mandatoryCondition: 'Atribusi + Bagikan Serupa (ShareAlike)',
    libraryRule: 'Akses bebas; hasil terjemahan komunitas ikut CC BY-SA',
  },
  {
    license: 'CC BY-NC 4.0',
    cost: 'Gratis',
    canRedistribute: 'Ya (non-komersial)',
    canTranslateAdapt: 'Ya, untuk tujuan non-profit',
    mandatoryCondition: 'Dilarang monetisasi/iklan komersial pada halaman baca',
    libraryRule: 'Bebas iklan & bebas biaya keanggotaan sepenuhnya',
  },
  {
    license: 'MoU KLHK / Instansi',
    cost: 'Gratis',
    canRedistribute: 'Sesuai ruang lingkup MoU',
    canTranslateAdapt: 'Terbatas (hanya atas persetujuan tertulis)',
    mandatoryCondition: 'Penghitungan kuota pinjam & pelaporan statistik pembaca',
    libraryRule: 'Kuota pinjam serentak 15 eksemplar / masa pinjam 14 hari',
  },
];

export const INITIAL_CATALOG_BOOKS: CatalogBook[] = [
  {
    id: 'book-01',
    accessionCode: 'ACC-EK-2025-01',
    title: 'Atlas Ekologi Mangrove & Sabuk Hijau Pesisir Indonesia',
    author: 'Dr. Hendra Gunawan & Tim Peneliti Pesisir',
    publisherSource: 'BRIN Open Press',
    cluster: 'E-Book Ekologi',
    license: 'CC BY 4.0',
    readingLevel: 'Umum & Komunitas',
    pages: 164,
    fileSizeMb: 6.4,
    year: 2025,
    sdgTags: ['SDG 14 Laut', 'SDG 15 Ekosistem'],
    summary:
      'Pemetaan jenis bakau endemik Nusantara, fungsi serapan karbon biru, serta protokol rehabilitasi pesisir berbasis masyarakat.',
    availableCopies: 99,
    totalCopies: 99,
  },
  {
    id: 'book-02',
    accessionCode: 'ACC-JP-2025-02',
    title: 'Dinamika Restorasi Hidrologi Lahan Gambut Tropis Pasca-Kebakaran',
    author: 'Lestari Putri, M.Si. & Prof. Bambang Hero',
    publisherSource: 'Portal Garuda / Jurnal Ilmu Lingkungan',
    cluster: 'Jurnal Penelitian',
    license: 'CC BY-SA 4.0',
    readingLevel: 'Akademik & Peneliti',
    pages: 34,
    fileSizeMb: 1.8,
    year: 2025,
    sdgTags: ['SDG 13 Iklim', 'SDG 15 Ekosistem'],
    summary:
      'Studi empiris pemulihan tinggi muka air tanah melalui sekat kanal dan revegetasi spesies lokal pada gambut terdegradasi.',
    availableCopies: 99,
    totalCopies: 99,
  },
  {
    id: 'book-03',
    accessionCode: 'ACC-DR-2024-03',
    title: 'Buku Saku Bank Sampah Digital & Pemilahan Sirkular Rumah Tangga',
    author: 'Direktorat Pengelolaan Sampah',
    publisherSource: 'Kementerian LHK RI',
    cluster: 'Modul Daur Ulang',
    license: 'MoU KLHK / Instansi',
    readingLevel: 'Umum & Komunitas',
    pages: 76,
    fileSizeMb: 3.2,
    year: 2024,
    sdgTags: ['SDG 11 Kota Berkelanjutan', 'SDG 12 Sirkular'],
    summary:
      'Panduan operasional pendirian bank sampah tingkat RW, klasifikasi 18 jenis polimer plastik, serta tata cara pencatatan nasabah.',
    availableCopies: 15,
    totalCopies: 15,
  },
  {
    id: 'book-04',
    accessionCode: 'ACC-DR-2025-04',
    title: 'Modul Budidaya Maggot BSF & Komposter Takakura Skala Komunitas',
    author: 'Dewi Anggraini & Forum Zero Waste Bandung',
    publisherSource: 'Zero Waste Nusantara Open Docs',
    cluster: 'Modul Daur Ulang',
    license: 'CC BY-NC 4.0',
    readingLevel: 'Umum & Komunitas',
    pages: 52,
    fileSizeMb: 2.6,
    year: 2025,
    sdgTags: ['SDG 12 Sirkular', 'SDG 2 Pangan'],
    summary:
      'Rancangan reaktor biokonversi sampah organik dapur menggunakan larva Black Soldier Fly beserta perhitungan reduksi metana TPA.',
    availableCopies: 99,
    totalCopies: 99,
  },
  {
    id: 'book-05',
    accessionCode: 'ACC-BK-2025-05',
    title: 'Agroekologi Pekarangan Sempit: Bedengan Tanpa Olah Tanah & Pupuk Kompos',
    author: 'Ir. Bagus Pratomo',
    publisherSource: 'Yayasan KEHATI & Kebun Kota',
    cluster: 'Panduan Berkebun',
    license: 'CC BY-SA 4.0',
    readingLevel: 'Umum & Komunitas',
    pages: 92,
    fileSizeMb: 4.1,
    year: 2025,
    sdgTags: ['SDG 2 Ketahanan Pangan', 'SDG 11 Kota Hijau'],
    summary:
      'Metode berkebun regeneratif di teras atau gang kota menggunakan teknik mulsa daun kering, ekoenzim, dan tumpang sari sayuran lokal.',
    availableCopies: 99,
    totalCopies: 99,
  },
  {
    id: 'book-06',
    accessionCode: 'ACC-CA-2024-06',
    title: 'Raka dan Penjaga Mata Air Hutan Larangan',
    author: 'Siti Aminah (Ilustrasi: Dimas Wibowo)',
    publisherSource: 'Let’s Read Asia / The Asia Foundation',
    cluster: 'Cerita Anak Alam',
    license: 'CC BY 4.0',
    readingLevel: 'Anak & Pemula',
    pages: 28,
    fileSizeMb: 1.9,
    year: 2024,
    sdgTags: ['SDG 4 Literasi', 'SDG 6 Air Bersih'],
    summary:
      'Kisah anak desa yang menyelidiki berkurangnya debit mata air kampung dan mengajak warga menanam beringin serta bambu penahan lereng.',
    availableCopies: 99,
    totalCopies: 99,
  },
  {
    id: 'book-07',
    accessionCode: 'ACC-CA-2025-07',
    title: 'Petualangan Kiko si Rangkong Mencari Pohon Ara',
    author: 'Komunitas Dongeng Rimba',
    publisherSource: 'StoryWeaver Open Library',
    cluster: 'Cerita Anak Alam',
    license: 'CC BY 4.0',
    readingLevel: 'Anak & Pemula',
    pages: 24,
    fileSizeMb: 1.5,
    year: 2025,
    sdgTags: ['SDG 15 Satwa Endemik'],
    summary:
      'Buku cerita bergambar dwibahasa tentang peran burung rangkong sebagai penyebar biji alami di hutan Kalimantan.',
    availableCopies: 99,
    totalCopies: 99,
  },
  {
    id: 'book-08',
    accessionCode: 'ACC-EK-2024-08',
    title: 'Laporan Status Lingkungan Hidup & Transisi Energi Daerah',
    author: 'Tim Kajian Kebijakan Iklim',
    publisherSource: 'Kementerian LHK RI',
    cluster: 'E-Book Ekologi',
    license: 'MoU KLHK / Instansi',
    readingLevel: 'Akademik & Peneliti',
    pages: 210,
    fileSizeMb: 7.8,
    year: 2024,
    sdgTags: ['SDG 7 Energi Bersih', 'SDG 13 Iklim'],
    summary:
      'Analisis indeks kualitas air, udara, tutupan lahan, serta skenario dekarbonisasi sektor kelistrikan dan transportasi publik regional.',
    availableCopies: 15,
    totalCopies: 15,
  },
  {
    id: 'book-09',
    accessionCode: 'ACC-BK-2024-09',
    title: 'Panduan Pembuatan Ekoenzim & Pestisida Nabati Rumah Tangga',
    author: 'Nurlaila Hakim',
    publisherSource: 'Domain Publik Pendidikan Pertanian',
    cluster: 'Panduan Berkebun',
    license: 'Domain Publik',
    readingLevel: 'Anak & Pemula',
    pages: 40,
    fileSizeMb: 1.4,
    year: 2024,
    sdgTags: ['SDG 12 Sirkular', 'SDG 15 Tanah Sehat'],
    summary:
      'Resep fermentasi kulit buah 1:3:10 menjadi cairan serbaguna pembersih ramah sungai sekaligus pengendali hama tanaman pekarangan.',
    availableCopies: 99,
    totalCopies: 99,
  },
  {
    id: 'book-10',
    accessionCode: 'ACC-JP-2025-10',
    title: 'Efektivitas Taman Hujan Perkotaan dalam Mitigasi Limpasan Banjir Mikro',
    author: 'Dr. Arif Budiman & Tim Teknik Lingkungan',
    publisherSource: 'DOAJ / Repository Universitas',
    cluster: 'Jurnal Penelitian',
    license: 'CC BY 4.0',
    readingLevel: 'Akademik & Peneliti',
    pages: 26,
    fileSizeMb: 1.2,
    year: 2025,
    sdgTags: ['SDG 6 Air', 'SDG 11 Kota Tangguh'],
    summary:
      'Pengukuran laju infiltrasi biopori dan bioswale pada kawasan permukiman padat di Pulau Jawa sepanjang dua musim hujan.',
    availableCopies: 99,
    totalCopies: 99,
  },
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-01',
    authorName: 'Rina Kusuma',
    authorCity: 'Yogyakarta',
    topic: 'Daur Ulang & Kompos',
    relatedBookTitle: 'Modul Budidaya Maggot BSF & Komposter Takakura Skala Komunitas',
    title: 'Reduksi 42 kg sampah dapur RW dalam 3 minggu memakai Takakura',
    actionTaken: 'Memasang 6 keranjang komposter komunal di pos ronda',
    body: 'Setelah meminjam modul Takakura dari katalog, ibu-ibu PKK kami mencoba mencacah sisa sayur dan menambahkan sekam padi. Hasilnya tidak berbau sama sekali dan kompos perdana siap dipakai kebun sayur RT.',
    createdAt: '2026-11-18',
    supportCount: 28,
  },
  {
    id: 'post-02',
    authorName: 'Fajar Pratama',
    authorCity: 'Semarang',
    topic: 'Kebun Kota',
    relatedBookTitle: 'Agroekologi Pekarangan Sempit: Bedengan Tanpa Olah Tanah & Pupuk Kompos',
    title: 'Ubah gang selebar 1,5 meter menjadi lorong pangan kangkung dan cabai',
    actionTaken: 'Menanam 45 pot terakota & botol galon bekas dengan mulsa daun',
    body: 'Kunci dari panduan ini ada pada penggunaan mulsa daun ketapang kering sehingga penyiraman cukup sekali sehari meski cuaca terik. Kami terbuka berbagi bibit kangkung bagi komunitas sekitar.',
    createdAt: '2026-11-21',
    supportCount: 19,
  },
  {
    id: 'post-03',
    authorName: 'Siti Rahmawati',
    authorCity: 'Pontianak',
    topic: 'Literasi Anak',
    relatedBookTitle: 'Petualangan Kiko si Rangkong Mencari Pohon Ara',
    title: 'Sesi dongeng akhir pekan bersama 35 siswa SD di taman bacaan',
    actionTaken: 'Membacakan buku CC BY secara luring di proyektor hemat daya',
    body: 'Anak-anak sangat antusias saat melihat ilustrasi burung rangkong dan langsung menggambar pohon ara versinya sendiri di kertas daur ulang.',
    createdAt: '2026-11-23',
    supportCount: 34,
  },
];

export const INITIAL_COMMUNITIES: CommunityOrg[] = [
  {
    id: 'org-01',
    name: 'Bank Sampah Induk Bumi Lestari',
    city: 'Bandung',
    province: 'Jawa Barat',
    focus: 'Bank Sampah & Sirkular',
    memberCount: 420,
    collaborationType: 'Kontributor modul daur ulang & tuan rumah praktik kompos',
    schedule: 'Setiap Sabtu, 08:30–11:30 WIB',
    contactHandle: 'komunitas@bumilestari-bdg.id',
  },
  {
    id: 'org-02',
    name: 'Kolektif Kebun Kota Ciliwung',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    focus: 'Kebun Kota & Agroekologi',
    memberCount: 185,
    collaborationType: 'Pojok baca fisik mini & klinik agroekologi pekarangan',
    schedule: 'Minggu ke-1 & ke-3, 07:00 WIB',
    contactHandle: 'halo@kebunciliwung.org',
  },
  {
    id: 'org-03',
    name: 'Sahabat Mangrove Pesisir Utara',
    city: 'Demak',
    province: 'Jawa Tengah',
    focus: 'Konservasi Pesisir',
    memberCount: 310,
    collaborationType: 'Dokumentasi lapangan pesisir & verifikasi data ekologi',
    schedule: 'Sabtu ke-2 bulanan, 06:30 WIB',
    contactHandle: 'pesisir@sahabatmangrove.id',
  },
  {
    id: 'org-04',
    name: 'Taman Baca Akar Muda',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    focus: 'Literasi Iklim',
    memberCount: 240,
    collaborationType: 'Penerjemah buku cerita anak CC BY ke Bahasa Bugis-Makassar',
    schedule: 'Jumat & Minggu sore, 15:30 WITA',
    contactHandle: 'akarmuda@literasihijau.id',
  },
  {
    id: 'org-05',
    name: 'Sirkular Muda Surabaya',
    city: 'Surabaya',
    province: 'Jawa Timur',
    focus: 'Bank Sampah & Sirkular',
    memberCount: 275,
    collaborationType: 'Kurator panduan ekoenzim & lokakarya nol-sampah kampus',
    schedule: 'Setiap Rabu malam, 19:00 WIB',
    contactHandle: 'kontak@sirkularsby.org',
  },
  {
    id: 'org-06',
    name: 'Jejak Pangan Agroekologi Bali',
    city: 'Denpasar',
    province: 'Bali',
    focus: 'Kebun Kota & Agroekologi',
    memberCount: 160,
    collaborationType: 'Arsip benih lokal & penulis modul kompos organik subak',
    schedule: 'Minggu pagi, 07:30 WITA',
    contactHandle: 'benih@jejakpanganbali.id',
  },
];

export const MEMBER_BORROW_STEPS = [
  {
    step: '01',
    title: 'Registrasi Anggota & Pilih Profil Minat',
    detail:
      'Calon anggota mendaftar gratis dengan email atau identitas komunitas baca. Sistem menawarkan pilihan minat topik (ekologi, kompos, berkebun, atau literasi anak) tanpa pungutan biaya atau iklan.',
  },
  {
    step: '02',
    title: 'Penemuan Koleksi & Filter Taksonomi Ekologi',
    detail:
      'Anggota mencari judul menggunakan filter klaster literatur, tingkat bacaan, serta label SDGs. Setiap kartu katalog menampilkan ukuran berkas (MB) dan estimasi penghematan kertas.',
  },
  {
    step: '03',
    title: 'Peminjaman Digital & Alokasi Lisensi',
    detail:
      'Untuk koleksi berlisensi Creative Commons/Domain Publik, anggota langsung mendapat akses penuh. Untuk buku MoU berbatas kuota, sistem mengunci 1 slot dari maksimal 5 buku aktif selama 14 hari.',
  },
  {
    step: '04',
    title: 'Baca di Mode Hemat Energi & Unduh Luring Terenkripsi',
    detail:
      'Anggota membaca langsung pada penampil EPUB/PDF ringan dengan opsi Mode Baca Hemat Energi (latar gelap kontras hangat) atau menyimpan salinan baca luring di perangkat selama masa pinjam.',
  },
  {
    step: '05',
    title: 'Pengembalian Otomatis & Pencatatan Dampak Aksi',
    detail:
      'Saat masa pinjam berakhir atau dikembalikan lebih awal, slot lisensi otomatis dilepas ke antrean anggota lain. Jumlah halaman terbaca langsung memperbarui Kalkulator Penghematan Kertas.',
  },
];

export const LIBRARIAN_UPDATE_STEPS = [
  {
    step: '01',
    title: 'Penjaringan & Panen Metadata Berkala (OAI-PMH)',
    detail:
      'Sistem menjalankan penjadwalan mingguan untuk memanen metadata baru dari DOAJ, Garuda, dan portal KLHK/BRIN, ditambah kotak masuk ajuan naskah dari komunitas NGO mitra.',
  },
  {
    step: '02',
    title: 'Audit Legalitas & Verifikasi Hak Cipta',
    detail:
      'Pustakawan memeriksa keabsahan lisensi (CC BY, CC BY-SA, CC BY-NC, Domain Publik, atau nomor MoU instansi) guna memastikan kepatuhan UU Hak Cipta dan mencantumkan teks atribusi baku.',
  },
  {
    step: '03',
    title: 'Pengayaan Metadata Dublin Core & Tag SDGs',
    detail:
      'Setiap entri dilengkapi kode aksesi unik, klaster literatur, tingkat literasi pembaca, tahun terbit, serta pemetaan Tujuan Pembangunan Berkelanjutan (SDGs 2, 6, 11, 12, 13, 14, 15).',
  },
  {
    step: '04',
    title: 'Optimasi Berkas & Standar Web Rendah Karbon',
    detail:
      'Berkas PDF/EPUB dikompresi secara lossless (target <10 MB untuk e-book, <3 MB untuk modul) dan diberi teks alternatif agar ramah pembaca layar serta hemat kuota internet daerah 3T.',
  },
  {
    step: '05',
    title: 'Publikasi Katalog, Audit Tautan & Kurasi Triwulanan',
    detail:
      'Koleksi diterbitkan langsung ke OPAC (Online Public Access Catalog). Setiap 3 bulan, tim pustakawan mengaudit tautan repositori eksternal dan memperbarui edisi panduan teknis yang kedaluwarsa.',
  },
];
