import { version } from "../../../../package.json"

const origin = window.location.origin
export const appDeveloment = typeof window !== "undefined" && window.location.origin !== "https://droplinked.com"

export const BASE_URL = appDeveloment ? origin === "https://stage.droplinked.com" ? process.env.REACT_APP_BASE_API_URL_STAGE : process.env.REACT_APP_BASE_API_URL_DEV : process.env.REACT_APP_BASE_API_URL
export const SHOP_URL = appDeveloment ? "https://dev.droplinked.io" : "https://droplinked.io"
export const appVersion = version

console.log({ stage: process.env.REACT_APP_BASE_API_URL_STAGE, dev: process.env.REACT_APP_BASE_API_URL_DEV, base: process.env.REACT_APP_BASE_API_URL, BASE_URL });