import collectionErrors from "./modules/collection";
import permissionErrors from "./modules/permission";
import productErrors from "./modules/product";
import signinErrors from "./modules/signin";
import signupErrors from "./modules/signup";
import storeErrors from "./modules/store";

const AppErrors = {
    signup: signupErrors,
    signin: signinErrors,
    store: storeErrors,
    product: productErrors,
    collection: collectionErrors,
    permission: permissionErrors
}

export default AppErrors