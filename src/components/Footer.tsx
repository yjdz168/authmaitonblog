'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">Industrial Display</h3>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('nav.products')}</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">AUO</span></li>
              <li><span className="text-gray-400">BOE</span></li>
              <li><span className="text-gray-400">Sharp</span></li>
              <li><span className="text-gray-400">Innolux</span></li>
              <li><span className="text-gray-400">NEC</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('nav.home')}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/brand`} className="text-gray-400 hover:text-white">{t('nav.brand')}</Link></li>
              <li><Link href={`/${locale}/products`} className="text-gray-400 hover:text-white">{t('nav.products')}</Link></li>
              <li><Link href={`/${locale}/about`} className="text-gray-400 hover:text-white">{t('nav.about')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white">{t('nav.contact')}</Link></li>
              <li><Link href={`/${locale}/news`} className="text-gray-400 hover:text-white">{t('nav.news')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Industrial Display. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
