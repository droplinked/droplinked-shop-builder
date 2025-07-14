import { useMediaQuery } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React, { ReactNode } from 'react'
import TabsList from '../tabs-components/TabsList'
import SampleFile from './sample/Template.csv'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

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
            descriptionProps={{
                color: "#B1B1B1 !important"
            }}
            title={t("transfer_records")}
            {...(!isSmallerThan768 && { icon: <AppIcons.Transfer /> })}
            description={t("transfer_records_description")}
        >
            <InteractiveText
                to={SampleFile}
                width="max-content"
                target='_blank'
                mt={2}
                pb={4}
            >
                {t("download_sample")}
            </InteractiveText>
            <TabsList tabs={tabs} />
        </ModalHeaderData>
    )
}
