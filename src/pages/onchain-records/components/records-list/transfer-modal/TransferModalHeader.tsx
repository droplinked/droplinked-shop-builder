import { useMediaQuery } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import React, { ReactNode } from 'react';

export default function TransferModalHeader({ children }: { children: ReactNode }) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

    return (
        <ModalHeaderData
            modalHeaderProps={{
                bgColor: "#141414",
                paddingBlock: { md: "unset", base: "16px 0px !important" },
                borderBottom: "1px solid #292929",
                pt: { md: "48px !important", base: "16px !important" },
                pb: "0px !important",
            }}
            descriptionColor="#B1B1B1 !important"
            title="Transfer Records"
            {...(!isSmallerThan768 && { icon: <AppIcons.Transfer /> })}
            description="Send onchain records to one or multiple parties below."
        >
            {children}
        </ModalHeaderData>
    )
}
