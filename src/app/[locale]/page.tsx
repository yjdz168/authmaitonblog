import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {t('title')}
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-primary-100">
              {t('subtitle')}
            </p>
            <p className="text-lg text-primary-50 mb-8 max-w-3xl mx-auto">
              {t('description')}
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('cta')}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors border border-white"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {t('partnersTitle')}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6">
            {['AUO', 'BOE', 'Sharp', 'KOE', 'Innolux', 'NEC', 'Tianma', 'Kyocera', 'NLT'].map((brand) => (
              <div key={brand} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-lg font-semibold text-gray-700">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Models Section */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {t('popularModels')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('popularModelsDesc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { model: 'G121SN01 V4', brand: 'AUO', size: '12.1"', resolution: '800×600', type: 'TFT LCD' },
              { model: 'G150XG03 V2', brand: 'AUO', size: '15.0"', resolution: '1024×768', type: 'TFT LCD' },
              { model: 'G190EG02 V1', brand: 'AUO', size: '19.0"', resolution: '1280×1024', type: 'TFT LCD' },
              { model: 'G156XW01 V1', brand: 'AUO', size: '15.6"', resolution: '1366×768', type: 'TFT LCD' },
              { model: 'HV121WX6-112', brand: 'BOE', size: '12.1"', resolution: '1280×800', type: 'IPS LCD' },
              { model: 'HT156WXB-100', brand: 'BOE', size: '15.6"', resolution: '1366×768', type: 'TFT LCD' },
              { model: 'MV185WHM-N10', brand: 'BOE', size: '18.5"', resolution: '1366×768', type: 'TFT LCD' },
              { model: 'HT215WXB-100', brand: 'BOE', size: '21.5"', resolution: '1920×1080', type: 'IPS LCD' },
              { model: 'LQ104V1DG52', brand: 'Sharp', size: '10.4"', resolution: '640×480', type: 'TFT LCD' },
              { model: 'LQ150X1LGN2A', brand: 'Sharp', size: '15.0"', resolution: '1024×768', type: 'TFT LCD' },
              { model: 'LQ121S1LG75', brand: 'Sharp', size: '12.1"', resolution: '800×600', type: 'TFT LCD' },
              { model: 'LQ190E1LX51', brand: 'Sharp', size: '19.0"', resolution: '1280×1024', type: 'TFT LCD' },
              { model: 'TX14D12VM1CBA', brand: 'Innolux', size: '5.7"', resolution: '320×240', type: 'TFT LCD' },
              { model: 'G104SN03 V1', brand: 'Innolux', size: '10.4"', resolution: '800×600', type: 'TFT LCD' },
              { model: 'G121I1-L01', brand: 'Innolux', size: '12.1"', resolution: '1280×800', type: 'IPS LCD' },
              { model: 'G156XTN01.0', brand: 'Innolux', size: '15.6"', resolution: '1366×768', type: 'TFT LCD' },
            ].map((product, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-400 mb-2">{product.size}</div>
                    <div className="text-sm text-gray-500">LCD Display</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{product.model}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-600 font-semibold">{product.brand}</span>
                    <span className="text-gray-500">{product.type}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{product.resolution}</div>
                  </div>
                  <Link
                    href={`/${locale}/contact`}
                    className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors mt-4"
                  >
                    {t('inquiry')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Years Experience</div>
              <p className="text-gray-600">Professional expertise in industrial displays</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-primary-600 mb-2">9+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Global Brands</div>
              <p className="text-gray-600">World-leading display manufacturers</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Products in Stock</div>
              <p className="text-gray-600">Extensive inventory ready for delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
