import { getShopBlogsService } from "lib/apis/blog/services";
import useAppStore from "lib/stores/app/appStore";
import { useQuery } from "react-query";

const useBlogs = (searchTerm: string) => {
    const { shop } = useAppStore()

    return useQuery({
        queryKey: ["collectionList", shop._id],
        queryFn: () => getShopBlogsService(shop._id)
    })
}

export default useBlogs