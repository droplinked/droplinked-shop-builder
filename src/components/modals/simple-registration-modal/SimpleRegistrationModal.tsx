import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import useDebounce from 'functions/hooks/debounce/useDebounce';
import useAppToast from 'functions/hooks/toast/useToast';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { IUpdateShopName } from 'lib/apis/shop/interfaces';
import { checkUsernameAvailabilityService, createExtraShopForCurrentUserService, updateShopNameService } from 'lib/apis/shop/shopServices';
import useAppStore from 'lib/stores/app/appStore';
import { appDevelopment } from 'lib/utils/app/variable';
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
    refetchUserShops: () => void;
}

type Props = RegisterShopNameProps | CreateExtraShopProps

function SimpleRegistrationModal(props: Props) {
    const { isOpen, mode } = props
    const { shop } = useProfile()
    const { updateState, } = useAppStore()
    const [username, setUsername] = useState("")
    const debouncedUsername = useDebounce(username, 1000)
    const [isUsernameAvailable, setUsernameAvailability] = useState<boolean | null>(null)
    const checkUsernameService = useMutation((shopName: string) => checkUsernameAvailabilityService(shopName))
    const UpdateUsernameService = useMutation((props: IUpdateShopName) => updateShopNameService(props))
    const createExtraShopService = useMutation((shopName: string) => createExtraShopForCurrentUserService(shopName))
    const { showToast } = useAppToast()
    const navigate = useNavigate()

    const handleInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (!/\s/.test(value)) setUsername(value)
        if (!value) setUsernameAvailability(null)
    }

    const handleUsernameRegistration = async () => {
        try {
            if (!isUsernameAvailable) return
            const { data } = await UpdateUsernameService.mutateAsync({ id: shop._id, shopName: username })
            updateState({ key: "user", params: data.data.user })
            updateState({ key: "shop", params: data.data.shop })
            navigate("/dashboard")
        } catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
        }
    }

    const renderUsernameAvailabilityIcon = () => {
        if (checkUsernameService.isLoading) return <Spinner />
        else if (isUsernameAvailable === false) return <AppIcons.RedCircleCross />
        else if (isUsernameAvailable) return <AppIcons.CircleCheck />
        return null
    }

    const handleCreateExtraShop = async () => {
        try {
            await createExtraShopService.mutateAsync(username)
            if (props.mode === "CREATE_EXTRA_SHOP") {
                const { close, refetchUserShops } = props
                close()
                refetchUserShops()
            }
        } catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
        }
    }

    useEffect(() => {
        (async () => {
            try {
                if (!debouncedUsername) return
                const { data } = await checkUsernameService.mutateAsync(username)
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
            close={() => {
                if (mode === "CREATE_EXTRA_SHOP") {
                    return props.close()
                }
            }}
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
                    {
                        mode === "REGISTER_SHOP_NAME" ?
                            <BasicButton
                                isDisabled={!isUsernameAvailable || UpdateUsernameService.isLoading || checkUsernameService.isLoading}
                                isLoading={UpdateUsernameService.isLoading}
                                onClick={handleUsernameRegistration}
                            >
                                Continue
                            </BasicButton>
                            :
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <BasicButton
                                    variant='outline'
                                    isDisabled={createExtraShopService.isLoading}
                                    onClick={() => props.close()}
                                >
                                    Cancel
                                </BasicButton>
                                <BasicButton
                                    isDisabled={!isUsernameAvailable || createExtraShopService.isLoading || checkUsernameService.isLoading}
                                    isLoading={createExtraShopService.isLoading}
                                    onClick={handleCreateExtraShop}
                                >
                                    Create
                                </BasicButton>
                            </Flex>
                    }
                </Flex>
            </Flex>
        </AppModal>
    )
}

export default SimpleRegistrationModal