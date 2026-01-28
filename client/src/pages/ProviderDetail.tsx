import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import {
  ArrowLeft, MapPin, Calendar, Users, Globe, Phone, Mail,
  Star, Heart, Share2, ChevronRight, ExternalLink, Building2,
  CheckCircle2, Clock, Eye, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import NotFound from "./NotFound";

export default function ProviderDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  const [isContactVisible, setIsContactVisible] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Fetch provider data
  const { data: provider, isLoading, error } = trpc.providers.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  // Fetch favorite status
  const { data: isFavorite } = trpc.favorites.check.useQuery(
    { providerId: provider?.id || 0 },
    { enabled: isAuthenticated && !!provider?.id }
  );

  // Mutations
  const toggleFavorite = trpc.favorites.toggle.useMutation({
    onSuccess: (data) => {
      utils.favorites.check.invalidate({ providerId: provider?.id });
      toast.success(data.isFavorite ? "已添加到收藏" : "已取消收藏");
    },
    onError: () => {
      toast.error("操作失败，请稍后重试");
    },
  });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("咨询已提交，服务商将尽快与您联系");
      setContactDialogOpen(false);
      setContactForm({ name: "", phone: "", email: "", message: "" });
    },
    onError: () => {
      toast.error("提交失败，请稍后重试");
    },
  });

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast.error("请先登录后再收藏");
      return;
    }
    if (provider?.id) {
      toggleFavorite.mutate({ providerId: provider.id });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider?.id) return;

    submitContact.mutate({
      providerId: provider.id,
      name: contactForm.name,
      phone: contactForm.phone || undefined,
      email: contactForm.email || undefined,
      message: contactForm.message,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: provider?.name,
        text: provider?.shortDescription || provider?.description?.slice(0, 100),
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("链接已复制到剪贴板");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-secondary/30 border-b border-border/50">
          <div className="container py-4">
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header / Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border/50">
        <div className="container py-4">
          <Link href="/providers">
            <span className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4 mr-1" />
              返回列表
            </span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-secondary/30 pb-12 pt-8">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-primary shrink-0 overflow-hidden">
              {provider.logo && provider.logo !== '/images/providers/placeholder.svg' ? (
                <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain p-2" />
              ) : (
                provider.name.charAt(0)
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{provider.name}</h1>
                {provider.verified && (
                  <Badge variant="default" className="bg-primary text-white hover:bg-primary/90 gap-1 px-2 py-1">
                    <CheckCircle2 className="w-3 h-3" /> 官方认证
                  </Badge>
                )}
              </div>

              {provider.englishName && (
                <p className="text-muted-foreground mb-2">{provider.englishName}</p>
              )}

              <p className="text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                {provider.shortDescription || provider.description?.slice(0, 150)}
              </p>

              <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-muted-foreground">
                {provider.foundedYear && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>成立 {new Date().getFullYear() - provider.foundedYear} 年 ({provider.foundedYear})</span>
                  </div>
                )}
                {provider.teamSize && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{provider.teamSize}</span>
                  </div>
                )}
              </div>

              {/* Categories */}
              {provider.categories && provider.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {provider.categories.map((cat: any) => (
                    <Badge key={cat.id} variant="secondary">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none rounded-xl border-border/50 bg-background/50 backdrop-blur-sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" /> 分享
              </Button>
              <Button
                className={`flex-1 md:flex-none rounded-xl shadow-lg shadow-primary/20 ${isFavorite ? "bg-red-500 hover:bg-red-600" : ""}`}
                onClick={handleFavorite}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-white" : ""}`} />
                {isFavorite ? "已收藏" : "收藏"}
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      </div>

      <div className="container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                公司简介
              </h2>
              <div className="prose prose-gray max-w-none text-muted-foreground leading-relaxed">
                <p className="whitespace-pre-line">{provider.description || "暂无简介"}</p>
              </div>
            </section>

            {/* Services */}
            {provider.services && provider.services.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  服务能力
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.services.map((service: any) => (
                    <div key={service.id} className="px-4 py-3 bg-secondary/50 rounded-xl border border-border/50 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">{service.name}</span>
                        {service.description && (
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Cases */}
            {provider.cases && provider.cases.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  代表案例
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.cases.map((caseItem: any) => (
                    <Card key={caseItem.id} className="border-border/50 overflow-hidden">
                      {caseItem.imageUrl ? (
                        <div className="aspect-video bg-secondary">
                          <img
                            src={caseItem.imageUrl}
                            alt={caseItem.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
                          <span className="text-4xl font-bold text-muted-foreground/20">
                            {caseItem.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h4 className="font-medium">{caseItem.title}</h4>
                        {caseItem.clientName && (
                          <p className="text-sm text-muted-foreground">客户: {caseItem.clientName}</p>
                        )}
                        {caseItem.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {caseItem.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Clients */}
            {provider.clients && provider.clients.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  服务客户
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {provider.clients.map((client: any) => (
                    <Card key={client.id} className="border-border/50 bg-card/50 hover:bg-card transition-colors">
                      <CardContent className="p-6 flex items-center justify-center text-center h-24">
                        <span className="font-medium">{client.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="border-border/50 shadow-lg shadow-primary/5 sticky top-24">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-bold text-lg">联系方式</h3>

                {!isContactVisible && !isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-xl text-center">
                      <p className="text-sm text-muted-foreground mb-2">查看完整联系方式需登录</p>
                      <div className="blur-sm select-none mb-2">
                        <div className="flex items-center gap-3 mb-2">
                          <Phone className="w-4 h-4" /> 138 **** 8888
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4" /> contact@****.com
                        </div>
                      </div>
                    </div>
                    <Button className="w-full rounded-xl py-6 font-bold text-lg shadow-lg shadow-primary/20" onClick={() => setIsContactVisible(true)}>
                      立即咨询
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="space-y-3">
                      {provider.phone && (
                        <a href={`tel:${provider.phone}`} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">联系电话</p>
                            <p className="font-medium">{provider.phone}</p>
                          </div>
                        </a>
                      )}

                      {provider.email && (
                        <a href={`mailto:${provider.email}`} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">电子邮箱</p>
                            <p className="font-medium">{provider.email}</p>
                          </div>
                        </a>
                      )}

                      {provider.website && (
                        <a
                          href={provider.website.startsWith('http') ? provider.website : `https://${provider.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">官方网站</p>
                            <p className="font-medium truncate">{provider.website}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}

                      {provider.address && (
                        <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">公司地址</p>
                            <p className="font-medium">{provider.address}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {!isAuthenticated && (
                      <Button variant="outline" className="w-full rounded-xl" onClick={() => setIsContactVisible(false)}>
                        隐藏信息
                      </Button>
                    )}
                  </div>
                )}

                <Separator />

                {/* Contact Form Dialog */}
                <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full rounded-xl py-6 font-bold text-lg shadow-lg shadow-primary/20">
                      在线咨询
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>咨询 {provider.name}</DialogTitle>
                      <DialogDescription>
                        填写您的联系方式和需求，服务商将尽快与您联系
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">您的姓名 *</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">联系电话</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">电子邮箱</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">咨询内容 *</Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="请描述您的需求..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={submitContact.isPending}>
                        {submitContact.isPending ? "提交中..." : "提交咨询"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground text-center">
                    联系时请说明来自 7BrandHub
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/50 md:hidden z-40 flex gap-3">
        <Button
          variant="outline"
          className={`flex-1 rounded-xl h-12 font-medium ${isFavorite ? "text-red-500 border-red-200" : ""}`}
          onClick={handleFavorite}
        >
          <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500" : ""}`} />
          {isFavorite ? "已收藏" : "收藏"}
        </Button>
        <Button className="flex-[2] rounded-xl h-12 font-bold shadow-lg shadow-primary/20" onClick={() => setContactDialogOpen(true)}>
          立即咨询
        </Button>
      </div>
    </div>
  );
}
