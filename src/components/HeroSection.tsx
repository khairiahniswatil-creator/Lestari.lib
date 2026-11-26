import { Moon, Sun, BookMarked } from 'lucide-react';
import { HERO_IMAGE_PATH } from '../data/blueprintData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  lowCarbonMode: boolean;
  onToggleLowCarbon: () => void;
  totalCatalogCount: number;
  activeLoanCount: number;
}

export function HeroSection({
  lowCarbonMode,
  onToggleLowCarbon,
  totalCatalogCount,
  activeLoanCount,
}: HeroSectionProps) {
  return (
    <section id="top" className="scroll-mt-20 pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-wide font-medium text-stone-600 dark:text-stone-400 mb-5">
          <span>Dokumen Perencanaan Sistem Informasi</span>
          <span aria-hidden="true">·</span>
          <span>Literasi Lingkungan Hidup</span>
          <span aria-hidden="true">·</span>
          <span>Edisi 2026</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h1
                className="font-serif-display font-semibold tracking-tight text-[#1C1917] dark:text-[#ECE9E1] leading-[1.12]"
                style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.4rem)', textWrap: 'balance' }}
              >
                Cetak Biru Perpustakaan Digital Bertema Lingkungan
              </h1>

              <p className="mt-4 text-sm font-medium text-[#14532D] dark:text-[#86EFAC]">
                Perspektif Konsultan Sistem Informasi &amp; Aktivis Literasi Lingkungan
              </p>

              <p className="mt-5 text-base text-stone-700 dark:text-stone-300 leading-relaxed max-w-prose first-letter:text-5xl first-letter:font-serif-display first-letter:font-semibold first-letter:float-left first-letter:mr-1.5 first-letter:mt-0.5 first-letter:leading-none first-letter:text-[#14532D] dark:first-letter:text-[#86EFAC]">
                Dokumen ini merancang arsitektur pengetahuan, fitur ekologis interaktif, strategi akuisisi
                koleksi legal tanpa biaya royalti, serta prosedur peminjaman dan tata kelola katalog
                untuk membangun ekosistem literasi lingkungan yang inklusif dan rendah emisi karbon.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <a
                  href="#visi-kurasi"
                  className="group flex items-baseline justify-between py-2 border-b border-stone-200 dark:border-stone-800 hover:border-[#14532D] dark:hover:border-[#86EFAC] transition-colors"
                >
                  <span className="font-medium text-[#1C1917] dark:text-[#ECE9E1] group-hover:text-[#14532D] dark:group-hover:text-[#86EFAC]">
                    01. Visi &amp; Kurasi Konten
                  </span>
                </a>
                <a
                  href="#fitur-khusus"
                  className="group flex items-baseline justify-between py-2 border-b border-stone-200 dark:border-stone-800 hover:border-[#14532D] dark:hover:border-[#86EFAC] transition-colors"
                >
                  <span className="font-medium text-[#1C1917] dark:text-[#ECE9E1] group-hover:text-[#14532D] dark:group-hover:text-[#86EFAC]">
                    02. Fitur Khusus Ekologi
                  </span>
                </a>
                <a
                  href="#strategi-koleksi"
                  className="group flex items-baseline justify-between py-2 border-b border-stone-200 dark:border-stone-800 hover:border-[#14532D] dark:hover:border-[#86EFAC] transition-colors"
                >
                  <span className="font-medium text-[#1C1917] dark:text-[#ECE9E1] group-hover:text-[#14532D] dark:group-hover:text-[#86EFAC]">
                    03. Koleksi Legal &amp; Gratis
                  </span>
                </a>
                <a
                  href="#alur-pengelolaan"
                  className="group flex items-baseline justify-between py-2 border-b border-stone-200 dark:border-stone-800 hover:border-[#14532D] dark:hover:border-[#86EFAC] transition-colors"
                >
                  <span className="font-medium text-[#1C1917] dark:text-[#ECE9E1] group-hover:text-[#14532D] dark:group-hover:text-[#86EFAC]">
                    04. Alur &amp; Pengelolaan
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={onToggleLowCarbon}
                  aria-pressed={lowCarbonMode}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium border border-stone-300 dark:border-stone-700 bg-[#F4F0E8] dark:bg-[#1B221D] text-[#1C1917] dark:text-[#ECE9E1] hover:border-[#14532D] dark:hover:border-[#86EFAC] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {lowCarbonMode ? (
                    <Sun className="w-4 h-4 text-[#86EFAC]" aria-hidden="true" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#14532D]" aria-hidden="true" />
                  )}
                  <span>
                    {lowCarbonMode ? 'Mode Terang Arsip' : 'Mode Baca Hemat Energi'}
                  </span>
                </button>

                <a
                  href="#rak-pinjam"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-[#14532D] dark:text-[#86EFAC] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  <BookMarked className="w-4 h-4" aria-hidden="true" />
                  <span className="tabular-nums">
                    Rak Pinjam Aktif ({activeLoanCount}/5)
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <ResilientImage
              src={HERO_IMAGE_PATH}
              alt="Ruang baca perpustakaan lingkungan dengan rak kayu jati, tanaman pakis tropis, dan pencahayaan alami"
              figureNumber="Fig. 1"
              caption="Prototipe ruang baca Pustaka Lestari: integrasi pencahayaan alami, arsip ekologi terbuka, dan akses digital hemat energi."
              containerClassName="w-full"
              className="w-full h-72 sm:h-80 lg:h-full object-cover"
            />
          </div>
        </div>

        <dl className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <dt className="text-xs font-medium tracking-wide text-stone-600 dark:text-stone-400">
              Klaster Literatur
            </dt>
            <dd className="mt-1.5 font-serif-display text-2xl font-semibold text-[#1C1917] dark:text-[#ECE9E1] tabular-nums">
              5 Klaster Utama
            </dd>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              Ekologi, jurnal, daur ulang, berkebun &amp; cerita anak
            </p>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-stone-600 dark:text-stone-400">
              Katalog Prototipe
            </dt>
            <dd className="mt-1.5 font-serif-display text-2xl font-semibold text-[#1C1917] dark:text-[#ECE9E1] tabular-nums">
              {totalCatalogCount} Judul Terkurasi
            </dd>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              100% bebas biaya lisensi &amp; terverifikasi
            </p>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-stone-600 dark:text-stone-400">
              Batas Peminjaman
            </dt>
            <dd className="mt-1.5 font-serif-display text-2xl font-semibold text-[#1C1917] dark:text-[#ECE9E1] tabular-nums">
              5 Buku / 14 Hari
            </dd>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              Akses tak terbatas untuk karya Creative Commons
            </p>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-stone-600 dark:text-stone-400">
              Standar Berkas Hijau
            </dt>
            <dd className="mt-1.5 font-serif-display text-2xl font-semibold text-[#1C1917] dark:text-[#ECE9E1] tabular-nums">
              &lt; 10 MB / Judul
            </dd>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              Kompresi lossless ramah bandwidth &amp; rendah karbon
            </p>
          </div>
        </dl>
      </div>
    </section>
  );
}
