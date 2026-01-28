export interface Product {
  id: string;
  name: {
    kz: string;
    ru: string;
    en: string;
  };
  description: {
    kz: string;
    ru: string;
    en: string;
  };
  price: number;
  sizes: { value: string; price: number }[];
  category: 'plant' | 'agriculture' | 'tree';
  rating: number;
  image: string;
  characteristics: {
    composition: string;
    absorption: string;
    duration: string;
    biodegradation: string;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: {
      kz: 'Гидрогель Таблеткасы',
      ru: 'Таблетки Гидрогеля',
      en: 'Hydrogel Tablets',
    },
    description: {
      kz: 'Бір өсімдік үшін дайын таблетка',
      ru: 'Готовые таблетки для одного растения',
      en: 'Ready tablets for one plant',
    },
    price: 300,
    sizes: [
      { value: '1 tablet', price: 300 },
    ],
    category: 'plant',
    rating: 4.8,
    image: '/package.jpeg',
    characteristics: {
      composition: 'Агар-агар, глицерин, целлюлоза',
      absorption: 'x300',
      duration: '30–45 күн',
      biodegradation: '100%',
    },
  },
  {
    id: '2',
    name: {
      kz: '10 Данадан Тұратын Жинақ',
      ru: 'Набор Из 10 Штук',
      en: 'Pack of 10 Pieces',
    },
    description: {
      kz: 'Кіші бақша үшін оңтайлы жинақ',
      ru: 'Удобный набор для маленькой теплицы',
      en: 'Convenient pack for small garden',
    },
    price: 2800,
    sizes: [
      { value: '10 pieces', price: 2800 },
    ],
    category: 'agriculture',
    rating: 4.9,
    image: '/package.jpeg',
    characteristics: {
      composition: 'Агар-агар, глицерин, целлюлоза',
      absorption: 'x350',
      duration: '45–60 күн',
      biodegradation: '100%',
    },
  },
  {
    id: '3',
    name: {
      kz: '100 Данадан Тұратын Жинақ',
      ru: 'Набор Из 100 Штук',
      en: 'Pack of 100 Pieces',
    },
    description: {
      kz: 'Фермерлер мен ұйымдар үшін',
      ru: 'Для фермеров и организаций',
      en: 'For farmers and organizations',
    },
    price: 27000,
    sizes: [
      { value: '100 pieces', price: 27000 },
    ],
    category: 'agriculture',
    rating: 4.7,
    image: '/package.jpeg',
    characteristics: {
      composition: 'Агар-агар, глицерин, целлюлоза, микроэлементтер',
      absorption: 'x280',
      duration: '60–90 күн',
      biodegradation: '100%',
    },
  },
  {
    id: '4',
    name: {
      kz: '1 Кг Сублимированный Гидрогель',
      ru: '1 Кг Сублимированный Гидрогель',
      en: '1 Kg Freeze-Dried Hydrogel',
    },
    description: {
      kz: 'Үлкен көлем, ауыл шаруашылығы үшін',
      ru: 'Большой объем, для сельского хозяйства',
      en: 'Large volume, for agriculture',
    },
    price: 75000,
    sizes: [
      { value: '1kg', price: 75000 },
    ],
    category: 'agriculture',
    rating: 4.5,
    image: '/package.jpeg',
    characteristics: {
      composition: 'Агар-агар, глицерин, целлюлоза',
      absorption: 'x300',
      duration: '30–45 күн',
      biodegradation: '100%',
    },
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
