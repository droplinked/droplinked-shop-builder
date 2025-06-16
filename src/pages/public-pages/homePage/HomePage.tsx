import React from 'react'
import HeroSection from './components/hero-section/HeroSection'
import { LazyLoad } from './components/common/LazyLoad'
import PartnersSection from './components/partners-section/PartnersSection'
import GoLiveSection from './components/go-live-section/GoLiveSection';
import ProductOfferingSection from './components/product-offering-section/ProductOfferingSection';

export default function HomePage() {
  const sections = [
    { id: 'hero', component: <HeroSection /> },
    { id: 'partners-section', component: <PartnersSection /> },
    { id: 'goLive-section', component: <GoLiveSection /> },
    { id: 'product-offering-section', component: <ProductOfferingSection /> },
  ];

  return (
    <>
      {/* {sections.map((section) => (
        // <LazyLoad key={section.id}>
        section.component
        // </LazyLoad>
      ))} */}
    </>
  )
}
