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

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
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

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💎', title: 'Quality First', desc: 'We never compromise on product quality and authenticity' },
              { icon: '🤝', title: 'Customer Focus', desc: 'Your success is our priority, always' },
              { icon: '⚡', title: 'Speed & Efficiency', desc: 'Fast response times and quick delivery' },
              { icon: '🌟', title: 'Innovation', desc: 'Staying ahead with latest display technologies' }
            ].map((value, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Quality */}
        <div className="bg-gradient-to-br from-primary-50 to-white rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quality Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'ISO 9001', desc: 'Quality Management' },
              { name: 'RoHS', desc: 'Environmental' },
              { name: 'CE', desc: 'European Standard' },
              { name: 'FCC', desc: 'US Compliance' },
              { name: 'UL', desc: 'Safety Certified' }
            ].map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center border-2 border-gray-200 hover:border-primary-600 transition-colors">
                <div className="text-2xl font-bold text-primary-600 mb-2">{cert.name}</div>
                <div className="text-sm text-gray-600">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Reach */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Global Presence, Local Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-xl">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-xl">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
