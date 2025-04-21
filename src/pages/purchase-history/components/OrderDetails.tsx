import { TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react'
import Drawer from 'components/common/Drawer/Drawer'
import { getOrderService } from 'lib/apis/order/services'
import React from 'react'
import { useQuery } from 'react-query'
import { truncateText } from '../helpers'
import { IOrders } from '../interface'
import OrderCart from './OrderCart'
import OrderHeaderContent from './OrderHeaderContent'
import OrderInformation from './OrderInformation'

interface Props {
    rowData: IOrders,
    isOpen: boolean,
    onClose: () => void
}

export default function OrderDetails({ rowData, isOpen, onClose }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { isFetching, data } = useQuery({
        queryKey: ["order", rowData._id],
        queryFn: () => getOrderService({ orderID: rowData._id }),
        enabled: isOpen
    })

    const orderData = data?.data?.data
    const { orderInformation } = orderData ?? {}

    const tabs = [
        {
            title: "Order Information",
            content: <OrderInformation orderData={orderData} isFetching={isFetching} />
        },
        {
            title: "Cart",
            content: <OrderCart orderData={orderData} isFetching={isFetching} />
        }
    ]

    return (
        <Tabs variant="unstyled" width="100%">
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title={`Order ${truncateText(rowData._id, 10)}`}
                placement={isSmallerThan768 ? "bottom" : "right"}
                headerContent={
                    <OrderHeaderContent
                        isFetching={isFetching}
                        updatedAt={rowData.updatedAt}
                        orderStatus={orderInformation?.status}
                        tabs={tabs}
                    />
                }
                drawerHeaderStyle={{
                    padding: { base: "16px 16px 0px 16px", md: "36px 36px 0px 36px" }
                }}
            >
                <TabPanels height="100%">
                    {tabs.map((tab, index) => (
                        <TabPanel
                            key={index}
                            background="#1C1C1C"
                            height="100%"
                            p={{ base: 4, md: 9 }}
                        >
                            {tab.content}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Drawer>
        </Tabs>
    )
}
