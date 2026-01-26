import { Leaf, Droplet, Wheat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const AboutSection = () => {
  const { t } = useLanguage();

  const ingredients = [
    { icon: Leaf, name: t('about.agar') },
    { icon: Droplet, name: t('about.glycerin') },
    { icon: Wheat, name: t('about.cellulose') },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold">
                  {t('about.title')}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.description')}
                </p>
              </div>

              {/* Composition */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('about.composition')}</h3>
                <div className="grid gap-4">
                  {ingredients.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-soft hover:shadow-card transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-primary font-medium text-lg">
                🌿 {t('about.bio')}
              </p>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl gradient-card shadow-elevated overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Animated circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full border-2 border-primary/20 animate-pulse-glow" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border-2 border-primary/30 animate-pulse-glow animation-delay-200" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-2 border-primary/40 animate-pulse-glow animation-delay-400" />
                    </div>
                    {/* Center icon */}
                    <div className="relative w-80 h-80 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-2xl gradient-hero shadow-glow flex items-center justify-center animate-float">
                        <Droplet className="w-12 h-12 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-eco-leaf/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-eco-water/20 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
