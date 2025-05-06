import { DownloadMd } from 'assets/icons/Action/Download/DownloadMd'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React from 'react'
import IdentifiedItemsBody from './IdentifiedItemsBody';
import IdentifiedItemsFooter from './IdentifiedItemsFooter';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function IdentifiedItemsModal({ isOpen, onClose }: Props) {
    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "6xl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<DownloadMd color='#fff' />}
                title="Identified Items"
                description="The product importer successfully identified 43 items out of 48."
                descriptionProps={{
                    color: "#B1B1B1 !important",
                }}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
            />
            <IdentifiedItemsBody />
            <IdentifiedItemsFooter />
        </AppModal>
    )
}
