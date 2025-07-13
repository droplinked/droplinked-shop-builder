import { createContext } from "react";
import { IGetProductsCommunityService } from "services/product/interfaces";

export interface IAffiliateProductsCategory {
    _id: string;
    title: string;
    subCategories: IAffiliateProductsSubCategory[];
}

export interface IAffiliateProductsSubCategory {
    _id: string;
    title: string;
}

export interface ProductContextType {
    categories: IAffiliateProductsCategory[];
    isLoading: boolean;
    error: string | null;
    filters: IGetProductsCommunityService;
    setFilters: (key: keyof IGetProductsCommunityService, value: any) => void;
}

export const defaultAffiliateProductsContextValue: ProductContextType = {
    categories: [],
    isLoading: true,
    error: null,
    filters: {
        limit: 2,
        page: 1,
        title: undefined,
        categoryIds: [],
        subCategoryIds: undefined,
        lowestPrice: 0,
        highestPrice: 1000,
        lowestCommission: 0,
        highestCommission: 100,
    },
    setFilters: () => { },
};

export const ProductContext = createContext<ProductContextType>(defaultAffiliateProductsContextValue);