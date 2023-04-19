export const appDeveloment = typeof window !== "undefined" && window.location.origin !== "https://droplinked.com"

export const BASE_URL = appDeveloment ? process.env.REACT_APP_BASE_API_URL_DEV : process.env.REACT_APP_BASE_API_URL;
