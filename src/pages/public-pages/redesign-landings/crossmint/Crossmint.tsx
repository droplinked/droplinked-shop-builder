import React from 'react'
import CrossmintHero from './components/CrossmintHero';
import PartnersSection from './components/PartnersSection';
import SetOfPerks from './components/SetOfPerks';
import ModularStack from './components/ModularStack';
import JoinTheCommuity from './components/JoinTheCommuity';
import { LazyLoad } from '../components/LazyLoad';
import ClaimNow from './components/ClaimNow';
import MaxWidthWrapper from '../components/MaxWidthWrapper';

export default function Crossmint() {
    const sections = [
        { id: 'hero', component: <CrossmintHero /> },
        { id: 'partners', component: <PartnersSection /> },
        { id: 'set-of-perks', component: <SetOfPerks /> },
        { id: 'modular-stack', component: <ModularStack /> },
        { id: 'join-the-community', component: <JoinTheCommuity /> },
        { id: 'claim-now', component: <ClaimNow /> },
    ];

    return (
        <MaxWidthWrapper>
            {sections.map((section) => (
                <LazyLoad key={section.id}>
                    {section.component}
                </LazyLoad>
            ))}
        </MaxWidthWrapper>
    )
}
