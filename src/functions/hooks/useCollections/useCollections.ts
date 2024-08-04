import { collectionService } from "lib/apis/collection/services";
import useAppStore from "lib/stores/app/appStore";
import { useQuery } from "react-query";

const useCollections = () => {
    const { shop } = useAppStore()

    return useQuery({
        queryFn: () => collectionService(),
        queryKey: ["collectionList", shop._id],
        refetchOnWindowFocus: false
    })
}

export default useCollections