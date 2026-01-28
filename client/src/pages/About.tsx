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
      <SEO title="关于我们" description="7BrandHub 连接品牌与优质服务商，让每一次合作都更简单、更高效。" />
      {/* Hero */}
      <div className="relative overflow-hidden py-20 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              连接品牌与<span className="text-primary">优质服务</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              7BrandHub 是一个垂直于品牌服务的智能检索平台，致力于帮助品牌方快速找到靠谱的本地服务商，让每一次合作都更简单、更高效。
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/providers">
                <a className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  开始寻找服务商
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </div>

      {/* Mission */}
      <div className="container py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">我们的使命</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              在品牌建设的过程中，找到合适的合作伙伴往往是最具挑战性的一步。信息不对称、筛选成本高、信任难以建立，这些问题一直困扰着品牌方。
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              7BrandHub 的诞生，就是为了解决这些痛点。我们通过严格的筛选机制、透明的信息展示和智能的匹配算法，让优质的服务商被看见，让品牌方能更轻松地做出决策。
            </p>
            <ul className="space-y-3">
              {[
                "严选优质服务商，确保服务质量",
                "透明的信息展示，拒绝虚假宣传",
                "智能匹配算法，提高对接效率",
                "真实的案例展示，所见即所得"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-secondary/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl font-bold text-primary/10">7</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-secondary/30 py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "入驻服务商", value: "500+" },
              { label: "覆盖城市", value: "20+" },
              { label: "服务品牌", value: "2000+" },
              { label: "成功对接", value: "5000+" }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* FAQ */}
      <div className="container py-12 md:py-20 max-w-3xl">
        <h2 className="text-3xl font-bold mb-10 text-center">常见问题</h2>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: "如何入驻 7BrandHub？",
              answer: "点击页面右上角的'入驻'按钮或底部的'申请入驻'，填写相关信息提交审核即可。审核通常在 1-3 个工作日内完成。"
            },
            {
              question: "入驻需要费用吗？",
              answer: "目前基础入驻是免费的。未来我们会推出更多增值服务，助您更好地展示品牌。"
            },
            {
              question: "如何联系服务商？",
              answer: "在服务商详情页，您可以查看其联系方式或直接发起咨询。部分联系方式可能需要登录后查看。"
            },
            {
              question: "平台如何保证服务质量？",
              answer: "我们会对入驻服务商进行严格筛选和背景调查。同时，我们也鼓励用户对合作过的服务商进行评价和反馈。"
            }
          ].map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA */}
      <div className="container py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">我是服务商，如何入驻？</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          如果您是优质的品牌服务商，欢迎加入 7BrandHub。我们将为您提供精准的流量曝光和优质的客户线索。
        </p>
        <Link href="/join">
          <Button size="lg" className="rounded-xl px-8 h-12 text-base font-medium shadow-lg shadow-primary/20">
            申请入驻 <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div >
  );
}
