import axiosInstance from "lib/axiosConfig";


export interface ISemanticSearchParams {
    query: string;
    limit?: number;
  }



export const semanticSearchService = ({ query, limit = 10 }: ISemanticSearchParams) => {
    return axiosInstance.get(`/product/search/semantic${query && query !== "" ? `?query=${query}` : ""}&limit=${limit}`);
};
