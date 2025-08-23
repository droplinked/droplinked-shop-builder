import React from "react"

interface BaseProps {
    width?: string | number
    height?: string | number
    color?: string
}

const Base = ({ width = 44, height = 44 }: BaseProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 44 44" fill="none">
    <g>
        <path d="M0 3.476C0 2.28538 0 1.69007 0.22434 1.23213C0.439136 0.793681 0.793681 0.439136 1.23213 0.22434C1.69007 0 2.28538 0 3.476 0H40.524C41.7146 0 42.31 0 42.7678 0.22434C43.2062 0.439136 43.5609 0.793681 43.7756 1.23213C44 1.69007 44 2.28538 44 3.476V40.524C44 41.7146 44 42.31 43.7756 42.7678C43.5609 43.2062 43.2062 43.5609 42.7678 43.7756C42.31 44 41.7146 44 40.524 44H3.476C2.28538 44 1.69007 44 1.23213 43.7756C0.793681 43.5609 0.439136 43.2062 0.22434 42.7678C0 42.31 0 41.7146 0 40.524V3.476Z" fill='white'/>
    </g>
    <defs>
        <clipPath >
        <rect width="44" height="44" fill="white"/>
        </clipPath>
    </defs>
    </svg>
);

export default Base;