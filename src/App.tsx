import { useEffect, useState } from 'react';
import {
  INITIAL_CATALOG_BOOKS,
  INITIAL_COMMUNITIES,
  INITIAL_FORUM_POSTS,
} from './data/blueprintData';
import type {
  CatalogBook,
  ForumPost,
  MemberLoan,
  NewCatalogEntryInput,
} from './types/library';
import { borrowBook, createCatalogBook, returnBook } from './utils/libraryLogic';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VisionCurationSection } from './components/VisionCurationSection';
import { EcoFeaturesSection } from './components/EcoFeaturesSection';
import { CollectionStrategySection } from './components/CollectionStrategySection';
import { WorkflowGovernanceSection } from './components/WorkflowGovernanceSection';
import { ExportSummaryDialog } from './components/ExportSummaryDialog';

export default function App() {
  const [books, setBooks] = useState<CatalogBook[]>(INITIAL_CATALOG_BOOKS);
  const [loans, setLoans] = useState<MemberLoan[]>([
    {
      bookId: 'book-01',
      borrowedAt: '2026-11-20',
      dueAt: '2026-12-04',
      progressPercent: 45,
    },
  ]);
  const [loanFeedback, setLoanFeedback] = useState<string | null>(null);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [communities] = useState(INITIAL_COMMUNITIES);
  const [lowCarbonMode, setLowCarbonMode] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (lowCarbonMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [lowCarbonMode]);

  const handleBorrowBook = (bookId: string) => {
    const res = borrowBook(books, loans, bookId);
    if (!res.ok) {
      setLoanFeedback(res.error);
      return;
    }
    const borrowedBook = books.find((b) => b.id === bookId);
    setBooks(res.books);
    setLoans(res.loans);
    setLoanFeedback(
      borrowedBook
        ? `"${borrowedBook.title}" ditambahkan ke Rak Pinjam Anggota (masa akses 14 hari).`
        : 'Koleksi berhasil dipinjam.'
    );
  };

  const handleReturnBook = (bookId: string) => {
    const returnedBook = books.find((b) => b.id === bookId);
    const res = returnBook(books, loans, bookId);
    setBooks(res.books);
    setLoans(res.loans);
    setLoanFeedback(
      returnedBook
        ? `"${returnedBook.title}" telah dikembalikan dan slot lisensi dilepas kembali.`
        : 'Buku berhasil dikembalikan.'
    );
  };

  const handleAddCatalogBook = (input: NewCatalogEntryInput) => {
    const res = createCatalogBook(books, input);
    if (res.ok) {
      setBooks((prev) => [res.book, ...prev]);
    }
    return res;
  };

  const handleAddForumPost = (post: ForumPost) => {
    setForumPosts((prev) => [post, ...prev]);
  };

  const handleToggleSupportPost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const nextSupported = !post.supportedByUser;
        return {
          ...post,
          supportedByUser: nextSupported,
          supportCount: post.supportCount + (nextSupported ? 1 : -1),
        };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] dark:bg-[#111512] dark:text-[#ECE9E1] transition-colors">
      <Header onOpenExport={() => setIsExportOpen(true)} />

      <main className="flex-1">
        <HeroSection
          lowCarbonMode={lowCarbonMode}
          onToggleLowCarbon={() => setLowCarbonMode((prev) => !prev)}
          totalCatalogCount={books.length}
          activeLoanCount={loans.length}
        />

        <VisionCurationSection
          books={books}
          loans={loans}
          loanFeedback={loanFeedback}
          onBorrowBook={handleBorrowBook}
          onReturnBook={handleReturnBook}
        />

        <EcoFeaturesSection
          books={books}
          loans={loans}
          lowCarbonMode={lowCarbonMode}
          forumPosts={forumPosts}
          onAddForumPost={handleAddForumPost}
          onToggleSupportPost={handleToggleSupportPost}
          communities={communities}
        />

        <CollectionStrategySection />

        <WorkflowGovernanceSection
          books={books}
          loans={loans}
          onReturnBook={handleReturnBook}
          onAddCatalogBook={handleAddCatalogBook}
        />
      </main>

      <footer className="border-t border-stone-200 dark:border-stone-800 py-8 bg-[#F4F0E8]/60 dark:bg-[#0D110E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-600 dark:text-stone-400">
          <p>
            Pustaka Lestari — Dokumen Perencanaan Perpustakaan Digital Bertema Lingkungan (2026)
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#visi-kurasi" className="hover:text-[#14532D] dark:hover:text-[#86EFAC]">
              Visi &amp; Kurasi
            </a>
            <a href="#fitur-khusus" className="hover:text-[#14532D] dark:hover:text-[#86EFAC]">
              Fitur Khusus
            </a>
            <a href="#strategi-koleksi" className="hover:text-[#14532D] dark:hover:text-[#86EFAC]">
              Koleksi Legal
            </a>
            <a href="#alur-pengelolaan" className="hover:text-[#14532D] dark:hover:text-[#86EFAC]">
              Alur &amp; Kelola
            </a>
          </div>
        </div>
      </footer>

      <ExportSummaryDialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        totalBooks={books.length}
      />
    </div>
  );
}
