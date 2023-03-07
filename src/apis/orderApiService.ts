export const getOrders = () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `order`,
      token:token
    };
    return { ...apiObj };
  };


  export const getOrderById = (orderId:number) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `order/${orderId}`,
      token:token
    };
    return { ...apiObj };
  };


  export const putUpdateOrder = (orderId:number , body:any) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `order/${orderId}`,
      body:body,
      token:token
    };
    return { ...apiObj };
  };


  
  export const postCancelOrder = (orderId:number) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `order/cancel/${orderId}`,
      token:token
    };
    return { ...apiObj };
  };