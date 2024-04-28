import { Box, Flex, Heading, Image, Spinner } from '@chakra-ui/react'
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
        <Box position="relative" >
            <Image src='/assets/images/homepage/ef1.png' position="fixed" top={{ base: "-100px", md: "-300px" }} right={{ base: "-200px", lg: "0" }} zIndex="0" />
            <Image src='/assets/images/homepage/ef2.png' width="800px" position="absolute" bottom="-300px" left="0" zIndex="0" />
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
                            zIndex={1}
                        >
                            <Flex direction={"column"} gap={2}>
                                <Heading margin={0} fontSize={24} fontWeight={700} color={"#fff"}>Welcome to droplinked!</Heading>
                                <AppTypography fontSize={14} color={"#fff"}>Sign up with your credentials to start managing your shop <Box as='span' fontWeight={600}>{data?.data.data.shop}</Box></AppTypography>
                            </Flex>
                            <InvitationForm invitationId={invitationId} email={data?.data.data.email || ""} />
                        </Flex>
                }
            </Flex>
        </Box>
    )
}


export default AcceptInvitation