import { Flex, HStack, VStack } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import UpgradePlanModalContainer from "components/modals/upgrade-plan-modal/UpgradePlanModalContainer";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import useUpgradeHandler from "hooks/subscription/useUpgradeHandler";
import { useProfile } from "hooks/useProfile/useProfile";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { IshopUpdateService } from "services/shop/interfaces";
import { shopUpdateService } from "services/shop/shopServices";
import useAppStore from "stores/app/appStore";
import { initialTileDesignState, TileDesignContext } from "./context/tile.design.context";
import TileDesignForm from "./tile.design.form";
import TileDesignHeader from "./tile.design.header";
import TileDesignPageInformation from "./tile.design.page.information";
import TileDesignPagePayment from "./tile.design.page.payment";
import TileDesignPagePostPurchase from "./tile.design.page.post.purchase";
import TileDesignPageProduct from "./tile.design.page.product";
import TileDesignPageShipping from "./tile.design.page.shipping";
import { ITileDesignState, PRODUCT_SECTIONS_ENUM, TILE_DESIGN_PAGES_ENUM } from "./types/tile.design.types";

const TileDesign = () => {
    const { handleFeatureAccess, isUpgradeModalOpen, closeUpgradeModal } = useUpgradeHandler()
    const { t } = useLocaleResources('tile-design');
    const { shop } = useAppStore();
    const { updateShopData } = useProfile();
    const [States, setState] = useState<ITileDesignState>(shop?.productTileStyle ? { design: { ...initialTileDesignState.design, ...shop?.productTileStyle, }, current: initialTileDesignState?.current } : initialTileDesignState);
    const { mutateAsync, isLoading } = useMutation((params: IshopUpdateService) => shopUpdateService(params));

    const updateFormFields = useCallback(({ page, section, key, value }: { page: TILE_DESIGN_PAGES_ENUM; section: PRODUCT_SECTIONS_ENUM | "none"; key: string; value: any }) => {
        setState((prevState) => ({
            ...prevState,
            design: {
                ...prevState.design,
                [page]: {
                    ...prevState.design[page],
                    [section]: {
                        ...prevState.design[page][section],
                        [key]: value,
                    },
                },
            },
        }));
    }, []);
    const updateState = (key: "current" | "design", value: Pick<ITileDesignState, "current"> | Pick<ITileDesignState, "design">) => setState((prev) => ({ ...prev, [key]: value }));
    const submit = async () => {
        handleFeatureAccess(async () => {
            if (isLoading) return null;
            await mutateAsync({ productTileStyle: States?.design, currencyAbbreviation: shop?.currencyAbbreviation })
                .then(async (res) => await updateShopData())
                .catch((e) => { });
        });
    };

    const component_to_show = () => {
        switch (States?.current?.page) {
            case TILE_DESIGN_PAGES_ENUM.PRODUCT:
                return (
                    <>
                        <HStack align={"center"} width={"full"} justifyContent={"center"}>
                            <TileDesignPageProduct />
                            <TileDesignForm />
                        </HStack>
                        <Flex justifyContent="flex-end" width={"full"} gap={"8px"}>
                            <BasicButton variant="outline">{t('common:cancel')}</BasicButton>
                            <BasicButton isLoading={isLoading} onClick={submit} isDisabled={JSON.stringify(initialTileDesignState) === JSON.stringify(States) || isLoading}>
                                {t('common:save')}
                            </BasicButton>
                        </Flex>
                    </>
                );
            case TILE_DESIGN_PAGES_ENUM.INFORMATION:
                return <TileDesignPageInformation />;
            case TILE_DESIGN_PAGES_ENUM.SHIPPING:
                return <TileDesignPageShipping />;
            case TILE_DESIGN_PAGES_ENUM.PAYMENT:
                return <TileDesignPagePayment />;
            case TILE_DESIGN_PAGES_ENUM.POST_PURCHASE:
                return <TileDesignPagePostPurchase />;
            default:
                break;
        }
    };
    return (
        <TileDesignContext.Provider value={{ state: States, methods: { updateFormFields, updateState } }}>
            <VStack
                alignItems="center"
                width="full"
                justifyContent="center"
                height="auto"
                background="radial-gradient(305.12% 110.25% at 13.65% 81.01%, #182522 1.56%, rgba(48, 48, 48, 0.08) 23.53%, rgba(46, 73, 63, 0.42) 44.64%, #171717 79.55%, #000 100%), linear-gradient(rgba(255, 255, 255, 0.16) .1em, transparent .1em), linear-gradient(90deg, rgba(255, 255, 255, 0.16) .1em, transparent .1em), #060606"
                backgroundPosition="center, 0 0, 0 0"
                backgroundSize="cover, 3em 3em, 3em 3em"
                backgroundRepeat="no-repeat, repeat, repeat"
            >
                <VStack
                    align={"stretch"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    w={"90%"}
                    h={"90%"}
                    position={"relative"}
                    padding={"24px 32px"}
                    borderRadius="16px"
                    background="rgba(0, 0, 0, 0.24)"
                    backdropFilter="blur(8px)"
                >
                    <TileDesignHeader />
                    {component_to_show()}
                </VStack>
            </VStack>

            <UpgradePlanModalContainer
                isOpen={isUpgradeModalOpen}
                onClose={closeUpgradeModal}
                initialActiveTab={'enterprise'}
            />
        </TileDesignContext.Provider>
    );
};

export default TileDesign;
