import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, MapPin, CreditCard, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

const Checkout = () => {
  const { t } = useLanguage();
  const { items, totalPrice } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    postalCode: '',
    paymentMethod: 'cash'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order data:', { ...formData, items, total: totalPrice });
    alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold mb-2">Корзина пуста</h2>
          <p className="text-muted-foreground mb-6">
            Добавьте товары в корзину для оформления заказа
          </p>
          <Link to="/shop">
            <Button variant="hero" size="lg">
              Перейти в магазин
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Вернуться в корзину
        </Link>

        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          Оформление заказа
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Контактная информация
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Фамилия *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Адрес доставки
              </h3>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Город *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Почтовый индекс</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Адрес *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Способ оплаты
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="text-primary"
                  />
                  <span>Наличными при получении</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="text-primary"
                  />
                  <span>Картой при получении</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-card shadow-elevated">
              <h3 className="text-lg font-semibold mb-6">Ваш заказ</h3>
              
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
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-2xl font-bold text-primary">
                    {totalPrice.toLocaleString()} ₸
                  </span>
                </div>
              </div>

              <Button 
                variant="hero" 
                size="xl" 
                className="w-full"
                onClick={handleSubmit}
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
