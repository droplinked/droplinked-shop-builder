import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import useAppToast from 'hooks/toast/useToast'
import { ShopOAuth2Client } from 'services/shop/interfaces'
import { updateShopAPIKeyService } from 'services/shop/shopServices'
import { useHasPermission } from 'stores/app/appStore'
import { domainRegex } from 'utils/helpers'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    refetch: () => void;
    domains: string[];
}

export default function DomainField({ refetch, domains }: Props) {
    const { t } = useLocaleResources('settings');
    const [value, setValue] = useState("")
    const hasPermission = useHasPermission()
    const hasShopApiPermission = hasPermission("shopfront_apis")
    const { mutateAsync, isLoading } = useMutation((params: ShopOAuth2Client) => updateShopAPIKeyService(params))
    const { showToast } = useAppToast()

    const handleUpdateShopAPIKey = async () => {
        try {
            if (!domainRegex.test(value)) throw Error(t("PublicApiKey.domain.errorValidDomain"));
            if (domains?.length) {
                if (domains?.includes(value)) throw Error(t("PublicApiKey.domain.errorDomainExists"));
                await mutateAsync({ domains: [...domains, value] });
            } else {
                await mutateAsync({ domains: [value] });
            }
            refetch();
            showToast({ message: t("PublicApiKey.domain.addSuccess", { value: value }), type: "success" });
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" });
        }
    };

    return (
        <AppInput
            inputProps={{
                isDisabled: !hasShopApiPermission,
                                    placeholder: t("PublicApiKey.domain.placeholder"),
                value,
                onChange: (e) => setValue(e.target.value)
            }}
            inputContainerProps={{ padding: 2, paddingLeft: 4 }}
            rightElement={
                <AppButton
                    borderRadius={4}
                    isLoading={isLoading}
                    isDisabled={!hasShopApiPermission}
                    fontSize={"12px"}
                    height={"32px"}
                    paddingInline={{ base: 3, lg: 3 }}
                    padding={1}
                    onClick={handleUpdateShopAPIKey}
                >
                    {t("PublicApiKey.domain.buttonText")}
                </AppButton>
            }
        />
    )
}
