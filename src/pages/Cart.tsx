import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { t } = useLanguage();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">{t('cart.empty')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('hero.slogan')}
          </p>
          <Link to="/shop">
            <Button variant="hero" size="lg">
              <ShoppingBag className="w-5 h-5" />
              {t('nav.shop')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          {t('nav.shop')}
        </Link>

        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          {t('cart.title')}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-4 rounded-2xl bg-card shadow-soft animate-fade-up"
              >
                {/* Image */}
                <div className="w-24 h-24 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover object-center rounded-xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                      target.alt = 'Placeholder image';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.size}</p>
                  <p className="text-lg font-bold text-primary mt-2">
                    {item.price.toLocaleString()} ₸
                  </p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center rounded-lg border border-border overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-card shadow-elevated">
              <h3 className="text-lg font-semibold mb-6">{t('cart.title')}</h3>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {(item.price * item.quantity).toLocaleString()} ₸
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{t('cart.total')}</span>
                  <span className="text-2xl font-bold text-primary">
                    {totalPrice.toLocaleString()} ₸
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <Button variant="hero" size="xl" className="w-full">
                  {t('cart.checkout')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
