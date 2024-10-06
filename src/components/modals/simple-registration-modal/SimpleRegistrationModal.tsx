import { Box, Flex, Heading, ModalBody, Spinner } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import useDebounce from "functions/hooks/debounce/useDebounce";
import useAppToast from "functions/hooks/toast/useToast";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import { checkUsernameAvailabilityService, createExtraShopForCurrentUserService, postCreateCircleWallet, updateShopNameService } from "lib/apis/shop/shopServices";
import useAppStore from "lib/stores/app/appStore";
import { appDevelopment } from "lib/utils/app/variable";
import useShopSwitcher from "pages/shop-management/hooks/useShopSwitch";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import WalletStatus from "components/common/walletStatus/WalletStatus";
import AppModal from "components/redesign/modal/AppModal";
import Button from "pages/invoice-management/components/Button";

type CommonProps = {
    isOpen: boolean;
};

type RegisterShopNameProps = CommonProps & {
    mode: "REGISTER_SHOP_NAME";
};

type CreateExtraShopProps = CommonProps & {
    mode: "CREATE_EXTRA_SHOP";
    close: () => void;
};

type Props = RegisterShopNameProps | CreateExtraShopProps;

function SimpleRegistrationModal(props: Props) {
    const { isOpen, mode } = props;
    const { shop } = useProfile();
    const { updateState } = useAppStore();
    const [username, setUsername] = useState("");
    const debouncedUsername = useDebounce(username, 1000);
    const [isUsernameAvailable, setUsernameAvailability] = useState<boolean | null>(null);
    const { mutateAsync: checkUsername, isLoading: isCheckingUsername } = useMutation(checkUsernameAvailabilityService);
    const { mutateAsync: updateUsername, isLoading: isUpdatingUsername } = useMutation(updateShopNameService);
    const { mutateAsync: createExtraShop, isLoading: isCreatingExtraShop } = useMutation(createExtraShopForCurrentUserService);
    const { mutateAsync: createWallet, isLoading: isCreatingWallet, isError, data: createWalletData } = useMutation(postCreateCircleWallet);
    const { isLoading, mutateAsync: switchShop } = useShopSwitcher();
    const { showToast } = useAppToast();
    const navigate = useNavigate();
    const isCreatingShop = mode === "CREATE_EXTRA_SHOP";
    const hasShopName = useMemo(() => shop?.name && !shop?.name?.startsWith("default_droplinked"), [shop?.name]);
    const handleInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (!/\s/.test(value)) setUsername(value);
        if (!value) setUsernameAvailability(null);
    };

    const renderUsernameAvailabilityIcon = () => {
        if (isCheckingUsername) return <Spinner />;
        else if (isUsernameAvailable === false) return <AppIcons.RedCircleCross />;
        else if (isUsernameAvailable) return <AppIcons.CircleCheck />;
        return null;
    };

    const handleUsernameRegistration = async () => {
        try {
            if (!isUsernameAvailable) return;
            const { data } = await updateUsername({ id: shop._id, shopName: username });
            updateState({ key: "user", params: data.data.user });
            updateState({ key: "shop", params: data.data.shop });
            await createWallet();
        } catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." });
        }
    };

    const handleCreateExtraShop = async () => {
        try {
            const {
                data: { _id },
            } = await createExtraShop(username);
            await switchShop(_id);
        } catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." });
        }
    };

    useEffect(() => {
        (async () => {
            await createWallet();
            try {
                if (!debouncedUsername) return;
                const { data } = await checkUsername(username);
                setUsernameAvailability(data.data);
            } catch (e) {
                const {
                    response: { data },
                } = e;
                showToast({ type: "error", message: data?.data?.message });
            }
        })();
    }, [debouncedUsername]);

    return (
        <AppModal
            modalRootProps={{ isOpen: isOpen, onClose: () => isCreatingShop && props.close(), size: hasShopName ? "3xl" : "xl", isCentered: true }}
            modalContentProps={hasShopName && { width: "auto !important", padding: "0px !important" }}
        >
            {!hasShopName ? (
                <ModalBody display="flex" flexDir="column" gap={128}>
                    <Flex justifyContent="center" pt={83}>
                        <Flex alignItems="center" gap={3} borderRadius={8} padding={"14px 16px"} bgColor="#fff" color="#7B7B7B">
                            <Flex>
                                <Box as="span" fontWeight={500}>{`${appDevelopment ? "dev." : ""}droplinked.io/`}</Box>
                                &nbsp;
                                <input value={username} placeholder="Type your URL" className={styles.input} onChange={handleInputChange} />
                            </Flex>
                            {renderUsernameAvailabilityIcon()}
                        </Flex>
                    </Flex>
                    <Flex direction="column" gap={14}>
                        <Flex direction="column" gap={2}>
                            <Heading margin={0} textAlign="center" fontSize={24} fontWeight={700} color="#fff">
                                Choose URL
                            </Heading>
                            <AppTypography fontSize={14} color="#fff">
                                Embark on your creator journey by crafting a unique username that sets you apart from the crowd.
                            </AppTypography>
                        </Flex>
                        <BasicButton
                            isLoading={isCreatingShop ? isCreatingExtraShop || isLoading : isUpdatingUsername}
                            isDisabled={
                                isCreatingShop ? !isUsernameAvailable || isCheckingUsername || isCreatingExtraShop || isLoading : !isUsernameAvailable || isCheckingUsername || isUpdatingUsername
                            }
                            onClick={isCreatingShop ? handleCreateExtraShop : handleUsernameRegistration}
                        >
                            Continue
                        </BasicButton>
                    </Flex>
                </ModalBody>
            ) : (
                <ModalBody
                    display="flex"
                    width={{ base: "360px", md: "625px" }}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="36px"
                    padding={"0px !important"}
                    paddingInline={"0px !important"}
                    paddingBlock={"0px !important"}
                    rounded="24px"
                >
                    <WalletStatus isLoading={isCreatingWallet && !isError} icon={createWalletData?.data?.data ? "tick" : "wallet"} sideIcons={false} />
                    <Box display="flex" padding="0px 48px 48px 48px" flexDirection="column" alignItems="center" gap="48px" flex="1 0 0" alignSelf="stretch">
                        <Box display="flex" flexDirection="column" alignItems="center" gap="12px" flex="1 0 0" alignSelf="stretch">
                            <AppTypography color="#FFF" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="36px">
                                {isCreatingWallet && !isError ? "Initializing Wallet" : "Wallet Created!"}
                            </AppTypography>
                            <AppTypography color="#B1B1B1" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                                {isCreatingWallet && !isError
                                    ? "Please wait while a new wallet is generated"
                                    : "You can now manage your funds, make transactions, and explore the full range of features."}
                            </AppTypography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                            <Button
                                backgroundColor={"#292929"}
                                border={"none"}
                                display="flex"
                                padding="12px 16px"
                                justifyContent="center"
                                alignItems="center"
                                color="#FFF"
                                textAlign="center"
                                fontFamily="Inter"
                                fontSize={{ base: "14px", md: "16px" }}
                                fontStyle="normal"
                                fontWeight="500"
                                lineHeight={{ base: "16px", md: "24px" }}
                            >
                                Close
                            </Button>
                        </Box>
                    </Box>
                </ModalBody>
            )}
        </AppModal>
    );
}

export default SimpleRegistrationModal;
