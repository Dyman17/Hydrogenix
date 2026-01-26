import { useState } from 'react';
import { User, Mail, Globe, Palette, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const Profile = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  const languages: { code: Language; label: string }[] = [
    { code: 'kz', label: 'Қазақша' },
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
  ];

  const orders = [
    { id: '1001', date: '2024-01-15', amount: 5800, status: 'Delivered' },
    { id: '1002', date: '2024-01-20', amount: 3200, status: 'Processing' },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          {t('profile.title')}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {t('profile.title')}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.name')}</label>
                  <Input
                    placeholder={t('profile.name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.email')}</label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {t('profile.address')}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.city')}</label>
                  <Input
                    placeholder={t('profile.city')}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.street')}</label>
                  <Input
                    placeholder={t('profile.street')}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>

              <Button variant="hero" className="mt-6">
                {t('profile.save')}
              </Button>
            </div>

            {/* Orders */}
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                {t('profile.orders')}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        {t('profile.order_number')}
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        {t('profile.date')}
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        {t('profile.amount')}
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        {t('profile.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-border/50">
                        <td className="py-4 px-2 font-medium">#{order.id}</td>
                        <td className="py-4 px-2 text-muted-foreground">{order.date}</td>
                        <td className="py-4 px-2">{order.amount.toLocaleString()} ₸</td>
                        <td className="py-4 px-2">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Language */}
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {t('profile.language')}
              </h2>
              <div className="space-y-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      language === lang.code
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                {t('profile.theme')}
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => theme !== 'light' && toggleTheme()}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    theme === 'light'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => theme !== 'dark' && toggleTheme()}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  🌙 Dark
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
