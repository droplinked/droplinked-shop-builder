import React from "react";
import AffiliateProductsPage from "./AffiliateProductsPage";

export async function clientLoader() {
    return {
        isPublic: true,
    };
}

export default function AffiliateProductsPagePublic() {
    return <AffiliateProductsPage />;
}
