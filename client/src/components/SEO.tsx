import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    schema?: string;
}

export function SEO({ title, description, keywords, image, schema }: SEOProps) {
    const siteName = "7BrandHub";
    const defaultDescription = "7BrandHub - 连接品牌与优质服务商，帮助品牌方快速找到靠谱的本地服务商，让每一次合作都更简单、更高效。";

    return (
        <Helmet>
            <title>{title} | {siteName}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${title} | ${siteName}`} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:site_name" content={siteName} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} | ${siteName}`} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Schema.org Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {schema}
                </script>
            )}
        </Helmet>
    );
}
