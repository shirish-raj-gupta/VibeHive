// src/app/page.js

import Navbar from '../components/NavBar'; // Import the Navbar component
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <>
      <Navbar /> {/* Add the Navbar here */}
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
