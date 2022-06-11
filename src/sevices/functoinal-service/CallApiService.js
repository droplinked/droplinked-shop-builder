import axios from "axios";
import { useProfile } from "../hooks/useProfile";

export function GetApiWithAuth(address, setstate, dataName, errorhandler) {
  let token = JSON.parse(localStorage.getItem("token"));

  axios
    .get(`https://api.droplinked.com/dev${address}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((e) => {
      setstate(e.data.data[dataName]);
    })
    .catch((e) => errorhandler(e.response.data.reason));
}

export function GetWithbody(address, bodyData, resHandler, errorhandler) {
  axios
    .get(`https://dev-api.droplinked.com${address}`,
    {body:{token:"12f19149-d6a4-44bb-ad1f-066c037ba86d"}})
    .then((e) => {
      resHandler(e.response);
    })
    .catch((e) => errorhandler(e.response.data.message));
}

//  if call api successfully call resFunc true id not call false and , error data
export function PostApi(address, data, resFunc) {
  let token = JSON.parse(localStorage.getItem("token"));

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
    .post(`https://dev-api.droplinked.com${address}`, data)
    .then((res) => {
      resFunc(true);
    })
    .catch((error) => {
      resFunc(false, error.response.data.reason);
    });
}

//  delete with token
export function DeleteWithToken(address, resFunc) {
  let token = JSON.parse(localStorage.getItem("token"));

  axios
    .delete(`https://api.droplinked.com/dev${address}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      resFunc(true);
    })
    .catch((error) => {
      resFunc(false, error.response.data.reason);
    });
}
