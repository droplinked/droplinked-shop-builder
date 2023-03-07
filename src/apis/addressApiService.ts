export const postCreateAddress = (body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `address-book`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};

export const getAddressList = () => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `address-book`,
    token: token,
  };
  return { ...apiObj };
};

export const deleteAddress = (addressId: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `address-book/${addressId}`,
    token: token,
  };
  return { ...apiObj };
};

export const getAddressById = (addressId: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `address-book/${addressId}`,
    token: token,
  };
  return { ...apiObj };
};

export const putUpdateAddress = (addressId: number, body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `address-book/${addressId}`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};
