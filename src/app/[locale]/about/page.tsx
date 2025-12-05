import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-primary-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-primary-600 mb-4">{t('mission')}</h2>
            <p className="text-gray-700">{t('missionText')}</p>
          </div>
          <div className="bg-primary-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-primary-600 mb-4">{t('vision')}</h2>
            <p className="text-gray-700">{t('visionText')}</p>
          </div>
          <div className="bg-primary-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-primary-600 mb-4">{t('values')}</h2>
            <p className="text-gray-700">{t('valuesText')}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Extensive Inventory</h3>
                <p className="text-gray-700">Over 1000 products from leading manufacturers always in stock</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-gray-700">Technical expertise to help you choose the right solution</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-700">Quick turnaround times to meet your project deadlines</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                <p className="text-gray-700">Best value for money without compromising on quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
