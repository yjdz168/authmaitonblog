import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';

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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'TFT-LCD Displays', icon: '📺', desc: 'High-resolution panels for various applications' },
              { title: 'Industrial Panels', icon: '🏭', desc: 'Rugged displays for harsh environments' },
              { title: 'Touch Screen Displays', icon: '👆', desc: 'Interactive capacitive and resistive touch' },
              { title: 'Custom Solutions', icon: '⚙️', desc: 'Tailored displays for specific requirements' }
            ].map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3 text-center">{category.icon}</div>
                <div className="text-lg font-semibold text-gray-900 text-center mb-2">{category.title}</div>
                <p className="text-sm text-gray-600 text-center">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Display Sizes */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Available Display Sizes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['3.5"', '5.0"', '7.0"', '10.1"', '12.1"', '13.3"', '15.0"', '15.6"', '17.0"', '19.0"', '21.5"', '23.8"'].map((size) => (
              <div key={size} className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6 rounded-lg text-center hover:shadow-lg transition-all hover:scale-105">
                <div className="text-2xl font-bold">{size}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary-600 mb-3">Resolution Range</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• VGA: 640×480</li>
                <li>• SVGA: 800×600</li>
                <li>• XGA: 1024×768</li>
                <li>• WXGA: 1280×800</li>
                <li>• Full HD: 1920×1080</li>
                <li>• 4K: 3840×2160</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary-600 mb-3">Brightness Options</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Standard: 250-400 cd/m²</li>
                <li>• High Brightness: 500-800 cd/m²</li>
                <li>• Sunlight Readable: 1000+ cd/m²</li>
                <li>• Wide viewing angles</li>
                <li>• Anti-glare coating</li>
                <li>• LED backlight</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary-600 mb-3">Interface Types</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• LVDS</li>
                <li>• HDMI</li>
                <li>• DisplayPort</li>
                <li>• VGA</li>
                <li>• DVI</li>
                <li>• Embedded DisplayPort (eDP)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Request Quote CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Can&apos;t Find What You Need?</h2>
          <p className="text-xl mb-8 text-primary-100">Contact our experts for customized solutions and bulk pricing</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
