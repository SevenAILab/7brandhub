import { useState } from "react";
import { useLocation } from "wouter";
import {
  Building2, CheckCircle, Users, TrendingUp,
  ArrowRight, Send, Sparkles, Shield, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Join() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    cityId: "",
    description: "",
    services: "",
    website: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { data: cities } = trpc.cities.list.useQuery();

  const submitApplication = trpc.applications.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("申请已提交，我们将尽快审核");
    },
    onError: (error) => {
      toast.error(error.message || "提交失败，请稍后重试");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication.mutate({
      ...formData,
      cityId: formData.cityId ? Number(formData.cityId) : undefined,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">申请已提交</h1>
          <p className="text-muted-foreground mb-8">
            感谢您的入驻申请！我们的团队将在 1-3 个工作日内审核您的资料，审核结果将通过邮件通知您。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => setLocation("/")}>
              返回首页
            </Button>
            <Button onClick={() => setLocation("/providers")}>
              浏览服务商
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-blue-50/50 py-16 md:py-24">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              加入 <span className="text-primary">7BrandHub</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              成为平台认证服务商，连接更多优质品牌客户，拓展业务机会
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      </div>

      {/* Benefits Section */}
      <div className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">入驻优势</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50 text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">品牌曝光</h3>
              <p className="text-sm text-muted-foreground">
                在平台获得持续曝光，触达精准品牌客户
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">精准获客</h3>
              <p className="text-sm text-muted-foreground">
                直接对接有明确需求的品牌方，提高转化率
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">官方认证</h3>
              <p className="text-sm text-muted-foreground">
                通过审核获得认证标识，提升客户信任度
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">数据洞察</h3>
              <p className="text-sm text-muted-foreground">
                获取访问数据和客户反馈，优化服务策略
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Form */}
      <div className="container pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">服务商入驻申请</CardTitle>
              <CardDescription>
                填写以下信息，我们将在 1-3 个工作日内完成审核
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">公司名称 *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="请输入公司全称"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cityId">所在城市 *</Label>
                    <select
                      id="cityId"
                      name="cityId"
                      value={formData.cityId}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">选择城市</option>
                      {cities?.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">联系人 *</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="请输入联系人姓名"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">联系电话 *</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      placeholder="请输入联系电话"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">电子邮箱 *</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      placeholder="请输入电子邮箱"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">公司官网</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="如：www.example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services">主营服务 *</Label>
                  <Input
                    id="services"
                    name="services"
                    value={formData.services}
                    onChange={handleChange}
                    placeholder="如：品牌策略、包装设计、社媒营销"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">公司简介 *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="请简要介绍公司背景、核心优势和服务案例..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl py-6 font-bold text-lg shadow-lg shadow-primary/20"
                  disabled={submitApplication.isPending}
                >
                  {submitApplication.isPending ? (
                    "提交中..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      提交入驻申请
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  提交申请即表示您同意我们的服务条款和隐私政策
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
