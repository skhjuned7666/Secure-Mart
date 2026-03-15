import type { Product, ProductListItem, Review } from "@/types/product";

/** Shared Unsplash base URLs used on home (TrendingProducts) for image consistency across app */
const UNSPLASH = {
  smartphone:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  laptop:
    "https://plus.unsplash.com/premium_photo-1681666713728-9ed75e148617",
  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  sneakers:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  pressureCooker:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
  vacuum:
    "https://images.unsplash.com/photo-1558317374-067fb5f30001",
  camera:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  earbuds:
    "https://images.unsplash.com/photo-1598331668826-20cecc596b86",
  monitor:
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
  runningShoes:
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
} as const;

const img = (base: string, w = 600) =>
  `${base}?w=${w}&auto=format&fit=crop&q=80`;

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Samsung Galaxy S24 Ultra 5G",
    description: "Experience the pinnacle of smartphone technology with the Samsung Galaxy S24 Ultra. Featuring a stunning 6.8-inch Dynamic AMOLED 2X display, the revolutionary 200MP camera system, and the powerful Snapdragon 8 Gen 3 chipset. Built with titanium for premium durability and includes S Pen for precision input.",
    price: 79999,
    originalPrice: 134999,
    discount: 41,
    rating: 4.7,
    reviewsCount: 12840,
    images: [
      img(UNSPLASH.smartphone, 600),
      img(UNSPLASH.smartphone, 800),
      img(UNSPLASH.smartphone, 400),
    ],
    variants: ["128GB", "256GB", "512GB"],
    stock: 150,
    brand: "Samsung",
    category: "Smartphones",
    deliveryEstimate: "Delivery by Tomorrow, Mar 15",
    variantLabels: {
      Storage: ["128GB", "256GB", "512GB"],
      Color: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
    },
    features: [
      "200MP Main Camera with Nightography",
      "6.8\" QHD+ Dynamic AMOLED 2X 120Hz display",
      "Snapdragon 8 Gen 3 for Galaxy",
      "S Pen included, 2.5x faster response",
      "5000mAh battery with 45W fast charging",
      "Titanium frame, IP68 water and dust resistance",
    ],
    specifications: {
      "Display Size": "6.8 inches",
      "Display Type": "Dynamic AMOLED 2X",
      "Resolution": "3120 x 1440 pixels",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12 GB",
      "Storage": "256 GB (expandable)",
      "Rear Camera": "200 MP + 12 MP + 50 MP + 10 MP",
      "Front Camera": "12 MP",
      "Battery": "5000 mAh",
      "OS": "Android 14, One UI 6.1",
      "Weight": "232 g",
    },
  },
  {
    id: "2",
    title: "Apple MacBook Air M3 Chip",
    description: "The MacBook Air with M3 chip brings incredible performance and all-day battery life in a thin, silent design. Perfect for work, creativity, and everyday use with a stunning Liquid Retina display and industry-leading efficiency.",
    price: 99900,
    originalPrice: 114900,
    discount: 13,
    rating: 4.9,
    reviewsCount: 8730,
    images: [
      img(UNSPLASH.laptop, 600),
      img(UNSPLASH.laptop, 800),
      img(UNSPLASH.laptop, 400),
    ],
    variants: ["8GB/256GB", "8GB/512GB", "16GB/512GB"],
    stock: 85,
    brand: "Apple",
    category: "Laptops",
    deliveryEstimate: "Delivery by Mar 16 - Mar 18",
    variantLabels: {
      "Memory": ["8GB", "16GB"],
      "Storage": ["256GB", "512GB"],
      "Color": ["Midnight", "Starlight", "Space Gray", "Silver"],
    },
    features: [
      "M3 chip with 8-core CPU, 10-core GPU",
      "Up to 18 hours battery life",
      "13.6-inch Liquid Retina display",
      "8GB unified memory, 256GB SSD",
      "MagSafe charging, Thunderbolt 4",
      "Fanless design, silent operation",
    ],
    specifications: {
      "Chip": "Apple M3",
      "Display": "13.6-inch Liquid Retina",
      "Memory": "8 GB unified",
      "Storage": "256 GB SSD",
      "Camera": "1080p FaceTime HD",
      "Ports": "2x Thunderbolt 4, MagSafe 3",
      "Weight": "1.24 kg",
      "OS": "macOS Sonoma",
    },
  },
  {
    id: "3",
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation meets premium sound. The WH-1000XM5 delivers exceptional audio quality with Adaptive Sound Control and 30-hour battery life. Perfect for travel and daily commutes.",
    price: 19990,
    originalPrice: 34990,
    discount: 43,
    rating: 4.8,
    reviewsCount: 23100,
    images: [
      img(UNSPLASH.headphones, 600),
      img(UNSPLASH.headphones, 800),
      img(UNSPLASH.headphones, 400),
    ],
    variants: ["Black", "Silver"],
    stock: 200,
    brand: "Sony",
    category: "Audio",
    deliveryEstimate: "Delivery by Tomorrow, Mar 15",
    variantLabels: {
      Color: ["Black", "Silver"],
    },
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Multipoint connection",
      "Speak-to-chat technology",
      "Premium sound with LDAC",
      "Lightweight, comfortable design",
    ],
    specifications: {
      "Driver": "30 mm",
      "Frequency": "4 Hz - 40 kHz",
      "Battery Life": "30 hours (ANC on)",
      "Charging": "USB Type-C, 3 min = 3 hours",
      "Bluetooth": "5.2",
      "Weight": "250 g",
      "Foldable": "Yes",
    },
  },
  {
    id: "4",
    title: "Nike Air Max 270 Sneakers",
    description: "The Nike Air Max 270 delivers a bold look and all-day comfort. Featuring the tallest heel Air unit yet for a super-soft ride that feels as impossible as it looks.",
    price: 7995,
    originalPrice: 12995,
    discount: 38,
    rating: 4.5,
    reviewsCount: 9200,
    images: [
      img(UNSPLASH.sneakers, 600),
      img(UNSPLASH.sneakers, 800),
    ],
    variants: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    stock: 75,
    brand: "Nike",
    category: "Footwear",
    deliveryEstimate: "Delivery by Mar 17 - Mar 20",
    variantLabels: {
      Size: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
      Color: ["Black/White", "Sail", "Olive"],
    },
    features: [
      "270° Max Air unit for cushioning",
      "Breathable mesh upper",
      "Rubber outsole for traction",
      "Lightweight, flexible design",
      "Iconic Air Max look",
    ],
    specifications: {
      "Upper": "Mesh and synthetic",
      "Sole": "Rubber with Air unit",
      "Closure": "Lace-up",
      "Fit": "Regular",
      "Care": "Machine wash cold",
    },
  },
  {
    id: "5",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "The Instant Pot Duo replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer. 6-liter capacity perfect for family meals.",
    price: 6499,
    originalPrice: 9999,
    discount: 35,
    rating: 4.6,
    reviewsCount: 31500,
    images: [
      img(UNSPLASH.pressureCooker, 600),
      img(UNSPLASH.pressureCooker, 800),
      img(UNSPLASH.pressureCooker, 400),
    ],
    variants: ["6L", "8L"],
    stock: 120,
    brand: "Instant Pot",
    category: "Kitchen",
    deliveryEstimate: "Delivery by Mar 16 - Mar 19",
    variantLabels: {
      Capacity: ["6 Litre", "8 Litre"],
      Color: ["Black", "Stainless Steel"],
    },
    features: [
      "7-in-1: Pressure cook, slow cook, rice, steam, sauté, yogurt, warm",
      "6-liter capacity, serves 6+",
      "14 one-touch programs",
      "Stainless steel inner pot",
      "Safety lid lock and pressure release",
    ],
    specifications: {
      "Capacity": "6 L",
      "Power": "1000 W",
      "Programs": "14",
      "Material": "Stainless steel",
      "Dimensions": "33 x 33 x 33 cm",
      "Weight": "5.5 kg",
    },
  },
  {
    id: "6",
    title: "Dyson V15 Detect Cordless Vacuum",
    description: "Laser reveals microscopic dust. The V15 Detect features a laser dust sensor, LCD screen showing particle count, and whole-machine HEPA filtration. Up to 60 minutes of fade-free suction.",
    price: 44900,
    originalPrice: 64900,
    discount: 31,
    rating: 4.8,
    reviewsCount: 5400,
    images: [
      img(UNSPLASH.vacuum, 600),
      img(UNSPLASH.vacuum, 800),
    ],
    variants: ["Gold", "Nickel"],
    stock: 45,
    brand: "Dyson",
    category: "Home",
    deliveryEstimate: "Delivery by Mar 18 - Mar 21",
    variantLabels: {
      Color: ["Gold", "Nickel"],
    },
    features: [
      "Laser dust detection reveals microscopic particles",
      "LCD screen shows particle count in real time",
      "60 min run time, fade-free suction",
      "Whole-machine HEPA filtration",
      "Converts to handheld",
      "Laser slim fluffy cleaner head",
    ],
    specifications: {
      "Run Time": "60 minutes",
      "Suction": "240 AW",
      "Dustbin": "0.76 L",
      "Filtration": "HEPA",
      "Charging": "4.5 hours",
      "Weight": "3.2 kg",
    },
  },
  {
    id: "7",
    title: "Canon EOS R50 Mirrorless Camera",
    description: "Compact, lightweight mirrorless camera with 24.2MP sensor, 4K video, and Dual Pixel CMOS AF II. Perfect for vloggers and content creators.",
    price: 52990,
    originalPrice: 74990,
    discount: 29,
    rating: 4.7,
    reviewsCount: 3800,
    images: [
      img(UNSPLASH.camera, 600),
      img(UNSPLASH.camera, 800),
      img(UNSPLASH.camera, 400),
    ],
    variants: ["Body", "With 18-45mm Kit"],
    stock: 60,
    brand: "Canon",
    category: "Cameras",
    deliveryEstimate: "Delivery by Mar 17 - Mar 20",
    variantLabels: {
      Kit: ["Body Only", "With 18-45mm Kit", "With 18-150mm Kit"],
      Color: ["Black"],
    },
    features: [
      "24.2MP APS-C sensor",
      "4K 30p video, no crop",
      "Dual Pixel CMOS AF II",
      "Compact and lightweight",
      "Creative Assist and Guided UI",
      "Bluetooth and Wi-Fi",
    ],
    specifications: {
      "Sensor": "24.2 MP APS-C",
      "Video": "4K 30p",
      "AF": "Dual Pixel CMOS AF II",
      "LCD": "3\" vari-angle touchscreen",
      "Connectivity": "Wi-Fi, Bluetooth",
      "Weight": "375 g (body only)",
    },
  },
  {
    id: "8",
    title: "boAt Airdopes 141 TWS Earbuds",
    description: "Affordable true wireless earbuds with 42 hours total playtime, IPX4 sweat resistance, and instant connect. Perfect for music and calls on the go.",
    price: 999,
    originalPrice: 2990,
    discount: 67,
    rating: 4.3,
    reviewsCount: 148200,
    images: [
      img(UNSPLASH.earbuds, 600),
      img(UNSPLASH.earbuds, 800),
    ],
    variants: ["Black", "Blue", "Green"],
    stock: 500,
    brand: "boAt",
    category: "Audio",
    deliveryEstimate: "Delivery by Mar 16 - Mar 18",
    variantLabels: {
      Color: ["Bold Black", "Active Black", "Boom Green", "Stormy Blue"],
    },
    features: [
      "42 hours total playtime",
      "IPX4 sweat and water resistant",
      "Instant connect with IWP tech",
      "8mm drivers for clear sound",
      "Touch controls",
      "Voice assistant support",
    ],
    specifications: {
      "Driver": "8 mm",
      "Battery": "42 hrs total (earbuds + case)",
      "IP Rating": "IPX4",
      "Bluetooth": "5.0",
      "Charging": "USB Type-C",
    },
  },
  {
    id: "9",
    title: "Samsung 32\" FHD Smart Monitor",
    description: "32-inch FHD smart monitor with USB-C, built-in streaming apps and productivity features.",
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    rating: 4.6,
    reviewsCount: 6200,
    images: [
      img(UNSPLASH.monitor, 600),
      img(UNSPLASH.monitor, 800),
    ],
    variants: ["Black"],
    stock: 45,
    brand: "Samsung",
    category: "Electronics",
    deliveryEstimate: "Delivery by Mar 16 - Mar 18",
    variantLabels: {},
    features: ["32\" FHD", "Smart TV", "USB-C"],
    specifications: { "Screen": "32\"", "Resolution": "1920x1080" },
  },
  {
    id: "10",
    title: "Adidas Ultraboost 22 Running Shoes",
    description: "Premium running shoes with Boost cushioning and Primeknit upper for comfort and performance.",
    price: 12999,
    originalPrice: 16999,
    discount: 24,
    rating: 4.7,
    reviewsCount: 8400,
    images: [
      img(UNSPLASH.runningShoes, 600),
      img(UNSPLASH.runningShoes, 800),
    ],
    variants: ["Black", "White", "Grey"],
    stock: 120,
    brand: "Adidas",
    category: "Footwear",
    deliveryEstimate: "Delivery by Tomorrow, Mar 15",
    variantLabels: { Color: ["Black", "White", "Grey"] },
    features: ["Boost midsole", "Primeknit upper", "Lightweight"],
    specifications: { "Weight": "300 g", "Drop": "10 mm" },
  },
];

const sampleReviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    userId: "u1",
    userName: "Rahul K.",
    rating: 5,
    title: "Best phone I've ever used",
    body: "The camera is incredible, battery lasts all day, and the S Pen is surprisingly useful. Display is stunning. Worth every rupee.",
    verifiedPurchase: true,
    createdAt: "2025-03-10T10:00:00Z",
    helpfulCount: 124,
  },
  {
    id: "r2",
    productId: "1",
    userId: "u2",
    userName: "Priya M.",
    rating: 4,
    title: "Great but heavy",
    body: "Love the features and performance. Only downside is the weight - it's quite heavy for one-handed use. Otherwise excellent.",
    verifiedPurchase: true,
    images: [img(UNSPLASH.smartphone, 400)],
    createdAt: "2025-03-08T14:30:00Z",
    helpfulCount: 89,
  },
  {
    id: "r3",
    productId: "1",
    userId: "u3",
    userName: "Amit S.",
    rating: 5,
    title: "Worth the upgrade",
    body: "Upgraded from S22 Ultra. The performance improvement is noticeable. 200MP camera shots are impressive. Fast delivery from Secure-Mart.",
    verifiedPurchase: true,
    createdAt: "2025-03-05T09:15:00Z",
    helpfulCount: 56,
  },
];

