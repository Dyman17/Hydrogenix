import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { products, Product } from '@/data/products';

const Shop = () => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: language === 'kz' ? 'Барлығы' : language === 'ru' ? 'Все' : 'All' },
    { value: 'plant', label: t('shop.plant') },
    { value: 'agriculture', label: t('shop.agriculture') },
    { value: 'tree', label: t('shop.tree') },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name[language as Language],
      price: product.sizes[0].price,
      image: product.image,
      size: product.sizes[0].value,
    });
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            {t('shop.title')}
          </h1>
          
          <Button 
            variant="outline" 
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {t('shop.filter.category')}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <aside className={`w-full md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="p-4 rounded-xl bg-card shadow-soft">
              <h3 className="font-semibold mb-4">{t('shop.filter.category')}</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square bg-muted relative overflow-hidden">
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
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors">
                        {product.name[language as Language]}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description[language as Language]}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-primary">
                        {product.price.toLocaleString()} ₸
                      </span>
                      <Button 
                        variant="cart" 
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {t('shop.add_to_cart')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
