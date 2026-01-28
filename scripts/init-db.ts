import { createClient } from "@libsql/client";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data.db");
console.log("Creating database at:", dbPath);

const client = createClient({ url: `file:${dbPath}` });

async function initDatabase() {
  // Create tables
  await client.executeMultiple(`
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT,
  name TEXT,
  role TEXT DEFAULT 'user' NOT NULL CHECK(role IN ('user', 'admin', 'provider')),
  createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
  updatedAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
  lastSignedIn INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  description TEXT,
  sortOrder INTEGER DEFAULT 0,
  createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
  updatedAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sortOrder INTEGER DEFAULT 0,
  createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- Providers table
CREATE TABLE IF NOT EXISTS providers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  englishName TEXT,
  logo TEXT,
  description TEXT,
  shortDescription TEXT,
  cityId INTEGER,
  foundedYear INTEGER,
  teamSize TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  verified INTEGER DEFAULT 0,
  featured INTEGER DEFAULT 0,
  weight INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' NOT NULL CHECK(status IN ('pending', 'approved', 'rejected')),
  ownerId INTEGER,
  viewCount INTEGER DEFAULT 0,
  contactCount INTEGER DEFAULT 0,
  createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
  updatedAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- Provider categories junction table
CREATE TABLE IF NOT EXISTS provider_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  providerId INTEGER NOT NULL,
  categoryId INTEGER NOT NULL
);

-- Provider services table
CREATE TABLE IF NOT EXISTS provider_services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  providerId INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT
);

-- Provider cases table
CREATE TABLE IF NOT EXISTS provider_cases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  providerId INTEGER NOT NULL,
  title TEXT NOT NULL,
  clientName TEXT,
  description TEXT,
  imageUrl TEXT,
  sortOrder INTEGER DEFAULT 0,
  createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- Provider clients table
CREATE TABLE IF NOT EXISTS provider_clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  providerId INTEGER NOT NULL,
  name TEXT NOT NULL,
  logo TEXT
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  providerId INTEGER NOT NULL,
  createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- Provider applications table
CREATE TABLE IF NOT EXISTS provider_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  companyName TEXT NOT NULL,
  contactName TEXT NOT NULL,
  contactPhone TEXT NOT NULL,
  contactEmail TEXT,
  cityId INTEGER,
  services TEXT,
  website TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending' NOT NULL CHECK(status IN ('pending', 'approved', 'rejected')),
  reviewNote TEXT,
  reviewedAt INTEGER,
  reviewedBy INTEGER,
  createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
  updatedAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- Contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  providerId INTEGER NOT NULL,
  userId INTEGER,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  message TEXT,
  createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);
  `);

  console.log("Tables created successfully!");

  // Check if categories exist
  const categoriesResult = await client.execute("SELECT COUNT(*) as count FROM categories");
  const categoriesCount = categoriesResult.rows[0].count as number;

  if (categoriesCount === 0) {
    console.log("Inserting categories...");
    await client.executeMultiple(`
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('品牌策略', 'brand-strategy', 'Lightbulb', '品牌定位、品牌战略规划、品牌诊断咨询', 1);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('视觉设计', 'visual-design', 'Palette', '品牌VI设计、Logo设计、视觉识别系统', 2);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('包装设计', 'packaging-design', 'Package', '产品包装设计、礼盒设计、包装结构设计', 3);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('空间设计', 'space-design', 'Building', '店铺设计、展厅设计、办公空间设计', 4);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('品牌营销', 'brand-marketing', 'TrendingUp', '整合营销、品牌推广、营销策略咨询', 5);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('社交媒体', 'social-media', 'Share2', '小红书运营、抖音运营、微信营销', 6);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('内容创作', 'content-creation', 'FileText', '文案策划、短视频制作、品牌故事', 7);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('数字营销', 'digital-marketing', 'Globe', '网站建设、SEO优化、数字广告投放', 8);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('电商运营', 'ecommerce', 'ShoppingCart', '天猫运营、京东运营、电商视觉设计', 9);
      INSERT INTO categories (name, slug, icon, description, sortOrder) VALUES
      ('公关传播', 'public-relations', 'MessageSquare', '媒体公关、危机公关、品牌传播', 10);
    `);
  }

  // Check if cities exist
  const citiesResult = await client.execute("SELECT COUNT(*) as count FROM cities");
  const citiesCount = citiesResult.rows[0].count as number;

  if (citiesCount === 0) {
    console.log("Inserting cities...");
    await client.executeMultiple(`
      INSERT INTO cities (name, slug, sortOrder) VALUES ('上海', 'shanghai', 1);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('北京', 'beijing', 2);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('深圳', 'shenzhen', 3);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('广州', 'guangzhou', 4);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('杭州', 'hangzhou', 5);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('成都', 'chengdu', 6);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('南京', 'nanjing', 7);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('武汉', 'wuhan', 8);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('苏州', 'suzhou', 9);
      INSERT INTO cities (name, slug, sortOrder) VALUES ('厦门', 'xiamen', 10);
    `);
  }

  // Check if providers exist
  const providersResult = await client.execute("SELECT COUNT(*) as count FROM providers");
  const providersCount = providersResult.rows[0].count as number;

  if (providersCount === 0) {
    console.log("Inserting providers...");

    const now = Date.now();

    // 插入真实品牌服务商数据
    const providerData = [
      { name: '正邦品牌', slug: 'zhengbang', englishName: 'Zhengbang Brand', shortDescription: '中国领先的品牌咨询与设计公司', description: '正邦品牌成立于1999年，是中国最大的品牌咨询与设计公司之一。为众多世界500强和中国500强企业提供品牌战略、品牌设计、品牌管理等全方位服务。服务过中国银联、中国移动、海尔、联想等知名企业。', cityId: 2, foundedYear: 1999, teamSize: '500+', website: 'https://www.zhengbang.com.cn', verified: 1, featured: 1, weight: 100 },
      { name: '东道设计', slug: 'dongdao', englishName: 'Dongdao Design', shortDescription: '国际化的品牌设计与咨询机构', description: '东道设计创立于1997年，是中国最具影响力的品牌设计与咨询机构之一。服务过北京奥运会、上海世博会、G20杭州峰会等重大项目，客户涵盖政府机构及众多知名企业。', cityId: 2, foundedYear: 1997, teamSize: '300+', website: 'https://www.dongdao.net', verified: 1, featured: 1, weight: 95 },
      { name: '华与华', slug: 'huayuhua', englishName: 'Hua & Hua', shortDescription: '中国本土头部营销咨询公司', description: '华与华是中国本土最著名的营销咨询公司之一，以"超级符号"理论闻名业界。服务过蜜雪冰城、西贝莜面村、老乡鸡、汉庭酒店等众多知名品牌，擅长品牌战略和创意设计。', cityId: 1, foundedYear: 2002, teamSize: '200+', website: 'https://www.huayuhua.com', verified: 1, featured: 1, weight: 98 },
      { name: '朗涛设计', slug: 'landor', englishName: 'Landor', shortDescription: '全球知名品牌咨询和设计公司', description: 'Landor是全球领先的品牌咨询和设计公司，1941年成立于旧金山，现为WPP集团旗下公司。在中国设有上海办公室，为众多国际和本土品牌提供品牌战略、设计和体验服务。', cityId: 1, foundedYear: 1941, teamSize: '1000+', website: 'https://landor.com', verified: 1, featured: 1, weight: 92 },
      { name: '标志共和', slug: 'logorepublic', englishName: 'Logo Republic', shortDescription: '专注于品牌标志与VI设计', description: '标志共和是一家专注于品牌标志设计的专业机构，擅长为企业打造独特的视觉识别系统。团队由资深设计师组成，服务过数百家企业客户，在Logo设计领域享有盛誉。', cityId: 1, foundedYear: 2010, teamSize: '30+', website: 'https://www.logorepublic.cn', verified: 1, featured: 0, weight: 70 },
      { name: '锐驰品牌', slug: 'raichi', englishName: 'Raichi Brand', shortDescription: '新锐品牌策略设计机构', description: '锐驰品牌是一家年轻有活力的品牌设计机构，专注于为新消费品牌提供品牌策略和设计服务。擅长食品饮料、美妆护肤、生活方式等领域的品牌塑造，服务过多个网红新消费品牌。', cityId: 1, foundedYear: 2015, teamSize: '50+', website: 'https://www.raichi.cn', verified: 1, featured: 1, weight: 80 },
      { name: '靳刘高设计', slug: 'kanlkg', englishName: 'Kan Tai-keung Design', shortDescription: '华人设计界的标志性机构', description: '靳刘高设计创办于1976年香港，是华人设计界最具影响力的设计机构之一。创始人靳埭强是国际著名设计大师，作品多次获得国际设计大奖。服务过众多知名品牌和文化项目。', cityId: 3, foundedYear: 1976, teamSize: '100+', website: 'https://www.kanlkg.com', verified: 1, featured: 1, weight: 88 },
      { name: '凯纳营销', slug: 'kaina', englishName: 'Kaina Marketing', shortDescription: '深耕快消品行业的营销策划公司', description: '凯纳营销策划成立于2003年，专注于快消品行业的营销策划和品牌咨询服务。团队拥有丰富的行业经验，服务过众多知名快消品牌，擅长市场调研、品牌定位和营销策略制定。', cityId: 1, foundedYear: 2003, teamSize: '80+', website: 'https://www.kaina.com.cn', verified: 1, featured: 0, weight: 75 },
      { name: '青柚设计', slug: 'qingyou', englishName: 'Qingyou Design', shortDescription: '年轻化品牌视觉设计机构', description: '青柚设计专注于为年轻化品牌提供视觉设计服务，擅长包装设计、电商视觉和社交媒体内容创作。以新颖的设计理念和高品质的执行力著称，服务过众多新锐消费品牌。', cityId: 5, foundedYear: 2018, teamSize: '25+', website: 'https://www.qingyoudesign.com', verified: 0, featured: 0, weight: 60 },
      { name: '小马宋策划', slug: 'xiaomasu', englishName: 'Xiaomasu Strategy', shortDescription: '知名营销策划与咨询机构', description: '小马宋是知名营销策划人，创办的咨询机构专注于品牌定位、营销策略和创意策划。以独特的营销思维和实战经验，帮助众多品牌实现快速增长，著有多本畅销营销书籍。', cityId: 2, foundedYear: 2016, teamSize: '40+', website: 'https://www.xiaomasu.com', verified: 1, featured: 1, weight: 85 },
      { name: '韩后品牌设计', slug: 'hanhou', englishName: 'Hanhou Brand Design', shortDescription: '专业美妆品牌设计服务商', description: '韩后品牌设计专注于美妆护肤行业的品牌设计服务，提供品牌策略、包装设计、电商视觉等一站式服务。拥有丰富的美妆行业经验，服务过多个知名美妆品牌。', cityId: 4, foundedYear: 2012, teamSize: '35+', website: 'https://www.hanhou.cn', verified: 0, featured: 0, weight: 55 },
      { name: '有门互动', slug: 'youmen', englishName: 'Youmen Interactive', shortDescription: '创意数字营销公司', description: '有门互动是一家创意驱动的数字营销公司，擅长社会化媒体营销、短视频内容创作和互动创意。曾获多项行业大奖，服务过众多知名品牌，在数字营销领域深耕多年。', cityId: 1, foundedYear: 2013, teamSize: '100+', website: 'https://www.youmenhu.com', verified: 1, featured: 0, weight: 78 },
    ];

    for (const p of providerData) {
      await client.execute({
        sql: `INSERT INTO providers (name, slug, englishName, shortDescription, description, cityId, foundedYear, teamSize, website, verified, featured, weight, status, createdAt, updatedAt) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved', ?, ?)`,
        args: [p.name, p.slug, p.englishName, p.shortDescription, p.description, p.cityId, p.foundedYear, p.teamSize, p.website, p.verified, p.featured, p.weight, now, now]
      });
    }

    console.log("Setting provider categories...");
    const categoryLinks = [
      [1, 1], [1, 2], [1, 3],  // 正邦 -> 品牌策略, 视觉设计, 包装设计
      [2, 1], [2, 2], [2, 4],  // 东道 -> 品牌策略, 视觉设计, 空间设计
      [3, 1], [3, 5], [3, 7],  // 华与华 -> 品牌策略, 品牌营销, 内容创作
      [4, 1], [4, 2], [4, 4],  // 朗涛 -> 品牌策略, 视觉设计, 空间设计
      [5, 2],                   // 标志共和 -> 视觉设计
      [6, 1], [6, 2], [6, 3],  // 锐驰 -> 品牌策略, 视觉设计, 包装设计
      [7, 2], [7, 3],           // 靳刘高 -> 视觉设计, 包装设计
      [8, 1], [8, 5],           // 凯纳 -> 品牌策略, 品牌营销
      [9, 2], [9, 3], [9, 9],  // 青柚 -> 视觉设计, 包装设计, 电商运营
      [10, 1], [10, 5], [10, 7], // 小马宋 -> 品牌策略, 品牌营销, 内容创作
      [11, 2], [11, 3], [11, 9], // 韩后 -> 视觉设计, 包装设计, 电商运营
      [12, 6], [12, 7], [12, 8], // 有门 -> 社交媒体, 内容创作, 数字营销
    ];

    for (const [providerId, categoryId] of categoryLinks) {
      await client.execute({
        sql: "INSERT INTO provider_categories (providerId, categoryId) VALUES (?, ?)",
        args: [providerId, categoryId]
      });
    }

    console.log("Adding provider services...");
    const serviceData = [
      [1, '品牌战略咨询', '帮助企业制定清晰的品牌战略和发展规划'],
      [1, '品牌视觉设计', '包括Logo、VI系统、品牌视觉规范等'],
      [1, '品牌管理服务', '品牌资产管理、品牌监测与维护'],
      [2, '品牌策略规划', '品牌定位、品牌架构、品牌路线图'],
      [2, '视觉识别设计', '企业VI系统、品牌视觉应用'],
      [3, '超级符号创意', '华与华独特的超级符号方法论'],
      [3, '品牌谚语策划', '品牌口号、广告语创作'],
      [4, '品牌战略咨询', '全球视角的品牌战略规划'],
      [4, '品牌体验设计', '线上线下品牌触点体验设计'],
      [5, 'Logo设计', '企业标志、品牌图形设计'],
      [5, 'VI系统设计', '完整的视觉识别系统设计'],
      [6, '新消费品牌策略', '针对新消费品牌的策略服务'],
      [6, '包装设计', '产品包装创意设计'],
      [7, '品牌形象设计', '高端品牌视觉形象塑造'],
      [7, '文化创意设计', '文化IP和创意产品设计'],
      [10, '品牌定位策划', '帮助品牌找到独特定位'],
      [10, '营销策略咨询', '实战导向的营销策略服务'],
      [12, '社媒运营', '微博、微信、小红书等平台运营'],
      [12, '短视频创作', '抖音、快手等短视频内容创作'],
    ];

    for (const [providerId, name, description] of serviceData) {
      await client.execute({
        sql: "INSERT INTO provider_services (providerId, name, description) VALUES (?, ?, ?)",
        args: [providerId, name, description]
      });
    }
  }

  console.log("Database initialized successfully!");
}

initDatabase().catch(console.error);
