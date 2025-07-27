import axios from 'axios'
import { useMutation } from 'react-query'
import useAppToast from '../toast/useToast'
import useLocaleResources from '../useLocaleResources/useLocaleResources'

const useFileUpload = (url: string = "https://tools.droplinked.com/upload") => {
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('common')

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post(url, formData)
            return response.data
        },
        onError: () => showToast({ type: "error", message: t('hooks.errors.uploadFailed') })
    })
}

export default useFileUpload