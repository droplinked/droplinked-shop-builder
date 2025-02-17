import AppTab from 'components/redesign/AppTab/AppTab'
import React from 'react'
import Records from '../records/Records'

export default function Tabs() {
    const tabs = [
        {
            title: "Records",
            content: <Records />
        },
    ]

    return (
        <AppTab isLazy={true} tabs={tabs} tabPanelStyle={{ p: { base: 4, md: 6 } }} />
    )
}
