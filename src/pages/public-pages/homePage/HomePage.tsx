import React from 'react'
import HeroSection from './components/hero-section/HeroSection'
import { LazyLoad } from './components/common/LazyLoad'

export default function HomePage() {
  return (
    <LazyLoad>
      <HeroSection />
    </LazyLoad>
  )
}
