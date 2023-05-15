import productErrors from "./modules/product";
import signinErrors from "./modules/signin";
import signupErrors from "./modules/signup";
import storeErrors from "./modules/store";

const AppErrors = {
    signup: signupErrors,
    signin: signinErrors,
    store: storeErrors,
    product: productErrors,
}

export default AppErrors