interface HeaderProps {
  onOpenExport: () => void;
}

export function Header({ onOpenExport }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 dark:bg-[#111512]/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-serif-display text-xl font-semibold tracking-tight text-[#1C1917] dark:text-[#ECE9E1] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
        >
          Pustaka Lestari
        </a>

        <nav
          aria-label="Navigasi dokumen perencanaan"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          <a
            href="#visi-kurasi"
            className="hover:text-[#14532D] dark:hover:text-[#86EFAC] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Visi &amp; Kurasi
          </a>
          <a
            href="#fitur-khusus"
            className="hover:text-[#14532D] dark:hover:text-[#86EFAC] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Fitur Khusus
          </a>
          <a
            href="#strategi-koleksi"
            className="hover:text-[#14532D] dark:hover:text-[#86EFAC] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Strategi Koleksi
          </a>
          <a
            href="#alur-pengelolaan"
            className="hover:text-[#14532D] dark:hover:text-[#86EFAC] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Alur &amp; Kelola
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenExport}
            className="px-4 py-2 text-xs sm:text-sm font-medium bg-[#14532D] text-white hover:bg-[#0F3F22] dark:bg-[#22C55E] dark:text-[#0B140E] dark:hover:bg-[#4ADE80] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D]"
          >
            Unduh Ringkasan
          </button>
        </div>
      </div>
    </header>
  );
}
