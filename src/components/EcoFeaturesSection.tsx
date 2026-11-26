import { useMemo, useState, type FormEvent } from 'react';
import { Calculator, MessageSquare, MapPin, ThumbsUp } from 'lucide-react';
import { COMMUNITY_IMAGE_PATH } from '../data/blueprintData';
import type {
  CatalogBook,
  CommunityFocus,
  CommunityOrg,
  ForumPost,
  ForumTopic,
  MemberLoan,
  PaperBaselineType,
  SpecificForumTopic,
} from '../types/library';
import { calculatePaperSavings } from '../utils/ecoCalculator';
import { filterCommunities, filterForumPosts } from '../utils/libraryLogic';
import { ResilientImage } from './ResilientImage';

interface EcoFeaturesSectionProps {
  books: CatalogBook[];
  loans: MemberLoan[];
  lowCarbonMode: boolean;
  forumPosts: ForumPost[];
  onAddForumPost: (post: ForumPost) => void;
  onToggleSupportPost: (postId: string) => void;
  communities: CommunityOrg[];
}

type FeatureLabTab = 'calculator' | 'forum' | 'directory';

const FORUM_TOPICS: ForumTopic[] = [
  'Semua',
  'Daur Ulang & Kompos',
  'Kebun Kota',
  'Konservasi & Riset',
  'Literasi Anak',
];

const COMMUNITY_FOCUSES: CommunityFocus[] = [
  'Semua',
  'Bank Sampah & Sirkular',
  'Kebun Kota & Agroekologi',
  'Konservasi Pesisir',
  'Literasi Iklim',
];

