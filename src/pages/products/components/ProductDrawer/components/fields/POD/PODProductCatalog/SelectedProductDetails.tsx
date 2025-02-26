import useAppToast from "hooks/toast/useToast"
import { podProductService } from "lib/apis/pod/services"
import useProductForm from "pages/products/hooks/useProductForm"
import useProductPageStore from "pages/products/stores/ProductPageStore"
import React from "react"
import { useQuery } from "react-query"
import LoadingPlaceholder from "../../../common/LoadingPlaceholder"
import PODProductCard from "./ProductList/PODProductCard"

interface Props {
    productId: any
    onBack: () => void
}

const SelectedProductDetails = ({ productId, onBack }: Props) => {
    const updateProductPageState = useProductPageStore(s => s.updateProductPageState)
    const { values: { _id: editingProductId }, setFieldValue } = useProductForm()
    const { showToast } = useAppToast()

    const { data, isFetching } = useQuery({
        queryKey: ["POD_PRODUCT_DETAILS", productId],
        queryFn: () => podProductService({ pod_blank_product_id: productId }),
        enabled: !!productId,
        onSuccess: (data) => {
            const fetchedProduct = data.data.data
            updateProductPageState("selectedPODProduct", fetchedProduct)
            setFieldValue("pod_blank_product_id", productId)
            setFieldValue("title", fetchedProduct.title)
            setFieldValue("description", fetchedProduct.description)
        },
        onError: () => {
            showToast({ message: "Unable to retrieve details for the selected product.", type: "error" })
            onBack()
        }
    })
    const fetchedProduct = data?.data?.data

    const deleteProduct = () => {
        updateProductPageState("selectedPODProduct", null)
        setFieldValue("pod_blank_product_id", null)
        setFieldValue("technique", null)
        setFieldValue("printful_template_id", null)
        setFieldValue("m2m_positions_options", [])
        setFieldValue("m2m_positions", [])
        setFieldValue("m2m_services", [])
        setFieldValue("artwork", null)
        setFieldValue("artwork2", null)
        setFieldValue("artwork_position", null)
        setFieldValue("artwork2_position", null)
        setFieldValue("positions", [])
        setFieldValue("title", "")
        setFieldValue("description", "")
        setFieldValue("properties", [])
        setFieldValue("sku", [])
        onBack()
    }

    if (isFetching) return <LoadingPlaceholder skeletonProps={{ h: "83px" }} />

    return (
        <PODProductCard
            product={fetchedProduct}
            showShippingPopover
            onProductDelete={editingProductId ? undefined : deleteProduct}
        />
    )
}

export default SelectedProductDetails