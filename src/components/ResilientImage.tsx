import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  caption: string;
  figureNumber: string;
  className?: string;
  containerClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  caption,
  figureNumber,
  className = 'w-full h-full object-cover',
  containerClassName = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${containerClassName}`}>
      <div className="relative overflow-hidden bg-[#EBE6DF] dark:bg-[#1B221D] border border-stone-200 dark:border-stone-800 flex-1">
        {hasError ? (
          <div
            role="img"
            aria-label={alt}
            className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EBE6DF] to-[#DFD9CE] dark:from-[#1A211C] dark:to-[#131814]"
          >
            <BookOpen className="w-8 h-8 text-[#14532D] dark:text-[#86EFAC] mb-3" aria-hidden="true" />
            <p className="text-sm font-medium text-[#1C1917] dark:text-[#ECE9E1] max-w-xs">{alt}</p>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={className}
          />
        )}
      </div>
      <figcaption className="mt-2.5 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
        <span className="font-mono-tabular font-medium text-[#14532D] dark:text-[#86EFAC] mr-1.5">
          {figureNumber}
        </span>
        <span aria-hidden="true" className="mr-1.5">
          —
        </span>
        <span className="italic">{caption}</span>
      </figcaption>
    </figure>
  );
}
