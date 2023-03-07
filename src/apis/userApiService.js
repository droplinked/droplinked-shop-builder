export const getUser = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `user`,
    token: token,
  };
  return { ...apiObj };
};

export const putUser = (body) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `user`,
    body:body,
    token: token,
  };
  return { ...apiObj };
};



export const postUserSignup = (body) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `user/signup`,
    body:body,
    token: token,
  };
  return { ...apiObj };
};


export const postUserForgotPassword = (body) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `user/forgot-password`,
    body:body,
    token: token,
  };
  return { ...apiObj };
};



export const postUserResendEmail= (body) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `user/resend-email`,
    body:body,
    token: token,
  };
  return { ...apiObj };
};


export const postUserEmailVerification= (body) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `user/email-verification`,
    body:body,
    token: token,
  };
  return { ...apiObj };
};


export const putUserRecoveryAccount= (body) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `user/recover-account`,
    body:body,
    token: token,
  };
  return { ...apiObj };
};


