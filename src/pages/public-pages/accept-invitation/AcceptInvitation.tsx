import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/accept-invitation/ar.json'
import enLocale from 'locales/public-pages/accept-invitation/en.json'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getInvitationDetails } from 'services/user/services'
import InvitationForm from './parts/form/InvitationForm'

function AcceptInvitation() {
    const { invitationId } = useParams()
    const navigate = useNavigate()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("acceptInvitation", { en: enLocale, ar: arLocale })
    const { isFetching, data } = useQuery({
        queryFn: () => getInvitationDetails(invitationId),
        onError: () => {
            navigate("/")
            showToast({ type: "error", message: t("common:genericError") })
        }
    })

    return (
        <Flex justifyContent="center" paddingBlock={120} paddingInline={{ base: "16px", sm: "28px" }}>
            {
                isFetching
                    ? (
                        <Flex minHeight="200px" placeItems="center">
                            <Spinner color='#fff' />
                        </Flex>
                    )
                    : (
                        <Flex
                            width={{ base: "100%", lg: "50%" }}
                            maxWidth="1400px"
                            direction="column"
                            gap={12}
                            borderRadius={24}
                            backgroundColor="neutral.gray.1000"
                            padding={{ base: 6, md: 12 }}
                            zIndex={1}
                        >
                            <Flex direction="column" gap={2}>
                                <Heading margin={0} fontSize={24} fontWeight={700} color="text.white">
                                    {t("AcceptInvitation.welcomeToDroplinked")}
                                </Heading>
                                <Text fontSize={14} color="text.white">
                                    {t("AcceptInvitation.signUpCredentials")}
                                    <Box as='span' fontWeight={600}>
                                        {data?.data?.shop}
                                    </Box>
                                </Text>
                            </Flex>
                            <InvitationForm invitationId={invitationId} email={data?.data?.email} />
                        </Flex>
                    )
            }
        </Flex>
    )
}

export default AcceptInvitation