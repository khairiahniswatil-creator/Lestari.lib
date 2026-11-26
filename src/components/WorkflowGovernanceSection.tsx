import { useState, type FormEvent } from 'react';
import { BookMarked, PlusCircle, RotateCcw } from 'lucide-react';
import { LIBRARIAN_UPDATE_STEPS, MEMBER_BORROW_STEPS } from '../data/blueprintData';
import type {
  CatalogBook,
  LicenseType,
  MemberLoan,
  NewCatalogEntryInput,
  ReadingLevel,
  SpecificBookCluster,
} from '../types/library';
import { MAX_ACTIVE_LOANS } from '../utils/libraryLogic';

interface WorkflowGovernanceSectionProps {
  books: CatalogBook[];
  loans: MemberLoan[];
  onReturnBook: (bookId: string) => void;
  onAddCatalogBook: (input: NewCatalogEntryInput) => { ok: true; book: CatalogBook } | { ok: false; error: string };
}

export function WorkflowGovernanceSection({
  books,
  loans,
  onReturnBook,
  onAddCatalogBook,
}: WorkflowGovernanceSectionProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisherSource, setPublisherSource] = useState('');
  const [cluster, setCluster] = useState<SpecificBookCluster>('Modul Daur Ulang');
  const [license, setLicense] = useState<LicenseType>('CC BY 4.0');
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('Umum & Komunitas');
  const [pages, setPages] = useState('48');
  const [fileSizeMb, setFileSizeMb] = useState('2.4');
  const [year, setYear] = useState('2026');
  const [summary, setSummary] = useState('');
  const [formStatus, setFormStatus] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handlePublishBook = (e: FormEvent) => {
    e.preventDefault();
    const res = onAddCatalogBook({
      title,
      author,
      publisherSource,
      cluster,
      license,
      readingLevel,
      pages: Number(pages),
      fileSizeMb: Number(fileSizeMb),
      year: Number(year),
      summary,
    });

    if (!res.ok) {
      setFormStatus({ type: 'error', text: res.error });
      return;
    }

    setFormStatus({
      type: 'success',
      text: `Koleksi "${res.book.title}" (${res.book.accessionCode}) berhasil diterbitkan ke katalog utama.`,
    });
    setTitle('');
    setAuthor('');
    setPublisherSource('');
    setSummary('');
  };

  return (
    <section id="alur-pengelolaan" className="scroll-mt-20 py-14 sm:py-18">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs tracking-wide text-[#14532D] dark:text-[#86EFAC] font-medium">
              Bagian 04 · Tata Kelola &amp; Operasional
            </p>
            <h2
              className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]"
              style={{ textWrap: 'balance' }}
            >
              Alur Penggunaan &amp; Pengelolaan Sistem
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md">
            Prosedur operasional standar dari peminjaman digital oleh anggota hingga pembaruan katalog oleh pustakawan.
          </p>
        </div>

        {/* Two SOP Columns */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              4.1 Alur Peminjaman Digital oleh Anggota
            </h3>
            <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
              Dirancang ringkas agar warga dari berbagai latar belakang dapat mengakses bahan bacaan dalam tiga klik.
            </p>
            <ol className="mt-6 space-y-5 border-t border-stone-200 dark:border-stone-800 pt-5">
              {MEMBER_BORROW_STEPS.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="font-mono-tabular text-sm font-semibold text-[#14532D] dark:text-[#86EFAC] shrink-0 pt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              4.2 Alur Kerja Pustakawan &amp; Pembaruan Katalog
            </h3>
            <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
              Siklus kurasi mingguan dan triwulanan menjamin seluruh berkas tetap mutakhir, sah secara hukum, dan ringan diakses.
            </p>
            <ol className="mt-6 space-y-5 border-t border-stone-200 dark:border-stone-800 pt-5">
              {LIBRARIAN_UPDATE_STEPS.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="font-mono-tabular text-sm font-semibold text-[#14532D] dark:text-[#86EFAC] shrink-0 pt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Interactive Consoles: Member Bookshelf & Librarian Catalog Publisher */}
        <div className="mt-14 pt-10 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Member Active Shelf */}
          <div
            id="rak-pinjam"
            className="scroll-mt-20 lg:col-span-5 p-6 bg-white dark:bg-[#161C18] border border-stone-200 dark:border-stone-800"
          >
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-[#14532D] dark:text-[#86EFAC]" aria-hidden="true" />
                <h3 className="font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                  Rak Pinjam Anggota
                </h3>
              </div>
              <span className="font-mono-tabular text-xs font-medium text-stone-600 dark:text-stone-400">
                Kuota {loans.length}/{MAX_ACTIVE_LOANS}
              </span>
            </div>

            {loans.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm font-medium text-[#1C1917] dark:text-[#ECE9E1]">
                  Belum ada buku yang sedang dipinjam.
                </p>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                  Pilih “Pinjam Digital” pada salah satu koleksi di Bagian 01 untuk menguji alur peminjaman.
                </p>
                <a
                  href="#visi-kurasi"
                  className="mt-4 inline-block px-4 py-2 text-xs font-medium border border-stone-300 dark:border-stone-700 rounded-md hover:border-[#14532D]"
                >
                  Lihat Katalog Kurasi
                </a>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-stone-200 dark:divide-stone-800" data-testid="active-loans-list">
                {loans.map((loan) => {
                  const book = books.find((b) => b.id === loan.bookId);
                  if (!book) return null;
                  return (
                    <li key={loan.bookId} className="py-4 first:pt-1 last:pb-1">
                      <p className="text-xs font-mono-tabular text-[#14532D] dark:text-[#86EFAC]">
                        {book.accessionCode} · Jatuh tempo {loan.dueAt}
                      </p>
                      <h4 className="mt-1 text-sm font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                        {book.title}
                      </h4>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-xs text-stone-500 dark:text-stone-400 tabular-nums">
                          {book.pages} hlm · {book.license}
                        </span>
                        <button
                          type="button"
                          onClick={() => onReturnBook(book.id)}
                          aria-label={`Kembalikan buku ${book.title}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-stone-300 dark:border-stone-700 rounded-md hover:border-[#14532D] text-[#1C1917] dark:text-[#ECE9E1] cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" aria-hidden="true" />
                          <span>Kembalikan</span>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Librarian Catalog Publisher */}
          <form
            onSubmit={handlePublishBook}
            className="lg:col-span-7 p-6 bg-white dark:bg-[#161C18] border border-stone-200 dark:border-stone-800 space-y-4"
          >
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#14532D] dark:text-[#86EFAC]" aria-hidden="true" />
                <h3 className="font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                  Panel Kerja Pustakawan: Tambah Koleksi Baru
                </h3>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">Simulasi Pembaruan Katalog</span>
            </div>

            {formStatus && (
              <div
                role={formStatus.type === 'error' ? 'alert' : 'status'}
                className={`p-3 text-xs rounded-md ${
                  formStatus.type === 'error'
                    ? 'bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300'
                    : 'bg-[#14532D]/10 text-[#14532D] dark:bg-[#22C55E]/15 dark:text-[#86EFAC]'
                }`}
              >
                {formStatus.text}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="lib-title" className="block text-xs font-medium mb-1">
                  Judul Literatur
                </label>
                <input
                  id="lib-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Mis. Teknik Pemanenan Air Hujan Skala Rumah Tangga"
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="lib-author" className="block text-xs font-medium mb-1">
                  Penulis / Tim Penyusun
                </label>
                <input
                  id="lib-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Mis. Dr. Kartika Sari"
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="lib-source" className="block text-xs font-medium mb-1">
                  Instansi / Repositori Sumber
                </label>
                <input
                  id="lib-source"
                  type="text"
                  value={publisherSource}
                  onChange={(e) => setPublisherSource(e.target.value)}
                  placeholder="Mis. KLHK RI / DOAJ"
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="lib-cluster" className="block text-xs font-medium mb-1">
                  Klaster Literatur
                </label>
                <select
                  id="lib-cluster"
                  value={cluster}
                  onChange={(e) => setCluster(e.target.value as SpecificBookCluster)}
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                >
                  <option value="E-Book Ekologi">E-Book Ekologi</option>
                  <option value="Jurnal Penelitian">Jurnal Penelitian</option>
                  <option value="Modul Daur Ulang">Modul Daur Ulang</option>
                  <option value="Panduan Berkebun">Panduan Berkebun</option>
                  <option value="Cerita Anak Alam">Cerita Anak Alam</option>
                </select>
              </div>

              <div>
                <label htmlFor="lib-license" className="block text-xs font-medium mb-1">
                  Lisensi Legal
                </label>
                <select
                  id="lib-license"
                  value={license}
                  onChange={(e) => setLicense(e.target.value as LicenseType)}
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                >
                  <option value="CC BY 4.0">CC BY 4.0</option>
                  <option value="CC BY-SA 4.0">CC BY-SA 4.0</option>
                  <option value="CC BY-NC 4.0">CC BY-NC 4.0</option>
                  <option value="Domain Publik">Domain Publik</option>
                  <option value="MoU KLHK / Instansi">MoU KLHK / Instansi</option>
                </select>
              </div>

              <div>
                <label htmlFor="lib-level" className="block text-xs font-medium mb-1">
                  Tingkat Bacaan
                </label>
                <select
                  id="lib-level"
                  value={readingLevel}
                  onChange={(e) => setReadingLevel(e.target.value as ReadingLevel)}
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                >
                  <option value="Anak & Pemula">Anak &amp; Pemula</option>
                  <option value="Umum & Komunitas">Umum &amp; Komunitas</option>
                  <option value="Akademik & Peneliti">Akademik &amp; Peneliti</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="lib-pages" className="block text-xs font-medium mb-1">
                    Halaman
                  </label>
                  <input
                    id="lib-pages"
                    type="number"
                    min={4}
                    max={3000}
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-mono-tabular bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="lib-size" className="block text-xs font-medium mb-1">
                    MB
                  </label>
                  <input
                    id="lib-size"
                    type="number"
                    min={0.1}
                    max={250}
                    step={0.1}
                    value={fileSizeMb}
                    onChange={(e) => setFileSizeMb(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-mono-tabular bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="lib-year" className="block text-xs font-medium mb-1">
                    Tahun
                  </label>
                  <input
                    id="lib-year"
                    type="number"
                    min={1990}
                    max={2030}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-mono-tabular bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lib-summary" className="block text-xs font-medium mb-1">
                  Ringkasan Kurasi
                </label>
                <textarea
                  id="lib-summary"
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Jelaskan cakupan topik ekologi dan manfaat praktisnya bagi pembaca..."
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] dark:bg-[#111512] border border-stone-300 dark:border-stone-700 rounded-md"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium bg-[#14532D] text-white hover:bg-[#0F3F22] dark:bg-[#22C55E] dark:text-[#0B140E] dark:hover:bg-[#4ADE80] rounded-md transition-colors cursor-pointer"
              >
                Terbitkan ke Katalog
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