function toListItem(p: Product): ProductListItem {
  return {
    id: p.id,
    title: p.title,
    brand: p.brand,
    price: p.price,
    discount: p.discount,
    rating: p.rating,
    images: p.images,
    reviewsCount: p.reviewsCount,
  };
}

export async function getProduct(productId: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 150));
  return sampleProducts.find((p) => p.id === productId) ?? null;
}

export async function getRelatedProducts(
  productId: string,
  limit = 8
): Promise<ProductListItem[]> {
  await new Promise((r) => setTimeout(r, 80));
  return sampleProducts
    .filter((p) => p.id !== productId)
    .slice(0, limit)
    .map(toListItem);
}

export async function getFrequentlyBoughtTogether(productId: string): Promise<{
  main: Product;
  suggested: ProductListItem[];
  bundlePrice: number;
} | null> {
  await new Promise((r) => setTimeout(r, 100));
  const main = sampleProducts.find((p) => p.id === productId);
  if (!main) return null;
  const suggested = sampleProducts
    .filter((p) => p.id !== productId)
    .slice(0, 3)
    .map(toListItem);
  const bundlePrice = main.price + suggested.reduce((sum, p) => sum + p.price, 0);
  return { main, suggested, bundlePrice };
}

export async function getReviews(productId: string): Promise<{
  averageRating: number;
  breakdown: Record<number, number>;
  reviews: Review[];
}> {
  await new Promise((r) => setTimeout(r, 80));
  const product = sampleProducts.find((p) => p.id === productId);
  const reviews = sampleReviews.filter((r) => r.productId === productId);
  if (reviews.length === 0) {
    return {
      averageRating: product?.rating ?? 0,
      breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      reviews: [],
    };
  }
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  const averageRating = Math.round((sum / reviews.length) * 10) / 10;
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    breakdown[r.rating] = (breakdown[r.rating] ?? 0) + 1;
  });
  return { averageRating, breakdown, reviews };
}

