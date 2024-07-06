module.exports = {
    setupFiles: ["./jest.setup.js"],
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    globals: {
        Uint8Array: Uint8Array,
    },
    preset: "ts-jest",
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)?$": "babel-jest",
        "^.+\\.mjs$": "babel-jest",
    },
    transformIgnorePatterns: ["!node_modules/"],
    // testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^assets/(.*)$": "<rootDir>/src/assets/$1",
        "^functions/(.*)$": "<rootDir>/src/functions/$1",
        "^components/(.*)$": "<rootDir>/src/components/$1",
        "^lib/(.*)$": "<rootDir>/src/lib/$1",
        "^types/(.*)$": "<rootDir>/src/types/$1",
        "^pages/(.*)$": "<rootDir>/src/pages/$1",
        "^routes/(.*)$": "<rootDir>/src/routes/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
    },
};
