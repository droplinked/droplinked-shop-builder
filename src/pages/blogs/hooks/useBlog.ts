import { getBlogByIdService } from "lib/apis/blog/services";
import useAppStore from "lib/stores/app/appStore";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useBlog = () => {
    const { slug } = useParams()
    const { shop } = useAppStore()

    return useQuery({
        queryKey: ['blog', slug],
        queryFn: async () => getBlogByIdService(shop._id, slug),
        enabled: !!slug
    })
}

export default useBlog