export function EcoFeaturesSection({
  books,
  loans,
  lowCarbonMode,
  forumPosts,
  onAddForumPost,
  onToggleSupportPost,
  communities,
}: EcoFeaturesSectionProps) {
  const [activeLab, setActiveLab] = useState<FeatureLabTab>('calculator');

  // Calculator state
  const borrowedPagesTotal = useMemo(() => {
    return loans.reduce((sum, loan) => {
      const found = books.find((b) => b.id === loan.bookId);
      return sum + (found ? found.pages : 0);
    }, 0);
  }, [books, loans]);

  const [manualPages, setManualPages] = useState<number>(180);
  const [useBorrowedPages, setUseBorrowedPages] = useState<boolean>(false);
  const [copiesAvoided, setCopiesAvoided] = useState<number>(3);
  const [paperBaseline, setPaperBaseline] = useState<PaperBaselineType>('virgin');
  const [readingHours, setReadingHours] = useState<number>(4);

  const effectivePages = useBorrowedPages ? borrowedPagesTotal : manualPages;

  const ecoResult = useMemo(
    () =>
      calculatePaperSavings({
        pagesRead: effectivePages,
        copiesAvoided,
        paperBaseline,
        digitalReadingHours: readingHours,
        lowCarbonMode,
      }),
    [effectivePages, copiesAvoided, paperBaseline, readingHours, lowCarbonMode]
  );

  // Forum state
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic>('Semua');
  const [authorName, setAuthorName] = useState('');
  const [authorCity, setAuthorCity] = useState('');
  const [postTopic, setPostTopic] = useState<SpecificForumTopic>('Daur Ulang & Kompos');
  const [postTitle, setPostTitle] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [postBody, setPostBody] = useState('');
  const [forumError, setForumError] = useState<string | null>(null);

  const visiblePosts = useMemo(
    () => filterForumPosts(forumPosts, selectedTopic),
    [forumPosts, selectedTopic]
  );

  const handleForumSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorCity.trim() || !postTitle.trim() || !actionTaken.trim() || postBody.trim().length < 15) {
      setForumError('Lengkapi seluruh kolom dan pastikan catatan pengalaman minimal 15 karakter.');
      return;
    }
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorName: authorName.trim(),
      authorCity: authorCity.trim(),
      topic: postTopic,
      title: postTitle.trim(),
      actionTaken: actionTaken.trim(),
      body: postBody.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
      supportCount: 1,
      supportedByUser: true,
    };
    onAddForumPost(newPost);
    setAuthorName('');
    setAuthorCity('');
    setPostTitle('');
    setActionTaken('');
    setPostBody('');
    setForumError(null);
  };

  // Directory state
  const [selectedFocus, setSelectedFocus] = useState<CommunityFocus>('Semua');
  const [cityQuery, setCityQuery] = useState('');
  const visibleCommunities = useMemo(
    () => filterCommunities(communities, selectedFocus, cityQuery),
    [communities, selectedFocus, cityQuery]
  );

  return (
    <section
      id="fitur-khusus"
      className="scroll-mt-20 py-14 sm:py-18 border-b border-stone-200 dark:border-stone-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs tracking-wide text-[#14532D] dark:text-[#86EFAC] font-medium">
              Bagian 02 · Diferensiasi Ekosistem Digital
            </p>
            <h2
              className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]"
              style={{ textWrap: 'balance' }}
            >
              Fitur Khusus Bertema Lingkungan
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md">
            Mengubah aktivitas membaca pasif menjadi pengukuran dampak ekologi, dialog aksi, dan koneksi komunitas lokal.
          </p>
        </div>

        {/* Conceptual Specification Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="pb-5 border-b border-stone-200 dark:border-stone-800 lg:border-b-0 lg:border-r lg:pr-6">
            <p className="font-mono-tabular text-xs text-[#14532D] dark:text-[#86EFAC]">02.1</p>
            <h3 className="mt-2 font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              Kalkulator Penghematan Kertas &amp; Karbon
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Menghitung lembar kertas, liter air, dan emisi bersih CO2e yang dihindari dari setiap buku digital
              yang dipinjam—dikurangi jejak energi baca layar agar perhitungan tetap jujur secara ilmiah.
            </p>
          </div>

          <div className="pb-5 border-b border-stone-200 dark:border-stone-800 lg:border-b-0 lg:border-r lg:pr-6">
            <p className="font-mono-tabular text-xs text-[#14532D] dark:text-[#86EFAC]">02.2</p>
            <h3 className="mt-2 font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              Forum Diskusi Aksi Hijau
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Setiap utas diskusi mewajibkan kolom “Aksi Nyata yang Dilakukan” dan terhubung ke buku rujukan di
              katalog, mendorong bedah buku berbasis eksperimen warga.
            </p>
          </div>

          <div className="pb-5 border-b border-stone-200 dark:border-stone-800 lg:border-b-0 lg:border-r lg:pr-6">
            <p className="font-mono-tabular text-xs text-[#14532D] dark:text-[#86EFAC]">02.3</p>
            <h3 className="mt-2 font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              Direktori Komunitas Lokal
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Menghubungkan pembaca daring ke bank sampah, kebun kota, dan kelompok konservasi pesisir terdekat
              untuk praktik luring bersama dan pojok baca keliling.
            </p>
          </div>

          <div>
            <p className="font-mono-tabular text-xs text-[#14532D] dark:text-[#86EFAC]">02.4</p>
            <h3 className="mt-2 font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              Mode Baca Hemat Energi &amp; Tantangan SDGs
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Antarmuka mode gelap kontras lembut untuk menghemat daya layar OLED, dipadukan tantangan baca
              triwulanan bertema Air Bersih, Nol Sampah, dan Hutan Tropis.
            </p>
          </div>
        </div>

        {/* Interactive Feature Labs */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-serif-display text-2xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              Laboratorium Fitur Interaktif
            </h3>

            <div
              role="tablist"
              aria-label="Pilih simulasi fitur lingkungan"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EBE6DF]/80 dark:bg-[#1A211C] rounded-lg"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeLab === 'calculator'}
                onClick={() => setActiveLab('calculator')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeLab === 'calculator'
                    ? 'bg-white dark:bg-[#263129] text-[#14532D] dark:text-[#86EFAC] shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kalkulator Kertas</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeLab === 'forum'}
                onClick={() => setActiveLab('forum')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeLab === 'forum'
                    ? 'bg-white dark:bg-[#263129] text-[#14532D] dark:text-[#86EFAC] shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Forum Aksi Hijau ({forumPosts.length})</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeLab === 'directory'}
                onClick={() => setActiveLab('directory')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeLab === 'directory'
                    ? 'bg-white dark:bg-[#263129] text-[#14532D] dark:text-[#86EFAC] shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Direktori Komunitas</span>
              </button>
            </div>
          </div>

          {/* Lab 1: Paper & Carbon Calculator */}
          {activeLab === 'calculator' && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-[#161C18] border border-stone-200 dark:border-stone-800 p-6 sm:p-8">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div>
                    <h4 className="font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                      Parameter Simulasi Penghematan Kertas
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      Bandingkan pembacaan digital vs pencetakan buku fisik bolak-balik.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUseBorrowedPages((v) => !v)}
                    className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      useBorrowedPages
                        ? 'border-[#14532D] bg-[#14532D] text-white dark:bg-[#22C55E] dark:text-[#0B140E]'
                        : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-[#14532D]'
                    }`}
                  >
                    {useBorrowedPages
                      ? `Dari Rak Pinjam (${borrowedPagesTotal} hlm)`
                      : `Pakai Data Rak Pinjam (${borrowedPagesTotal} hlm)`}
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <label htmlFor="calc-pages" className="font-medium text-[#1C1917] dark:text-[#ECE9E1]">
                      Total Halaman Dibaca
                    </label>
                    <span className="font-mono-tabular text-[#14532D] dark:text-[#86EFAC]">
                      {effectivePages} halaman
                    </span>
                  </div>
                  <input
                    id="calc-pages"
                    type="range"
                    min={20}
                    max={1000}
                    step={10}
                    disabled={useBorrowedPages}
                    value={effectivePages}
                    onChange={(e) => setManualPages(Number(e.target.value))}
                    className="w-full accent-[#14532D] dark:accent-[#22C55E] disabled:opacity-50"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <label htmlFor="calc-copies" className="font-medium text-[#1C1917] dark:text-[#ECE9E1]">
                      Eksemplar Cetak yang Dihindari (Individu/Kelompok)
                    </label>
                    <span className="font-mono-tabular text-[#14532D] dark:text-[#86EFAC]">
                      {copiesAvoided} eksemplar
                    </span>
                  </div>
                  <input
                    id="calc-copies"
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={copiesAvoided}
                    onChange={(e) => setCopiesAvoided(Number(e.target.value))}
                    className="w-full accent-[#14532D] dark:accent-[#22C55E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="calc-paper-type"
                      className="block text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5"
                    >
                      Pembanding Kertas Cetak
                    </label>
                    <select
                      id="calc-paper-type"
                      value={paperBaseline}
                      onChange={(e) => setPaperBaseline(e.target.value as PaperBaselineType)}
                      className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md text-[#1C1917] dark:text-[#ECE9E1]"
                    >
                      <option value="virgin">Kertas Serat Baru (Virgin Pulp)</option>
                      <option value="recycled">Kertas Daur Ulang</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="calc-hours"
                      className="block text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5"
                    >
                      Durasi Baca Layar (Jam)
                    </label>
                    <input
                      id="calc-hours"
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      value={readingHours}
                      onChange={(e) => setReadingHours(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md font-mono-tabular text-[#1C1917] dark:text-[#ECE9E1]"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between bg-[#F4F0E8]/70 dark:bg-[#111512] border border-stone-200 dark:border-stone-800 p-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    Estimasi Dampak Bersih · {lowCarbonMode ? 'Mode Hemat Energi Aktif' : 'Mode Layar Standar'}
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-6">
                    <div>
                      <dt className="text-xs text-stone-600 dark:text-stone-400">Lembar Kertas Terselamatkan</dt>
                      <dd
                        data-testid="eco-sheets-saved"
                        className="mt-1 font-serif-display text-3xl font-semibold text-[#14532D] dark:text-[#86EFAC] tabular-nums"
                      >
                        {ecoResult.sheetsSaved.toLocaleString('id-ID')}
                      </dd>
                      <p className="text-xs text-stone-500 dark:text-stone-400 tabular-nums">
                        Setara {ecoResult.paperWeightKg} kg kertas
                      </p>
                    </div>
                    <div>
                      <dt className="text-xs text-stone-600 dark:text-stone-400">Air Bersih Dihemat</dt>
                      <dd className="mt-1 font-serif-display text-3xl font-semibold text-[#1C1917] dark:text-[#ECE9E1] tabular-nums">
                        {ecoResult.waterSavedLiters.toLocaleString('id-ID')} L
                      </dd>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Proses produksi pulp dihindari
                      </p>
                    </div>
                    <div>
                      <dt className="text-xs text-stone-600 dark:text-stone-400">Pengurangan Bersih Emisi</dt>
                      <dd className="mt-1 font-serif-display text-3xl font-semibold text-[#1C1917] dark:text-[#ECE9E1] tabular-nums">
                        {ecoResult.netCo2SavedKg} kg CO2e
                      </dd>
                      <p className="text-xs text-stone-500 dark:text-stone-400 tabular-nums">
                        Cetak ({ecoResult.printCo2AvoidedKg} kg) − Layar ({ecoResult.digitalReadingCo2Kg} kg)
                      </p>
                    </div>
                    <div>
                      <dt className="text-xs text-stone-600 dark:text-stone-400">Kontribusi Pohon Pulp</dt>
                      <dd className="mt-1 font-serif-display text-3xl font-semibold text-[#1C1917] dark:text-[#ECE9E1] tabular-nums">
                        {ecoResult.treesSaved}
                      </dd>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Basis ~8.333 lembar/pohon standar
                      </p>
                    </div>
                  </dl>
                </div>

                <p className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Metodologi transparan: 1 lembar cetak bolak-balik = 2 halaman; konsumsi listrik perangkat &amp;
                  jaringan dihitung 0,024 kg CO2e/jam (atau 0,015 kg CO2e/jam saat Mode Baca Hemat Energi aktif).
                </p>
              </div>
            </div>
          )}

          {/* Lab 2: Forum Diskusi Aksi Hijau */}
          {activeLab === 'forum' && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-5">
                <div
                  role="group"
                  aria-label="Filter topik forum aksi hijau"
                  className="flex flex-wrap gap-1.5 p-1 bg-[#EBE6DF]/70 dark:bg-[#1A211C] rounded-lg"
                >
                  {FORUM_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedTopic === topic
                          ? 'bg-white dark:bg-[#263129] text-[#14532D] dark:text-[#86EFAC] shadow-sm'
                          : 'text-stone-700 dark:text-stone-300 hover:text-[#1C1917]'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                <div className="space-y-4" data-testid="forum-post-list">
                  {visiblePosts.map((post) => (
                    <article
                      key={post.id}
                      className="p-5 bg-white dark:bg-[#161C18] border border-stone-200 dark:border-stone-800"
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-medium text-[#14532D] dark:text-[#86EFAC]">{post.topic}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.authorName} ({post.authorCity})</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{post.createdAt}</span>
                      </div>

                      <h4 className="mt-2 font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                        {post.title}
                      </h4>

                      <p className="mt-2 text-xs font-medium text-stone-700 dark:text-stone-300">
                        Aksi Nyata: {post.actionTaken}
                      </p>

                      <p className="mt-2 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                        {post.body}
                      </p>

                      {post.relatedBookTitle && (
                        <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
                          Rujukan Katalog: {post.relatedBookTitle}
                        </p>
                      )}

                      <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => onToggleSupportPost(post.id)}
                          aria-pressed={Boolean(post.supportedByUser)}
                          aria-label={`Dukung aksi ${post.title}`}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                            post.supportedByUser
                              ? 'border-[#14532D] bg-[#14532D]/10 text-[#14532D] dark:border-[#86EFAC] dark:text-[#86EFAC]'
                              : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-[#14532D]'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                          <span className="tabular-nums">Dukung Aksi ({post.supportCount})</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <form
                  onSubmit={handleForumSubmit}
                  className="p-6 bg-white dark:bg-[#161C18] border border-stone-200 dark:border-stone-800 space-y-4"
                >
                  <h4 className="font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                    Bagikan Catatan Aksi Hijau
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Dokumentasikan hasil praktik Anda setelah membaca modul atau e-book dari perpustakaan.
                  </p>

                  {forumError && (
                    <p role="alert" className="text-xs text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded">
                      {forumError}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="forum-author" className="block text-xs font-medium mb-1">
                        Nama Kontributor
                      </label>
                      <input
                        id="forum-author"
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Mis. Ratih W."
                        className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="forum-city" className="block text-xs font-medium mb-1">
                        Kota / Komunitas
                      </label>
                      <input
                        id="forum-city"
                        type="text"
                        value={authorCity}
                        onChange={(e) => setAuthorCity(e.target.value)}
                        placeholder="Mis. Bogor"
                        className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="forum-topic" className="block text-xs font-medium mb-1">
                      Topik Aksi
                    </label>
                    <select
                      id="forum-topic"
                      value={postTopic}
                      onChange={(e) => setPostTopic(e.target.value as SpecificForumTopic)}
                      className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                    >
                      <option value="Daur Ulang & Kompos">Daur Ulang &amp; Kompos</option>
                      <option value="Kebun Kota">Kebun Kota</option>
                      <option value="Konservasi & Riset">Konservasi &amp; Riset</option>
                      <option value="Literasi Anak">Literasi Anak</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="forum-title" className="block text-xs font-medium mb-1">
                      Judul Diskusi
                    </label>
                    <input
                      id="forum-title"
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="Mis. Uji coba ekoenzim dari kulit jeruk pasar"
                      className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="forum-action" className="block text-xs font-medium mb-1">
                      Aksi Nyata yang Dilakukan
                    </label>
                    <input
                      id="forum-action"
                      type="text"
                      value={actionTaken}
                      onChange={(e) => setActionTaken(e.target.value)}
                      placeholder="Mis. Mengolah 15 kg sisa buah menjadi 20 L ekoenzim"
                      className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="forum-body" className="block text-xs font-medium mb-1">
                      Catatan &amp; Pelajaran Lapangan
                    </label>
                    <textarea
                      id="forum-body"
                      rows={3}
                      value={postBody}
                      onChange={(e) => setPostBody(e.target.value)}
                      placeholder="Ceritakan tantangan, hasil, atau pertanyaan untuk pembaca lain..."
                      className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 text-sm font-medium bg-[#14532D] text-white hover:bg-[#0F3F22] dark:bg-[#22C55E] dark:text-[#0B140E] dark:hover:bg-[#4ADE80] rounded-md transition-colors cursor-pointer"
                  >
                    Kirim Diskusi Aksi
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Lab 3: Direktori Komunitas Lingkungan Lokal */}
          {activeLab === 'directory' && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label htmlFor="community-search" className="sr-only">
                        Cari komunitas atau kota
                      </label>
                      <input
                        id="community-search"
                        type="search"
                        value={cityQuery}
                        onChange={(e) => setCityQuery(e.target.value)}
                        placeholder="Cari nama komunitas, kota, atau provinsi..."
                        className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161C18] border border-stone-300 dark:border-stone-700 rounded-md"
                      />
                    </div>
                    <div
                      role="group"
                      aria-label="Filter fokus komunitas"
                      className="flex flex-wrap gap-1 p-1 bg-[#EBE6DF]/70 dark:bg-[#1A211C] rounded-lg"
                    >
                      {COMMUNITY_FOCUSES.map((focus) => (
                        <button
                          key={focus}
                          type="button"
                          onClick={() => setSelectedFocus(focus)}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                            selectedFocus === focus
                              ? 'bg-white dark:bg-[#263129] text-[#14532D] dark:text-[#86EFAC] shadow-sm'
                              : 'text-stone-700 dark:text-stone-300'
                          }`}
                        >
                          {focus === 'Semua' ? 'Semua' : focus.split(' & ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleCommunities.map((org) => (
                      <article
                        key={org.id}
                        className="p-5 bg-white dark:bg-[#161C18] border border-stone-200 dark:border-stone-800"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
                          <span className="text-[#14532D] dark:text-[#86EFAC] font-medium">{org.focus}</span>
                          <span className="font-mono-tabular">{org.memberCount} anggota</span>
                        </div>
                        <h4 className="mt-1.5 font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                          {org.name}
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400">
                          {org.city}, {org.province}
                        </p>
                        <p className="mt-2.5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                          {org.collaborationType}
                        </p>
                        <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 space-y-1">
                          <p>Jadwal: {org.schedule}</p>
                          <p className="font-mono-tabular">Kontak: {org.contactHandle}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <ResilientImage
                    src={COMMUNITY_IMAGE_PATH}
                    alt="Pojok literasi hijau komunitas di samping kebun sayur organik perkotaan"
                    figureNumber="Fig. 3"
                    caption="Sinergi perpustakaan digital dengan titik kumpul luring komunitas kebun kota dan bank sampah setempat."
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
