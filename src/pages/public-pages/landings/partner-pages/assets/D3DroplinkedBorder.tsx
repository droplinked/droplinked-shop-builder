import React from 'react';
export default function D3DroplinkedBorder({ width = "96", height = "96" }) {
  return (
    <svg width={width} height={height} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_bii_20474_657)">
        <rect width="96" height="96" rx="48" fill="url(#paint0_radial_20474_657)" />
        <rect x="0.5" y="0.5" width="95" height="95" rx="47.5" stroke="url(#paint1_radial_20474_657)" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M72 48C72 61.2548 61.2548 72 48 72C34.7452 72 24 61.2548 24 48C24 34.7452 34.7452 24 48 24C61.2548 24 72 34.7452 72 48ZM39.2503 48C39.2503 43.1522 43.1522 39.2503 48 39.2503C52.8478 39.2503 56.7497 43.2704 56.7497 48.1182V56.7497H48C43.1522 56.7497 39.2503 52.8478 39.2503 48Z"
            fill="white" />
    </g>
    <defs>
        <filter id="filter0_bii_20474_657" x="-12" y="-12" width="120" height="120" filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_20474_657" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_20474_657" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha" />
            <feOffset dy="-4" />
            <feGaussianBlur stdDeviation="8" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.24 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_20474_657" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha" />
            <feOffset dy="-4" />
            <feGaussianBlur stdDeviation="8" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
            <feBlend mode="normal" in2="effect2_innerShadow_20474_657" result="effect3_innerShadow_20474_657" />
        </filter>
        <radialGradient id="paint0_radial_20474_657" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(48) rotate(90) scale(96)">
            <stop stop-color="white" stop-opacity="0.02" />
            <stop offset="1" stop-color="white" stop-opacity="0.08" />
        </radialGradient>
        <radialGradient id="paint1_radial_20474_657" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(96 48) rotate(180) scale(48)">
            <stop stop-color="#2BCFA1" stop-opacity="0.64" />
            <stop offset="1" stop-color="#2BCFA1" stop-opacity="0.04" />
        </radialGradient>
    </defs>
</svg>
  );
}