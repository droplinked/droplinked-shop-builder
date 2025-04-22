import { TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react'
import Drawer from 'components/common/Drawer/Drawer'
import { getOrderService } from 'lib/apis/order/services'
import React from 'react'
import { useQuery } from 'react-query'
import { truncateText } from '../helpers'
import { IOrders } from '../interface'
import OrderCart from './drawer-sections/OrderCart'
import OrderHeaderContent from './OrderHeaderContent'
import OrderInformation from './drawer-sections/OrderInformation'

interface OrderDetailsProps {
    rowData: IOrders;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * OrderDetails component displays detailed information about an order
 * Shows information in a drawer with tabs for order information and cart
 */
export default function OrderDetails({ rowData, isOpen, onClose }: OrderDetailsProps) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    // Fetch order details when the drawer is open
    const { isFetching, data } = useQuery({
        queryKey: ["order", rowData._id],
        queryFn: () => getOrderService({ orderID: rowData._id }),
        enabled: isOpen,
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
            content: <OrderCart orderData={orderData} rowData={rowData} isFetching={isFetching} />
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
                    padding: { base: "16px 16px 0px 16px", md: "36px 36px 0px 36px" },
                }}
            >
                <TabPanels height="full" background="#1c1c1c">
                    {tabs.map((tab, index) => (
                        <TabPanel
                            key={index}
                            background="#1c1c1c"
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
