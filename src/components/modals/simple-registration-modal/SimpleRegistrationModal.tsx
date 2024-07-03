import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import useDebounce from 'functions/hooks/debounce/useDebounce';
import useAppToast from 'functions/hooks/toast/useToast';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { checkUsernameAvailabilityService, createExtraShopForCurrentUserService, updateShopNameService } from 'lib/apis/shop/shopServices';
import useAppStore from 'lib/stores/app/appStore';
import { appDevelopment } from 'lib/utils/app/variable';
import useShopSwitcher from 'pages/shop-management/hooks/useShopSwitch';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.scss";

type CommonProps = {
    isOpen: boolean;
}

type RegisterShopNameProps = CommonProps & {
    mode: "REGISTER_SHOP_NAME";
}

type CreateExtraShopProps = CommonProps & {
    mode: "CREATE_EXTRA_SHOP";
    close: () => void;
}

type Props = RegisterShopNameProps | CreateExtraShopProps

function SimpleRegistrationModal(props: Props) {
    const { isOpen, mode } = props
    const { shop } = useProfile()
    const { updateState, } = useAppStore()
    const [username, setUsername] = useState("")
    const debouncedUsername = useDebounce(username, 1000)
    const [isUsernameAvailable, setUsernameAvailability] = useState<boolean | null>(null)
    const { mutateAsync: checkUsername, isLoading: isCheckingUsername } = useMutation(checkUsernameAvailabilityService)
    const { mutateAsync: updateUsername, isLoading: isUpdatingUsername } = useMutation(updateShopNameService)
    const { mutateAsync: createExtraShop, isLoading: isCreatingExtraShop } = useMutation(createExtraShopForCurrentUserService);
    const { isLoading, mutateAsync: switchShop } = useShopSwitcher()
    const { showToast } = useAppToast()
    const navigate = useNavigate()
    const isCreatingShop = mode === "CREATE_EXTRA_SHOP"

    const handleInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (!/\s/.test(value)) setUsername(value)
        if (!value) setUsernameAvailability(null)
    }

    const renderUsernameAvailabilityIcon = () => {
        if (isCheckingUsername) return <Spinner />
        else if (isUsernameAvailable === false) return <AppIcons.RedCircleCross />
        else if (isUsernameAvailable) return <AppIcons.CircleCheck />
        return null
    }

    const handleUsernameRegistration = async () => {
        try {
            if (!isUsernameAvailable) return
            const { data } = await updateUsername({ id: shop._id, shopName: username })
            updateState({ key: "user", params: data.data.user })
            updateState({ key: "shop", params: data.data.shop })
            navigate("/dashboard")
        } catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
        }
    }

    const handleCreateExtraShop = async () => {
        try {
            const { data: { _id } } = await createExtraShop(username)
            await switchShop(_id)
        } catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
        }
    }

    useEffect(() => {
        (async () => {
            try {
                if (!debouncedUsername) return
                const { data } = await checkUsername(username)
                setUsernameAvailability(data.data)
            }
            catch (e) {
                const { response: { data } } = e
                showToast({ type: "error", message: data?.data?.message })
            }
        })()
    }, [debouncedUsername])

    return (
        <AppModal
            open={isOpen}
            size="xl"
            close={() => mode === "CREATE_EXTRA_SHOP" && props.close()}
        >
            <Flex direction="column" gap={128}>
                <Flex justifyContent="center" pt={83}>
                    <Flex alignItems="center" gap={3} borderRadius={8} padding={"14px 16px"} bgColor="#fff" color="#7B7B7B">
                        <Flex>
                            <Box as='span' fontWeight={500}>{`${appDevelopment ? "dev." : ""}droplinked.io/`}</Box>
                            &nbsp;
                            <input value={username} placeholder='Type your URL' className={styles.input} onChange={handleInputChange} />
                        </Flex>
                        {renderUsernameAvailabilityIcon()}
                    </Flex>
                </Flex>
                <Flex direction="column" gap={14}>
                    <Flex direction="column" gap={2}>
                        <Heading margin={0} textAlign="center" fontSize={24} fontWeight={700} color="#fff">Choose URL</Heading>
                        <AppTypography fontSize={14} color="#fff">Embark on your creator journey by crafting a unique username that sets you apart from the crowd.</AppTypography>
                    </Flex>
                    <BasicButton
                        isLoading={isCreatingShop ? isCreatingExtraShop || isLoading : isUpdatingUsername}
                        isDisabled={isCreatingShop ?
                            !isUsernameAvailable || isCheckingUsername || isCreatingExtraShop || isLoading :
                            !isUsernameAvailable || isCheckingUsername || isUpdatingUsername
                        }
                        onClick={isCreatingShop ? handleCreateExtraShop : handleUsernameRegistration}
                    >
                        Continue
                    </BasicButton>
                </Flex>
            </Flex>
        </AppModal>
    )
}

export default SimpleRegistrationModal