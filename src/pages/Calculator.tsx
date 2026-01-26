import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator as CalcIcon, Leaf, Wheat, TreeDeciduous, Droplets, Sun, CloudRain, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

type PlantType = 'house' | 'agriculture' | 'tree';
type Climate = 'dry' | 'moderate' | 'humid';
type Watering = 'daily' | 'few_days' | 'weekly';

const Calculator = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  
  const [plantType, setPlantType] = useState<PlantType>('house');
  const [soilVolume, setSoilVolume] = useState(10);
  const [climate, setClimate] = useState<Climate>('moderate');
  const [watering, setWatering] = useState<Watering>('few_days');
  const [result, setResult] = useState<number | null>(null);

  const plantTypes = [
    { value: 'house' as PlantType, label: t('calc.house_plant'), icon: Leaf, multiplier: 1 },
    { value: 'agriculture' as PlantType, label: t('calc.agriculture'), icon: Wheat, multiplier: 1.2 },
    { value: 'tree' as PlantType, label: t('calc.tree'), icon: TreeDeciduous, multiplier: 1.5 },
  ];

  const climates = [
    { value: 'dry' as Climate, label: t('calc.dry'), icon: Sun, multiplier: 1.3 },
    { value: 'moderate' as Climate, label: t('calc.moderate'), icon: Droplets, multiplier: 1 },
    { value: 'humid' as Climate, label: t('calc.humid'), icon: CloudRain, multiplier: 0.8 },
  ];

  const wateringOptions = [
    { value: 'daily' as Watering, label: t('calc.daily'), multiplier: 0.8 },
    { value: 'few_days' as Watering, label: t('calc.every_few_days'), multiplier: 1 },
    { value: 'weekly' as Watering, label: t('calc.weekly'), multiplier: 1.2 },
  ];

  const calculate = () => {
    const baseAmount = soilVolume * 2.5; // 2.5g per liter
    const plantMultiplier = plantTypes.find(p => p.value === plantType)?.multiplier || 1;
    const climateMultiplier = climates.find(c => c.value === climate)?.multiplier || 1;
    const wateringMultiplier = wateringOptions.find(w => w.value === watering)?.multiplier || 1;
    
    const total = Math.round(baseAmount * plantMultiplier * climateMultiplier * wateringMultiplier);
    setResult(total);
  };

  const getRecommendedPackage = () => {
    if (!result) return null;
    if (result <= 100) return { size: '100g', price: 1500 };
    if (result <= 250) return { size: '250g', price: 3200 };
    if (result <= 500) return { size: '500g', price: 5200 };
    if (result <= 1000) return { size: '1kg', price: 8500 };
    return { size: '5kg', price: 38000 };
  };

  const recommended = getRecommendedPackage();

  const handleAddToCart = () => {
    if (recommended) {
      addToCart({
        id: 'calc-result',
        name: `Hydrogenix Gel ${recommended.size}`,
        price: recommended.price,
        image: '/placeholder.svg',
        size: recommended.size,
      });
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <CalcIcon className="w-5 h-5" />
              <span className="font-medium">Gel Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {t('calc.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('calc.subtitle')}
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-card rounded-3xl shadow-elevated p-8 space-y-10">
            {/* Plant Type */}
            <div className="space-y-4">
              <label className="text-lg font-semibold">{t('calc.plant_type')}</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {plantTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setPlantType(type.value)}
                    className={`p-6 rounded-2xl border-2 transition-all text-center ${
                      plantType === type.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <type.icon className={`w-10 h-10 mx-auto mb-3 ${
                      plantType === type.value ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Soil Volume */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-lg font-semibold">{t('calc.soil_volume')}</label>
                <span className="text-2xl font-bold text-primary">{soilVolume} {t('calc.liters')}</span>
              </div>
              <Slider
                value={[soilVolume]}
                onValueChange={(v) => setSoilVolume(v[0])}
                min={1}
                max={100}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1L</span>
                <span>50L</span>
                <span>100L</span>
              </div>
            </div>

            {/* Climate */}
            <div className="space-y-4">
              <label className="text-lg font-semibold">{t('calc.climate')}</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {climates.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setClimate(c.value)}
                    className={`p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                      climate === c.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <c.icon className={`w-8 h-8 ${
                      climate === c.value ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className="font-medium">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Watering Frequency */}
            <div className="space-y-4">
              <label className="text-lg font-semibold">{t('calc.watering')}</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {wateringOptions.map(w => (
                  <button
                    key={w.value}
                    onClick={() => setWatering(w.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      watering === w.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <Button variant="hero" size="xl" className="w-full" onClick={calculate}>
              <CalcIcon className="w-5 h-5" />
              {t('calc.calculate')}
            </Button>

            {/* Result */}
            {result !== null && (
              <div className="mt-8 p-8 rounded-2xl gradient-hero text-primary-foreground text-center animate-scale-in">
                <p className="text-lg mb-2">{t('calc.result')}</p>
                <p className="text-5xl font-bold mb-4">{result} {t('calc.grams')}</p>
                {recommended && (
                  <>
                    <p className="text-lg opacity-90 mb-6">
                      {t('calc.recommended')}: <strong>{recommended.size}</strong> — {recommended.price.toLocaleString()} ₸
                    </p>
                    <Button 
                      variant="secondary" 
                      size="xl"
                      onClick={handleAddToCart}
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {t('calc.add_to_cart')}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
