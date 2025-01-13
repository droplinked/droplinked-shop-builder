import { ModalBody } from '@chakra-ui/react'
import AppModal from 'components/redesign/modal/AppModal'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import DesignMakerContent from './DesignMakerContent/DesignMakerContent'
import TechniqueSelection from './TechniqueSelection'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function DesignMakerModal({ isOpen, onClose }: Props) {
    const { values: { technique, printful_template_id } } = useProductForm()
    const selectedPODProduct = useProductPageStore(state => state.selectedPODProduct)

    const shouldRenderDesignTools = Boolean(
        technique || printful_template_id || !selectedPODProduct?.techniques?.length
    )

    return (
        <AppModal
            modalRootProps={{
                isOpen,
                onClose,
                isCentered: !shouldRenderDesignTools,
                size: shouldRenderDesignTools ? '6xl' : 'xl',
            }}
            modalContentProps={{ padding: 4 }}
        >
            <ModalBody>
                {shouldRenderDesignTools
                    ? <DesignMakerContent onClose={onClose} />
                    : <TechniqueSelection selectedPODProduct={selectedPODProduct} />
                }
            </ModalBody>
        </AppModal>
    )
}

export default DesignMakerModal