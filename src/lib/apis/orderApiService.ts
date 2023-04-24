import { createApiReq } from "./api-utils";

export const getOrders = () => {
    return createApiReq(`order`, true, null);
  };

  export const getOrderById = (orderId:number) => {
    return createApiReq(`order/${orderId}`, true, null);
  };

  export const putUpdateOrder = (orderId:number , body:any) => {
    return createApiReq(`order/${orderId}`, true, body);
  };
  
  export const postCancelOrder = (orderId:number) => {
    return createApiReq(`order/cancel/${orderId}`, true, null);
  };