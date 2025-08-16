// Interface for blog list items
export interface IBlogListItem {
    _id: string;
    title: string;
    slug: string;
    writer: string;
    isVisible: boolean;
    image: string;
    searchEngineSummary: string;
    category: string;
    isFeatured: boolean;
    createdAt: string;
    tags: string[];
}

// Interface for detailed blog data
export interface IBlogDetail {
    _id: string;
    title: string;
    slug: string;
    content: string;
    shopID: string;
    writer: string;
    isVisible: boolean;
    image: string;
    tags: string[];
    searchEngineSummary: string;
    category: string;
    readTime: number;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}

// Interface for category data
export interface ICategory {
    id: string;
    name: string;
    blogCount: number;
} 