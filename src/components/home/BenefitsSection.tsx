import { Droplets, Sprout, Package, Coins, MapPin, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: Droplets, text: t('benefits.moisture') },
    { icon: Sprout, text: t('benefits.fertilizer') },
    { icon: Package, text: t('benefits.transport') },
    { icon: Coins, text: t('benefits.cost') },
    { icon: MapPin, text: t('benefits.local') },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('benefits.title')}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{benefit.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
