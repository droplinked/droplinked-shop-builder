import React, { SVGProps } from 'react';

export const ReadAloudSm = ({ color = 'white', ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M9.4585 8.00007C10.27 7.59487 10.9284 6.93647 11.3336 6.125C11.7388 6.93647 12.3972 7.59487 13.2086 8.00007C12.3972 8.40527 11.7388 9.06367 11.3336 9.87514C10.9284 9.06367 10.27 8.40527 9.4585 8.00007Z"
      stroke={color}
      stroke-linejoin="round"
    />
    <path
      d="M12.6668 2.66675C12.6271 2.66675 12.5874 2.6867 12.5675 2.73325L12.5212 2.8596C12.3492 3.31845 11.9919 3.68421 11.5287 3.85711L11.4029 3.90365C11.3103 3.93691 11.3103 4.06325 11.4029 4.09651L11.5287 4.14305C11.9853 4.31595 12.3492 4.67506 12.5212 5.14056L12.5675 5.26691C12.5874 5.31346 12.6271 5.33341 12.6668 5.33341C12.7065 5.33341 12.7462 5.31346 12.7661 5.26691L12.8124 5.14056C12.9844 4.68171 13.3417 4.31595 13.8049 4.14305L13.9307 4.09651C14.0233 4.06325 14.0233 3.93691 13.9307 3.90365L13.8049 3.85711C13.3483 3.68421 12.9844 3.3251 12.8124 2.8596L12.7661 2.73325C12.7462 2.6867 12.7065 2.66675 12.6668 2.66675Z"
      fill={color}
    />
    <path d="M7.3335 2.66675V13.3334" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.3335 4.66675V6.00008M9.3335 11.3334V10.0001" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.3335 4.66675V11.3334" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3.3335 6.66675V9.33341" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);
