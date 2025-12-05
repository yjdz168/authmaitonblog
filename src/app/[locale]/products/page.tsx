import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function ProductsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  const brands = [
    { id: 'auo', name: 'AUO' },
    { id: 'boe', name: 'BOE' },
    { id: 'sharp', name: 'Sharp' },
    { id: 'koe', name: 'KOE' },
    { id: 'innolux', name: 'Innolux' },
    { id: 'nec', name: 'NEC' },
    { id: 'tianma', name: 'Tianma' },
    { id: 'kyocera', name: 'Kyocera' },
    { id: 'nlt', name: 'NLT' },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 mb-4">{t('subtitle')}</p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center h-20 mb-4">
                <h3 className="text-3xl font-bold text-primary-600">{brand.name}</h3>
              </div>
              <p className="text-gray-700 text-center">
                {t(`brands.${brand.id}`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-lg font-semibold text-gray-900">TFT-LCD Displays</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-lg font-semibold text-gray-900">Industrial Panels</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-lg font-semibold text-gray-900">Touch Screen Displays</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-lg font-semibold text-gray-900">Custom Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
