import React, { SVGProps } from "react";

export const ReadAloudMd = ({ color = "white", ...props }: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.8228 10.0001C12.8371 9.49359 13.6601 8.67059 14.1666 7.65625C14.6731 8.67059 15.4961 9.49359 16.5104 10.0001C15.4961 10.5066 14.6731 11.3296 14.1666 12.3439C13.6601 11.3296 12.8371 10.5066 11.8228 10.0001Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M15.8331 3.33325C15.7835 3.33325 15.7339 3.35819 15.7091 3.41638L15.6512 3.57432C15.4362 4.14789 14.9895 4.60508 14.4105 4.8212L14.2533 4.87939C14.1376 4.92095 14.1376 5.07889 14.2533 5.12045L14.4105 5.17864C14.9812 5.39476 15.4362 5.84364 15.6512 6.42552L15.7091 6.58346C15.7339 6.64164 15.7835 6.66659 15.8331 6.66659C15.8828 6.66659 15.9324 6.64164 15.9572 6.58346L16.0151 6.42552C16.2301 5.85195 16.6768 5.39476 17.2558 5.17864L17.413 5.12045C17.5287 5.07889 17.5287 4.92095 17.413 4.87939L17.2558 4.8212C16.6851 4.60508 16.2301 4.15619 16.0151 3.57432L15.9572 3.41638C15.9324 3.35819 15.8828 3.33325 15.8331 3.33325Z"
      fill={color}
    />
    <path d="M9.1665 3.33325V16.6666" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.6665 5.83325V7.49992M11.6665 14.1666V12.4999" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.6665 5.83325V14.1666" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M4.1665 8.33325V11.6666" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
); 