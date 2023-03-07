

export const postProduct = (body:any) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `product`,
      body:body,
      token: token,
    };
    return { ...apiObj };
  };


  export const getProduct = () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `product`,
      token: token,
    };
    return { ...apiObj };
  };


  export const getProductById = (productId:number) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `product/${productId}`,
      token: token,
    };
    return { ...apiObj };
  };


  export const deleteProductById = (productId:number) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `product/${productId}`,
      token: token,
    };
    return { ...apiObj };
  };


  export const putProductById = (productId:number , body:any) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `product/${productId}`,
      body:body,
      token: token,
    };
    return { ...apiObj };
  };


  export const getPublicProductById = (productId:number) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `product/public/${productId}`,
      token: token,
    };
    return { ...apiObj };
  };


  export const postImportShopify = () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `product/import`,
      token: token,
    };
    return { ...apiObj };
  };