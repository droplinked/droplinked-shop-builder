import useAppToast from "hooks/toast/useToast";
import { getBlogByIdService } from "services/blog/services";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

const useBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("blogs")

    return useQuery({
        queryKey: ['blog', id],
        queryFn: async () => getBlogByIdService(id),
        enabled: !!id,
        onError: () => {
            showToast({
                type: 'error',
                message: t("useBlog.error.fetchBlog")
            })
            navigate('/analytics/blogs')
        }
    })
}

export default useBlog