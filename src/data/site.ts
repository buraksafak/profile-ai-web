export const SITE_ORIGIN = 'https://buraksafak.online' as const;

export const site = {
  origin: SITE_ORIGIN,
  name: 'Burak Şafak',
  asciiName: 'Burak Safak',
  title: 'Burak Şafak | Kıdemli Mobil Geliştirici (Flutter)',
  titleEn: 'Burak Safak | Senior Mobile Developer (Flutter)',
  description:
    "Burak Şafak — Ankara merkezli kıdemli mobil geliştirici. Flutter, Dart ve .NET Core ile uygulama geliştirir. Ray Sigorta'da Senior Software Development Specialist.",
  descriptionEn:
    'Burak Safak is a senior mobile developer in Ankara, Turkey. He builds apps with Flutter, Dart, and .NET Core, and works at Ray Sigorta as a Senior Software Development Specialist.',
  locale: 'tr_TR',
  localeAlternate: 'en_US',
  imagePath: '/og-image.png',
  imageWidth: 400,
  imageHeight: 400,
  imageAlt: 'Burak Şafak — kıdemli mobil geliştirici',
} as const;

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
