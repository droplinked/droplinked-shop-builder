export const appDeveloment = typeof window !== "undefined" && window.location.origin !== "https://droplinked.com"

export const BASE_URL = process.env.REACT_APP_BASE_API_URL
export const SHOP_URL = appDeveloment ? "https://dev.droplinked.io" : "https://droplinked.io"
