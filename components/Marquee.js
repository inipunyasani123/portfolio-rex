'use client';
import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

// Pita berjalan + tombol jeda (WCAG 2.2.2: gerak otomatis > 5 detik harus bisa dihentikan).
// Bila sistem meminta gerak dikurangi, CSS sudah menghentikannya sejak awal.
export default function Marquee({ items }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative overflow-hidden border-b-[3px] border-black bg-black py-3">
      <div className="flex w-max animate-marquee" style={{ animationPlayState: paused ? 'paused' : 'running' }} aria-hidden="true">
        {[0, 1].map((r) => (
          <div key={r} className="flex shrink-0 items-center">
            {items.map((m) => (
              <span key={m} className="flex items-center font-display text-2xl uppercase">
                <span className="px-6 text-lime-300">{m}</span><span className="text-white">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">{items.join(', ')}</p>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-label={paused ? 'Play the moving strip' : 'Pause the moving strip'}
        className="absolute inset-y-0 right-0 grid w-12 place-items-center border-l-2 border-lime-300 bg-black text-lime-300 transition hover:bg-lime-300 hover:text-black"
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
