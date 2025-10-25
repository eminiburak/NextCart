'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BackgroundImage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'dark') setIsDark(true);
    else if (stored === 'light') setIsDark(false);
    else if (typeof window !== 'undefined')
      setIsDark(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const handler = (e) => setIsDark(e.matches);
    const mql =
      typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    mql?.addEventListener?.('change', handler);

    const onThemeChange = (ev) => {
      const detail = ev?.detail;
      if (detail && typeof detail.isDark === 'boolean') setIsDark(detail.isDark);
    };
    window.addEventListener('theme-change', onThemeChange);

    return () => {
      mql?.removeEventListener?.('change', handler);
      window.removeEventListener('theme-change', onThemeChange);
    };
  }, []);

  const src = isDark ? '/test1.jpg' : '/light.jpg';
  const imageOpacityClass = isDark ? 'opacity-20' : 'opacity-70';
  const overlayClass = isDark ? 'bg-black/0' : 'bg-white/20';

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={src}
        alt="Background"
        fill
        sizes="100vw"
        quality={50}
        priority={false}
        className={`object-cover object-center ${imageOpacityClass}`}
      />
      <div className={`absolute inset-0 ${overlayClass}`} aria-hidden="true" />
    </div>
  );
}
