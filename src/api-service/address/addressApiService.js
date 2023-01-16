export const getAddress = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `address`,
    token: token,
  };
  return { ...apiObj };
};

export const postAddress = (addressObj) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `address`,
    body: addressObj,
    token: token,
  };
  return { ...apiObj };
};

export const deleteAddress = (addressId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `address/${addressId}`,
    token: token,
  };
  return { ...apiObj };
};
