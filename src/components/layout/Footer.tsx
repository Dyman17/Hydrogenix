import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-display font-bold text-gradient">Hydrogenix</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t('hero.slogan')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('nav.shop')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('shop.title')}
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.calculator')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('team.title')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('team.member1')}</li>
              <li>{t('team.member2')}</li>
              <li>{t('team.school')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Hydrogenix. {t('footer.rights')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('footer.made_with')}
          </p>
        </div>
      </div>
    </footer>
  );
};
