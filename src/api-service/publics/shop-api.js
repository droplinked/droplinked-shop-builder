


export const getShopInfoByShopname = (shopname) => {
  let apiObj = {
    url: `shopinfo/${shopname}`,
  };
  return { ...apiObj };
};

// export const loginApi = (email, password ) => {
//     let finalObj = {
//         url:'auth/signin',
//         body:{
//             email:email,
//             password:password
//         },
//     }
//     return {...finalObj}
// }

// export const getShopInfoByShopname = async (shopname) => {

//     try {
//       const res = await axios.get(`${BASE_URL}/shopinfo/${shopname}`);
//       return res.data.data ;
//     } catch (err) {
//       // if shop not find return false
//       return false
//     }

//   };
