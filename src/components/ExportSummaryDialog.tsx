import { useEffect, useRef, useState } from 'react';
import { X, Copy, Check, Download, Printer } from 'lucide-react';
import { buildBlueprintMarkdownSummary } from '../utils/libraryLogic';

interface ExportSummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  totalBooks: number;
}

export function ExportSummaryDialog({ isOpen, onClose, totalBooks }: ExportSummaryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const markdownText = buildBlueprintMarkdownSummary(totalBooks);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rencana-perpustakaan-digital-lingkungan.md';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="export-dialog-title"
      className="backdrop:bg-black/50 bg-[#FBF9F5] dark:bg-[#161C18] text-[#1C1917] dark:text-[#ECE9E1] border border-stone-300 dark:border-stone-700 rounded-lg max-w-2xl w-[92vw] p-0 m-auto shadow-xl"
    >
      <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between gap-4">
        <div>
          <h2 id="export-dialog-title" className="font-serif-display text-xl font-semibold">
            Ringkasan Dokumen Perencanaan
          </h2>
          <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
            Salin naskah terstruktur dalam format Markdown, unduh berkas, atau cetak dokumen lengkap.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup dialog ekspor"
          className="p-1.5 text-stone-500 hover:text-[#1C1917] dark:hover:text-white rounded-md cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <pre className="p-4 text-xs font-mono-tabular bg-[#F4F0E8] dark:bg-[#111512] border border-stone-200 dark:border-stone-800 rounded-md max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
          {markdownText}
        </pre>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-stone-300 dark:border-stone-700 rounded-md hover:border-[#14532D] cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Cetak Halaman</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-stone-300 dark:border-stone-700 rounded-md hover:border-[#14532D] cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#14532D] dark:text-[#86EFAC]" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{copied ? 'Tersalin' : 'Salin Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#14532D] text-white hover:bg-[#0F3F22] dark:bg-[#22C55E] dark:text-[#0B140E] rounded-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Unduh (.md)</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
