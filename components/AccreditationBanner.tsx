'use client';

import Image from 'next/image';

const accreditations = [
  { src: '/acred/Bluesky Certified Installer - No Website - JPG.jpg', alt: 'Bluesky Certified Installer' },
  { src: '/acred/Bluesky Inspector Logo - No Website.jpg', alt: 'Bluesky Inspector' },
  { src: '/acred/Fyrup_LtdFDInsp_UKASlogo.png', alt: 'UKAS Accredited' },
  { src: '/acred/IFE_Affiliate Organisation_2025.png', alt: 'IFE Affiliate Organisation 2025' },
];

export default function AccreditationBanner() {
  return (
    <div className="w-full py-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">
          {accreditations.map((accred, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full h-24 md:h-28"
            >
              <Image
                src={accred.src}
                alt={accred.alt}
                width={160}
                height={100}
                className="object-contain filter brightness-90 hover:brightness-110 transition-all duration-300 w-auto h-auto max-w-full max-h-20 md:max-h-24"
                style={{ maxHeight: '100%', width: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
