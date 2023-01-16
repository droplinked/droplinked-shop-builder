

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

//   export const SignIn = async (info) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/signin`, info);
//       return { status: API_STATUS.SUCCESS, data: res.data.data };
//     } catch (err) {
//       return { status: API_STATUS.FAILED, data: err.response.data.reason };
//     }
//   };
