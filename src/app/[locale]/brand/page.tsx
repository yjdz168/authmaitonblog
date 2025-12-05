import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function BrandPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('brand');

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="mb-16">
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-primary-50 rounded-lg">
            <div className="text-5xl font-bold text-primary-600 mb-2">10+</div>
            <div className="text-xl font-semibold text-gray-900">{t('experience')}</div>
          </div>
          <div className="text-center p-8 bg-primary-50 rounded-lg">
            <div className="text-5xl font-bold text-primary-600 mb-2">9+</div>
            <div className="text-xl font-semibold text-gray-900">{t('brands')}</div>
          </div>
          <div className="text-center p-8 bg-primary-50 rounded-lg">
            <div className="text-5xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-xl font-semibold text-gray-900">{t('clients')}</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              For over a decade, we have been at the forefront of the industrial display industry, 
              providing cutting-edge solutions to businesses worldwide. Our commitment to quality, 
              reliability, and customer satisfaction has made us a trusted partner for companies 
              across various sectors.
            </p>
            <p className="mb-4">
              We maintain extensive inventory from the world&apos;s leading manufacturers including AUO, 
              BOE, Sharp, KOE, Innolux, NEC, Tianma, Kyocera, and NLT. This allows us to meet the 
              diverse needs of our clients with quick delivery times and competitive pricing.
            </p>
            <p>
              Our expertise spans across various industrial applications, from manufacturing and 
              automation to medical equipment and transportation systems. We don&apos;t just sell displays; 
              we provide comprehensive solutions tailored to your specific requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
