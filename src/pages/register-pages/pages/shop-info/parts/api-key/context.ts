import { AxiosResponse } from "axios";
import { ShopOAuth2Client } from "lib/apis/shop/interfaces";
import { createContext } from "react";
import { UseMutationResult, UseQueryResult } from "react-query";

interface APIKeyContextType {
    getShopAPIKey: UseQueryResult<AxiosResponse<any, any>, unknown>;
    updateShopAPIKey: UseMutationResult<AxiosResponse<any, any>, unknown, ShopOAuth2Client, unknown>;
    fetchedData: any;
}

const APIKeyContext = createContext<APIKeyContextType>({} as APIKeyContextType);

export default APIKeyContext;