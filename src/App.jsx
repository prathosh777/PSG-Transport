import React from 'react'
import LandingPage from './Pages/LandingPage'
import AboutPage from './Pages/AboutPage'
import Services from './Pages/Services'
import WorksPage from './Pages/WorksPage'
import Testimonials from './Pages/Testimonials'
import FAQSection from './Pages/FAQPage'
import ContactPage from './Pages/ContactPage'
import Footer from './Pages/Footer'
const App = () => {
  return (
    <div className=''>
      <LandingPage />
      <AboutPage />
      <Services />
      <WorksPage />
      <Testimonials />
      <FAQSection />
      <ContactPage />
      <Footer />
    </div>
  )
}

export default App
