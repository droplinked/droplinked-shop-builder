import { useMediaQuery } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import ExternalLink from 'components/redesign/external-link/ExternalLink';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import React, { ReactNode } from 'react';
import TabsList from '../tabs-components/TabsList';
import SampleFile from "./sample/Template.csv";

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
            descriptionProps={{
                color: "#B1B1B1 !important"
            }}
            title="Transfer Records"
            {...(!isSmallerThan768 && { icon: <AppIcons.Transfer /> })}
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
