import { ModalBody } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useDebounce from 'functions/hooks/debounce/useDebounce';
import useAppToast from 'functions/hooks/toast/useToast';
import { addProductToInvoiceService, createInvoiceService } from 'lib/apis/invoice/invoiceServices';
import { arraysAreEqual } from 'lib/utils/heper/helpers';
import Input from 'pages/invoice-management/components/Input';
import useInvoiceStore from 'pages/invoice-management/create-invoice/store/invoiceStore';
import React, { useEffect, useMemo, useState } from 'react';
import ProductTable from './ProductTable';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function InvoiceProductModal({ isOpen, onClose }: Props) {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const [cart, setCart] = useState([])
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()
    const invoiceCart = useInvoiceStore((state) => state.cart)
    const updateCart = useInvoiceStore((state) => state.updateCart)
    const prevItems = useMemo(() => {
        if (!invoiceCart.items) return []
        return invoiceCart.items.map(item => ({ skuId: item.skuID, quantity: item.options.quantity }))
    }, [])

    useEffect(() => { setCart(prevItems) }, [prevItems, setCart])

    const closeModal = async () => {
        try {
            if (!cart.length || arraysAreEqual(cart, prevItems)) onClose()
            else {
                setLoading(true)
                let invoiceId = invoiceCart._id
                if (!invoiceId) {
                    const { data } = await createInvoiceService()
                    invoiceId = data._id
                }
                const res = await addProductToInvoiceService(invoiceId, cart)
                updateCart(res.data)
                onClose()
            }
        }
        catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
            onClose()
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose: closeModal, size: "5xl" }}
        >
            <ModalHeaderData
                icon={<AppIcons.InvoiceProduct />}
                title="Products"
                description="Select one of the products to add into your invoice."
            />

            <ModalBody display={"flex"} flexDirection={"column"} gap={6}>
                <Input
                    inputProps={{
                        width: "300px",
                        placeholder: "Product name",
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value)
                    }}
                />
                <ProductTable debouncedSearchTerm={debouncedSearchTerm} cart={cart} setCart={setCart} />

                {isLoading && <FullScreenLoading />}
            </ModalBody>
        </AppModal>
    )
}

export default InvoiceProductModal