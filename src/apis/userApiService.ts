export const getUser = () => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `user`,
    token: token,
  };
  return { ...apiObj };
};

export const putUser = (body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `user`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};

export const postUserSignup = (
  email: string,
  password: string,
  shopName: string
) => {
  let apiObj = {
    url: `user/signup`,
    body: {
      email: email,
      password: password,
      shopName: shopName,
    },
  };
  return { ...apiObj };
};

export const postUserForgotPassword = (body: any) => {
  let apiObj = {
    url: `user/forgot-password`,
    body: body,
  };
  return { ...apiObj };
};

export const postUserResendEmail = (email: string) => {
  let apiObj = {
    url: `user/resend-email`,
    body: {
      email: email,
    },
  };
  return { ...apiObj };
};

export const postUserEmailVerification = (token: string) => {
  let apiObj = {
    url: `user/email-verification`,
    body: {
      token: token,
    },
  };
  return { ...apiObj };
};

export const putUserRecoveryAccount = (body: any) => {
  let apiObj = {
    url: `user/recover-account`,
    body: body,
  };
  return { ...apiObj };
};
