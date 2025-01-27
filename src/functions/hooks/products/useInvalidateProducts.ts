import { useQueryClient } from "react-query"

export default function useInvalidateProductsQuery() {
    const queryClient = useQueryClient()

    const invalidateProductsQuery = () => {
        queryClient.invalidateQueries(["PRODUCTS"])
    }

    return { invalidateProductsQuery }
}