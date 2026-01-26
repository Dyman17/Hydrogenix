import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Leaf className="h-10 w-10 text-primary" />
            <span className="text-2xl font-display font-bold text-gradient">Hydrogenix</span>
          </Link>
          <h1 className="text-3xl font-display font-bold mb-2">
            {t('auth.login')}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-card shadow-elevated">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('auth.email')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('auth.password')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="text-right">
            <button type="button" className="text-sm text-primary hover:underline">
              {t('auth.forgot_password')}
            </button>
          </div>

          <Button variant="hero" size="xl" className="w-full">
            {t('auth.login')}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {t('auth.no_account')}{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              {t('auth.register')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
