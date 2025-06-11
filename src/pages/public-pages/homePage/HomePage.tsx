import React from 'react'
import HeroSection from './components/HeroSection'
import { LazyLoad } from './components/common/LazyLoad'
import PartnersSection from './partners-section/PartnersSection'

export default function HomePage() {
  return (
    <LazyLoad>
      <HeroSection />
      <PartnersSection />
    </LazyLoad>
  )
}
