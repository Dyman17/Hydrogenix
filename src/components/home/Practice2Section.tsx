import { useLanguage } from '@/contexts/LanguageContext';

const Practice2Section = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
          {t('practice2.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/before_outside.jpeg" 
                alt={t('practice2.image1_alt')}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-medium text-muted-foreground">
              {t('practice2.image1_caption')}
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/before_inside.jpeg" 
                alt={t('practice2.image2_alt')}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-medium text-muted-foreground">
              {t('practice2.image2_caption')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Practice2Section };
