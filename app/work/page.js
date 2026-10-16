'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { projects } from '@/lib/data';

const CATS = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
const MotionLink = motion.create(Link);

export default function WorkPage() {
  const [cat, setCat] = useState('All');
  const reduce = useReducedMotion();
  const count = (c) => (c === 'All' ? projects.length : projects.filter((p) => p.category === c).length);
  const list = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat]);

  return (
    <main>
      <PageHeader kicker="Work" title="THE WORK" sub="Six live demo sites: four link pages for bands, radio, and street food, plus two landing pages. Each opens a case study and the live site." />
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label="Filter projects">
            {CATS.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`nb nb-press min-h-11 px-4 py-2 font-mono text-sm font-bold uppercase transition ${cat === c ? 'bg-black text-lime-300' : 'bg-white hover:bg-lime-300'}`}>
                {c} [{count(c)}]
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{list.length} projects shown</p>
          <motion.div layout={!reduce} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p) => (
                <MotionLink key={p.slug} href={`/work/${p.slug}`} layout={!reduce} initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: 0.96 }} transition={{ duration: reduce ? 0 : 0.3 }} className="nb nb-hover group block bg-white">
                  <div className="relative h-56 w-full overflow-hidden border-b-2 border-black">
                    <Image src={p.image} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    <span className="nb absolute left-3 top-3 bg-lime-300 px-2 py-0.5 text-xs font-black uppercase">{p.category}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-2xl uppercase leading-none">{p.title}</h2>
                      <span className="font-mono text-xs font-bold text-black/60">{p.year}</span>
                    </div>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-black/70">{p.desc}</p>
                  </div>
                </MotionLink>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
