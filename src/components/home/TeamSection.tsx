import { User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const TeamSection = () => {
  const { t } = useLanguage();

  const team = [
    { name: t('team.member1'), role: 'Developer & Researcher' },
    { name: t('team.member2'), role: 'Developer & Designer' },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('team.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('team.subtitle')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="group w-full md:w-72 p-8 rounded-3xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 text-center"
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              
              {/* Info */}
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
              
              {/* School Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                🏫 {t('team.school')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
