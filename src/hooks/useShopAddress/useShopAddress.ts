import useAppToast from "hooks/toast/useToast"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import { useQuery } from "react-query"
import { addressByIdService } from "services/address/addressServices"
import useAppStore from "stores/app/appStore"

const useShopAddress = () => {
    const { shop: { addressBookID } } = useAppStore()
    const { t } = useLocaleResources("common")
    const { showToast } = useAppToast()

    const { data, isFetching, error, refetch } = useQuery({
        queryKey: ["shopAddress", addressBookID],
        queryFn: () => addressByIdService({ addressID: addressBookID }),
        enabled: !!addressBookID,
        onError: () => {
            showToast({
                message: t("common:address.errors.fetchFailed"),
                type: "error",
            })
        },
    })

    return {
        addressBookID,
        isFetching,
        error,
        data: data?.data,
        refetch
    }
}

export default useShopAddress