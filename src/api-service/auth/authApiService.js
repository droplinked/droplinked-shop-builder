

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

