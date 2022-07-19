// validation emails 

export const isValidEmail = (email) => {
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (regx.test(email)) {
        return true
    } else {
        return false
    }
}