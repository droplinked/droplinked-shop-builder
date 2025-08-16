import useAppToast from "hooks/toast/useToast"
import useCollections from "hooks/useCollections/useCollections"
import useProductForm from "pages/products/hooks/useProductForm"
import useProductPageStore from "pages/products/stores/ProductPageStore"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { podProductService } from "services/pod/services"
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
    const { data: collections } = useCollections()
    const { data, isFetching } = useQuery({
        queryKey: ["POD_PRODUCT_DETAILS", productId],
        queryFn: () => podProductService({ pod_blank_product_id: productId }),
        enabled: !!productId,
        onSuccess: (data) => {
            const fetchedProduct = data.data.data
            updateProductPageState("selectedPODProduct", fetchedProduct)
            setFieldValue("pod_blank_product_id", productId)
            if (!editingProductId) {
                setFieldValue("title", fetchedProduct.title)
                setFieldValue("description", fetchedProduct.description)
            }
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

    useEffect(() => {
        if (collections?.data?.length > 0) {
            setFieldValue("productCollectionID", collections.data[0]._id)
        }
    }, [collections, setFieldValue])

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