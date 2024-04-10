import { version } from "../../../../package.json"

const origin = window.location.origin
export const appDeveloment = typeof window !== "undefined" && !["https://droplinked.com", "https://stage.droplinked.com"].includes(origin)
export const BASE_URL = process.env.REACT_APP_BASE_API_URL
export const SHOP_URL = appDeveloment ? "https://dev.droplinked.io" : "https://droplinked.io"
export const BUILDER_URL = appDeveloment ? "https://dev.droplinked.com" : "https://droplinked.com"
export const appVersion = version