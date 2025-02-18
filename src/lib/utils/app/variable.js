import { version } from "../../../../package.json"

// Get the origin, or default to an empty string (useful for SSR)
const origin = (typeof window !== "undefined" && window.location.origin) || ""

// Determine the environment based on the origin
const env = origin === "https://droplinked.com"
    ? "prod"
    : origin === "https://stage.droplinked.com"
        ? "stage"
        : "dev"

// Flag indicating if the app is in development mode
export const appDevelopment = env === "dev"

// Map the BASE_URL values for each environment
const baseUrls = {
    prod: process.env.REACT_APP_BASE_API_URL,
    stage: process.env.REACT_APP_BASE_API_URL_STAGE,
    dev: process.env.REACT_APP_BASE_API_URL_DEV,
}

export const BASE_URL = baseUrls[env]

// For SHOP_URL and BUILDER_URL, "dev" environments get the dev URLs,
// while both "stage" and "prod" use the production URLs.
export const SHOP_URL = appDevelopment
    ? "https://dev.droplinked.io"
    : "https://droplinked.io"

export const BUILDER_URL = appDevelopment
    ? "https://dev.droplinked.com"
    : "https://droplinked.com"

export const appVersion = version