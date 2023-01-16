import axios from "axios";

//import { BASE_URL } from "./baseUrl";
import { useToasty } from "../../context/toastify/ToastContext";

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}`;

export function useApi() {
  const { errorToast } = useToasty();

  const postApi = async ({ url, token, body }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/${url}`,
        { ...(body && { ...body }) },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: "Bearer " + token }),
          },
        }
      );
      return res.data.data;
    } catch (err) {
      if (err.response) {
        errorToast(err.response.data.reason);
        // if (typeof err.response.data.data.message == "object")
        //   errorToast(err.response.data.data.message[0]);
        // else errorToast(err.response.data.data.message);
      } else {
        errorToast(err.message);
      }
      return undefined;
    }
  };

  const patchApi = async ({ url, token, body }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/${url}`,
        { ...(body && { ...body }) },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: "Bearer " + token }),
          },
        }
      );
      return res.data.data;
    } catch (err) {
      if (err.response) {
        if (typeof err.response.data.data.message == "object")
          errorToast(err.response.data.data.message[0]);
        else errorToast(err.response.data.data.message);
      } else {
        errorToast(err.message);
      }
      return undefined;
    }
  };

  const getApi = async ({ url, token, body }) => {
  
    try {
      const res = await axios.get(`${BASE_URL}/${url}`, {
        ...(body && { ...body }),
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: "Bearer " + token }),
        },
      });

      return res.data.data;
    } catch (err) {
      if (err.response) {
        errorToast(err.response.data.reason);
        // if (typeof err.response.data.data.message == "object")
        //   errorToast(err.response.data.data.message[0]);
        // else errorToast(err.response.data.data.message);
      } else {
        errorToast(err.message);
      }
      return undefined;
    }
  };

  const deleteApi = async ({ url, token, body }) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/${url}`,
        { ...(body && { ...body }) },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: "Bearer " + token }),
          },
        }
      );
      return res.data.data;
    } catch (err) {
      if (err.response) {
        if (typeof err.response.data.data.message == "object")
          errorToast(err.response.data.data.message[0]);
        else errorToast(err.response.data.data.message);
      } else {
        errorToast(err.message);
      }
      return undefined;
    }
  };

  return {
    postApi,
    patchApi,
    getApi,
    deleteApi,
  };
}
