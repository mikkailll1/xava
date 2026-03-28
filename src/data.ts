import { Designer, Product, Collection } from './types';

// Список дизайнеров
export const DESIGNERS: Designer[] = [
  {
    id: 'd1',
    name: 'Елена Вэнс',
    brandName: 'VANCE',
    avatar: 'https://picsum.photos/seed/elena/200/200',
    cover: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    bio: 'Елена Вэнс специализируется на архитектурных силуэтах и экологичных материалах. Ее работы исследуют пересечение формы и функции в современной городской среде.',
    philosophy: 'Минимализм — это не отсутствие чего-либо, это идеальное количество всего.',
    country: 'Дания',
    followers: 12400
  },
  {
    id: 'd2',
    name: 'Сора Ким',
    brandName: 'SORA',
    avatar: 'https://picsum.photos/seed/sora/200/200',
    cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    bio: 'Сора Ким сочетает традиционную корейскую эстетику с современным минималистичным дизайном. Каждое изделие — это этюд баланса и гармонии.',
    philosophy: 'Истинная элегантность кроется в тихих деталях.',
    country: 'Южная Корея',
    followers: 8900
  },
  {
    id: 'd3',
    name: 'Марчелло Росси',
    brandName: 'ROSSI STUDIO',
    avatar: 'https://picsum.photos/seed/marcello/200/200',
    cover: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=800&q=80',
    bio: 'Марчелло Росси привносит итальянское мастерство в движение минимализма. Его коллекции известны безупречным кроем и роскошными текстурами.',
    philosophy: 'Качество важнее количества, всегда.',
    country: 'Италия',
    followers: 15600
  },
  {
    id: 'd4',
    name: 'Аня Петрова',
    brandName: 'PETROVA',
    avatar: 'https://picsum.photos/seed/anya/200/200',
    cover: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
    bio: 'Аня Петрова создает «живую одежду», которая движется вместе с телом. Ее минималистичный подход основан на комфорте и непринужденном стиле.',
    philosophy: 'Мода должна служить человеку, а не наоборот.',
    country: 'Россия',
    followers: 6700
  },
  {
    id: 'd5',
    name: 'Лиам Чен',
    brandName: 'CHEN MINIMAL',
    avatar: 'https://picsum.photos/seed/liam/200/200',
    cover: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&w=800&q=80',
    bio: 'Лиам Чен исследует гендерно-нейтральный минимализм, уделяя особое внимание техническим тканям и модульному дизайну.',
    philosophy: 'Простота — это высшая степень изысканности.',
    country: 'Сингапур',
    followers: 10200
  },
  {
    id: 'd6',
    name: 'Хава Тазабиева',
    brandName: 'KHAVA TAZABIEVA',
    avatar: 'https://i.pinimg.com/736x/62/bf/33/62bf33ae7b63846950a05a1503a14858.jpg',
    cover: 'https://i.pinimg.com/1200x/95/d1/aa/95d1aafe08add19337fd0e48a8cf0921.jpg',
    bio: 'Хава Тазабиева — дизайнер, создающий утонченные и благородные образы, сочетающие в себе скромность и современную элегантность. Ее коллекции вдохновлены традициями и чистотой линий.',
    philosophy: 'Истинная красота в скромности и достоинстве.',
    country: 'Россия',
    followers: 15000
  }
];

