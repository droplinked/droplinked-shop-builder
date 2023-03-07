


export const postLoginByEmail = (email:string , password:string) => {
    let apiObj = {
      url: `auth/login`,
      body: {
        email: email,
        password: password,
      },
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
  
  