import { pageMeta, SITE_NAME } from '@/lib/seo';

// Judul pakai { default, template } supaya halaman di bawahnya tetap berakhiran " — Rex".
const meta = pageMeta({ title: 'Work', description: "Six case studies by Rex: a tour poster, a radio schedule, an album page, a food stall, a newsletter, and a clothing shop, all live.", path: '/work' });
export const metadata = { ...meta, title: { default: 'Work', template: `%s — ${SITE_NAME}` } };

export default function Layout({ children }) {
  return children;
}
