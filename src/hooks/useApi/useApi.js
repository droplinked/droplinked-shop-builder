import axios from "axios";
import { BASE_URL } from "lib/utils/app/variable";
import { toast } from "react-toastify";

const handleError = (statusCode) => {
  switch (statusCode) {
    case 401:
      window.location.replace("/")

    default:
      break;
  }
}

export function useApi() {

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
        toast.error(err.response.data.message);
        handleError(err.response.data.statusCode)
      } else {
        toast.error(err.message);
      }
      return false;
    }
  };

  const putApi = async ({ url, token, body }) => {
    try {
      const res = await axios.put(
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
        toast.error(err.response.data.message);
        handleError(err.response.data.statusCode)
      } else {
        toast.error(err.message);
      }
      return false;
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
        toast.error(err.response.data.message);
        handleError(err.response.data.statusCode)
      } else {
        toast.error(err.message);
      }
      return false;
    }
  };

  const deleteApi = async ({ url, token, body }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${url}`, {
        ...(body && { ...body }),
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: "Bearer " + token }),
        },
      });
      return res.data.data;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        handleError(err.response.data.statusCode)
      } else {
        toast.error(err.message);
      }
      return false;
    }
  };

  return {
    postApi,
    putApi,
    getApi,
    deleteApi,
  };
}
