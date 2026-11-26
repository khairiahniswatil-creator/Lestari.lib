import type {
  BookCluster,
  CatalogBook,
  CommunityFocus,
  CommunityOrg,
  ForumPost,
  ForumTopic,
  LicenseType,
  MemberLoan,
  NewCatalogEntryInput,
  NewForumPostInput,
  ReadingLevel,
} from '../types/library';

export const MAX_ACTIVE_LOANS = 5;
export const LOAN_DURATION_DAYS = 14;

export function filterCatalogBooks(
  books: CatalogBook[],
  options: {
    cluster?: BookCluster;
    license?: LicenseType | 'Semua';
    readingLevel?: ReadingLevel | 'Semua';
    query?: string;
  }
): CatalogBook[] {
  const q = (options.query || '').trim().toLowerCase();
  return books.filter((book) => {
    if (options.cluster && options.cluster !== 'Semua' && book.cluster !== options.cluster) {
      return false;
    }
    if (options.license && options.license !== 'Semua' && book.license !== options.license) {
      return false;
    }
    if (
      options.readingLevel &&
      options.readingLevel !== 'Semua' &&
      book.readingLevel !== options.readingLevel
    ) {
      return false;
    }
    if (q) {
      const haystack = [
        book.title,
        book.author,
        book.publisherSource,
        book.accessionCode,
        book.summary,
        ...book.sdgTags,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) {
        return false;
      }
    }
    return true;
  });
}

export function borrowBook(
  books: CatalogBook[],
  loans: MemberLoan[],
  bookId: string,
  nowDate = new Date()
): { ok: true; books: CatalogBook[]; loans: MemberLoan[] } | { ok: false; error: string } {
  if (loans.some((loan) => loan.bookId === bookId)) {
    return { ok: false, error: 'Judul ini sudah ada di Rak Pinjam Anda.' };
  }

  if (loans.length >= MAX_ACTIVE_LOANS) {
    return {
      ok: false,
      error: `Kuota peminjaman maksimal (${MAX_ACTIVE_LOANS} buku aktif) telah tercapai. Kembalikan salah satu buku terlebih dahulu.`,
    };
  }

  const target = books.find((b) => b.id === bookId);
  if (!target) {
    return { ok: false, error: 'Koleksi tidak ditemukan di katalog.' };
  }

  if (target.availableCopies <= 0) {
    return { ok: false, error: 'Seluruh lisensi akses serentak untuk judul ini sedang dipinjam.' };
  }

  const borrowedAt = nowDate.toISOString().slice(0, 10);
  const dueDate = new Date(nowDate.getTime() + LOAN_DURATION_DAYS * 24 * 60 * 60 * 1000);
  const dueAt = dueDate.toISOString().slice(0, 10);

  const nextBooks = books.map((b) =>
    b.id === bookId ? { ...b, availableCopies: Math.max(0, b.availableCopies - 1) } : b
  );
  const nextLoans: MemberLoan[] = [
    { bookId, borrowedAt, dueAt, progressPercent: 15 },
    ...loans,
  ];

  return { ok: true, books: nextBooks, loans: nextLoans };
}

export function returnBook(
  books: CatalogBook[],
  loans: MemberLoan[],
  bookId: string
): { books: CatalogBook[]; loans: MemberLoan[] } {
  const exists = loans.some((l) => l.bookId === bookId);
  if (!exists) {
    return { books, loans };
  }
  const nextLoans = loans.filter((l) => l.bookId !== bookId);
  const nextBooks = books.map((b) =>
    b.id === bookId
      ? { ...b, availableCopies: Math.min(b.totalCopies, b.availableCopies + 1) }
      : b
  );
  return { books: nextBooks, loans: nextLoans };
}

export function validateNewCatalogEntry(input: NewCatalogEntryInput): string | null {
  if (!input.title.trim() || input.title.trim().length < 4) {
    return 'Judul koleksi wajib diisi minimal 4 karakter.';
  }
  if (!input.author.trim()) {
    return 'Nama penulis atau tim penyusun wajib diisi.';
  }
  if (!input.publisherSource.trim()) {
    return 'Instansi penerbit atau repositori asal wajib diisi.';
  }
  if (!Number.isFinite(input.pages) || input.pages < 4 || input.pages > 3000) {
    return 'Jumlah halaman harus antara 4 hingga 3000 halaman.';
  }
  if (!Number.isFinite(input.fileSizeMb) || input.fileSizeMb <= 0 || input.fileSizeMb > 250) {
    return 'Ukuran berkas harus antara 0.1 MB hingga 250 MB (mengikuti standar hemat energi).';
  }
  if (!Number.isFinite(input.year) || input.year < 1990 || input.year > 2030) {
    return 'Tahun terbit tidak valid.';
  }
  if (!input.summary.trim() || input.summary.trim().length < 15) {
    return 'Ringkasan kurasi wajib diisi minimal 15 karakter.';
  }
  return null;
}

