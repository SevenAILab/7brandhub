import { Link, useLocation } from "wouter";
import { Heart, MapPin, Star, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function Favorites() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();

  const { data: favorites, isLoading } = trpc.favorites.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const removeFavorite = trpc.favorites.remove.useMutation({
    onSuccess: () => {
      utils.favorites.list.invalidate();
      toast.success("已取消收藏");
    },
    onError: () => {
      toast.error("操作失败，请稍后重试");
    },
  });

  const handleRemove = (providerId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite.mutate({ providerId });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">登录后查看收藏</h1>
          <p className="text-muted-foreground mb-8">
            登录您的账号，即可查看和管理收藏的服务商
          </p>
          <Button size="lg" onClick={() => window.location.href = getLoginUrl()}>
            立即登录
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-secondary/30 border-b border-border/50">
        <div className="container py-8">
          <Button variant="ghost" size="sm" className="mb-4" onClick={() => setLocation("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">我的收藏</h1>
          <p className="text-muted-foreground mt-2">
            {favorites?.length || 0} 家收藏的服务商
          </p>
        </div>
      </div>

      <div className="container py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item: any) => (
              <Card 
                key={item.id}
                className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden group cursor-pointer"
                onClick={() => setLocation(`/providers/${item.provider.slug}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold text-muted-foreground/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors overflow-hidden">
                        {item.provider.logo && item.provider.logo !== '/images/providers/placeholder.svg' ? (
                          <img src={item.provider.logo} alt={item.provider.name} className="w-full h-full object-contain p-1 bg-white" />
                        ) : (
                          item.provider.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                          {item.provider.name}
                          {item.provider.verified && <Star className="w-3 h-3 fill-primary text-primary" />}
                        </h3>
                        {item.provider.englishName && (
                          <p className="text-xs text-muted-foreground">{item.provider.englishName}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemove(item.provider.id, e)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 text-red-500 transition-colors"
                      title="取消收藏"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
                    {item.provider.shortDescription || item.provider.description?.slice(0, 100)}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {item.provider.foundedYear && `${item.provider.foundedYear}年成立`}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      收藏于 {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                    <Button size="sm" className="rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-none opacity-0 group-hover:opacity-100 transition-opacity">
                      查看详情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">暂无收藏</h3>
            <p className="text-muted-foreground mb-6">浏览服务商列表，收藏感兴趣的服务商</p>
            <Button onClick={() => setLocation("/providers")}>
              浏览服务商
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
