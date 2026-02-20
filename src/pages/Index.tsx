import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { ComparisonSection } from '@/components/home/ComparisonSection';
import { Practice1Section } from '@/components/home/Practice1Section';
import { Practice2Section } from '@/components/home/Practice2Section';

const Index = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <ComparisonSection />
      <Practice1Section />
      <Practice2Section />
    </div>
  );
};

export default Index;
