import { collectionService } from "services/collection/services";
import useAppStore from "stores/app/appStore";
import { useQuery } from "react-query";

const useCollections = () => {
    const { shop } = useAppStore()

    return useQuery({
        queryFn: collectionService,
        queryKey: ["collectionList", shop._id],
    })
}

export default useCollections