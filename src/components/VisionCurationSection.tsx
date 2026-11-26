import { useMemo, useState } from 'react';
import { Search, RotateCcw, Check, BookOpen } from 'lucide-react';
import { CLUSTER_BLUEPRINTS, CURATION_IMAGE_PATH } from '../data/blueprintData';
import type { BookCluster, CatalogBook, MemberLoan, ReadingLevel } from '../types/library';
import { filterCatalogBooks } from '../utils/libraryLogic';
import { ResilientImage } from './ResilientImage';

interface VisionCurationSectionProps {
  books: CatalogBook[];
  loans: MemberLoan[];
  loanFeedback: string | null;
  onBorrowBook: (bookId: string) => void;
  onReturnBook: (bookId: string) => void;
}

const CLUSTER_TABS: BookCluster[] = [
  'Semua',
  'E-Book Ekologi',
  'Jurnal Penelitian',
  'Modul Daur Ulang',
  'Panduan Berkebun',
  'Cerita Anak Alam',
];

export function VisionCurationSection({
  books,
  loans,
  loanFeedback,
  onBorrowBook,
  onReturnBook,
}: VisionCurationSectionProps) {
  const [selectedCluster, setSelectedCluster] = useState<BookCluster>('Semua');
  const [selectedLevel, setSelectedLevel] = useState<ReadingLevel | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(
    () =>
      filterCatalogBooks(books, {
        cluster: selectedCluster,
        readingLevel: selectedLevel,
        query: searchQuery,
      }),
    [books, selectedCluster, selectedLevel, searchQuery]
  );

  const borrowedIds = useMemo(() => new Set(loans.map((l) => l.bookId)), [loans]);

  const handleResetFilters = () => {
    setSelectedCluster('Semua');
    setSelectedLevel('Semua');
    setSearchQuery('');
  };

  return (
    <section
      id="visi-kurasi"
      className="scroll-mt-20 py-14 sm:py-18 border-b border-stone-200 dark:border-stone-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs tracking-wide text-[#14532D] dark:text-[#86EFAC] font-medium">
              Bagian 01 · Arsitektur Pengetahuan
            </p>
            <h2
              className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]"
              style={{ textWrap: 'balance' }}
            >
              Visi &amp; Kurasi Konten Ekologi
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md">
            Menyatukan ketelitian riset ilmiah dengan keterbacaan praktis bagi warga, sekolah, dan komunitas.
          </p>
        </div>

        {/* 70 / 30 Editorial Split */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h3 className="font-serif-display text-xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                1.1 Visi, Misi, dan Prinsip Keberlanjutan Digital
              </h3>
              <p className="mt-3 text-base text-stone-700 dark:text-stone-300 leading-relaxed max-w-prose">
                <strong>Visi:</strong> Menjadi pusat pengetahuan ekologi terbuka yang inklusif, terverifikasi secara
                ilmiah, dan hemat jejak karbon untuk mengubah pemahaman lingkungan menjadi aksi nyata di tingkat
                rumah tangga hingga pembuat kebijakan.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5 border-t border-stone-200 dark:border-stone-800">
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                    Inklusivitas Lintas Usia
                  </h4>
                  <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Menyediakan jalur literasi berjenjang dari dongeng bergambar anak hingga jurnal riset gambut.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                    Berorientasi Praktik Lokal
                  </h4>
                  <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Mengutamakan konteks ekosistem tropis Indonesia: kompos, agroekologi lahan sempit, dan mangrove.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                    Desain Web Rendah Karbon
                  </h4>
                  <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Berkas dipadatkan agar cepat diunduh di daerah 3T sekaligus menekan konsumsi energi server.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif-display text-xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                1.2 Taksonomi Lima Klaster Literatur Utama
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-prose">
                Komposisi koleksi diatur proporsional agar perpustakaan tidak hanya dipenuhi teori akademik,
                melainkan seimbang dengan panduan terapan dan literasi generasi muda.
              </p>

              <div className="mt-5 overflow-x-auto border border-stone-200 dark:border-stone-800 bg-[#F4F0E8]/60 dark:bg-[#161C18]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-800 text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400">
                      <th className="py-3 px-4 font-medium">Klaster Literatur</th>
                      <th className="py-3 px-4 font-medium">Porsi</th>
                      <th className="py-3 px-4 font-medium">Kriteria Kurasi &amp; Format</th>
                      <th className="py-3 px-4 font-medium">Sasaran Pembaca</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {CLUSTER_BLUEPRINTS.map((item) => (
                      <tr key={item.cluster} className="align-top">
                        <td className="py-3.5 px-4 font-semibold text-[#1C1917] dark:text-[#ECE9E1] whitespace-nowrap">
                          {item.cluster}
                        </td>
                        <td className="py-3.5 px-4 font-mono-tabular text-[#14532D] dark:text-[#86EFAC] whitespace-nowrap">
                          {item.sharePercent}%
                        </td>
                        <td className="py-3.5 px-4 text-stone-700 dark:text-stone-300 leading-relaxed min-w-[260px]">
                          <p>{item.selectionCriteria}</p>
                          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                            Format: {item.keyFormats}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 min-w-[180px]">
                          {item.targetAudience}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <ResilientImage
              src={CURATION_IMAGE_PATH}
              alt="Panduan lapangan botani, herbarium daun tropis, dan catatan ekologi di atas meja batu kapur"
              figureNumber="Fig. 2"
              caption="Proses kurasi literatur memadukan arsip botani, modul praktis daur ulang, dan sumber data terbuka."
              className="w-full h-56 object-cover"
            />

            <div className="pt-5 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#14532D] dark:text-[#86EFAC]">
                Catatan Arsitektur Metadata
              </h4>
              <p className="mt-2 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                Setiap koleksi wajib memakai skema <strong>Dublin Core</strong> yang diperluas dengan empat atribut
                ekologi:
              </p>
              <dl className="mt-4 space-y-2.5 text-xs border-t border-stone-200 dark:border-stone-800 pt-3">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-stone-400">Kode Aksesi</dt>
                  <dd className="font-mono-tabular text-[#1C1917] dark:text-[#ECE9E1]">ACC-[KLASTER]-[TAHUN]</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-stone-400">Pemetaan SDGs</dt>
                  <dd className="font-mono-tabular text-[#1C1917] dark:text-[#ECE9E1]">SDG 2, 6, 11, 12, 13, 14, 15</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-stone-400">Bobot Berkas</dt>
                  <dd className="font-mono-tabular text-[#1C1917] dark:text-[#ECE9E1]">MB terukur &amp; ramah luring</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-stone-400">Status Lisensi</dt>
                  <dd className="font-mono-tabular text-[#1C1917] dark:text-[#ECE9E1]">CC / Domain Publik / MoU</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        {/* Interactive Curated Catalog Preview */}
        <div className="mt-14 pt-10 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Prototipe Katalog Terkurasi
              </p>
              <h3 className="mt-1 font-serif-display text-2xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                Jelajah Koleksi &amp; Uji Peminjaman Digital
              </h3>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 tabular-nums">
              Menampilkan {filteredBooks.length} dari {books.length} judul koleksi
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <label htmlFor="catalog-search" className="sr-only">
                  Cari judul, penulis, atau kode aksesi
                </label>
                <Search
                  className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="catalog-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul buku, penulis, instansi (mis. KLHK, BRIN), atau kode aksesi..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[#161C18] border border-stone-300 dark:border-stone-700 rounded-md text-[#1C1917] dark:text-[#ECE9E1] placeholder:text-stone-400 focus:outline-none focus:border-[#14532D] dark:focus:border-[#86EFAC]"
                />
              </div>

              <div className="sm:w-56">
                <label htmlFor="reading-level-filter" className="sr-only">
                  Filter tingkat bacaan
                </label>
                <select
                  id="reading-level-filter"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as ReadingLevel | 'Semua')}
                  className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#161C18] border border-stone-300 dark:border-stone-700 rounded-md text-[#1C1917] dark:text-[#ECE9E1] focus:outline-none focus:border-[#14532D] dark:focus:border-[#86EFAC]"
                >
                  <option value="Semua">Semua Tingkat Bacaan</option>
                  <option value="Anak & Pemula">Anak &amp; Pemula</option>
                  <option value="Umum & Komunitas">Umum &amp; Komunitas</option>
                  <option value="Akademik & Peneliti">Akademik &amp; Peneliti</option>
                </select>
              </div>
            </div>

            <div
              role="group"
              aria-label="Filter klaster literatur"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EBE6DF]/70 dark:bg-[#1A211C] rounded-lg"
            >
              {CLUSTER_TABS.map((cluster) => {
                const isActive = selectedCluster === cluster;
                return (
                  <button
                    key={cluster}
                    type="button"
                    onClick={() => setSelectedCluster(cluster)}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-[#263129] text-[#14532D] dark:text-[#86EFAC] shadow-sm'
                        : 'text-stone-700 dark:text-stone-300 hover:text-[#1C1917] dark:hover:text-white'
                    }`}
                  >
                    {cluster}
                  </button>
                );
              })}
            </div>
          </div>

          {loanFeedback && (
            <div
              role="status"
              className="mt-4 px-4 py-3 text-sm bg-[#F4F0E8] dark:bg-[#1B221D] border border-[#14532D]/30 dark:border-[#86EFAC]/30 text-[#1C1917] dark:text-[#ECE9E1] rounded-md"
            >
              {loanFeedback}
            </div>
          )}

          {filteredBooks.length === 0 ? (
            <div className="mt-8 py-12 px-6 text-center border border-stone-200 dark:border-stone-800 bg-[#F4F0E8]/50 dark:bg-[#161C18]">
              <BookOpen className="w-7 h-7 mx-auto text-stone-400 mb-3" aria-hidden="true" />
              <p className="text-base font-medium text-[#1C1917] dark:text-[#ECE9E1]">
                Tidak ada koleksi yang sesuai dengan filter Anda.
              </p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                Coba ubah kata kunci pencarian atau tampilkan semua klaster literatur.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#14532D] text-white hover:bg-[#0F3F22] rounded-md cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Atur Ulang Filter</span>
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="catalog-grid">
              {filteredBooks.map((book) => {
                const isBorrowed = borrowedIds.has(book.id);
                return (
                  <article
                    key={book.id}
                    className="p-5 sm:p-6 bg-white dark:bg-[#161C18] border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-mono-tabular text-[#14532D] dark:text-[#86EFAC] font-medium">
                          {book.accessionCode}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{book.cluster}</span>
                        <span aria-hidden="true">·</span>
                        <span>{book.license}</span>
                      </div>

                      <h4 className="mt-2 font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1] leading-snug">
                        {book.title}
                      </h4>

                      <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                        {book.author} — {book.publisherSource} ({book.year})
                      </p>

                      <p className="mt-3 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                        {book.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-stone-600 dark:text-stone-400 tabular-nums space-x-2">
                        <span>{book.pages} hlm</span>
                        <span aria-hidden="true">·</span>
                        <span>{book.fileSizeMb} MB</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {book.totalCopies >= 99
                            ? 'Akses Terbuka'
                            : `Tersedia ${book.availableCopies}/${book.totalCopies}`}
                        </span>
                      </div>

                      {isBorrowed ? (
                        <button
                          type="button"
                          onClick={() => onReturnBook(book.id)}
                          aria-label={`Kembalikan ${book.title}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-[#14532D] text-[#14532D] dark:border-[#86EFAC] dark:text-[#86EFAC] hover:bg-[#14532D]/5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Sedang Dipinjam · Kembalikan</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onBorrowBook(book.id)}
                          disabled={book.availableCopies <= 0}
                          aria-label={`Pinjam digital ${book.title}`}
                          className="px-4 py-2 text-xs font-medium bg-[#14532D] text-white hover:bg-[#0F3F22] disabled:opacity-40 disabled:cursor-not-allowed dark:bg-[#22C55E] dark:text-[#0B140E] dark:hover:bg-[#4ADE80] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Pinjam Digital
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
