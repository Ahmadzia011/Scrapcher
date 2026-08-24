import Footer from '@/src/components/ui/Footer'
import React from 'react'
import Testimonials from '../../components/ui/homepage/testimonials'
import Navbar from '@/src/components/ui/Header/Navbar'
import SectionHeader from '@/src/components/ui/SectionHeader'
import ConheroSec from './ConHeroSec'

export default function Contact() {
  return (
    <div>
    <Navbar/>
    <ConheroSec/>
    <Testimonials/>
      <Footer/>
    </div>
  )
}
