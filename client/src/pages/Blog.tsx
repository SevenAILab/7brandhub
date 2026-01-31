import { Link } from "wouter";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Blog() {
    const { data: posts, isLoading } = trpc.blog.list.useQuery({ limit: 20 });

    const breadcrumbSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://www.7brandhub.com/" },
            { "@type": "ListItem", "position": 2, "name": "品牌洞察", "item": "https://www.7brandhub.com/blog/" }
        ]
    });

    return (
        <div className="min-h-screen bg-background pb-20">
            <SEO
                title="品牌洞察"
                description="探索最新的品牌策略、设计趋势和市场营销见解"
                schema={breadcrumbSchema}
            />
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-secondary/30 py-16 md:py-24">
                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            品牌洞察 <span className="text-primary">&</span> 趋势
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            探索最新的品牌策略、设计趋势和市场营销见解
                        </p>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            </div>

            <div className="container py-12">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="aspect-video rounded-xl" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : posts && posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`}>
                                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden group flex flex-col">
                                    {/* Cover Image */}
                                    <div className="aspect-video bg-secondary relative overflow-hidden">
                                        {post.coverImage ? (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary">
                                                <span className="text-4xl font-bold text-muted-foreground/10">
                                                    {post.title.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {post.createdAt && format(new Date(post.createdAt), "yyyy年MM月dd日", { locale: zhCN })}
                                            </div>
                                            {post.author && (
                                                <div className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    {post.author}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                            {post.excerpt || post.content.substring(0, 100).replace(/<[^>]*>/g, '') + '...'}
                                        </p>

                                        <div className="flex items-center text-primary font-medium text-sm mt-auto">
                                            阅读全文 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-bold mb-2">暂无文章</h3>
                        <p className="text-muted-foreground">精彩内容即将上线，敬请期待...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
