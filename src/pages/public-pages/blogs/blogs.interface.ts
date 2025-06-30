export interface IBlog {
    _id: string;
    title: string;
    writer: string;
    isVisible: boolean;
    image: string;
    tags: string[];
    category: string[];
    isFeatured: boolean;
    slug: string;
    searchEngineSummary: string;
    createdAt: string;
}


