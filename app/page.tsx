import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ArchitectureShowcase from '@/components/ArchitectureShowcase';
import ImpactDashboard from '@/components/ImpactDashboard';
import CodePlayground from '@/components/CodePlayground';
import AchievementsSection from '@/components/AchievementsSection';
import GitHubAnalytics from '@/components/GitHubAnalytics';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import TerminalMode from '@/components/TerminalMode';
import Footer from '@/components/Footer';

const TechGlobe = dynamic(() => import('@/components/TechGlobe'), { ssr: false });
const AIPortfolio = dynamic(() => import('@/components/AIPortfolio'), { ssr: false });
const RecruiterMode = dynamic(() => import('@/components/RecruiterMode'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="relative z-10">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ArchitectureShowcase />
        <TechGlobe />
        <ImpactDashboard />
        <CodePlayground />
        <AchievementsSection />
        <GitHubAnalytics />
        <BlogSection />
        <ContactSection />
        <TerminalMode />
        <Footer />
      </div>

      <AIPortfolio />
      <RecruiterMode />
    </main>
  );
}
