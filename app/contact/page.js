'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { profile } from '@/lib/data';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const doneRef = useRef(null);
  useEffect(() => { if (sent) doneRef.current?.focus(); }, [sent]);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return; setSent(true); };
  const field = 'w-full border-2 border-black bg-white px-4 py-3 text-base font-semibold placeholder:text-black/50 focus:bg-lime-50';
  const label = 'mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest';

  return (
    <main>
      <PageHeader kicker="Contact" title="LET'S TALK" sub="Got a loud idea? Let's make it impossible to ignore." />
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <Info icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <Info icon={MapPin} label="Location" value={profile.location} />
            <div className="nb bg-lime-300 p-5">
              <p className="font-display text-2xl uppercase leading-none">Make the brief loud</p>
              <ul className="mt-3 space-y-1 font-mono text-sm text-black/70">
                <li>→ What it is, and who has to notice it.</li>
                <li>→ What it must say first.</li>
                <li>→ The date it goes up, if there is one.</li>
              </ul>
            </div>
          </div>
          <div>
            {sent ? (
              <div className="nb-lg bg-lime-300 p-10 text-center">
                <div className="nb mx-auto flex h-14 w-14 items-center justify-center bg-black text-lime-300"><Check size={28} aria-hidden="true" /></div>
                <h2 ref={doneRef} tabIndex={-1} className="mt-4 text-2xl font-black uppercase outline-none">Demo form!</h2>
                <p className="mt-1 font-semibold text-black/70">Thanks {form.name}. This is a portfolio template, so nothing was sent. The live version drops it straight in the owner’s inbox.</p>
                <button type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="nb nb-hover mt-6 min-h-11 bg-white px-6 py-2.5 text-sm font-black uppercase">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="nb-lg space-y-4 bg-white p-6 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className={label}>Name</label>
                    <input id="f-name" name="name" value={form.name} onChange={handle} autoComplete="name" required className={field} />
                  </div>
                  <div>
                    <label htmlFor="f-email" className={label}>Email</label>
                    <input id="f-email" type="email" name="email" value={form.email} onChange={handle} autoComplete="email" required className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="f-message" className={label}>The idea</label>
                  <textarea id="f-message" name="message" value={form.message} onChange={handle} placeholder="A poster, a schedule, a stall menu…" rows={6} required className={`${field} resize-none`} />
                </div>
                <button type="submit" className="nb nb-hover nb-press min-h-12 w-full bg-black py-3.5 font-black uppercase text-lime-300">Send it →</button>
                <p className="text-center font-mono text-xs text-black/70">Demo form: nothing is sent or stored.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="nb nb-hover flex items-start gap-4 bg-white p-5">
      <span className="nb flex h-11 w-11 shrink-0 items-center justify-center bg-lime-300"><Icon size={20} aria-hidden="true" /></span>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-black/60">{label}</p>
        <p className="mt-0.5 font-black">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
