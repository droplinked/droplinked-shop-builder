import { Skeleton } from "@chakra-ui/react"
import FormFieldWrapper from "components/redesign/form-field-wrapper/FormFieldWrapper"
import AppSelect from "components/redesign/select/AppSelect"
import { supportedChainsService } from "services/sku/services"
import useProductForm from "pages/products/hooks/useProductForm"
import React from "react"
import { useQuery } from "react-query"
import chainNameMap from "utils/constants/blockchainMap"

interface Props {
    isDropEnabled: boolean
}

export default function BlockchainNetworkSelector({ isDropEnabled }: Props) {
    const { values: { digitalDetail, nftData }, setFieldValue } = useProductForm()
    const { data, isFetching } = useQuery({
        queryFn: supportedChainsService,
        enabled: isDropEnabled
    })

    const blockchainNetworks = formatBlockchainNetworks(data)

    const handleNetworkChange = (value: string) =>
        setFieldValue('digitalDetail', { ...digitalDetail, chain: value })

    return (
        <FormFieldWrapper
            label="Blockchain Network"
            description="Choose the blockchain network where product details will be recorded as an NFT."
            rightContent={
                <Skeleton isLoaded={!isFetching}>
                    <AppSelect
                        items={blockchainNetworks}
                        labelAccessor="label"
                        valueAccessor="value"
                        selectProps={{
                            width: '174px',
                            placeholder: 'Select network',
                            value: digitalDetail?.chain || nftData?.networkName,
                            onChange: (e) => handleNetworkChange(e.target.value)
                        }}
                    />
                </Skeleton>
            }
        />
    )
}

const formatBlockchainNetworks = (data: any) => {
    return (data?.data?.data || []).map((chain: string) => ({
        label: chainNameMap[chain],
        value: chain
    }))
}