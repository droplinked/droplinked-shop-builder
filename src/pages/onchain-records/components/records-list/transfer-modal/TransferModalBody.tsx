import { ModalBody, TabPanel, TabPanels } from '@chakra-ui/react'
import React from 'react'

interface Props {
    tabs: { title: string, content: JSX.Element }[];
}

export default function TransferModalBody({ tabs }: Props) {
    return (
        <ModalBody py={"16px !important"}>
            <TabPanels>
                {tabs.map((tab) => (
                    <TabPanel key={tab.title}>{tab.content}</TabPanel>
                ))}
            </TabPanels>
        </ModalBody>
    )
}
