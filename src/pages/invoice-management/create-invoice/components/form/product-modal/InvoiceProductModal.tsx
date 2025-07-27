import { ModalBody, Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading';
import AppInput from 'components/redesign/input/AppInput';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useAppToast from 'hooks/toast/useToast';
import useDebounce from 'hooks/useDebounce/useDebounce';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/invoice-management/ar.json';
import enLocale from 'locales/invoice-management/en.json';
import { addProductToInvoiceService, createInvoiceService } from 'services/invoice/invoiceServices';
import useInvoiceStore from 'pages/invoice-management/create-invoice/store/invoiceStore';
import React, { useEffect, useMemo, useState } from 'react';
import { areArraysEqual } from 'utils/helpers';
import ProductTable from './product-table/ProductTable';
import { SearchMd } from 'assets/icons/System/Search/SearchMd'

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function InvoiceProductModal({ isOpen, onClose }: Props) {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
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
            if (!cart.length || areArraysEqual(cart, prevItems)) onClose()
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
        <AppModal modalRootProps={{ isOpen, onClose: closeModal, size: "5xl" }}>
            <ModalHeaderData
                icon={<AppIcons.HeaderProductBox />}
                title={t('InvoiceProductModal.title')}
                description={t('InvoiceProductModal.description')}
            />

            <ModalBody display="flex" flexDirection="column" gap={6}>
                <AppInput
                    inputContainerProps={{
                        width: "300px"
                    }}
                    inputGroupProps={{
                        alignItems: "flex-start"
                    }}
                    inputProps={{
                        placeholder: t('InvoiceProductModal.search.placeholder'),
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value)
                    }}
                    leftElement={<SearchMd  color='#7b7b7b'/>}
                />
                <ProductTable debouncedSearchTerm={debouncedSearchTerm} cart={cart} setCart={setCart} />

                {isLoading && <FullScreenLoading />}
            </ModalBody>
        </AppModal>
    )
}

export default InvoiceProductModal