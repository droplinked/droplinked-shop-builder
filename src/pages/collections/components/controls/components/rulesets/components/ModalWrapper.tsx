import AppIcons from 'assets/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import * as React from 'react';

function ModalWrapper({ ruleId, isOpen, onClose, children }: { ruleId: string, isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
    const { t } = useLocaleResources("collections");

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
                title={ruleId ? t("ruleset.editTitle") : t("ruleset.createTitle")}
                description={ruleId ? t("ruleset.editDescription") : t("ruleset.createDescription")}
            />
            {children}
        </AppModal>
    );
}

export default ModalWrapper;