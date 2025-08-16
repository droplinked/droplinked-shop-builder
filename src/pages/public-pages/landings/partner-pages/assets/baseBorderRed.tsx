import React from 'react';

export default function UDBorder({ width = '96', height = '96' }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_i_26947_38939)">
    <rect width="96" height="96" rx="48" fill="url(#paint0_radial_26947_38939)"/>
    <rect x="0.5" y="0.5" width="95" height="95" rx="47.5" stroke="url(#paint1_radial_26947_38939)"/>
    <path d="M47.9548 72C61.2305 72 72 61.2582 72 48C72 34.7493 61.238 24 47.9548 24C35.3641 24 25.0235 33.6751 24 45.9793H55.7742V50.0131H24C25.0235 62.3249 35.3641 72 47.9548 72Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter0_i_26947_38939" x="-12" y="-12" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-4"/>
    <feGaussianBlur stdDeviation="8"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_26947_38939"/>
    </filter>
    <radialGradient id="paint0_radial_26947_38939" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48) rotate(90) scale(96)">
    <stop stop-color="white" stop-opacity="0.02"/>
    <stop offset="1" stop-color="white" stop-opacity="0.08"/>
    </radialGradient>
    <radialGradient id="paint1_radial_26947_38939" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 48) scale(48)">
    <stop stop-color="#2BCFA1" stop-opacity="0.64"/>
    <stop offset="1" stop-color="#2BCFA1" stop-opacity="0.04"/>
    </radialGradient>
    </defs>
</svg>

  );
}
