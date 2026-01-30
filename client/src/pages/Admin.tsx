import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard, Building2, FileText, Users, Settings, BookOpen,
  Search, Filter, MoreHorizontal, CheckCircle, XCircle, Plus,
  Eye, Edit, Trash2, ChevronLeft, ChevronRight, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/30 p-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">需要登录</h1>
          <p className="text-muted-foreground mb-8">
            请登录管理员账号以访问后台管理系统
          </p>
          <Button size="lg" onClick={() => window.location.href = getLoginUrl()}>
            立即登录
          </Button>
        </div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">无权访问</h1>
          <p className="text-muted-foreground mb-8">
            您没有管理员权限，无法访问后台管理系统
          </p>
          <Button onClick={() => setLocation("/")}>
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              返回前台
            </Button>
            <h1 className="text-xl font-bold">7BrandHub 管理后台</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>管理员: {user?.name || user?.email}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              仪表盘
            </TabsTrigger>
            <TabsTrigger value="providers" className="gap-2">
              <Building2 className="w-4 h-4" />
              服务商管理
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <FileText className="w-4 h-4" />
              入驻申请
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="gap-2">
              <Users className="w-4 h-4" />
              咨询记录
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <BookOpen className="w-4 h-4" />
              文章管理
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="providers">
            <ProvidersManagement />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsManagement />
          </TabsContent>

          <TabsContent value="inquiries">
            <InquiriesManagement />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Dashboard Stats Component
