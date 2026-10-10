import Nav from '@/components/Nav';
import SideNav from '@/components/SideNav';
import ParticleNetwork from '@/components/ParticleNetwork';
import Hero from '@/components/Hero';
import Competencies from '@/components/Competencies';
import NPDMetrics from '@/components/NPDMetrics';
import Credentials from '@/components/Credentials';
import Roadmap from '@/components/Roadmap';
import CaseStudies from '@/components/CaseStudies';
import GrowthBlueprints from '@/components/GrowthBlueprints';
import Consultation from '@/components/Consultation';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative">
      <ParticleNetwork />
      <Nav />
      <SideNav />
      <main className="relative z-10">
        <Hero />
        <Competencies />
        <NPDMetrics />
        <Credentials />
        <Roadmap />
        <CaseStudies />
        <GrowthBlueprints />
        <Consultation />
      </main>
      <Footer />
    </div>
  );
}
