// Utility regex patterns for validating user input such as usernames, passwords, and URLs.

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])?[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

export const domainRegex = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;