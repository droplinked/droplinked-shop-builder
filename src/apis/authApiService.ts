


export const postLoginByEmail = (body:any) => {
    let apiObj = {
      url: `auth/login`,
      body:body,
    };
    return { ...apiObj };
  };


  export const postLoginByWallet = (body:any) => {
    let apiObj = {
      url: `auth/wallet`,
      body:body,
    };
    return { ...apiObj };
  };
  
  