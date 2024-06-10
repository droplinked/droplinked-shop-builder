export interface IBlog {
    _id: string;
    title: string;
    content: string;
    author: string;
    writer: string;
    isVisible: boolean;
    image: string;
    tags: string[];
    category: string[];
    commentsCount: number;
    likes: number;
    version: number;
    isFeatured: boolean;
    seoData: ISEOData;
    creator: string;
    publishedDate: string;
    mediaData: IMediaData[];
    createdAt: string;
    updatedAt: string;
    readTime?: number;
}

export interface ISEOData {
    _id: string;
    metaDescription: string;
    keywords: string[];
    slug: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    structuredData: string;
}

export interface IMediaData {
    _id: string;
    url: string;
    type: string;
    title: string;
    positionIndex: number;
}