function DashboardStats() {
  const { data: stats, isLoading } = trpc.admin.stats.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsCards = [
    { title: '总服务商数', value: stats?.totalProviders || 0, icon: Building2, color: 'text-blue-500' },
    { title: '已上线服务商', value: stats?.approvedProviders || 0, icon: CheckCircle, color: 'text-green-500' },
    { title: '待审核服务商', value: stats?.pendingProviders || 0, icon: Clock, color: 'text-yellow-500' },
    { title: '总咨询数', value: stats?.totalInquiries || 0, icon: Users, color: 'text-purple-500' },
    { title: '入驻申请数', value: stats?.totalApplications || 0, icon: FileText, color: 'text-orange-500' },
    { title: '待审核申请', value: stats?.pendingApplications || 0, icon: Clock, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, i) => (
          <Card key={i} className="border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline">
            <Building2 className="w-4 h-4 mr-2" />
            添加服务商
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            处理申请
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            查看咨询
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Providers Management Component
function ProvidersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<any>(null);
  const [deletingProvider, setDeletingProvider] = useState<any>(null);
  const utils = trpc.useUtils();

  const { data: providersData, isLoading } = trpc.admin.providers.useQuery({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    search: searchQuery || undefined,
    categoryId: selectedCategoryId ? Number(selectedCategoryId) : undefined,
  });

  const { data: categories } = trpc.categories.list.useQuery();
  const { data: cities } = trpc.cities.list.useQuery();

  const updateProvider = trpc.admin.updateProvider.useMutation({
    onSuccess: () => {
      utils.admin.providers.invalidate();
      utils.admin.stats.invalidate();
      toast.success("更新成功");
      setEditingProvider(null);
    },
    onError: () => {
      toast.error("更新失败");
    },
  });

  const createProvider = trpc.admin.createProvider.useMutation({
    onSuccess: () => {
      utils.admin.providers.invalidate();
      utils.admin.stats.invalidate();
      toast.success("创建成功");
      setIsCreateOpen(false);
    },
    onError: (err) => {
      toast.error("创建失败: " + err.message);
    },
  });

  const deleteProvider = trpc.admin.deleteProvider.useMutation({
    onSuccess: () => {
      utils.admin.providers.invalidate();
      utils.admin.stats.invalidate();
      toast.success("删除成功");
      setDeletingProvider(null);
    },
    onError: () => {
      toast.error("删除失败");
    },
  });

  const filteredProviders = providersData?.providers;

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>服务商管理</CardTitle>
              <CardDescription>管理平台上的所有服务商 ({providersData?.total || 0} 个)</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  setPage(1); // Reset to first page on filter change
                }}
                className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">所有分类</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索服务商..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1); // Reset to first page on search
                  }}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Building2 className="w-4 h-4 mr-2" />
                新增服务商
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>服务商</TableHead>
                    <TableHead>城市</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>浏览量</TableHead>
                    <TableHead>权重</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProviders?.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                            {provider.logo ? (
                              <img src={provider.logo} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-sm font-bold text-muted-foreground">
                                {provider.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{provider.name}</p>
                            {provider.shortDescription && (
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{provider.shortDescription}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {cities?.find(c => c.id === provider.cityId)?.name || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {provider.verified && (
                            <Badge variant="default" className="text-xs">认证</Badge>
                          )}
                          {provider.featured && (
                            <Badge variant="secondary" className="text-xs">推荐</Badge>
                          )}
                          <Badge
                            variant={provider.status === 'approved' ? 'outline' : 'destructive'}
                            className="text-xs"
                          >
                            {provider.status === 'approved' ? '已上线' : provider.status === 'pending' ? '待审核' : '已拒绝'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{provider.viewCount || 0}</TableCell>
                      <TableCell>{provider.weight || 0}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingProvider(provider)}>
                              <Edit className="w-4 h-4 mr-2" />
                              编辑
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateProvider.mutate({ id: provider.id, verified: !provider.verified })}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {provider.verified ? '取消认证' : '设为认证'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateProvider.mutate({ id: provider.id, featured: !provider.featured })}>
                              {provider.featured ? '取消推荐' : '设为推荐'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeletingProvider(provider)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  显示 {(page - 1) * pageSize + 1} 到 {Math.min(page * pageSize, providersData?.total || 0)} 条，共 {providersData?.total || 0} 条
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    上一页
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => p + 1)}
                    disabled={page * pageSize >= (providersData?.total || 0)}
                  >
                    下一页
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Create Provider Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新增服务商</DialogTitle>
            <DialogDescription>填写服务商信息</DialogDescription>
          </DialogHeader>
          <ProviderForm
            categories={categories || []}
            cities={cities || []}
            onSubmit={(data) => createProvider.mutate(data)}
            isLoading={createProvider.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Provider Dialog */}
      <Dialog open={!!editingProvider} onOpenChange={() => setEditingProvider(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑服务商</DialogTitle>
            <DialogDescription>修改服务商信息</DialogDescription>
          </DialogHeader>
          {editingProvider && (
            <ProviderForm
              provider={editingProvider}
              categories={categories || []}
              cities={cities || []}
              onSubmit={(data) => updateProvider.mutate({ id: editingProvider.id, ...data })}
              isLoading={updateProvider.isPending}
              isEdit
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingProvider} onOpenChange={() => setDeletingProvider(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除服务商 "{deletingProvider?.name}" 吗？此操作不可恢复。
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setDeletingProvider(null)}>
              取消
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => deleteProvider.mutate({ id: deletingProvider.id })}
              disabled={deleteProvider.isPending}
            >
              {deleteProvider.isPending ? "删除中..." : "确认删除"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Provider Form Component (for Create and Edit)
function ProviderForm({
  provider,
  categories,
  cities,
  onSubmit,
  isLoading,
  isEdit = false
}: {
  provider?: any;
  categories: any[];
  cities: any[];
  onSubmit: (data: any) => void;
  isLoading: boolean;
  isEdit?: boolean;
}) {
  const [formData, setFormData] = useState({
    name: provider?.name || "",
    slug: provider?.slug || "",
    englishName: provider?.englishName || "",
    shortDescription: provider?.shortDescription || "",
    description: provider?.description || "",
    cityId: provider?.cityId || undefined,
    foundedYear: provider?.foundedYear || undefined,
    website: provider?.website || "",
    phone: provider?.phone || "",
    email: provider?.email || "",
    logo: provider?.logo || "",
    verified: provider?.verified || false,
    featured: provider?.featured || false,
    weight: provider?.weight || 0,
    status: provider?.status || "approved",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      cityId: formData.cityId ? Number(formData.cityId) : undefined,
      foundedYear: formData.foundedYear ? Number(formData.foundedYear) : undefined,
      weight: Number(formData.weight),
    });
  };

  const generateSlug = () => {
    const slug = formData.name.toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData(prev => ({ ...prev, slug: slug || `provider-${Date.now()}` }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">公司名称 *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">URL标识 *</Label>
          <div className="flex gap-2">
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              required
              disabled={isEdit}
            />
            {!isEdit && (
              <Button type="button" variant="outline" onClick={generateSlug}>
                生成
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="englishName">英文名称</Label>
          <Input
            id="englishName"
            value={formData.englishName}
            onChange={(e) => setFormData(prev => ({ ...prev, englishName: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cityId">所在城市</Label>
          <select
            id="cityId"
            value={formData.cityId || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, cityId: e.target.value ? Number(e.target.value) : undefined }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">选择城市</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">一句话简介</Label>
        <Input
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
          placeholder="简短描述公司特点"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">详细介绍</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="foundedYear">成立年份</Label>
          <Input
            id="foundedYear"
            type="number"
            value={formData.foundedYear || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: e.target.value ? Number(e.target.value) : undefined }))}
            placeholder="如 2010"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">官网</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            placeholder="https://"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">电话</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            value={formData.logo}
            onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">权重 (排序)</Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">状态</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="approved">已上线</option>
            <option value="pending">待审核</option>
            <option value="rejected">已拒绝</option>
          </select>
        </div>
        <div className="space-y-2 pt-6">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.verified}
                onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
              />
              认证
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              />
              推荐
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "保存中..." : isEdit ? "保存修改" : "创建服务商"}
        </Button>
      </div>
    </form>
  );
}

// Applications Management Component
function ApplicationsManagement() {
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [reviewNote, setReviewNote] = useState("");
  const utils = trpc.useUtils();

  const { data: applications, isLoading } = trpc.applications.list.useQuery({});

  const updateStatus = trpc.applications.updateStatus.useMutation({
    onSuccess: () => {
      utils.applications.list.invalidate();
      setSelectedApp(null);
      setReviewNote("");
      toast.success("审核完成");
    },
    onError: () => {
      toast.error("操作失败");
    },
  });

  const handleApprove = (id: number) => {
    updateStatus.mutate({ id, status: 'approved', reviewNotes: reviewNote });
  };

  const handleReject = (id: number) => {
    updateStatus.mutate({ id, status: 'rejected', reviewNotes: reviewNote });
  };

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>入驻申请</CardTitle>
          <CardDescription>审核服务商入驻申请</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : applications && applications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>公司名称</TableHead>
                  <TableHead>联系人</TableHead>
                  <TableHead>联系方式</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>申请时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app: any) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.companyName}</TableCell>
                    <TableCell>{app.contactName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{app.contactPhone}</p>
                        <p className="text-muted-foreground">{app.contactEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          app.status === 'approved' ? 'default' :
                            app.status === 'rejected' ? 'destructive' :
                              'secondary'
                        }
                      >
                        {app.status === 'approved' ? '已通过' :
                          app.status === 'rejected' ? '已拒绝' : '待审核'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(app.createdAt).toLocaleDateString('zh-CN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedApp(app)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        查看
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              暂无入驻申请
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>申请详情</DialogTitle>
            <DialogDescription>
              审核服务商入驻申请
            </DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">公司名称</Label>
                  <p className="font-medium">{selectedApp.companyName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">联系人</Label>
                  <p className="font-medium">{selectedApp.contactName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">联系电话</Label>
                  <p className="font-medium">{selectedApp.contactPhone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">电子邮箱</Label>
                  <p className="font-medium">{selectedApp.contactEmail}</p>
                </div>
                {selectedApp.website && (
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">官网</Label>
                    <p className="font-medium">{selectedApp.website}</p>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-muted-foreground">主营服务</Label>
                <p className="font-medium">{selectedApp.services}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">公司简介</Label>
                <p className="text-sm whitespace-pre-line">{selectedApp.description}</p>
              </div>

              {selectedApp.status === 'pending' && (
                <>
                  <div>
                    <Label htmlFor="reviewNote">审核备注</Label>
                    <Textarea
                      id="reviewNote"
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      placeholder="可选：填写审核备注..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleReject(selectedApp.id)}
                      disabled={updateStatus.isPending}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      拒绝
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleApprove(selectedApp.id)}
                      disabled={updateStatus.isPending}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      通过
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Inquiries Management Component
function InquiriesManagement() {
  const { data: inquiries, isLoading } = trpc.admin.inquiries.useQuery({});

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>咨询记录</CardTitle>
        <CardDescription>查看用户提交的咨询信息</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : inquiries && inquiries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>咨询人</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>咨询服务商</TableHead>
                <TableHead>咨询内容</TableHead>
                <TableHead>时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry: any) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {inquiry.phone && <p>{inquiry.phone}</p>}
                      {inquiry.email && <p className="text-muted-foreground">{inquiry.email}</p>}
                    </div>
                  </TableCell>
                  <TableCell>{inquiry.provider?.name || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(inquiry.createdAt).toLocaleDateString('zh-CN')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            暂无咨询记录
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BlogManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const { data: posts, isLoading, refetch } = trpc.blog.admin.list.useQuery({});

  const createMutation = trpc.blog.admin.create.useMutation({
    onSuccess: () => {
      refetch();
      setIsCreateOpen(false);
      toast.success("文章创建成功");
    },
  });

  const updateMutation = trpc.blog.admin.update.useMutation({
    onSuccess: () => {
      refetch();
      setEditingPost(null);
      setIsCreateOpen(false);
      toast.success("文章更新成功");
    },
  });

  const deleteMutation = trpc.blog.admin.delete.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("文章删除成功");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      content: formData.get("content") as string,
      excerpt: formData.get("excerpt") as string,
      coverImage: formData.get("coverImage") as string,
      author: formData.get("author") as string,
      tags: formData.get("tags") as string,
      status: formData.get("status") as "draft" | "published",
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("确定要删除这篇文章吗？")) {
      deleteMutation.mutate({ id });
    }
  };

  const openEdit = (post: any) => {
    setEditingPost(post);
    setIsCreateOpen(true);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>文章管理</CardTitle>
          <CardDescription>发布和管理品牌洞察文章</CardDescription>
        </div>
        <Button onClick={() => { setEditingPost(null); setIsCreateOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          发布文章
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>标题</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>浏览量</TableHead>
                <TableHead>发布时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts && posts.length > 0 ? (
                posts.map((post: any) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.slug}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status === 'published' ? '已发布' : '草稿'}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.viewCount}</TableCell>
                    <TableCell>
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("zh-CN") : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    暂无文章
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? '编辑文章' : '发布文章'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">文章标题</Label>
                <Input id="title" name="title" required defaultValue={editingPost?.title} placeholder="输入文章标题" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL链接)</Label>
                <Input id="slug" name="slug" required defaultValue={editingPost?.slug} placeholder="例如: how-to-build-brand" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">文章摘要</Label>
              <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={editingPost?.excerpt} placeholder="简短的摘要描述..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">文章内容 (支持 Markdown)</Label>
              <Textarea
                id="content"
                name="content"
                required
                rows={15}
                className="font-mono text-sm leading-relaxed"
                defaultValue={editingPost?.content}
                placeholder="# 标题&#10;&#10;正文内容..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="coverImage">封面图 URL</Label>
                <Input id="coverImage" name="coverImage" defaultValue={editingPost?.coverImage} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">作者</Label>
                <Input id="author" name="author" defaultValue={editingPost?.author || "Admin"} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tags">标签 (用逗号分隔)</Label>
                <Input id="tags" name="tags" defaultValue={editingPost?.tags} placeholder="品牌, 设计, 营销" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">发布状态</Label>
                <select
                  id="status"
                  name="status"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={editingPost?.status || "draft"}
                >
                  <option value="draft">存为草稿</option>
                  <option value="published">立即发布</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>取消</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? '保存中...' : '保存文章'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
