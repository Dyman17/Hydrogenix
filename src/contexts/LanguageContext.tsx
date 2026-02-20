import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'kz' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  kz: {
    // Navigation
    'nav.home': 'Басты бет',
    'nav.shop': 'Дүкен',
    'nav.calculator': 'Калькулятор',
    'nav.cart': 'Себет',
    'nav.profile': 'Профиль',
    'nav.login': 'Кіру',
    'nav.register': 'Тіркелу',
    
    // Hero
    'hero.title': 'Hydrogenix',
    'hero.natural': 'Табиғи',
    'hero.ecological': 'Экологиялық',
    'hero.water_saving': 'Су үнемдеу',
    'hero.slogan': 'Өсімдіктерге су жеткізудің ақылды әрі экологиялық шешімі',
    'hero.buy': 'Сатып алу',
    'hero.calculator': 'Калькулятор',
    'hero.learn_more': 'Толығырақ',
    
    // About
    'about.title': 'Жоба туралы',
    'about.description': 'Hydrogenix — өсімдіктерге су жеткізуді оңтайландыратын, табиғи компоненттерден жасалған экологиялық гидрогель.',
    'about.composition': 'Құрамы',
    'about.agar': 'Агар-агар',
    'about.glycerin': 'Глицерин',
    'about.cellulose': 'Жүгері жапырағынан алынған целлюлоза',
    'about.bio': 'Толығымен биоыдырайтын, микропластиксіз.',
    
    // Benefits
    'benefits.title': 'Артықшылықтар',
    'benefits.moisture': 'Ылғалды ұзақ сақтайды',
    'benefits.fertilizer': 'Табиғи тыңайтқыш әсері',
    'benefits.transport': 'Құрғақ күйде тасымалданады',
    'benefits.cost': 'Төмен өзіндік құн',
    'benefits.local': 'Қазақстанда өндіруге болады',
    
    // Comparison
    'compare.title': 'Салыстыру',
    'compare.hydrogenix': 'Hydrogenix',
    'compare.synthetic': 'Синтетикалық',
    'compare.natural': 'Табиғи',
    'compare.chemical': 'Химиялық',
    'compare.biodegradable': 'Биоыдырайды',
    'compare.microplastic': 'Микропластик қалдырады',
    'compare.ecological': 'Экологиялық',
    'compare.harmful': 'Топыраққа зиян',
    'compare.safe': 'Қауіпсіз',
    'compare.limited': 'Шектеулі қолдану',
    
    // Team
    'team.title': 'Команда',
    'team.subtitle': 'Жобаны жасағандар',
    'team.school': 'NIS Ақтау оқушылары',
    'team.member1': 'Крым Адилжан',
    'team.member2': 'Аманжол Бекжан',
    
    // Shop
    'shop.title': 'Дүкен',
    'shop.filter.category': 'Қолдану саласы',
    'shop.filter.material': 'Материал',
    'shop.filter.price': 'Баға',
    'shop.filter.size': 'Қаптама көлемі',
    'shop.add_to_cart': 'Себетке қосу',
    'shop.details': 'Толығырақ',
    'shop.plant': 'Үй өсімдігі',
    'shop.agriculture': 'Ауыл шаруашылығы',
    'shop.tree': 'Ағаш',
    
    // Product
    'product.description': 'Сипаттама',
    'product.characteristics': 'Характеристикалар',
    'product.composition': 'Құрамы',
    'product.absorption': 'Ылғал сіңіруі',
    'product.duration': 'Қолдану уақыты',
    'product.biodegradation': 'Биоыдырау',
    'product.quantity': 'Саны',
    'product.add_to_cart': 'Себетке қосу',
    'product.calculate': 'Калькуляторда есептеу',
    
    // Calculator
    'calc.title': 'Hydrogenix Gel Calculator',
    'calc.subtitle': 'Сізге қанша гидрогель қажет екенін есептеңіз',
    'calc.plant_type': 'Өсімдік түрі',
    'calc.house_plant': 'Үй өсімдігі',
    'calc.agriculture': 'Ауыл шаруашылығы',
    'calc.tree': 'Ағаш',
    'calc.soil_volume': 'Топырақ көлемі',
    'calc.liters': 'литр',
    'calc.climate': 'Климат',
    'calc.dry': 'Құрғақ',
    'calc.moderate': 'Орташа',
    'calc.humid': 'Ылғалды',
    'calc.watering': 'Суару жиілігі',
    'calc.daily': 'Күн сайын',
    'calc.every_few_days': '2–3 күнде',
    'calc.weekly': 'Аптасына 1 рет',
    'calc.calculate': 'Есептеу',
    'calc.result': 'Сізге қажет',
    'calc.grams': 'г Hydrogenix гидрогелі',
    'calc.recommended': 'Ұсынылатын қаптама',
    'calc.add_to_cart': 'Сразу в корзину',
    
    // Cart
    'cart.title': 'Себет',
    'cart.empty': 'Себетіңіз бос',
    'cart.total': 'Жалпы сома',
    'cart.checkout': 'Рәсімдеу',
    'cart.remove': 'Өшіру',
    
    // Profile
    'profile.title': 'Профиль',
    'profile.name': 'Аты',
    'profile.email': 'Email',
    'profile.language': 'Тіл',
    'profile.theme': 'Тема',
    'profile.address': 'Адрес',
    'profile.city': 'Қала',
    'profile.street': 'Улица',
    'profile.orders': 'Тапсырыстар',
    'profile.order_number': '№',
    'profile.date': 'Күні',
    'profile.amount': 'Сумма',
    'profile.status': 'Статус',
    'profile.save': 'Сақтау',
    
    // Auth
    'auth.login': 'Кіру',
    'auth.register': 'Тіркелу',
    'auth.email': 'Email',
    'auth.password': 'Құпия сөз',
    'auth.confirm_password': 'Құпия сөзді растау',
    'auth.forgot_password': 'Құпия сөзді ұмыттыңыз ба?',
    'auth.no_account': 'Аккаунтыңыз жоқ па?',
    'auth.have_account': 'Аккаунтыңыз бар ма?',
    
    // Footer
    'footer.rights': 'Барлық құқықтар қорғалған',
    'footer.made_with': 'Қазақстанда жасалған ❤️',
    
    // Practice 1
    'practice1.title': 'Гидрогельді практикада сынау',
    'practice1.image1_alt': 'Қара дақ пайда болып, солып жатқан өсімдік',
    'practice1.image1_caption': 'Қара дақ пайда болып, солып жатқан өсімдік',
    'practice1.image2_alt': 'Өсімдік топырағына гидрогель қосылғаннан кейін жаңа , сау, әрі таза өскін өсіп шығады',
    'practice1.image2_caption': 'Өсімдік топырағына гидрогель қосылғаннан кейін жаңа, сау, әрі таза өскін өсіп шығады',
    
    // Practice 2
    'practice2.title': 'Практика 2: Гидрогельдің қай топырақ түрінде тиімді екенін анықтау',
    'practice2.image1_alt': 'Гидрогельді дала топырағына егілген өсімдікке қосу, практика басы',
    'practice2.image1_caption': 'Гидрогельді дала топырағына егілген өсімдікке қосу, практика басы',
    'practice2.image2_alt': 'Гидрогельді бөлме топырағына егілген өсімдікке қосу, практика басы',
    'practice2.image2_caption': 'Гидрогельді бөлме топырағына егілген өсімдікке қосу, практика басы',
    'practice2.results_title': 'Практика нәтижелері',
    'practice2.results_text1': 'Тәжірибе барысында гидрогельдің әртүрлі топырақ түрлерінде әртүрлі тиімділік көрсететіні анықталды. Дала жағдайларында гидрогель ылғалды сақтауға және өсімдіктердің өсуін жақсартуға көмектеседі, ал бөлме жағдайларында нәтиже топырақ құрамына және суару жиілігіне байланысты.',
    'practice2.results_text2': 'Тәжірибе гидрогельді дұрыс қолдану суару жиілігін айтарлықтай қысқартуға және кез келген жағдайда өсімдіктердің жағдайын жақсартуға мүмкіндік береді деп көрсетті.',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.shop': 'Магазин',
    'nav.calculator': 'Калькулятор',
    'nav.cart': 'Корзина',
    'nav.profile': 'Профиль',
    'nav.login': 'Войти',
    'nav.register': 'Регистрация',
    
    // Hero
    'hero.title': 'Hydrogenix',
    'hero.natural': 'Натуральный',
    'hero.ecological': 'Экологичный',
    'hero.water_saving': 'Экономия воды',
    'hero.slogan': 'Умное и экологичное решение для полива растений',
    'hero.buy': 'Купить',
    'hero.calculator': 'Калькулятор',
    'hero.learn_more': 'Подробнее',
    
    // About
    'about.title': 'О проекте',
    'about.description': 'Hydrogenix — экологичный гидрогель из натуральных компонентов, оптимизирующий доставку воды к растениям.',
    'about.composition': 'Состав',
    'about.agar': 'Агар-агар',
    'about.glycerin': 'Глицерин',
    'about.cellulose': 'Целлюлоза из кукурузных листьев',
    'about.bio': 'Полностью биоразлагаемый, без микропластика.',
    
    // Benefits
    'benefits.title': 'Преимущества',
    'benefits.moisture': 'Долго сохраняет влагу',
    'benefits.fertilizer': 'Эффект натурального удобрения',
    'benefits.transport': 'Транспортируется в сухом виде',
    'benefits.cost': 'Низкая себестоимость',
    'benefits.local': 'Можно производить в Казахстане',
    
    // Comparison
    'compare.title': 'Сравнение',
    'compare.hydrogenix': 'Hydrogenix',
    'compare.synthetic': 'Синтетический',
    'compare.natural': 'Натуральный',
    'compare.chemical': 'Химический',
    'compare.biodegradable': 'Биоразлагается',
    'compare.microplastic': 'Оставляет микропластик',
    'compare.ecological': 'Экологичный',
    'compare.harmful': 'Вредит почве',
    'compare.safe': 'Безопасный',
    'compare.limited': 'Ограниченное использование',
    
    // Team
    'team.title': 'Команда',
    'team.subtitle': 'Создатели проекта',
    'team.school': 'Ученики NIS Актау',
    'team.member1': 'Крым Адильжан',
    'team.member2': 'Аманжол Бекжан',
    
    // Shop
    'shop.title': 'Магазин',
    'shop.filter.category': 'Область применения',
    'shop.filter.material': 'Материал',
    'shop.filter.price': 'Цена',
    'shop.filter.size': 'Размер упаковки',
    'shop.add_to_cart': 'В корзину',
    'shop.details': 'Подробнее',
    'shop.plant': 'Комнатное растение',
    'shop.agriculture': 'Сельское хозяйство',
    'shop.tree': 'Дерево',
    
    // Product
    'product.description': 'Описание',
    'product.characteristics': 'Характеристики',
    'product.composition': 'Состав',
    'product.absorption': 'Поглощение влаги',
    'product.duration': 'Время действия',
    'product.biodegradation': 'Биоразложение',
    'product.quantity': 'Количество',
    'product.add_to_cart': 'В корзину',
    'product.calculate': 'Рассчитать в калькуляторе',
    
    // Calculator
    'calc.title': 'Hydrogenix Gel Calculator',
    'calc.subtitle': 'Рассчитайте, сколько гидрогеля вам нужно',
    'calc.plant_type': 'Тип растения',
    'calc.house_plant': 'Комнатное растение',
    'calc.agriculture': 'Сельское хозяйство',
    'calc.tree': 'Дерево',
    'calc.soil_volume': 'Объём почвы',
    'calc.liters': 'литров',
    'calc.climate': 'Климат',
    'calc.dry': 'Сухой',
    'calc.moderate': 'Умеренный',
    'calc.humid': 'Влажный',
    'calc.watering': 'Частота полива',
    'calc.daily': 'Ежедневно',
    'calc.every_few_days': 'Каждые 2–3 дня',
    'calc.weekly': 'Раз в неделю',
    'calc.calculate': 'Рассчитать',
    'calc.result': 'Вам нужно',
    'calc.grams': 'г гидрогеля Hydrogenix',
    'calc.recommended': 'Рекомендуемая упаковка',
    'calc.add_to_cart': 'Сразу в корзину',
    
    // Cart
    'cart.title': 'Корзина',
    'cart.empty': 'Ваша корзина пуста',
    'cart.total': 'Итого',
    'cart.checkout': 'Оформить заказ',
    'cart.remove': 'Удалить',
    
    // Profile
    'profile.title': 'Профиль',
    'profile.name': 'Имя',
    'profile.email': 'Email',
    'profile.language': 'Язык',
    'profile.theme': 'Тема',
    'profile.address': 'Адрес',
    'profile.city': 'Город',
    'profile.street': 'Улица',
    'profile.orders': 'Заказы',
    'profile.order_number': '№',
    'profile.date': 'Дата',
    'profile.amount': 'Сумма',
    'profile.status': 'Статус',
    'profile.save': 'Сохранить',
    
    // Auth
    'auth.login': 'Войти',
    'auth.register': 'Регистрация',
    'auth.email': 'Email',
    'auth.password': 'Пароль',
    'auth.confirm_password': 'Подтвердите пароль',
    'auth.forgot_password': 'Забыли пароль?',
    'auth.no_account': 'Нет аккаунта?',
    'auth.have_account': 'Уже есть аккаунт?',
    
    // Footer
    'footer.rights': 'Все права защищены',
    'footer.made_with': 'Сделано в Казахстане ❤️',
    
    // Practice 1
    'practice1.title': 'Тестирование гидрогеля на практике',
    'practice1.image1_alt': 'Растение с черными пятнами, увядающее',
    'practice1.image1_caption': 'Растение с черными пятнами, увядающее',
    'practice1.image2_alt': 'После добавления гидрогеля в почву растения вырастают новые, здоровые и чистые ростки',
    'practice1.image2_caption': 'После добавления гидрогеля в почву растения вырастают новые, здоровые и чистые ростки',
    
    // Practice 2
    'practice2.title': 'Практика 2: Определение эффективности гидрогеля в различных типах почвы',
    'practice2.image1_alt': 'Добавление гидрогеля растению в полевую почву, начало практики',
    'practice2.image1_caption': 'Добавление гидрогеля растению в полевую почву, начало практики',
    'practice2.image2_alt': 'Добавление гидрогеля растению в комнатную почву, начало практики',
    'practice2.image2_caption': 'Добавление гидрогеля растению в комнатную почву, начало практики',
    'practice2.results_title': 'Результаты практики',
    'practice2.results_text1': 'В ходе эксперимента было установлено, что гидрогель показывает разную эффективность в различных типах почвы. В полевых условиях гидрогель помогает сохранить влагу и улучшить рост растений, в то время как в комнатных условиях результат зависит от состава почвы и частоты полива.',
    'practice2.results_text2': 'Опыт показал, что правильное применение гидрогеля позволяет значительно сократить частоту полива и улучшить состояние растений в любых условиях.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.calculator': 'Calculator',
    'nav.cart': 'Cart',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    // Hero
    'hero.title': 'Hydrogenix',
    'hero.natural': 'Natural',
    'hero.ecological': 'Ecological',
    'hero.water_saving': 'Water Saving',
    'hero.slogan': 'Smart and ecological solution for plant watering',
    'hero.buy': 'Shop Now',
    'hero.calculator': 'Calculator',
    'hero.learn_more': 'Learn More',
    
    // About
    'about.title': 'About the Project',
    'about.description': 'Hydrogenix is an ecological hydrogel made from natural components that optimizes water delivery to plants.',
    'about.composition': 'Composition',
    'about.agar': 'Agar-agar',
    'about.glycerin': 'Glycerin',
    'about.cellulose': 'Cellulose from corn leaves',
    'about.bio': 'Fully biodegradable, microplastic-free.',
    
    // Benefits
    'benefits.title': 'Benefits',
    'benefits.moisture': 'Long-lasting moisture retention',
    'benefits.fertilizer': 'Natural fertilizer effect',
    'benefits.transport': 'Transported in dry form',
    'benefits.cost': 'Low production cost',
    'benefits.local': 'Can be produced in Kazakhstan',
    
    // Comparison
    'compare.title': 'Comparison',
    'compare.hydrogenix': 'Hydrogenix',
    'compare.synthetic': 'Synthetic',
    'compare.natural': 'Natural',
    'compare.chemical': 'Chemical',
    'compare.biodegradable': 'Biodegradable',
    'compare.microplastic': 'Leaves microplastic',
    'compare.ecological': 'Ecological',
    'compare.harmful': 'Harmful to soil',
    'compare.safe': 'Safe',
    'compare.limited': 'Limited use',
    
    // Team
    'team.title': 'Team',
    'team.subtitle': 'Project creators',
    'team.school': 'NIS Aktau students',
    'team.member1': 'Krym Adilzhan',
    'team.member2': 'Amanzhol Bekzhan',
    
    // Shop
    'shop.title': 'Shop',
    'shop.filter.category': 'Application Area',
    'shop.filter.material': 'Material',
    'shop.filter.price': 'Price',
    'shop.filter.size': 'Package Size',
    'shop.add_to_cart': 'Add to Cart',
    'shop.details': 'Details',
    'shop.plant': 'House Plant',
    'shop.agriculture': 'Agriculture',
    'shop.tree': 'Tree',
    
    // Product
    'product.description': 'Description',
    'product.characteristics': 'Characteristics',
    'product.composition': 'Composition',
    'product.absorption': 'Moisture absorption',
    'product.duration': 'Duration',
    'product.biodegradation': 'Biodegradation',
    'product.quantity': 'Quantity',
    'product.add_to_cart': 'Add to Cart',
    'product.calculate': 'Calculate in calculator',
    
    // Calculator
    'calc.title': 'Hydrogenix Gel Calculator',
    'calc.subtitle': 'Calculate how much hydrogel you need',
    'calc.plant_type': 'Plant Type',
    'calc.house_plant': 'House Plant',
    'calc.agriculture': 'Agriculture',
    'calc.tree': 'Tree',
    'calc.soil_volume': 'Soil Volume',
    'calc.liters': 'liters',
    'calc.climate': 'Climate',
    'calc.dry': 'Dry',
    'calc.moderate': 'Moderate',
    'calc.humid': 'Humid',
    'calc.watering': 'Watering Frequency',
    'calc.daily': 'Daily',
    'calc.every_few_days': 'Every 2–3 days',
    'calc.weekly': 'Weekly',
    'calc.calculate': 'Calculate',
    'calc.result': 'You need',
    'calc.grams': 'g of Hydrogenix hydrogel',
    'calc.recommended': 'Recommended package',
    'calc.add_to_cart': 'Add to Cart',
    
    // Cart
    'cart.title': 'Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove',
    
    // Profile
    'profile.title': 'Profile',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.language': 'Language',
    'profile.theme': 'Theme',
    'profile.address': 'Address',
    'profile.city': 'City',
    'profile.street': 'Street',
    'profile.orders': 'Orders',
    'profile.order_number': '#',
    'profile.date': 'Date',
    'profile.amount': 'Amount',
    'profile.status': 'Status',
    'profile.save': 'Save',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.forgot_password': 'Forgot password?',
    'auth.no_account': "Don't have an account?",
    'auth.have_account': 'Already have an account?',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.made_with': 'Made in Kazakhstan ❤️',
    
    // Practice 1
    'practice1.title': 'Testing Hydrogel in Practice',
    'practice1.image1_alt': 'Plant with black spots, wilting',
    'practice1.image1_caption': 'Plant with black spots, wilting',
    'practice1.image2_alt': 'After adding hydrogel to plant soil, new, healthy and clean sprouts grow',
    'practice1.image2_caption': 'After adding hydrogel to plant soil, new, healthy and clean sprouts grow',
    
    // Practice 2
    'practice2.title': 'Practice 2: Determining the effectiveness of hydrogel in different soil types',
    'practice2.image1_alt': 'Adding hydrogel to plant in field soil, practice start',
    'practice2.image1_caption': 'Adding hydrogel to plant in field soil, practice start',
    'practice2.image2_alt': 'Adding hydrogel to plant in indoor soil, practice start',
    'practice2.image2_caption': 'Adding hydrogel to plant in indoor soil, practice start',
    'practice2.results_title': 'Practice Results',
    'practice2.results_text1': 'During the experiment, it was found that hydrogel shows different effectiveness in different soil types. In field conditions, hydrogel helps retain moisture and improve plant growth, while in indoor conditions the result depends on soil composition and watering frequency.',
    'practice2.results_text2': 'The experiment showed that proper use of hydrogel allows to significantly reduce watering frequency and improve plant condition in any conditions.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('kz');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
