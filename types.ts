export enum ServiceCategory {
    STRATEGY = "品牌策略",
    DESIGN = "视觉设计",
    PACKAGING = "包装设计",
    SPACE = "空间设计",
    MARKETING = "品牌营销",
    DIGITAL = "数字营销",
    ECOMMERCE = "电商运营",
    PR = "公关传播",
    OVERSEAS = "出海营销",
}

export interface Provider {
    id: string;
    name: string;
    logo: string;
    established: number;
    city: string;
    tags: ServiceCategory[];
    slogan: string;
    description: string;
    clients: string[];
    contact?: {
        phone?: string;
        email?: string;
        website?: string;
    };
    score: number;
    isVerified: boolean;
    gallery: string[];
}
