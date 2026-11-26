import test from 'node:test';
import assert from 'node:assert/strict';
import {
  borrowBook,
  createCatalogBook,
  createForumPost,
  evaluateLicenseChecklist,
  filterCatalogBooks,
  MAX_ACTIVE_LOANS,
  returnBook,
} from './libraryLogic';
import type { CatalogBook, MemberLoan } from '../types/library';

const sampleBooks: CatalogBook[] = [
  {
    id: 'b1',
    accessionCode: 'ACC-EK-2025-01',
    title: 'Ekologi Hutan Tropis Nusantara',
    author: 'Dr. Ratna Sari',
    publisherSource: 'BRIN Press',
    cluster: 'E-Book Ekologi',
    license: 'CC BY 4.0',
    readingLevel: 'Akademik & Peneliti',
    pages: 180,
    fileSizeMb: 4.2,
    year: 2025,
    sdgTags: ['SDG 15 Ekosistem'],
    summary: 'Kajian komprehensif keanekaragaman hayati hutan tropis Indonesia.',
    availableCopies: 10,
    totalCopies: 10,
  },
  {
    id: 'b2',
    accessionCode: 'ACC-DR-2025-02',
    title: 'Panduan Praktis Kompos Takakura',
    author: 'Tim Bank Sampah Melati',
    publisherSource: 'KLHK RI',
    cluster: 'Modul Daur Ulang',
    license: 'MoU KLHK / Instansi',
    readingLevel: 'Umum & Komunitas',
    pages: 48,
    fileSizeMb: 2.1,
    year: 2025,
    sdgTags: ['SDG 12 Konsumsi Bertanggung Jawab'],
    summary: 'Langkah membuat kompos rumah tangga tanpa bau dengan keranjang Takakura.',
    availableCopies: 1,
    totalCopies: 5,
  },
];

test('filters catalog books by cluster and search query', () => {
  const byCluster = filterCatalogBooks(sampleBooks, { cluster: 'Modul Daur Ulang' });
  assert.equal(byCluster.length, 1);
  assert.equal(byCluster[0].id, 'b2');

  const byQuery = filterCatalogBooks(sampleBooks, { query: 'brin' });
  assert.equal(byQuery.length, 1);
  assert.equal(byQuery[0].id, 'b1');
});

test('borrows and returns a book while enforcing loan quota', () => {
  const borrowed = borrowBook(sampleBooks, [], 'b2', new Date('2026-11-25T00:00:00Z'));
  assert.equal(borrowed.ok, true);
  if (borrowed.ok) {
    assert.equal(borrowed.loans.length, 1);
    assert.equal(borrowed.books[1].availableCopies, 0);

    const returned = returnBook(borrowed.books, borrowed.loans, 'b2');
    assert.equal(returned.loans.length, 0);
    assert.equal(returned.books[1].availableCopies, 1);
  }

  const fullLoans: MemberLoan[] = Array.from({ length: MAX_ACTIVE_LOANS }, (_, idx) => ({
    bookId: `other-${idx}`,
    borrowedAt: '2026-11-20',
    dueAt: '2026-12-04',
    progressPercent: 20,
  }));
  const rejected = borrowBook(sampleBooks, fullLoans, 'b1');
  assert.equal(rejected.ok, false);
});

test('validates new librarian catalog entry and generates accession code', () => {
  const invalid = createCatalogBook(sampleBooks, {
    title: 'Ab',
    author: '',
    publisherSource: 'KLHK',
    cluster: 'Panduan Berkebun',
    license: 'CC BY 4.0',
    readingLevel: 'Umum & Komunitas',
    pages: 40,
    fileSizeMb: 2,
    year: 2026,
    summary: 'Pendek',
  });
  assert.equal(invalid.ok, false);

  const valid = createCatalogBook(sampleBooks, {
    title: 'Hidroponik Lahan Sempit Perkotaan',
    author: 'Budi Santoso',
    publisherSource: 'Komunitas Kebun Lestari',
    cluster: 'Panduan Berkebun',
    license: 'CC BY-SA 4.0',
    readingLevel: 'Umum & Komunitas',
    pages: 64,
    fileSizeMb: 3.4,
    year: 2026,
    summary: 'Panduan lengkap merancang instalasi hidroponik sumbu dan NFT di pekarangan sempit.',
  });
  assert.equal(valid.ok, true);
  if (valid.ok) {
    assert.equal(valid.book.accessionCode, 'ACC-BK-2026-03');
    assert.equal(valid.book.totalCopies, 99);
  }
});

test('validates forum post and license checklist evaluation', () => {
  const postRes = createForumPost({
    authorName: 'Nadia',
    authorCity: 'Bandung',
    topic: 'Kebun Kota',
    title: 'Panen perdana bayam hidroponik RW 04',
    actionTaken: 'Membuat 12 modul tanam botol daur ulang',
    body: 'Setelah membaca modul berkebun kota, warga RW 04 berhasil panen bersama.',
  });
  assert.equal(postRes.ok, true);

  const auditPass = evaluateLicenseChecklist({
    clearLicenseOrMou: true,
    attributedSource: true,
    noCommercialBreach: true,
    accessiblePdfOrEpub: true,
  });
  assert.equal(auditPass.passed, true);
  assert.equal(auditPass.score, 4);
});
