import { useDisclosure } from "@chakra-ui/react"

export default function useModalHandlers() {
    const productTypeModal = useDisclosure()
    const productReorderModal = useDisclosure()
    const importProductModal = useDisclosure()
    const productFormDrawer = useDisclosure()

    return { productTypeModal, productReorderModal, importProductModal, productFormDrawer }
}