export const postLogin = (email, password) => {
  let apiObj = {
    url: `auth/login`,
    body: {
      email: email,
      password: password,
    },
  };
  return { ...apiObj };
};

// export const postSignupCustomer = (email, password) => {
//   let apiObj = {
//     url: `customer/signup`,
//     body: {
//       email: email,
//       password: password,
//     },
//   };
//   return { ...apiObj };
// };

// export const postEmailVerify = (token) => {
//   let apiObj = {
//     url: `email/verify`,
//     body: {
//       token: token,
//     },
//   };
//   return { ...apiObj };
// };

export const postResetPassword = (email) => {
  let apiObj = {
    url: `producer/reset-password`,
    body: {
      email: email,
    },
  };
  return { ...apiObj };
};

export const postAccountRecovery = (token, password) => {
  let apiObj = {
    url: `producer/account-recovery`,
    body: {
      accountRecoveryToken: token,
      newPassword: password,
    },
  };
  return { ...apiObj };
};

// export const postProducerSignup = (email, password, shopName) => {
//   let apiObj = {
//     url: `producer/signup`,
//     body: {
//       email: email,
//       password: password,
//       shopName: shopName,
//     },
//   };
//   return { ...apiObj };
// };

// export const postResendEmail = (email) => {
//   let apiObj = {
//     url: `email/resend`,
//     body: {
//       email: email,
//     },
//   };
//   return { ...apiObj };
// };