export function createCatalogBook(
  existingBooks: CatalogBook[],
  input: NewCatalogEntryInput
): { ok: true; book: CatalogBook } | { ok: false; error: string } {
  const validationError = validateNewCatalogEntry(input);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const clusterPrefixMap: Record<NewCatalogEntryInput['cluster'], string> = {
    'E-Book Ekologi': 'EK',
    'Jurnal Penelitian': 'JP',
    'Modul Daur Ulang': 'DR',
    'Panduan Berkebun': 'BK',
    'Cerita Anak Alam': 'CA',
  };

  const prefix = clusterPrefixMap[input.cluster];
  const nextSeq = String(existingBooks.length + 1).padStart(2, '0');
  const accessionCode = `ACC-${prefix}-${input.year}-${nextSeq}`;

  const isUnlimitedLicense =
    input.license === 'CC BY 4.0' ||
    input.license === 'CC BY-SA 4.0' ||
    input.license === 'Domain Publik';
  const totalCopies = isUnlimitedLicense ? 99 : 15;

  const book: CatalogBook = {
    id: `book-${Date.now()}-${nextSeq}`,
    accessionCode,
    title: input.title.trim(),
    author: input.author.trim(),
    publisherSource: input.publisherSource.trim(),
    cluster: input.cluster,
    license: input.license,
    readingLevel: input.readingLevel,
    pages: Math.round(input.pages),
    fileSizeMb: Math.round(input.fileSizeMb * 10) / 10,
    year: Math.round(input.year),
    sdgTags: ['SDG 13 Iklim', 'SDG 15 Ekosistem'],
    summary: input.summary.trim(),
    availableCopies: totalCopies,
    totalCopies,
  };

  return { ok: true, book };
}

export function filterForumPosts(posts: ForumPost[], topic: ForumTopic): ForumPost[] {
  if (topic === 'Semua') return posts;
  return posts.filter((p) => p.topic === topic);
}

export function createForumPost(
  input: NewForumPostInput,
  nowDate = new Date()
): { ok: true; post: ForumPost } | { ok: false; error: string } {
  if (!input.authorName.trim() || input.authorName.trim().length < 2) {
    return { ok: false, error: 'Nama kontributor wajib diisi.' };
  }
  if (!input.authorCity.trim()) {
    return { ok: false, error: 'Kota/wilayah komunitas wajib diisi.' };
  }
  if (!input.title.trim() || input.title.trim().length < 5) {
    return { ok: false, error: 'Judul diskusi aksi wajib diisi minimal 5 karakter.' };
  }
  if (!input.actionTaken.trim()) {
    return { ok: false, error: 'Ringkasan aksi nyata yang dilakukan wajib diisi.' };
  }
  if (!input.body.trim() || input.body.trim().length < 15) {
    return { ok: false, error: 'Isi pengalaman atau pertanyaan wajib diisi minimal 15 karakter.' };
  }

  return {
    ok: true,
    post: {
      id: `post-${Date.now()}`,
      authorName: input.authorName.trim(),
      authorCity: input.authorCity.trim(),
      topic: input.topic,
      relatedBookTitle: input.relatedBookTitle?.trim() || undefined,
      title: input.title.trim(),
      actionTaken: input.actionTaken.trim(),
      body: input.body.trim(),
      createdAt: nowDate.toISOString().slice(0, 10),
      supportCount: 1,
      supportedByUser: true,
    },
  };
}

