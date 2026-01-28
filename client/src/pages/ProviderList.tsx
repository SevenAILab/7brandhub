import { useState, useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import {
  Search, MapPin, Star, X, SlidersHorizontal,
  Grid3X3, List, ChevronDown, Heart, Filter, ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ProviderList() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);

  const { isAuthenticated } = useAuth();

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(
    searchParams.get("categoryId") ? Number(searchParams.get("categoryId")) : undefined
  );
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(
    searchParams.get("cityId") ? Number(searchParams.get("cityId")) : undefined
  );
  const [orderBy, setOrderBy] = useState<"weight" | "createdAt" | "viewCount">("weight");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch data
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: cities } = trpc.cities.list.useQuery();
  const { data: providersData, isLoading } = trpc.providers.list.useQuery({
    categoryId: selectedCategoryId,
    cityId: selectedCityId,
    search: searchQuery || undefined,
    orderBy,
    limit: 50,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategoryId) params.set("categoryId", String(selectedCategoryId));
    if (selectedCityId) params.set("cityId", String(selectedCityId));

    const newUrl = params.toString() ? `/providers?${params.toString()}` : "/providers";
    window.history.replaceState({}, "", newUrl);
  }, [searchQuery, selectedCategoryId, selectedCityId]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId(undefined);
    setSelectedCityId(undefined);
    setLocation("/providers");
  };

  const hasFilters = searchQuery || selectedCategoryId || selectedCityId;

  const selectedCategory = categories?.find(c => c.id === selectedCategoryId);
  const selectedCity = cities?.find(c => c.id === selectedCityId);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCategoryChange = (id: number | undefined) => {
    setSelectedCategoryId(id);
  };

  const handleCityChange = (id: number | undefined) => {
    setSelectedCityId(id);
  };

  const activeFiltersCount = (selectedCategoryId ? 1 : 0) + (selectedCityId ? 1 : 0);

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      {/* Sticky Filter Header */}
      <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-300">
        <div className="container py-4">
          <div className="flex flex-col gap-4">
            {/* Search and Mobile Filter Toggle */}
            <div className="flex gap-3">
              <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索服务商、服务类型..."
                  className="pl-10 bg-secondary/50 border-transparent focus:bg-background transition-colors rounded-xl"
                />
              </form>
              <Button
                variant="outline"
                className="md:hidden rounded-xl border-border/50"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="w-4 h-4 mr-2" />
                筛选 {activeFiltersCount > 0 && <Badge variant="secondary" className="ml-1 h-5 px-1.5">{activeFiltersCount}</Badge>}
              </Button>
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={cn("rounded-full border-border/50", selectedCategoryId && "bg-primary/10 text-primary border-primary/20")}>
                      服务类别: {selectedCategory?.name || "全部"}
                      <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 max-h-[300px] overflow-y-auto">
                    <DropdownMenuItem onClick={() => handleCategoryChange(undefined)}>
                      全部类别
                    </DropdownMenuItem>
                    {categories?.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category.id}
                        checked={selectedCategoryId === category.id}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={cn("rounded-full border-border/50", selectedCityId && "bg-primary/10 text-primary border-primary/20")}>
                      城市地域: {selectedCity?.name || "全部"}
                      <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    <DropdownMenuItem onClick={() => handleCityChange(undefined)}>
                      全部城市
                    </DropdownMenuItem>
                    {cities?.map((city) => (
                      <DropdownMenuCheckboxItem
                        key={city.id}
                        checked={selectedCityId === city.id}
                        onCheckedChange={() => handleCityChange(city.id)}
                      >
                        {city.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-destructive">
                    <X className="w-4 h-4 mr-1" /> 清空筛选
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">共找到 {providersData?.total || 0} 家服务商</span>
                <div className="h-4 w-px bg-border mx-2"></div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ArrowUpDown className="w-3 h-3 mr-2" />
                      {orderBy === "weight" ? "综合评分" : orderBy === "createdAt" ? "最新收录" : "最多浏览"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setOrderBy("weight")}>
                      综合评分 (默认)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOrderBy("createdAt")}>
                      最新收录
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOrderBy("viewCount")}>
                      最多浏览
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Mobile Filters Expanded */}
            {isFilterOpen && (
              <div className="md:hidden flex flex-col gap-4 pt-2 pb-4 border-t border-border/50 animate-in slide-in-from-top-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">服务类别</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={!selectedCategoryId ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1.5"
                      onClick={() => handleCategoryChange(undefined)}
                    >
                      全部
                    </Badge>
                    {categories?.map((category) => (
                      <Badge
                        key={category.id}
                        variant={selectedCategoryId === category.id ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1.5"
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">城市</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={!selectedCityId ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1.5"
                      onClick={() => handleCityChange(undefined)}
                    >
                      全部
                    </Badge>
                    {cities?.map((city) => (
                      <Badge
                        key={city.id}
                        variant={selectedCityId === city.id ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1.5"
                        onClick={() => handleCityChange(city.id)}
                      >
                        {city.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={() => setIsFilterOpen(false)} className="w-full mt-2">
                  确认筛选
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="container py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : providersData && providersData.providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providersData.providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">未找到相关服务商</h3>
            <p className="text-muted-foreground mb-6">请尝试调整筛选条件或使用其他关键词搜索</p>
            <Button onClick={clearFilters}>清空筛选条件</Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Provider Card Component
function ProviderCard({ provider }: { provider: any }) {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  const { data: isFavorite } = trpc.favorites.check.useQuery(
    { providerId: provider.id },
    { enabled: isAuthenticated }
  );

  const toggleFavorite = trpc.favorites.toggle.useMutation({
    onSuccess: (data) => {
      utils.favorites.check.invalidate({ providerId: provider.id });
      toast.success(data.isFavorite ? "已添加到收藏" : "已取消收藏");
    },
    onError: () => {
      toast.error("操作失败，请稍后重试");
    },
  });

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("请先登录后再收藏");
      return;
    }
    toggleFavorite.mutate({ providerId: provider.id });
  };

  return (
    <Card
      className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 bg-card overflow-hidden group cursor-pointer"
      onClick={() => setLocation(`/providers/${provider.slug}`)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold text-muted-foreground/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors overflow-hidden">
              {provider.logo && provider.logo !== '/images/providers/placeholder.svg' ? (
                <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain p-1 bg-white" />
              ) : (
                provider.name.charAt(0)
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                {provider.name}
                {provider.verified && <Star className="w-3 h-3 fill-primary text-primary" />}
              </h3>
              {provider.englishName && (
                <p className="text-xs text-muted-foreground">{provider.englishName}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleFavorite}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
          {provider.shortDescription || provider.description?.slice(0, 100)}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          {provider.foundedYear && `${provider.foundedYear}年成立`}
          {provider.teamSize && ` · ${provider.teamSize}`}
        </div>

        {/* Category tags */}
        {provider.categories && provider.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {provider.categories.slice(0, 3).map((cat: any) => (
              <Badge key={cat.id} variant="secondary" className="text-xs px-2 py-0.5">
                {cat.name}
              </Badge>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-border/50 flex items-center justify-end">
          <Button size="sm" className="rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-none opacity-0 group-hover:opacity-100 transition-opacity">
            查看详情
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
