
// Header halaman rex: blok brutalist, judul uppercase tebal.
export default function PageHeader({ kicker, title, sub }) {
  return (
    <section className="border-b-[3px] border-black bg-lime-300 px-6 pb-10 pt-10 md:pb-12 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <div>
          {kicker && (
            <span className="nb inline-block bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">{kicker}</span>
          )}
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.92] tracking-tight md:text-8xl">{title}</h1>
          {sub && <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-black/70">{sub}</p>}
        </div>
      </div>
    </section>
  );
}
