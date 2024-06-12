import affiliateErrors from "./modules/affiliate";
import collectionErrors from "./modules/collection";
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
    affiliate: affiliateErrors,
    permission: permissionErrors
}

export default AppErrors