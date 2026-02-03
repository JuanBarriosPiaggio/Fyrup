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
    <div className="w-full py-8 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling container */}
        <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
          {/* First set of logos */}
          {accreditations.map((accred, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
              style={{ width: '180px', height: '120px' }}
            >
              <Image
                src={accred.src}
                alt={accred.alt}
                width={180}
                height={120}
                className="object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                style={{ maxHeight: '100px', width: 'auto' }}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {accreditations.map((accred, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
              style={{ width: '180px', height: '120px' }}
            >
              <Image
                src={accred.src}
                alt={accred.alt}
                width={180}
                height={120}
                className="object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                style={{ maxHeight: '100px', width: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
