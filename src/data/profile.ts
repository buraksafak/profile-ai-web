export const profile = {
  name: 'Burak Şafak',
  asciiName: 'Burak Safak',
  initials: 'BŞ',
  title: 'Kıdemli Mobil Geliştirici',
  location: 'Ankara',
  country: 'Türkiye',
  photoSrc: `${import.meta.env.BASE_URL}burak.jpg`,
  email: 'buraksafak2109@gmail.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/buraksafak/' },
    { label: 'GitHub', href: 'https://github.com/buraksafak' },
    { label: 'Instagram', href: 'https://www.instagram.com/buraksafak_/' },
  ],
} as const;
