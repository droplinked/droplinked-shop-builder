import { Box, Flex, Heading, Spinner } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { getInvitationDetails } from 'lib/apis/user/services'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import InvitationForm from './parts/form/InvitationForm'

function AcceptInvitation() {
    const { invitationId } = useParams()
    const { showToast } = useAppToast()
    const { shopNavigate } = useCustomNavigate()
    const { isFetching, data } = useQuery({
        queryFn: () => getInvitationDetails(invitationId),
        onError: (error) => {
            showToast({ type: "error", message: (error as Error).message })
            shopNavigate("")
        },
        refetchOnWindowFocus: false,
        retry: 1
    })

    return (
        <Flex justifyContent={"center"} paddingBlock={120} paddingInline={{ base: "16px", sm: "28px" }}>
            {
                isFetching ?
                    <Flex minHeight={"200px"} placeItems={"center"}><Spinner color='#fff' /></Flex> :
                    <Flex
                        width={{ base: "100%", lg: "50%" }}
                        maxWidth="1400px"
                        direction={"column"}
                        gap={12}
                        borderRadius={24}
                        backgroundColor={"#1c1c1c"}
                        padding={{ base: 6, md: 12 }}
                    >
                        <Flex direction={"column"} gap={2}>
                            <Heading margin={0} fontSize={24} fontWeight={700} color={"#fff"}>Welcome to droplinked!</Heading>
                            <AppTypography fontSize={14} color={"#fff"}>Sign up with your credentials to start managing your shop <Box as='span' fontWeight={600}>{data?.data.data.shop}</Box></AppTypography>
                        </Flex>
                        <InvitationForm invitationId={invitationId} email={data?.data.data.email || ""} />
                    </Flex>
            }
        </Flex>
    )
}


export default AcceptInvitation