export function filterCommunities(
  communities: CommunityOrg[],
  focus: CommunityFocus,
  query: string
): CommunityOrg[] {
  const q = query.trim().toLowerCase();
  return communities.filter((org) => {
    if (focus !== 'Semua' && org.focus !== focus) {
      return false;
    }
    if (q) {
      const text = `${org.name} ${org.city} ${org.province} ${org.collaborationType}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
}

export function evaluateLicenseChecklist(checks: {
  clearLicenseOrMou: boolean;
  attributedSource: boolean;
  noCommercialBreach: boolean;
  accessiblePdfOrEpub: boolean;
}): { passed: boolean; score: number; verdict: string } {
  const items = [
    checks.clearLicenseOrMou,
    checks.attributedSource,
    checks.noCommercialBreach,
    checks.accessiblePdfOrEpub,
  ];
  const score = items.filter(Boolean).length;
  if (score === 4) {
    return {
      passed: true,
      score,
      verdict: 'Lolos Audit Kurasi — Layak diterbitkan ke katalog terbuka Pustaka Lestari.',
    };
  }
  if (!checks.clearLicenseOrMou || !checks.noCommercialBreach) {
    return {
      passed: false,
      score,
      verdict: 'Ditangguhkan — Status lisensi legal/non-komersial belum terpenuhi.',
    };
  }
  return {
    passed: false,
    score,
    verdict: 'Perlu Revisi Teknis — Lengkapi atribusi sumber atau optimasi format berkas aksesibel.',
  };
}

export function buildBlueprintMarkdownSummary(totalBooks: number): string {
  return [
    '# DOKUMEN PERENCANAAN PERPUSTAKAAN DIGITAL BERTEMA LINGKUNGAN',
    '## Nama Inisiatif: Pustaka Lestari Nusantara',
    'Peran Penyusun: Konsultan Sistem Informasi & Aktivis Literasi Lingkungan',
    '',
    '### 1. Visi & Kurasi Konten',
    '- Visi: Menjadi pusat pengetahuan ekologi terbuka, inklusif, dan rendah emisi karbon untuk mendorong aksi nyata pelestarian lingkungan lintas generasi.',
    '- Lima Klaster Literatur Utama: E-Book Ekologi & Iklim, Jurnal Penelitian Lingkungan, Modul Daur Ulang & Ekonomi Sirkular, Panduan Berkebun Organik, serta Buku Cerita Anak Bertema Alam.',
    `- Jumlah Katalog Aktif Terkurasi: ${totalBooks} judul terverifikasi dengan skema metadata Dublin Core + Tag SDGs.`,
    '',
    '### 2. Fitur Khusus Bertema Lingkungan',
    '- Kalkulator Penghematan Kertas & Jejak Karbon Digital terintegrasi dengan riwayat bacaan anggota.',
    '- Forum Diskusi Aksi Hijau untuk menerjemahkan bacaan menjadi praktik komunitas terverifikasi.',
    '- Direktori Komunitas Lingkungan Lokal berbasis wilayah dan fokus aksi (Bank Sampah, Kebun Kota, Konservasi Pesisir, Literasi Iklim).',
    '- Mode Baca Hemat Energi (antarmuka kontras rendah-silau & kompresi aset media) dan Tantangan Literasi Hijau.',
    '',
    '### 3. Strategi Pengumpulan Koleksi (Legal & Gratis)',
    '- Kemitraan Institusional: KLHK RI, BRIN, BMKG, dan dinas lingkungan hidup daerah melalui skema MoU non-eksklusif.',
    '- Kolaborasi NGO Konservasi: Yayasan KEHATI, WALHI, WWF Indonesia, WRI Indonesia.',
    '- Pemanenan Repositori Terbuka (OAI-PMH): DOAJ, Garuda Kemendikbudristek, Biodiversity Heritage Library (BHL), dan repositori universitas.',
    '- Lisensi Creative Commons & Domain Publik: CC0, CC BY, CC BY-SA, CC BY-NC, serta StoryWeaver & Let\'s Read Asia untuk literasi anak.',
    '',
    '### 4. Alur Penggunaan & Pengelolaan',
    '- Alur Anggota: Registrasi Anggota -> Penemuan Katalog & Filter Taksonomi -> Peminjaman Digital (maks. 5 buku berbatas selama 14 hari / akses bebas untuk lisensi CC) -> Baca & Catat Penghematan Kertas -> Pengembalian Otomatis & Berbagi Aksi.',
    '- Alur Tim Pustakawan: Pengumpulan/OAI-PMH -> Audit Legalitas & Hak Cipta -> Pengayaan Metadata Dublin Core & SDGs -> Optimasi Ukuran Berkas (<15 MB hemat energi) -> Publikasi & Pembaruan Katalog Berkala (mingguan/kuartalan).',
  ].join('\n');
}
