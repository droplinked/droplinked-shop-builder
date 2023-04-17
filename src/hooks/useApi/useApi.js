import axios from "axios";
//


const BASE_URL = process.env.REACT_APP_BASE_API_URL

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
        errorToast(err.response.data.message);
      } else {
        errorToast(err.message);
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
        errorToast(err.response.data.message);
      } else {
        errorToast(err.message);
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
        errorToast(err.response.data.message);
      } else {
        errorToast(err.message);
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
        errorToast(err.response.data.message);
      } else {
        errorToast(err.message);
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
