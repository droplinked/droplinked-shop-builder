import React from 'react'
import CrossmintHero from './components/CrossmintHero';
import PartnersSection from './components/PartnersSection';
import SetOfPerks from './components/SetOfPerks';
import ModularStack from './components/ModularStack';

export default function Crossmint() {
    const sections = [
        { id: 'hero', component: <CrossmintHero /> },
        { id: 'partners', component: <PartnersSection /> },
        { id: 'set-of-perks', component: <SetOfPerks /> },
        { id: 'set-of-perks', component: <ModularStack /> },
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
