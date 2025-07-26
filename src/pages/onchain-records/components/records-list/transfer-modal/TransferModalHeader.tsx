import { useMediaQuery } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { ReactNode } from 'react'
import TabsList from '../tabs-components/TabsList'
import SampleFile from './sample/Template.csv'

interface Props {
    tabs: { title: string, content: ReactNode }[]
}

export default function TransferModalHeader({ tabs }: Props) {
    const { t } = useLocaleResources("onchainRecords")
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    return (
        <ModalHeaderData
            modalHeaderProps={{
                bgColor: "#141414",
                paddingBlock: { md: "unset", base: "16px 0px !important" },
                borderBottom: "1px solid",
                borderColor: "neutral.gray.800",
                pt: { md: "48px !important", base: "16px !important" },
                pb: "0px !important",
            }}
            title={t("TransferModal.transferRecords")}
            {...(!isSmallerThan768 && { icon: <AppIcons.Transfer /> })}
            description={t("TransferModal.transferRecordsDescription")}
        >
            <InteractiveText
                to={SampleFile}
                width="max-content"
                target='_blank'
                rel="noopener noreferrer"
                mt={2}
                pb={4}
            >
                {t("TransferModal.downloadSample")}
            </InteractiveText>
            <TabsList tabs={tabs} />
        </ModalHeaderData>
    )
}
