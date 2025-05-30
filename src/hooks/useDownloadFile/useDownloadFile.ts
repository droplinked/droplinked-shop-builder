import useAppToast from 'hooks/toast/useToast'
import { useMutation } from 'react-query'

type FileNameResolver<T> = (params: T, data: Blob) => string

interface UseDownloadOptions<T> {
    fetcher: (params: T) => Promise<Blob>
    fileNameResolver?: FileNameResolver<T>
    onSuccess?: (data: Blob, params: T) => void
    onError?: (error: Error, params: T) => void,
    onSettled?: (data: Blob, error: any, params: T) => void
}

function useDownloadFile<T>({
    fetcher,
    fileNameResolver,
    onSuccess,
    onError,
    onSettled
}: UseDownloadOptions<T>) {
    const { showToast } = useAppToast()
    const mutation = useMutation(
        (params: T) => fetcher(params),
        {
            onSuccess: (data, params) => {
                const url = window.URL.createObjectURL(data)
                const link = document.createElement('a')
                link.href = url
                const name = fileNameResolver
                    ? fileNameResolver(params, data)
                    : `${Date.now()}.xlsx`
                link.download = name
                document.body.appendChild(link)
                link.click()
                link.remove()
                setTimeout(() => window.URL.revokeObjectURL(url), 100)
                onSuccess?.(data, params)
            },
            onError: (error: any, params) => {
                showToast({ message: "Failed to download file", type: 'error' })
                onError?.(error, params)
            },
            onSettled: (data, error, params) => onSettled?.(data, error, params)
        }
    )

    return {
        download: mutation.mutate,
        isLoading: mutation.isLoading
    }
}

export default useDownloadFile