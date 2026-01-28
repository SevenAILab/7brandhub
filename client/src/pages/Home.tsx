import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Search, ArrowRight, MapPin, Star, ChevronRight,
  Lightbulb, Palette, Package, Building, TrendingUp,
  Share2, FileText, Globe, ShoppingCart, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";

// Icon mapping for categories
const iconMap: Record<string, React.ReactNode> = {
  'Lightbulb': <Lightbulb className="w-6 h-6" />,
  'Palette': <Palette className="w-6 h-6" />,
  'Package': <Package className="w-6 h-6" />,
  'Building': <Building className="w-6 h-6" />,
  'TrendingUp': <TrendingUp className="w-6 h-6" />,
  'Share2': <Share2 className="w-6 h-6" />,
  'FileText': <FileText className="w-6 h-6" />,
  'Globe': <Globe className="w-6 h-6" />,
  'ShoppingCart': <ShoppingCart className="w-6 h-6" />,
  'MessageSquare': <MessageSquare className="w-6 h-6" />,
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from API
  const { data: categories, isLoading: categoriesLoading } = trpc.categories.list.useQuery();
  const { data: cities, isLoading: citiesLoading } = trpc.cities.list.useQuery();
  const { data: featuredProviders, isLoading: providersLoading } = trpc.providers.featured.useQuery({ limit: 8 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/providers?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      <SEO
        title="首页"
        description="7BrandHub - 连接品牌与优质服务商，致力于帮助品牌方快速找到靠谱的本地服务商。"
        keywords="品牌服务, 营销策划, 包装设计, 小红书营销, 上海服务商"
      />
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Find the best, <br />
              <span className="text-primary">instantly.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              好服务，一搜即得。7BrandHub 汇集全国优质品牌服务商，助您快速找到靠谱合作伙伴。
            </p>

            {/* Search Box */}
            <div className="w-full max-w-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <form onSubmit={handleSearch} className="relative flex items-center bg-white dark:bg-card shadow-xl shadow-primary/5 rounded-2xl p-2 border border-border/50">
                <Search className="w-5 h-5 text-muted-foreground ml-4 mr-2" />
                <Input
                  type="text"
                  placeholder="搜索服务商、服务类型或关键词..."
                  className="border-0 shadow-none focus-visible:ring-0 text-base h-12 bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="lg" className="rounded-xl px-8 h-12 text-base font-medium shadow-lg shadow-primary/20">
                  开始筛选
                </Button>
              </form>
            </div>

            {/* Quick Tags */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span>热门搜索:</span>
              {["品牌策略", "视觉设计", "上海"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setLocation(`/providers?search=${encodeURIComponent(tag)}`)}
                  className="px-3 py-1 bg-secondary/50 hover:bg-secondary rounded-full transition-colors text-foreground/80"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">热门分类</h2>
          <Link href="/categories">
            <span className="text-primary font-medium flex items-center hover:underline cursor-pointer">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoriesLoading ? (
            Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))
          ) : (
            categories?.slice(0, 5).map((category) => (
              <Link key={category.id} href={`/providers?categoryId=${category.id}`}>
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-sm cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {category.icon && iconMap[category.icon] ? iconMap[category.icon] : <Lightbulb className="w-6 h-6" />}
                    </div>
                    <span className="font-medium text-foreground/90">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Cities Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">热门城市</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {citiesLoading ? (
            Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-12 w-24 rounded-xl" />
            ))
          ) : (
            cities?.slice(0, 10).map((city) => (
              <Link key={city.id} href={`/providers?cityId=${city.id}`}>
                <span className="px-6 py-3 rounded-xl bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium border border-transparent hover:shadow-lg hover:shadow-primary/20 cursor-pointer inline-block">
                  {city.name}
                </span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">精选服务商</h2>
          <Link href="/providers">
            <span className="text-primary font-medium flex items-center hover:underline cursor-pointer">
              查看更多 <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providersLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))
          ) : (
            featuredProviders?.map((provider) => (
              <Link key={provider.id} href={`/providers/${provider.slug}`}>
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden flex flex-col cursor-pointer">
                  <div className="aspect-[4/3] bg-secondary/30 relative overflow-hidden">
                    {provider.logo && provider.logo !== '/images/providers/placeholder.svg' ? (
                      <img
                        src={provider.logo}
                        alt={provider.name}
                        className="w-full h-full object-contain p-4 bg-white"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/20 bg-gradient-to-br from-secondary/50 to-secondary">
                        {provider.name.charAt(0)}
                      </div>
                    )}
                    {provider.verified && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-primary" /> 认证
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{provider.name}</h3>
                    </div>

                    {provider.shortDescription && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {provider.shortDescription}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {provider.foundedYear && `${provider.foundedYear}年成立`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mt-10">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好寻找您的合作伙伴了吗？</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              加入 7BrandHub，连接数千家优质品牌服务商，开启您的品牌增长之旅。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/providers">
                <Button size="lg" variant="secondary" className="h-12 px-8 rounded-xl font-bold">
                  立即开始筛选
                </Button>
              </Link>
              <Link href="/join">
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl font-bold bg-transparent border-white/20 text-white hover:bg-white/10">
                  服务商入驻
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
