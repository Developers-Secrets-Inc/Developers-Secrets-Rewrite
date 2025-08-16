import { AppHeader } from '@/components/headers/app-header'
import {
  HeroSection,
  ProblemsSection,
  FeaturesSection,
  CoursesSection,
  FinalCTA,
  FAQ,
  Footer,
} from '@/components/sections/landing/main'

export default async function HomePage() {
  return (
    <div>
      <AppHeader />
      <main className="flex border-x border-border flex-col max-w-7xl mx-auto min-h-screen">
        <HeroSection />
        {/* <Companies /> */}
        <ProblemsSection />
        {/* <WhatYouReallyWant /> */}
        <FeaturesSection />
        <CoursesSection />
        <FinalCTA />
        {/* <Testimonials /> */}
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
