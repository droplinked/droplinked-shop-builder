import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import * as React from 'react';

function ModalWrapper({ ruleId, isOpen, onClose, children }: { ruleId: string, isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
    return (
        <AppModal modalRootProps={{ isOpen: isOpen, onClose: onClose, isCentered: false, size: "2xl" }} modalContentProps={{ background: "#141414", px: "0px", sx: { paddingInline: "0px", paddingBlock: "0px", paddingTop: "48px" } }}>
            <ModalHeaderData
                icon={<AppIcons.RulesetModalIcon />}
                modalHeaderProps={{
                    px: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    padding: "0px",
                    paddingBlock: "0px",
                    backgroundColor: '#141414'
                }}
                title={`${ruleId ? "Edit" : "Create"} Ruleset`}
                description={ruleId ? 'Edit the details of your ruleset.' : 'Create a new ruleset by providing the necessary details.'}
            />
            {children}
        </AppModal>
    );
}

export default ModalWrapper;