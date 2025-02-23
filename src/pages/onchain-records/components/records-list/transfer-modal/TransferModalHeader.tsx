import { useMediaQuery } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons'
import ExternalLink from 'components/redesign/external-link/ExternalLink';
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React, { ReactNode } from 'react'
import TabsList from '../tabs-components/TabsList';
import SampleFile from "./sample/Template.csv"

interface Props {
    tabs: { title: string, content: ReactNode }[];
}

export default function TransferModalHeader({ tabs }: Props) {
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
            {...(!isSmallerThan768 && {
                icon: (
                    <ModalHeaderIconWrapper>
                        <AppIcons.Transfer />
                    </ModalHeaderIconWrapper>
                ),
            })}
            description="Send onchain records to one or multiple parties below."
        >
            <ExternalLink href={SampleFile}
                width={"max-content"}
                fontSize={14}
                fontWeight={500}
                mt={2}
                pb={4}
            >
                Download Sample Template
            </ExternalLink>
            <TabsList tabs={tabs} />
        </ModalHeaderData>
    )
}
