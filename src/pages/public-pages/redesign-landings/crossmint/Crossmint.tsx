import React from 'react'
import CrossmintHero from './components/CrossmintHero';
import PartnersSection from './components/PartnersSection';
import SetOfPerks from './components/SetOfPerks';
import ModularStack from './components/ModularStack';
import JoinTheCommuity from './components/JoinTheCommuity';
import { LazyLoad } from '../components/LazyLoad';

export default function Crossmint() {
    const sections = [
        { id: 'hero', component: <CrossmintHero /> },
        { id: 'partners', component: <PartnersSection /> },
        { id: 'set-of-perks', component: <SetOfPerks /> },
        { id: 'modular-stack', component: <ModularStack /> },
        { id: 'join-the-community', component: <JoinTheCommuity /> },
    ];

    return (
        <>
            {sections.map((section) => (
                <LazyLoad key={section.id}>
                    {section.component}
                </LazyLoad>
            ))}
        </>
    )
}
