import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import * as React from 'react';

function ModalWrapper({ collection, isOpen, onClose, children }: { collection?: any, isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
    return (
        <AppModal modalRootProps={{ isOpen: isOpen, onClose: onClose, isCentered: false, size: "2xl" }} modalContentProps={{ background: "#141414", px: "0px", paddingInline: "0px", sx: { paddingInline: "0px", paddingBlock: "0px", paddingTop: "48px" } }}>
            <ModalHeaderData
                icon={<AppIcons.CollectionModalIcon />}
                backgroundColor='#141414'
                modalHeaderProps={{ px: { lg: "48px !important", md: "32px !important", base: "16px !important" }, padding: "0px", paddingBlock: "0px" }}
                title={collection ? 'Edit Collection' : 'Create Collection'}
                description={collection ? 'Edit the details of your collection.' : 'Create a new collection by providing the necessary details.'}
            />
            {children}
        </AppModal >
    );
}

export default ModalWrapper;