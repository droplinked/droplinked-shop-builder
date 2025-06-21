import React from 'react'
import CrossmintHero from './components/CrossmintHero';
import PartnersSection from './components/PartnersSection';
import SetOfPerks from './components/SetOfPerks';

export default function Crossmint() {
    const sections = [
        { id: 'hero', component: <CrossmintHero /> },
        { id: 'partners', component: <PartnersSection /> },
        { id: 'set-of-perks', component: <SetOfPerks /> },
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
