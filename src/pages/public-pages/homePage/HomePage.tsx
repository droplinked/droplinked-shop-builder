import React from 'react'
import HeroSection from './components/hero-section/HeroSection'
import { LazyLoad } from './components/common/LazyLoad'
import PartnersSection from './components/partners-section/PartnersSection'

export default function HomePage() {
  const sections = [
    { id: 'hero', component: <HeroSection /> },
    { id: 'partners-section', component: <PartnersSection /> },
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
