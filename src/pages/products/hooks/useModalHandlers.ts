import { useDisclosure } from "@chakra-ui/react"

export default function useModalHandlers() {
    const productReorderModal = useDisclosure()
    const importProductModal = useDisclosure()
    const productFormDrawer = useDisclosure()
    const identifiedItemsModal = useDisclosure()

    return { productReorderModal, importProductModal, productFormDrawer, identifiedItemsModal }
}