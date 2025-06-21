import React from 'react'
import CrossmintHero from './components/CrossmintHero';

export default function Crossmint() {
    const sections = [
        { id: 'hero', component: <CrossmintHero /> },
    ];

    return (
        <>
            {sections.map((section) => (
                // <LazyLoad key={section.id}>
                section.component
                // </LazyLoad>
            ))}
        </>
    )
}
