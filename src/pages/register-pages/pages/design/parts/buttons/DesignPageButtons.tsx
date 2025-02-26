import { Flex } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import useAppToast from "hooks/toast/useToast";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useProfile } from "hooks/useProfile/useProfile";
import { isDateExpired } from "lib/utils/helpers/helpers";
import React, { useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { designContext, initialStateDesignPage } from "../../design-context";
import designPageButtonsModel from "./model";
import useGrowthHackStore from "lib/stores/growth-hack/useGrowthHackStore";

function DesignPageButtons() {
    const { state: { shop }, methods: { dispatch } } = useContext(designContext);
    const { growthHackData, fetchGrowthHackData } = useGrowthHackStore();
    const { setShopData: { update, loading }, updateShopData } = useProfile();
    const { showToast } = useAppToast();
    const { shopNavigate } = useCustomNavigate();
    const currentPath = useLocation().pathname;
    const isRegister = currentPath.includes("register");
    const { refactorLinks, deep_validate_and_transform } = designPageButtonsModel;

    const validate = useCallback(() => {
        return new Promise<any>((resolve, reject) => {

            if (!shop.logo.length) reject("Please choose profile logo");
            else if (!shop.headerIcon.length) reject("Please choose header logo");
            else if (!shop.backgroundImage.length) reject("Please choose Hero Image");
            else if (shop.launchDate && isDateExpired(shop.launchDate)) reject("Please choose a further date for launch time")
            else resolve(true);
        });
    }, [shop]);

    const submit = useCallback(async () => {
        try {
            await validate();
            await update({
                ...shop,
                shopDesign: {
                    ...shop.shopDesign,
                    bannerLinks: shop.shopDesign.bannerLinks.length ? refactorLinks(shop.shopDesign.bannerLinks) : [],
                    footerLinks: shop.shopDesign.footerLinks.length ? refactorLinks(shop.shopDesign.footerLinks) : [],
                },
                template_options: { ...deep_validate_and_transform(shop.template_options) },
            });
            if (!growthHackData?.list?.customizeShop) await fetchGrowthHackData()
            updateShopData();
            showToast({ message: "Store design has been updated", type: "success" });
            if (isRegister) shopNavigate(`register/technical`);
        } catch (error) {
            showToast({ message: error, type: "error" });
        }
    }, [shop, isRegister]);

    return (
        <Flex justifyContent="space-between" flexDirection="row-reverse">
            <Flex gap="16px">
                <BasicButton variant="ghost" sizes="large" onClick={() => dispatch({ type: "updateState", params: { device: initialStateDesignPage.device, shop: initialStateDesignPage.shop } })}>
                    Reset
                </BasicButton>
                <BasicButton sizes="large" isDisabled={!shop.logo.length || !shop.headerIcon.length || !shop.backgroundImage.length} isLoading={loading} onClick={submit}>
                    {isRegister ? "Next" : "Update"}
                </BasicButton>
            </Flex>
            {isRegister && (
                <BasicButton variant="outline" sizes="large" onClick={() => shopNavigate(`register/shop-info`)}>
                    back
                </BasicButton>
            )}
        </Flex>
    );
}

export default DesignPageButtons;