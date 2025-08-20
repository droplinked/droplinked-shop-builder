import useAppToast from "hooks/toast/useToast";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import { useQuery } from "react-query";
import { collectionService } from "services/collection/services";
import useAppStore from "stores/app/appStore";

const useCollections = () => {
    const { shop } = useAppStore()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("common")

    return useQuery({
        queryFn: collectionService,
        queryKey: ["collectionList", shop._id],
        onError: () => {
            showToast({ message: t("useCollections.error"), type: "error" })
        }
    })
}

export default useCollections