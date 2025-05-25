import useAppToast from "hooks/toast/useToast"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import { getChangelogEntry } from "lib/apis/changelog/services"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"

const useChangelogEntry = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useLocaleResources('changelogPage')
    const { showToast } = useAppToast()

    return useQuery({
        queryKey: ['changelog-entry', id],
        queryFn: () => getChangelogEntry(id),
        enabled: !!id,
        onError: () => {
            showToast({
                type: 'error',
                message: t('entry_load_failed')
            })
            navigate('/analytics/changelog')
        }
    })
}

export default useChangelogEntry