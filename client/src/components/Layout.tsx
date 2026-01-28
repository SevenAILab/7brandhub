import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Search, Menu, X, Heart, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold tracking-tight flex items-center gap-2 z-50 relative cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">7</div>
              <span className="text-foreground">BrandHub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/providers">
              <span className={cn("text-sm font-medium transition-colors hover:text-primary cursor-pointer", location === "/providers" ? "text-primary" : "text-muted-foreground")}>
                找服务商
              </span>
            </Link>
            <Link href="/categories">
              <span className={cn("text-sm font-medium transition-colors hover:text-primary cursor-pointer", location === "/categories" ? "text-primary" : "text-muted-foreground")}>
                服务分类
              </span>
            </Link>
            <Link href="/join">
              <span className={cn("text-sm font-medium transition-colors hover:text-primary cursor-pointer", location === "/join" ? "text-primary" : "text-muted-foreground")}>
                服务商入驻
              </span>
            </Link>
            <Link href="/about">
              <span className={cn("text-sm font-medium transition-colors hover:text-primary cursor-pointer", location === "/about" ? "text-primary" : "text-muted-foreground")}>
                关于我们
              </span>
            </Link>
            <Link href="/blog">
              <span className={cn("text-sm font-medium transition-colors hover:text-primary cursor-pointer", location === "/blog" ? "text-primary" : "text-muted-foreground")}>
                品牌洞察
              </span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setLocation("/providers")}
            >
              <Search className="w-4 h-4 mr-2" />
              搜索
            </Button>

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
            ) : isAuthenticated && user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => setLocation("/favorites")}
                >
                  <Heart className="w-4 h-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 px-2">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium max-w-[100px] truncate">
                        {user.name || user.email?.split('@')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setLocation("/favorites")}>
                      <Heart className="w-4 h-4 mr-2" />
                      我的收藏
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setLocation("/admin")}>
                          <Settings className="w-4 h-4 mr-2" />
                          管理后台
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      退出登录
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button size="sm" className="rounded-full px-6 font-medium" onClick={handleLogin}>
                登录
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 relative p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background z-40 flex flex-col pt-24 px-6 transition-transform duration-300 ease-in-out md:hidden",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <Link href="/">
              <span className="py-2 border-b border-border/50 block cursor-pointer">首页</span>
            </Link>
            <Link href="/providers">
              <span className="py-2 border-b border-border/50 block cursor-pointer">找服务商</span>
            </Link>
            <Link href="/categories">
              <span className="py-2 border-b border-border/50 block cursor-pointer">服务分类</span>
            </Link>
            <Link href="/join">
              <span className="py-2 border-b border-border/50 block cursor-pointer">服务商入驻</span>
            </Link>
            <span className="py-2 border-b border-border/50 block cursor-pointer">关于我们</span>
          </Link>
          <Link href="/blog">
            <span className="py-2 border-b border-border/50 block cursor-pointer">品牌洞察</span>
          </Link>

          {isAuthenticated && user && (
            <>
              <Link href="/favorites">
                <span className="py-2 border-b border-border/50 flex items-center gap-2 cursor-pointer">
                  <Heart className="w-5 h-5" /> 我的收藏
                </span>
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin">
                  <span className="py-2 border-b border-border/50 flex items-center gap-2 cursor-pointer">
                    <Settings className="w-5 h-5" /> 管理后台
                  </span>
                </Link>
              )}
            </>
          )}

          <div className="pt-4 flex flex-col gap-4">
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="w-full rounded-full py-6 text-lg"
                onClick={handleLogout}
              >
                退出登录
              </Button>
            ) : (
              <Button
                className="w-full rounded-full py-6 text-lg"
                onClick={handleLogin}
              >
                登录 / 注册
              </Button>
            )}
          </div>
        </nav>
    </div>
      </header >

    {/* Main Content */ }
    < main className = "flex-1 pt-20" >
      { children }
      </main >

    {/* Footer */ }
    < footer className = "bg-secondary/30 border-t border-border/50 py-12 mt-20" >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-white text-xs font-bold">7</div>
              <span className="font-bold text-lg">BrandHub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              垂直于品牌服务的智能检索平台，帮助品牌方快速找到靠谱的本地服务商。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">平台服务</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/providers"><span className="hover:text-primary transition-colors cursor-pointer">找服务商</span></Link></li>
              <li><Link href="/categories"><span className="hover:text-primary transition-colors cursor-pointer">服务分类</span></Link></li>
              <li><Link href="/join"><span className="hover:text-primary transition-colors cursor-pointer">服务商入驻</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">关于我们</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about"><span className="hover:text-primary transition-colors cursor-pointer">关于平台</span></Link></li>
              <li><Link href="/about"><span className="hover:text-primary transition-colors cursor-pointer">联系我们</span></Link></li>
              <li><Link href="/blog"><span className="hover:text-primary transition-colors cursor-pointer">品牌洞察</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">联系方式</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>邮箱: contact@7brandhub.com</li>
              <li>工作时间: 周一至周五 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 7BrandHub. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground transition-colors cursor-pointer">隐私政策</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">服务条款</span>
          </div>
        </div>
      </div>
      </footer >
    </div >
  );
}
