import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { ProblemSection } from './components/ProblemSection'
import { HowItWorks } from './components/HowItWorks'
import { Stats } from './components/Stats'
import { Features } from './components/Features'
import { Steps } from './components/Steps'
import { WhatYouGet } from './components/WhatYouGet'
import { Comparison } from './components/Comparison'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ProblemSection />
        <HowItWorks />
        <Stats />
        <Features />
        <Steps />
        <WhatYouGet />
        <Comparison />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
