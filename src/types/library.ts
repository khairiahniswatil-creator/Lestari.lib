export type BookCluster =
  | 'Semua'
  | 'E-Book Ekologi'
  | 'Jurnal Penelitian'
  | 'Modul Daur Ulang'
  | 'Panduan Berkebun'
  | 'Cerita Anak Alam';

export type SpecificBookCluster = Exclude<BookCluster, 'Semua'>;

export type LicenseType =
  | 'CC BY 4.0'
  | 'CC BY-SA 4.0'
  | 'CC BY-NC 4.0'
  | 'Domain Publik'
  | 'MoU KLHK / Instansi';

export type ReadingLevel =
  | 'Anak & Pemula'
  | 'Umum & Komunitas'
  | 'Akademik & Peneliti';

export interface CatalogBook {
  id: string;
  accessionCode: string;
  title: string;
  author: string;
  publisherSource: string;
  cluster: SpecificBookCluster;
  license: LicenseType;
  readingLevel: ReadingLevel;
  pages: number;
  fileSizeMb: number;
  year: number;
  sdgTags: string[];
  summary: string;
  availableCopies: number;
  totalCopies: number;
}

export interface MemberLoan {
  bookId: string;
  borrowedAt: string;
  dueAt: string;
  progressPercent: number;
}

export type ForumTopic =
  | 'Semua'
  | 'Daur Ulang & Kompos'
  | 'Kebun Kota'
  | 'Konservasi & Riset'
  | 'Literasi Anak';

export type SpecificForumTopic = Exclude<ForumTopic, 'Semua'>;

export interface ForumPost {
  id: string;
  authorName: string;
  authorCity: string;
  topic: SpecificForumTopic;
  relatedBookTitle?: string;
  title: string;
  body: string;
  actionTaken: string;
  createdAt: string;
  supportCount: number;
  supportedByUser?: boolean;
}

export type CommunityFocus =
  | 'Semua'
  | 'Bank Sampah & Sirkular'
  | 'Kebun Kota & Agroekologi'
  | 'Konservasi Pesisir'
  | 'Literasi Iklim';

export type SpecificCommunityFocus = Exclude<CommunityFocus, 'Semua'>;

export interface CommunityOrg {
  id: string;
  name: string;
  city: string;
  province: string;
  focus: SpecificCommunityFocus;
  memberCount: number;
  collaborationType: string;
  schedule: string;
  contactHandle: string;
}

export type PaperBaselineType = 'virgin' | 'recycled';

export interface PaperSavingsInput {
  pagesRead: number;
  copiesAvoided: number;
  paperBaseline: PaperBaselineType;
  digitalReadingHours: number;
  lowCarbonMode: boolean;
}

export interface PaperSavingsResult {
  sheetsSaved: number;
  paperWeightKg: number;
  treesSaved: number;
  waterSavedLiters: number;
  printCo2AvoidedKg: number;
  digitalReadingCo2Kg: number;
  netCo2SavedKg: number;
}

export interface NewCatalogEntryInput {
  title: string;
  author: string;
  publisherSource: string;
  cluster: SpecificBookCluster;
  license: LicenseType;
  readingLevel: ReadingLevel;
  pages: number;
  fileSizeMb: number;
  year: number;
  summary: string;
}

export interface NewForumPostInput {
  authorName: string;
  authorCity: string;
  topic: SpecificForumTopic;
  title: string;
  actionTaken: string;
  body: string;
  relatedBookTitle?: string;
}
