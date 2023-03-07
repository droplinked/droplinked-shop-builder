

export const postRecordCasper = (body:any) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `sku/record/casper`,
      body:body,
      token: token,
    };
    return { ...apiObj };
  };


  export const putRecordCasper = (body:any) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `sku/record/casper`,
      body:body,
      token: token,
    };
    return { ...apiObj };
  };


  
  export const getRecordedSkuCasper = (skuID:number) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `/sku/record/casper/${skuID}`,
      token: token,
    };
    return { ...apiObj };
  };