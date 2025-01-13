import axios from 'axios'
import { useMutation } from 'react-query'
import useAppToast from '../toast/useToast'

const useFileUpload = (url: string = "https://tools.droplinked.com/upload") => {
    const { showToast } = useAppToast()

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post(url, formData)
            return response.data
        },
        onError: () => showToast({ type: "error", message: "Upload failed!" })
    })
}

export default useFileUpload