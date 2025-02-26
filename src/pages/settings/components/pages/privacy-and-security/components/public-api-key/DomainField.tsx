import Button from 'components/redesign/button/Button'
import Input from 'components/redesign/input/Input'
import useAppToast from 'hooks/toast/useToast'
import { ShopOAuth2Client } from 'lib/apis/shop/interfaces'
import { updateShopAPIKeyService } from 'lib/apis/shop/shopServices'
import { useHasPermission } from 'lib/stores/app/appStore'
import { domainRegex } from 'lib/utils/helpers/regex'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

interface Props {
    refetch: () => void;
    domains: string[];
}

export default function DomainField({ refetch, domains }: Props) {
    const [value, setValue] = useState("")
    const hasPermission = useHasPermission()
    const hasShopApiPermission = hasPermission("shopfront_apis")
    const { mutateAsync, isLoading } = useMutation((params: ShopOAuth2Client) => updateShopAPIKeyService(params))
    const { showToast } = useAppToast()

    const handleUpdateShopAPIKey = async () => {
        try {
            if (!domainRegex.test(value)) throw Error("Please enter a valid domain.")
            if (domains.includes(value)) throw Error("Domain already exists.")
            await mutateAsync({ domains: [...domains, value] })
            refetch()
            showToast({ message: `${value} added successfully.`, type: "success" })
        }
        catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }

    return (
        <Input
            inputProps={{ isDisabled: !hasShopApiPermission, placeholder: "Domain.com", value, onChange: (e) => setValue(e.target.value) }}
            inputContainerProps={{ padding: 2, paddingLeft: 4 }}
            rightElement={
                <Button
                    borderRadius={4}
                    isLoading={isLoading}
                    isDisabled={!hasShopApiPermission}
                    fontSize={"12px"}
                    height={"32px"}
                    paddingInline={{ base: 3, lg: 3 }}
                    padding={1}
                    onClick={handleUpdateShopAPIKey}
                >
                    Generate API Key
                </Button>
            }
        />
    )
}
