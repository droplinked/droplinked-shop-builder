export const postLogin = (email, password) => {
  let apiObj = {
    url: `signin`,
    body: {
      email: email,
      password: password,
    },
  };
  return { ...apiObj };
};

export const postSignupCustomer = (email, password) => {
  let apiObj = {
    url: `customer/signup`,
    body: {
      email: email,
      password: password,
    },
  };
  return { ...apiObj };
};

export const postEmailVerify = (token) => {
  let apiObj = {
    url: `email/verify`,
    body: {
      token: token,
    },
  };
  return { ...apiObj };
};

export const postResetPassword = (email) => {
  let apiObj = {
    url: `producer/reset-password`,
    body: {
      email: email,
    },
  };
  return { ...apiObj };
};
