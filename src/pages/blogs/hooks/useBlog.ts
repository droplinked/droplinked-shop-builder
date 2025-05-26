import useAppToast from "hooks/toast/useToast";
import { getBlogByIdService } from "services/blog/services";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const useBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { showToast } = useAppToast()

    return useQuery({
        queryKey: ['blog', id],
        queryFn: async () => getBlogByIdService(id),
        enabled: !!id,
        onError: () => {
            showToast({
                type: 'error',
                message: 'Failed to fetch blog'
            })
            navigate('/analytics/blogs')
        }
    })
}

export default useBlog