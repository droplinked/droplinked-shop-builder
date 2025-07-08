import { Flex } from '@chakra-ui/react'
import React from 'react'
import PageHeader from './PageHeader'
import PanelTitle from './PanelTitle'
import TopBar from './TopBar'
import useFollowStatus from '../../hook/useFollowStatus'

interface Props {
    grantProPlan?: ReturnType<typeof useFollowStatus>['grantProPlan'];
    children?: React.ReactNode;
}

export default function HeroBrowser({ grantProPlan, children }: Props) {
    return (
        <Flex flexDirection="column">
            <TopBar />
            <PanelTitle />
            <PageHeader grantProPlan={grantProPlan} />
            {children}
        </Flex>
    )
}
