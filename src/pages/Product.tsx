import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Calculator, Minus, Plus, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';

const Product = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);

  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Product not found</p>
          <Link to="/shop">
            <Button variant="hero-outline">
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name[language as Language],
      price: product.sizes[selectedSize].price,
      image: product.image,
      size: product.sizes[selectedSize].value,
    }, quantity);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          {t('nav.shop')}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-3xl bg-muted overflow-hidden relative">
            <img 
              src={product.image} 
              alt={product.name[language as Language]} 
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
                target.alt = 'Placeholder image';
              }}
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {product.name[language as Language]}
              </h1>
              <p className="text-lg text-muted-foreground">
                {product.description[language as Language]}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">{t('shop.filter.size')}</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(index)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all ${
                      selectedSize === index
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{size.value}</span>
                    <span className="block text-sm text-muted-foreground">
                      {size.price.toLocaleString()} ₸
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-medium">{t('product.quantity')}</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-2xl font-bold text-primary">
                  {(product.sizes[selectedSize].price * quantity).toLocaleString()} ₸
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5" />
                {t('product.add_to_cart')}
              </Button>
              <Link to="/calculator" className="flex-1">
                <Button variant="hero-outline" size="xl" className="w-full">
                  <Calculator className="w-5 h-5" />
                  {t('product.calculate')}
                </Button>
              </Link>
            </div>

            {/* Characteristics */}
            <div className="p-6 rounded-2xl bg-muted/50 space-y-4">
              <h3 className="font-semibold text-lg">{t('product.characteristics')}</h3>
              <div className="grid gap-3">
                {[
                  { label: t('product.composition'), value: product.characteristics.composition },
                  { label: t('product.absorption'), value: product.characteristics.absorption },
                  { label: t('product.duration'), value: product.characteristics.duration },
                  { label: t('product.biodegradation'), value: product.characteristics.biodegradation },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item.label}:</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
