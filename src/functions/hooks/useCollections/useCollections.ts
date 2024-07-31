import { collectionService } from "lib/apis/collection/services";
import { useQuery } from "react-query";

const useCollections = () => useQuery({
    queryFn: () => collectionService(),
    queryKey: ["collectionList"],
    refetchOnWindowFocus: false
})

export default useCollections