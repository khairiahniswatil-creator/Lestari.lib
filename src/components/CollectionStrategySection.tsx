import { useMemo, useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { ACQUISITION_CHANNELS, LICENSE_MATRIX } from '../data/blueprintData';
import { evaluateLicenseChecklist } from '../utils/libraryLogic';

export function CollectionStrategySection() {
  const [checks, setChecks] = useState({
    clearLicenseOrMou: true,
    attributedSource: true,
    noCommercialBreach: true,
    accessiblePdfOrEpub: false,
  });

  const auditResult = useMemo(() => evaluateLicenseChecklist(checks), [checks]);

  return (
    <section
      id="strategi-koleksi"
      className="scroll-mt-20 py-14 sm:py-18 border-b border-stone-200 dark:border-stone-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs tracking-wide text-[#14532D] dark:text-[#86EFAC] font-medium">
              Bagian 03 · Kepatuhan Hak Cipta
            </p>
            <h2
              className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]"
              style={{ textWrap: 'balance' }}
            >
              Strategi Pengumpulan Koleksi Legal &amp; Gratis
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md">
            Membangun khazanah literatur bermutu tanpa anggaran royalti komersial melalui jalur kemitraan resmi dan akses terbuka.
          </p>
        </div>

        {/* 4 Acquisition Channels */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACQUISITION_CHANNELS.map((channel) => (
            <article
              key={channel.id}
              className="p-6 bg-white dark:bg-[#161C18] border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-medium text-[#14532D] dark:text-[#86EFAC]">Kanal Akuisisi</span>
                  <span>{channel.cadence}</span>
                </div>
                <h3 className="mt-2 font-serif-display text-xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                  {channel.channelName}
                </h3>
                <p className="mt-3 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {channel.acquisitionWorkflow}
                </p>
              </div>

              <dl className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Mitra &amp; Sumber Utama</dt>
                  <dd className="mt-0.5 font-medium text-[#1C1917] dark:text-[#ECE9E1]">
                    {channel.partnerExamples}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Payung Hukum &amp; Lisensi</dt>
                  <dd className="mt-0.5 text-stone-700 dark:text-stone-300">
                    {channel.legalMechanism}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        {/* License Compliance Matrix + Interactive Audit Checklist */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <h3 className="font-serif-display text-xl font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              3.2 Matriks Kepatuhan Lisensi &amp; Distribusi
            </h3>
            <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
              Setiap jenis lisensi menentukan jumlah kuota baca serentak, hak penerjemahan ke bahasa daerah, dan kewajiban atribusi.
            </p>

            <div className="mt-4 overflow-x-auto border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#161C18]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 bg-[#F4F0E8]/60 dark:bg-[#111512]">
                    <th className="py-3 px-4 font-medium">Lisensi</th>
                    <th className="py-3 px-4 font-medium">Terjemah / Adaptasi</th>
                    <th className="py-3 px-4 font-medium">Kewajiban Utama</th>
                    <th className="py-3 px-4 font-medium">Aturan Sistem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {LICENSE_MATRIX.map((row) => (
                    <tr key={row.license} className="align-top">
                      <td className="py-3 px-4 font-mono-tabular font-medium text-[#14532D] dark:text-[#86EFAC] whitespace-nowrap">
                        {row.license}
                      </td>
                      <td className="py-3 px-4 text-stone-700 dark:text-stone-300">
                        {row.canTranslateAdapt}
                      </td>
                      <td className="py-3 px-4 text-stone-700 dark:text-stone-300">
                        {row.mandatoryCondition}
                      </td>
                      <td className="py-3 px-4 text-stone-600 dark:text-stone-400">
                        {row.libraryRule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 bg-[#F4F0E8]/70 dark:bg-[#161C18] border border-stone-200 dark:border-stone-800">
            <h3 className="font-serif-display text-lg font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
              Uji Kelayakan Kurasi Naskah
            </h3>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              Simulasi checklist audit pustakawan sebelum menerbitkan bahan bacaan eksternal ke katalog.
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.clearLicenseOrMou}
                  onChange={(e) => setChecks((c) => ({ ...c, clearLicenseOrMou: e.target.checked }))}
                  className="mt-1 accent-[#14532D] dark:accent-[#22C55E]"
                />
                <span className="text-stone-800 dark:text-stone-200">
                  Memiliki lisensi Creative Commons, Domain Publik, atau MoU KLHK/NGO yang sah
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.attributedSource}
                  onChange={(e) => setChecks((c) => ({ ...c, attributedSource: e.target.checked }))}
                  className="mt-1 accent-[#14532D] dark:accent-[#22C55E]"
                />
                <span className="text-stone-800 dark:text-stone-200">
                  Mencantumkan nama pencipta, instansi penerbit, dan tautan repositori asal
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.noCommercialBreach}
                  onChange={(e) => setChecks((c) => ({ ...c, noCommercialBreach: e.target.checked }))}
                  className="mt-1 accent-[#14532D] dark:accent-[#22C55E]"
                />
                <span className="text-stone-800 dark:text-stone-200">
                  Halaman baca bebas iklan &amp; bebas biaya akses (memenuhi syarat Non-Commercial)
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.accessiblePdfOrEpub}
                  onChange={(e) => setChecks((c) => ({ ...c, accessiblePdfOrEpub: e.target.checked }))}
                  className="mt-1 accent-[#14532D] dark:accent-[#22C55E]"
                />
                <span className="text-stone-800 dark:text-stone-200">
                  Berkas terkompresi (&lt;15 MB) dengan teks dapat diseleksi untuk pembaca layar
                </span>
              </label>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Status Audit Kurasi
                </span>
                <span className="font-mono-tabular font-semibold text-[#1C1917] dark:text-[#ECE9E1]">
                  {auditResult.score}/4 Syarat
                </span>
              </div>
              <div
                className={`p-3 rounded-md text-xs flex items-start gap-2 ${
                  auditResult.passed
                    ? 'bg-[#14532D]/10 text-[#14532D] dark:bg-[#22C55E]/15 dark:text-[#86EFAC]'
                    : 'bg-amber-900/10 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200'
                }`}
              >
                {auditResult.passed ? (
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <span>{auditResult.verdict}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
