import React from 'react'
import CrossmintHero from './components/CrossmintHero';
import PartnersSection from './components/PartnersSection';

export default function Crossmint() {
    const sections = [
        { id: 'hero', component: <CrossmintHero /> },
        { id: 'partners', component: <PartnersSection /> },
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
