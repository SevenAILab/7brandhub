import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, User, ChevronLeft, Share2 } from "lucide-react";
import NotFound from "./NotFound";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const { data: post, isLoading } = trpc.blog.getBySlug.useQuery(
        { slug: slug || "" },
        { enabled: !!slug }
    );

    const handleShare = async () => {
        try {
            await navigator.share({
                title: post?.title,
                text: post?.excerpt ?? undefined,
                url: window.location.href,
            });
        } catch {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("链接已复制到剪贴板");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pb-20">
                <div className="container py-12 max-w-4xl">
                    <Skeleton className="h-8 w-24 mb-8" />
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-1/2 mb-8" />
                    <Skeleton className="aspect-video rounded-xl mb-8" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return <NotFound />;
    }

    const articleSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.7brandhub.com/blog/${slug}`
        },
        "headline": post.title,
        "description": post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
        "image": post.coverImage ? `https://www.7brandhub.com${post.coverImage}` : undefined,
        "author": {
            "@type": "Person",
            "name": post.author || "7BrandHub"
        },
        "publisher": {
            "@type": "Organization",
            "name": "7BrandHub",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.7brandhub.com/logo.png"
            }
        },
        "datePublished": post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });

    const breadcrumbSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://www.7brandhub.com/" },
            { "@type": "ListItem", "position": 2, "name": "品牌洞察", "item": "https://www.7brandhub.com/blog/" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.7brandhub.com/blog/${slug}` }
        ]
    });

    return (
        <div className="min-h-screen bg-background pb-20">
            <SEO
                title={post.title}
                description={post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '')}
                image={post.coverImage || undefined}
                schema={`[${articleSchema}, ${breadcrumbSchema}]`}
            />
            {/* Header / Breadcrumb */}
            <div className="bg-secondary/30 border-b border-border/50 sticky top-0 z-20 backdrop-blur-md bg-background/80">
                <div className="container py-4 flex justify-between items-center">
                    <Link href="/blog">
                        <span className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            返回文章列表
                        </span>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        分享
                    </Button>
                </div>
            </div>

            <article className="container py-12 max-w-4xl">
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.createdAt && format(new Date(post.createdAt), "yyyy年MM月dd日", { locale: zhCN })}
                        </div>
                        {post.author && (
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {post.author}
                            </div>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {post.coverImage && (
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 mb-10">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </header>

                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                    {/* Simple whitespace rendering for now, or use a markdown renderer if content is markdown */}
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {post.content}
                    </div>
                </div>
            </article>
        </div>
    );
}
