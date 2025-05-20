import { Divider, Flex } from "@chakra-ui/react"
import React, { Fragment } from "react"
import { SidebarGroupType } from "../SidebarGroup"
import TabletSidebarItem from "./TabletSidebarItem"

function TabletSidebarGroup({ sidebarGroup }: { sidebarGroup: SidebarGroupType }) {
    return (
        <Fragment>
            <Flex direction="column" gap={1}>
                {sidebarGroup.items.map((item, index) => (
                    <TabletSidebarItem key={index} item={item} />
                ))}
            </Flex>
            <Divider borderColor="neutral.gray.700" />
        </Fragment>
    )
}

export default TabletSidebarGroup