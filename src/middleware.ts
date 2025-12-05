import createMiddleware from 'next-intl/middleware';
import {locales} from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(zh|en|es|fr|de|ja|ko|pt|ru|ar|it|nl|pl|tr|vi)/:path*']
};
