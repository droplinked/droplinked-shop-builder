import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

export function GetApiWithAuth(address, setstate, dataName, errorhandler) {
  axios
    .get(`https://api.droplinked.com/dev${address}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((e) => {
      setstate(e.data.data[dataName]);
    })
    .catch((e) => errorhandler(e.response.data.reason));
}

//  if call api successfully call resFunc true id not call false and , error data
export function PostApi(address, data, resFunc) {
  axios
    .post(`https://api.droplinked.com/dev${address}`, data, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      resFunc(true);
    })
    .catch((error) => {
      resFunc(false, error.response.data.reason);
    });
}

//  if call api successfully call resFunc true id not call false and , error data
export function PostWithoutToken(address, data, resFunc) {
  axios
    .post(`https://api.droplinked.com/dev${address}`, data)
    .then((res) => {
      resFunc(true);
    })
    .catch((error) => {
      resFunc(false, error.response.data.reason);
    });
}