// Список товаров
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    designerId: 'd1',
    name: 'Архитектурное шерстяное пальто',
    modelName: 'Victoria',
    price: 75000,
    images: [
      'https://basket-27.wbbasket.ru/vol4946/part494639/494639334/images/c516x688/1.webp',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&w=600&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Структурированное пальто из итальянской шерсти премиум-класса. Скрытые застежки и чистый архитектурный силуэт.',
    materials: '100% натуральная шерсть, шелковая подкладка',
    care: 'Только сухая чистка',
    category: 'Верхняя одежда',
    isNew: true,
    reviews: [
      { id: 'r1', userId: 'u2', userName: 'Екатерина', rating: 5, comment: 'Потрясающее качество! Сидит идеально.', date: '2024-03-15' },
      { id: 'r2', userId: 'u3', userName: 'Мария', rating: 4, comment: 'Очень теплое, но немного тяжелое.', date: '2024-03-10' }
    ]
  },
  {
    id: 'p2',
    designerId: 'd2',
    name: 'Шелковая блуза с запахом',
    modelName: 'Seraphina',
    price: 28000,
    images: [
      'https://basket-12.wbbasket.ru/vol1678/part167874/167874952/images/c516x688/1.webp',
      'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?auto=format&w=600&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Нежная шелковая блуза с современным дизайном с запахом. Вдохновлена традиционными силуэтами ханбок.',
    materials: '100% шелк малбери',
    care: 'Ручная стирка в холодной воде',
    category: 'Топы',
    reviews: [
      { id: 'r3', userId: 'u4', userName: 'Анна', rating: 5, comment: 'Шелк невероятный на ощупь.', date: '2024-03-12' }
    ]
  },
  {
    id: 'p3',
    designerId: 'd3',
    name: 'Льняные брюки классического кроя',
    modelName: 'Isabella',
    price: 35000,
    images: [
      'https://i.pinimg.com/originals/32/c7/f3/32c7f3498a35f76d088f3500a1598fbd.jpg',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&w=600&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Брюки с высокой талией и идеальной драпировкой. Изготовлены из высококачественного европейского льна.',
    materials: '100% органический лен',
    care: 'Деликатная машинная стирка',
    category: 'Брюки',
    reviews: []
  },
  {
    id: 'p4',
    designerId: 'd4',
    name: 'Кашемировый костюм для отдыха',
    modelName: 'Elizabeth',
    price: 52000,
    images: [
      'https://cdn-sh1.vigbo.com/shops/136946/products/21624131/images/3-b4d3eb33d68da918b2f545f9624b68e4.jpg',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&w=600&q=80'
    ],
    sizes: ['S', 'M'],
    description: 'Максимальный комфорт. Комплект из двух предметов из нежнейшего монгольского кашемира.',
    materials: '100% кашемир',
    care: 'Только сухая чистка',
    category: 'Домашняя одежда',
    isNew: true,
    reviews: [
      { id: 'r4', userId: 'u5', userName: 'Ольга', rating: 5, comment: 'Самый мягкий кашемир, который я носила.', date: '2024-03-20' }
    ]
  },
  {
    id: 'p5',
    designerId: 'd5',
    name: 'Технологичная парка-шелл',
    modelName: 'Alexandra',
    price: 58000,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&w=600&q=80',
      'https://images.unsplash.com/photo-1545594944-24b89198b29f?auto=format&w=600&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    description: 'Водостойкая и ветрозащитная. Минималистичный взгляд на функциональную верхнюю одежду.',
    materials: 'Переработанный полиэстер, GORE-TEX',
    care: 'Машинная стирка в холодной воде',
    category: 'Верхняя одежда',
    reviews: []
  },
  {
    id: 'p6',
    designerId: 'd1',
    name: 'Портретный этюд',
    modelName: 'Portrait',
    price: 0,
    images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&w=600&q=80'],
    sizes: [],
    description: 'Портрет в стиле минимализм.',
    materials: '',
    care: '',
    category: 'Фото',
    reviews: []
  },
  {
    id: 'p7',
    designerId: 'd2',
    name: 'Цитата дня',
    modelName: 'Quote',
    price: 0,
    images: [],
    sizes: [],
    description: 'Не хмурь бровей из-за ударов рока, Упавший духом гибнет раньше срока.',
    materials: '',
    care: '',
    category: 'Цитата',
    reviews: []
  },
  {
    id: 'p8',
    designerId: 'd3',
    name: 'Эффект бабочки',
    modelName: 'Butterfly',
    price: 0,
    images: ['https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&w=600&q=80'],
    sizes: [],
    description: 'Темная бабочка в макросъемке.',
    materials: '',
    care: '',
    category: 'Фото',
    reviews: []
  },
  {
    id: 'p9',
    designerId: 'd4',
    name: 'Статуэтка ангела',
    modelName: 'Angel',
    price: 0,
    images: ['https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&w=600&q=80'],
    sizes: [],
    description: 'Классическое искусство в деталях.',
    materials: '',
    care: '',
    category: 'Фото',
    reviews: []
  },
  {
    id: 'p10',
    designerId: 'd5',
    name: 'Городской минимализм',
    modelName: 'Urban',
    price: 0,
    images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&w=600&q=80'],
    sizes: [],
    description: 'Вибрации города.',
    materials: '',
    care: '',
    category: 'Фото',
    reviews: []
  },
  {
    id: 'p11',
    designerId: 'd1',
    name: 'Абстрактные формы',
    modelName: 'Abstract',
    price: 0,
    images: ['https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&w=600&q=80'],
    sizes: [],
    description: 'Формы и цвета.',
    materials: '',
    care: '',
    category: 'Фото',
    reviews: []
  },
  {
    id: 'p12',
    designerId: 'd6',
    name: 'Белое платье "Чистота"',
    modelName: 'Lumina',
    price: 45000,
    images: [
      'https://i.pinimg.com/1200x/95/d1/aa/95d1aafe08add19337fd0e48a8cf0921.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Элегантное белое платье из струящейся ткани. Идеальный выбор для торжественных случаев, где важна сдержанность и свет. Каждая деталь пропитана нежностью и благородством.',
    materials: 'Натуральный шелк, вискоза',
    care: 'Деликатная стирка при 30 градусах',
    category: 'Платья',
    isNew: true,
    reviews: []
  },
  {
    id: 'p13',
    designerId: 'd6',
    name: 'Коричневое платье "Земля"',
    modelName: 'Terra',
    price: 38000,
    images: [
      'https://i.pinimg.com/1200x/96/32/dc/9632dc80cd408b2b29265e849a49e5e8.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Глубокий шоколадный оттенок и мягкая текстура ткани создают образ тепла и уверенности. Платье подчеркивает благородство и спокойствие, создавая летящий и утонченный силуэт.',
    materials: 'Креп-шифон, атласная отделка',
    care: 'Сухая чистка',
    category: 'Платья',
    isNew: true,
    reviews: []
  },
  {
    id: 'p14',
    designerId: 'd6',
    name: 'Изумрудное платье "Лес"',
    modelName: 'Emerald',
    price: 42000,
    images: [
      'https://i.pinimg.com/736x/62/bf/33/62bf33ae7b63846950a05a1503a14858.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Роскошное изумрудное платье с изысканным цветочным принтом. Сочетание насыщенного цвета и нежного узора придает образу особую глубину и загадочность.',
    materials: 'Шифон премиум-класса, шелк',
    care: 'Ручная стирка',
    category: 'Платья',
    isNew: true,
    reviews: []
  }
];

// Список коллекций
export const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    designerId: 'd1',
    name: 'Nordic Winter',
    season: 'Winter',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c2',
    designerId: 'd2',
    name: 'Zen Spring',
    season: 'Spring',
    year: 2025,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c3',
    designerId: 'd6',
    name: 'Grace of the East',
    season: 'All Season',
    year: 2024,
    image: 'https://i.pinimg.com/1200x/95/d1/aa/95d1aafe08add19337fd0e48a8cf0921.jpg'
  }
];
