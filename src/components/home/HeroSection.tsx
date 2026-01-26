import { Link } from 'react-router-dom';
import { ShoppingCart, Calculator, ChevronDown, Leaf, Droplets, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-glow opacity-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-eco-water/10 rounded-full blur-3xl animate-pulse-glow animation-delay-500" />
      
      {/* Floating Elements */}
      <div className="absolute top-32 right-20 hidden lg:block">
        <div className="relative animate-float">
          <div className="w-20 h-20 rounded-2xl gradient-hero opacity-80 shadow-glow" />
          <Droplets className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary-foreground" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 hidden lg:block">
        <div className="relative animate-float animation-delay-300">
          <div className="w-16 h-16 rounded-xl bg-eco-leaf/80 shadow-glow" />
          <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tags */}
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium animate-fade-up">
              <Leaf className="w-4 h-4" />
              {t('hero.natural')}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium animate-fade-up animation-delay-100">
              <Globe className="w-4 h-4" />
              {t('hero.ecological')}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium animate-fade-up animation-delay-200">
              <Droplets className="w-4 h-4" />
              {t('hero.water_saving')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-fade-up animation-delay-100">
            <span className="text-gradient">{t('hero.title')}</span>
          </h1>

          {/* Slogan */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-200">
            {t('hero.slogan')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <Link to="/shop">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                <ShoppingCart className="w-5 h-5" />
                {t('hero.buy')}
              </Button>
            </Link>
            <Link to="/calculator">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                <Calculator className="w-5 h-5" />
                {t('hero.calculator')}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="xl" 
              onClick={scrollToAbout}
              className="w-full sm:w-auto"
            >
              {t('hero.learn_more')}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button onClick={scrollToAbout} className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
