export interface Blog {
    _id?: string;
    title: string;
    content: any;
    shopID?: string;
    author?: string;
    writer: string;
    isVisible: boolean;
    image?: string;
    tags: string[];
    category?: string[];
    commentsCount?: number;
    likes?: number;
    readTime?: number;
    version?: number;
    isFeatured?: boolean;
    seoData?: {
        metaDescription: string;
        keywords: string[];
        slug: string;
        canonicalUrl: string;
        ogTitle: string;
        ogDescription: string;
        ogImage: string;
        structuredData: string;
        _id?: string;
    };
    mediaData?: {
        url: string;
        type: string;
        title: string;
        positionIndex: number;
        _id?: string;
    }[];
}

export interface ICheckSlug {
    title: string;
    shopId: string;
}

export interface IGetPublicBlogService {
    slug: string;
}
