const { createContext } = require("react");

export const technicalContextState = {
    imsType: ''
}

const technicalContext = createContext({
    state: technicalContextState,
    updateState: () => { }
})

export default technicalContext