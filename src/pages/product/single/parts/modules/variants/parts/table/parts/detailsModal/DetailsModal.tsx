import { Box, Flex, VStack } from "@chakra-ui/react"
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay"
import ClipboardText from "components/common/clipboardText/ClipboardText"
import AppImage from "components/common/image/AppImage"
import AppModal from "components/common/modal/AppModal"
import AppTypography from "components/common/typography/AppTypography"
import useAppToast from "functions/hooks/toast/useToast"
import { Isku } from "lib/apis/product/interfaces"
import { getSkuByIdService } from "lib/apis/sku/services"
import requestsModel from "pages/affiliate/requests/parts/list/model"
import React, { useMemo } from "react"
import { useQuery } from "react-query"
import DetailsModalSkeleton from "./parts/DetailsModalSkeleton"

interface Props {
    open: boolean
    close: Function,
    sku: Isku
}

function DetailsModal({ open, close, sku }: Props) {
    const { showToast } = useAppToast()
    const { getVariant } = requestsModel
    const { isLoading, data } = useQuery({
        queryKey: ["sku", sku._id],
        queryFn: () => getSkuByIdService(sku._id),
        onError: (error) => {
            showToast((error as Error).message, "error")
            close()
        },
        refetchOnWindowFocus: false
    })
    const response = useMemo(() => data?.data.data, [data])
    const variant = getVariant(response?.sku)
    const skuAttributes = [
        { label: "Variant Price:", value: `$ ${response?.sku.price} USD` },
        { label: "Commission:", value: `% ${response?.sku.recordData.commision}` },
        { label: "Deploy Hash:", value: response?.sku.deploy_hash },
    ]

    return <AppModal
        open={open}
        close={close}
        size={"2xl"}
        contentProps={{
            padding: "50px",
            maxWidth: "95%",
            width: "720px",
        }}
        isCentered={false}
        title={"Drop Information"}
    >
        {
            isLoading ?
                <DetailsModalSkeleton />
                :
                <VStack align={"stretch"} gap={"36px"}>
                    <Flex gap={"16px"} height={"54px"}>
                        <AppImage src={response?.product?.media.find(el => el.isMain === 'true')?.thumbnail} width="54px" height="54px" borderRadius="4px" />
                        <Flex direction={"column"} justifyContent={"space-between"} height={"54px"}>
                            <AppTypography color={"#ffffff"} fontSize={"16px"}>{response?.product?.title}</AppTypography>
                            <Flex alignItems={"center"} gap={"7.5px"}>
                                <Box
                                    backgroundColor={variant.color.value}
                                    width="20px"
                                    height="20px"
                                    borderRadius="100%">
                                </Box>
                                <AppTypography color={"#c2c2c2"} fontSize={"16px"}>{variant.size.value}</AppTypography>
                            </Flex>
                        </Flex>
                    </Flex>

                    <VStack align={"stretch"} gap={"18px"} color={"#c2c2c2"} as="dl">
                        {skuAttributes.filter(el => el.value).map((el, key) =>
                            <Flex alignItems={"center"} justifyContent="space-between" wrap={"wrap"} rowGap="7.5px" key={key}>
                                <Flex alignItems={"center"}>
                                    <AppTypography minWidth={"140px"} fontSize={"14px"} as="dt">{el.label}</AppTypography>
                                    <AppTypography fontSize={"14px"} as="dd">
                                        {el.label !== 'Deploy Hash:' ? el.value : el.value.slice(0, 40) + "..."}
                                    </AppTypography>
                                </Flex>
                                {el.label === 'Deploy Hash:' && <ClipboardText text={el.value} />}
                            </Flex>
                        )}
                    </VStack>

                    <Flex alignItems={"center"} gap={"5px"}>
                        <AppTypography color={"#c2c2c2"} fontSize={"12px"}>Dropped on</AppTypography>
                        <BlockchainDisplay
                            blockchain={response?.sku.recordData.recordNetwork}
                            show="icon"
                            props={{ width: "15px" }}
                        />
                        <AppTypography color={"#FF473E"} fontSize={"12px"}>
                            {response?.sku.recordData.recordNetwork} Blockchain
                        </AppTypography>
                    </Flex>
                </VStack >
        }
    </AppModal >
}

export default DetailsModal