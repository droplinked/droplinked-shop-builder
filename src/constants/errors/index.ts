import permissionErrors from "./modules/permission";
import productErrors from "./modules/product";
import storeErrors from "./modules/store";

const AppErrors = {
    store: storeErrors,
    product: productErrors,
    permission: permissionErrors
}

export default AppErrors