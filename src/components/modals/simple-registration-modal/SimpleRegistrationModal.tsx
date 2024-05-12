import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import useDebounce from 'functions/hooks/debounce/useDebounce';
import useAppToast from 'functions/hooks/toast/useToast';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { checkUsernameAvailabilityService, updateUsernameService } from 'lib/apis/shop/shopServices';
import useAppStore from 'lib/stores/app/appStore';
import { appDevelopment } from 'lib/utils/app/variable';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.scss";

function SimpleRegistrationModal({ isOpen }: { isOpen: boolean }) {
    const { shop, updateShopData, profile } = useProfile()
    const { updateState, } = useAppStore()
    const [username, setUsername] = useState("")
    const debouncedUsername = useDebounce(username, 1000)
    const [isUsernameAvailable, setUsernameAvailability] = useState<boolean | null>(null)
    const checkUsernameService = useMutation((shopName: string) => checkUsernameAvailabilityService(shopName))
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()
    const navigate = useNavigate()

    const handleInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (!/\s/.test(value)) setUsername(value)
        if (!value) setUsernameAvailability(null)
    }

    const handleUsernameRegistration = async () => {
        try {
            if (!isUsernameAvailable) return
            setLoading(true)
            const { data } = await updateUsernameService({ id: shop._id, shopName: username })
            updateState({ key: "user", params: data.data.user })
            updateState({ key: "shop", params: data.data.shop })
            navigate("/dashboard")
        } catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
        }
        finally {
            setLoading(false)
        }
    }

    const renderUsernameAvailabilityIcon = () => {
        if (checkUsernameService.isLoading) return <Spinner />
        else if (isUsernameAvailable === false) return <AppIcons.RedCircleCross />
        else if (isUsernameAvailable) return <AppIcons.CircleCheck />
        return null
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
        <AppModal open={isOpen} close={() => { }} size="xl">
            <Flex direction="column" gap={128}>
                <Flex justifyContent="center" pt={83}>
                    <Flex alignItems="center" gap={3} borderRadius={8} padding={"14px 16px"} bgColor="#fff" color="#B1B1B1">
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
                        isDisabled={!isUsernameAvailable || isLoading || checkUsernameService.isLoading}
                        isLoading={isLoading}
                        onClick={handleUsernameRegistration}
                    >
                        Continue
                    </BasicButton>
                </Flex>
            </Flex>
        </AppModal>
    )
}

export default SimpleRegistrationModal