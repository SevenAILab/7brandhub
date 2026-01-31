import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";

export default function About() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <SEO title="关于我们" description="7BrandHub - 链接品牌梦想与执行力的智能枢纽，让每一个好品牌都能找到最懂它的服务伙伴。" />
      {/* Hero */}
      <div className="relative overflow-hidden py-20 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              链接品牌梦想与<span className="text-primary">执行力</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              我们不仅是黄页，更是基于AI语义理解的 B2B 品牌服务商精准匹配引擎。
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/providers">
                <a className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  开始智能匹配
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </div>

      {/* Origin Story */}
      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">成立背景</h2>
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "因为看见了‘错配’的浪费，所以创造‘精准’的连接。"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              我们的创始人深耕品牌与 AI 领域多年（Seven AI Lab 背景），在实践中发现：
            </p>
            <ul className="space-y-4 mb-8 text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>大量从 0 到 1 的成长型品牌，因找不到靠谱的服务商而踩坑，错失增长机会；</span>
              </li>
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>大量优质的独立创意工作室，因不擅长营销而被埋没在低价竞争的噪音中。</span>
              </li>
            </ul>
            <p className="text-lg font-medium text-foreground">
              传统的众包平台充斥着低质量比稿。7BrandHub 诞生于对“高效、高质、高信任度”商业合作的极致追求。
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-secondary/30 overflow-hidden relative border border-border/50">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <span className="text-9xl font-bold text-primary/5 select-none absolute">7</span>
                <div className="relative z-10 space-y-2">
                  <span className="block text-2xl font-bold">使命</span>
                  <span className="block text-xl text-muted-foreground">让每一个好品牌<br />都能找到最懂它的服务伙伴</span>
                </div>
                <div className="w-16 h-1 bg-primary/20 my-8"></div>
                <div className="relative z-10 space-y-2">
                  <span className="block text-2xl font-bold">愿景</span>
                  <span className="block text-xl text-muted-foreground">成为全球品牌服务生态中<br />最高效的 AI 智能基础设施</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unique Value */}
      <div className="bg-secondary/30 py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">为什么选择 7BrandHub？</h2>
            <p className="text-muted-foreground">我们不一样。拒绝平庸的“搜索”，提供极致的“匹配”。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI 语义智能匹配</h3>
              <p className="text-muted-foreground leading-relaxed">
                并非简单的关键词搜索，而是基于需求场景（Scene-based）的智能推荐。未来支持上传参考图或直接对话，“读懂”你的审美与预算。
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">垂直严选品质</h3>
              <p className="text-muted-foreground leading-relaxed">
                专注于品牌建设领域，拒绝低端杂活。我们严选服务商，确保每一次检索都是为了构建长期的品牌价值，而非一次性的修修补补。
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">全球视野，在地服务</h3>
              <p className="text-muted-foreground leading-relaxed">
                立足大湾区，连接全球。特别针对中国品牌出海（Go Global）及海外品牌入华（Go Local）的双向需求，提供跨文化、跨语言的精准对接。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container py-12 md:py-20 max-w-3xl">
        <h2 className="text-3xl font-bold mb-10 text-center">常见问题</h2>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: "平台主要服务哪些用户？",
              answer: "核心服务于中小型企业主、品牌主理人及成长型品牌。特别是那些有品牌升级意愿，或正在寻求出海机会，需要高质量服务但缺乏筛选辨别能力的企业。"
            },
            {
              question: "和猪八戒、Upwork 有什么区别？",
              answer: "它们是综合性众包平台，强调‘便宜’与‘走量’。7BrandHub 是垂直于品牌服务的智能匹配引擎，强调‘品质’与‘精准’。我们不做简单的信息罗列，而是提供基于信任的筛选服务。"
            },
            {
              question: "我是服务商，如何入驻？",
              answer: "我们欢迎经过验证的专业品牌机构及独立创意人。点击页面右上角的'入驻'按钮，填写资料。我们会重点审核您的过往案例真实性与服务口碑。"
            }
          ].map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA */}
      <div className="container py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">准备好开启品牌增长了吗？</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          无论您是寻找合作伙伴的品牌方，还是寻求优质客户的服务商，<br />7BrandHub 都是您最可信赖的连接器。
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/join">
            <Button size="lg" className="rounded-xl px-8 h-12 text-base font-medium shadow-lg shadow-primary/20">
              申请入驻 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/providers">
            <Button variant="outline" size="lg" className="rounded-xl px-8 h-12 text-base font-medium">
              寻找服务商
            </Button>
          </Link>
        </div>
      </div>
    </div >
  );
}
