import CreateWallet from "components/modals/create-wallet/CreateWallet";
import SimpleRegistrationModal from "components/modals/simple-registration-modal/SimpleRegistrationModal";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function SimpleRegistration() {
    const { shop } = useProfile();
    const navigate = useNavigate();
    const hasShopName = useMemo(() => shop?.name && !shop?.name?.startsWith("default_droplinked"), [shop?.name]);
    const hasCreatedCircleWallet = useMemo(() => Boolean(shop?.circleWallets?.length), [shop?.circleWallet]);
    const [modal, setModal] = useState<"URL" | "WALLET">(hasShopName ? "WALLET" : "URL");
    const toggleModal = () => {
        if (hasCreatedCircleWallet) navigate("/analytics");
        else setModal("WALLET");
    };
    useEffect(() => {
        if (hasShopName && hasCreatedCircleWallet) navigate("/analytics");
        console.log(hasShopName, hasCreatedCircleWallet)
    }, [hasCreatedCircleWallet, hasShopName]);

    if (modal === "URL") return <SimpleRegistrationModal isOpen={true} mode="REGISTER_SHOP_NAME" toggleModal={toggleModal} />;
    else if (modal === "WALLET") return <CreateWallet hasCreatedCircleWallet={hasCreatedCircleWallet} />;
    else return <></>;
}

export default SimpleRegistration;
