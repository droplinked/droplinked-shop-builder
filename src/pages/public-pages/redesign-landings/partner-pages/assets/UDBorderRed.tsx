import React from 'react';

export default function UDBorderRed({ width = '96', height = '96' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_11577_159)">
        <g filter="url(#filter0_i_11577_159)">
          <path
            d="M96 48C96 21.4903 74.5097 0 48 0C21.4903 0 0 21.4903 0 48C0 74.5097 21.4903 96 48 96C74.5097 96 96 74.5097 96 48Z"
            fill="url(#paint0_radial_11577_159)"
          />
          <path
            d="M95.25 48C95.25 21.9045 74.0955 0.75 48 0.75C21.9045 0.75 0.75 21.9045 0.75 48C0.75 74.0955 21.9045 95.25 48 95.25C74.0955 95.25 95.25 74.0955 95.25 48Z"
            stroke="url(#paint1_radial_11577_159)"
            stroke-width="1.5"
          />
        </g>
        <path
          d="M73.6 25.5648V43.1804L22.4 63.9951L73.6 25.5648Z"
          fill="#D6D6D6"
        />
        <path
          d="M64.0015 24.8V55.1881C64.0015 59.4347 62.3157 63.5074 59.3149 66.5102C56.3141 69.5131 52.2442 71.2001 48.0005 71.2001C43.7568 71.2001 39.6869 69.5131 36.6861 66.5102C33.6853 63.5074 31.9995 59.4347 31.9995 55.1881V42.3834L41.5985 37.0971V55.1881C41.5086 55.9776 41.5865 56.7773 41.8268 57.5347C42.0674 58.292 42.4649 58.99 42.9937 59.5828C43.5225 60.1756 44.1705 60.65 44.8952 60.9748C45.62 61.2996 46.4051 61.4676 47.1993 61.4676C47.9933 61.4676 48.7785 61.2996 49.5032 60.9748C50.228 60.65 50.876 60.1756 51.4047 59.5828C51.9335 58.99 52.3312 58.292 52.5716 57.5347C52.8121 56.7773 52.8899 55.9776 52.8 55.1881V30.9325L64.0015 24.8Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_11577_159"
          x="0"
          y="-4"
          width="96"
          height="100"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-4" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_11577_159"
          />
        </filter>
        <radialGradient
          id="paint0_radial_11577_159"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(48) rotate(90) scale(96)"
        >
          <stop stop-color="white" stop-opacity="0.02" />
          <stop offset="1" stop-color="white" stop-opacity="0.08" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_11577_159"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 48) scale(48)"
        >
          <stop stop-color="#FF2244" stop-opacity="0.56" />
          <stop offset="1" stop-color="#FF2244" stop-opacity="0.04" />
        </radialGradient>
        <clipPath id="clip0_11577_159">
          <rect width="96" height="96" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
