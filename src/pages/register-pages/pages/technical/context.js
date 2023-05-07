const { createContext } = require("react");

export const technicalContextState = {
    imsType: '',
    payments: []
}

const technicalContext = createContext({
    state: technicalContextState,
    updateState: () => { }
})

export default technicalContext