import { Link, useLocation } from "wouter";
import {
  Lightbulb, Palette, Megaphone, Package, Sparkles,
  ArrowRight, Building2, ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";

// Category icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'strategy': <Lightbulb className="w-8 h-8" />,
  'brand-strategy': <Lightbulb className="w-8 h-8" />,
  'design': <Palette className="w-8 h-8" />,
  'brand-design': <Palette className="w-8 h-8" />,
  'marketing': <Megaphone className="w-8 h-8" />,
  'social-media': <Megaphone className="w-8 h-8" />,
  'packaging': <Package className="w-8 h-8" />,
  'package-design': <Package className="w-8 h-8" />,
  'experience': <Sparkles className="w-8 h-8" />,
  'brand-experience': <Sparkles className="w-8 h-8" />,
};

const getCategoryIcon = (slug: string) => {
  return categoryIcons[slug] || <Building2 className="w-8 h-8" />;
};

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  'strategy': '品牌定位、市场调研、竞品分析、品牌架构',
  'brand-strategy': '品牌定位、市场调研、竞品分析、品牌架构',
  'design': '视觉识别、品牌VI、Logo设计、品牌手册',
  'brand-design': '视觉识别、品牌VI、Logo设计、品牌手册',
  'marketing': '社交媒体运营、内容营销、KOL合作、广告投放',
  'social-media': '社交媒体运营、内容营销、KOL合作、广告投放',
  'packaging': '产品包装、礼盒设计、结构设计、材质选型',
  'package-design': '产品包装、礼盒设计、结构设计、材质选型',
  'experience': '空间设计、活动策划、快闪店、品牌展览',
  'brand-experience': '空间设计、活动策划、快闪店、品牌展览',
};

export default function Categories() {
  const [, setLocation] = useLocation();

  const { data: categories, isLoading } = trpc.categories.list.useQuery();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-secondary/30 py-16 md:py-24">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              服务分类
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              按服务类型浏览，快速找到您需要的品牌服务商
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      </div>

      <div className="container py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category) => (
              <Card
                key={category.id}
                className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden"
                onClick={() => setLocation(`/providers?categoryId=${category.id}`)}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getCategoryIcon(category.slug)}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.description || categoryDescriptions[category.slug] || '专业品牌服务'}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <span>查看服务商</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">找不到合适的分类？</h2>
          <p className="text-muted-foreground mb-6">
            使用搜索功能，输入关键词快速找到您需要的服务商
          </p>
          <Link href="/providers">
            <span className="inline-flex items-center text-primary font-medium hover:underline cursor-pointer">
              浏览全部服务商 <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
