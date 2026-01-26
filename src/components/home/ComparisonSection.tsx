import { Check, X, Leaf, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ComparisonSection = () => {
  const { t } = useLanguage();

  const comparisons = [
    { hydrogenix: t('compare.natural'), synthetic: t('compare.chemical') },
    { hydrogenix: t('compare.biodegradable'), synthetic: t('compare.microplastic') },
    { hydrogenix: t('compare.ecological'), synthetic: t('compare.harmful') },
    { hydrogenix: t('compare.safe'), synthetic: t('compare.limited') },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('compare.title')}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {/* Headers */}
            <div className="flex items-center justify-center gap-3 p-4 md:p-6 rounded-t-2xl gradient-hero text-primary-foreground">
              <Leaf className="w-6 h-6" />
              <span className="text-lg md:text-xl font-bold">{t('compare.hydrogenix')}</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 md:p-6 rounded-t-2xl bg-muted text-muted-foreground">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-lg md:text-xl font-bold">{t('compare.synthetic')}</span>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <>
                <div 
                  key={`h-${index}`}
                  className={`flex items-center gap-3 p-4 md:p-5 bg-primary/5 border-l-4 border-primary ${
                    index === comparisons.length - 1 ? 'rounded-bl-2xl' : ''
                  }`}
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">{row.hydrogenix}</span>
                </div>
                <div 
                  key={`s-${index}`}
                  className={`flex items-center gap-3 p-4 md:p-5 bg-muted/50 border-l-4 border-destructive/50 ${
                    index === comparisons.length - 1 ? 'rounded-br-2xl' : ''
                  }`}
                >
                  <X className="w-5 h-5 text-destructive flex-shrink-0" />
                  <span className="text-muted-foreground text-sm md:text-base">{row.synthetic}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