export async function getMoreFromBrand(
  brand: string,
  excludeId: string,
  limit = 6
): Promise<ProductListItem[]> {
  await new Promise((r) => setTimeout(r, 80));
  return sampleProducts
    .filter((p) => p.brand === brand && p.id !== excludeId)
    .slice(0, limit)
    .map(toListItem);
}

/** Featured/promotional products for ads section */
export async function getFeaturedProducts(limit = 6): Promise<ProductListItem[]> {
  await new Promise((r) => setTimeout(r, 50));
  return sampleProducts.slice(0, limit).map(toListItem);
}

/** Map nav category labels to product categories for filter */
const NAV_CATEGORY_TO_PRODUCT: Record<string, string[]> = {
  Electronics: ["Smartphones", "Laptops", "Audio", "Cameras"],
  Fashion: ["Footwear"],
  "Home & Living": ["Home", "Kitchen"],
  Beauty: [],
  Grocery: [],
  Sports: [],
  Toys: [],
  Books: [],
};

/** Search products by query and optional category (nav label e.g. "Electronics") */
export async function searchProducts(
  query: string,
  category?: string
): Promise<ProductListItem[]> {
  await new Promise((r) => setTimeout(r, 100));
  const q = query.trim().toLowerCase();
  const productCategories =
    category && NAV_CATEGORY_TO_PRODUCT[category]
      ? NAV_CATEGORY_TO_PRODUCT[category]
      : null;

  return sampleProducts
    .filter((p) => {
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q));
      const matchCategory =
        !productCategories ||
        (p.category && productCategories.includes(p.category));
      return matchQuery && matchCategory;
    })
    .map(toListItem);
}

/** Deal of the day: products with discount + originalPrice, stock, sold for UI */
export type DealProduct = ProductListItem & {
  originalPrice: number;
  stock: number;
  sold: number;
};

export async function getDealOfTheDayProducts(
  limit = 8
): Promise<DealProduct[]> {
  await new Promise((r) => setTimeout(r, 50));
  return sampleProducts
    .filter((p) => p.discount > 0)
    .slice(0, limit)
    .map((p) => {
      const list = toListItem(p);
      const stock = p.stock ?? 100;
      const idNum = p.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      const sold = Math.min(
        stock - 1,
        Math.floor(stock * (0.55 + (idNum % 5) * 0.08))
      );
      return {
        ...list,
        originalPrice: p.originalPrice ?? Math.round(p.price / (1 - p.discount / 100)),
        stock,
        sold,
      };
    });
}
