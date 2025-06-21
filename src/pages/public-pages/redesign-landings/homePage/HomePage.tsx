import React from 'react'
import { LazyLoad } from '../components/LazyLoad'
import PartnersSection from './components/partners-section/PartnersSection'
import GoLiveSection from './components/go-live-section/GoLiveSection';
import ProductOfferingSection from './components/product-offering-section/ProductOfferingSection';
import HomePageHero from './components/HeroSection';

export default function HomePage() {
  const sections = [
    { id: 'hero', component: <HomePageHero /> },
    { id: 'partners-section', component: <PartnersSection /> },
    { id: 'goLive-section', component: <GoLiveSection /> },
    { id: 'product-offering-section', component: <ProductOfferingSection /> },
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
