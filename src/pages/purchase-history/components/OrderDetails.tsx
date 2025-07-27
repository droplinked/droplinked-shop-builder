import { TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react'
import Drawer from 'components/common/Drawer/Drawer'
import { getOrderService } from 'services/order/services'
import React from 'react'
import { useQuery } from 'react-query'
import { truncateText } from '../helpers'
import { IOrders } from '../interface'
import OrderCart from './drawer-sections/OrderCart'
import OrderHeaderContent from './OrderHeaderContent'
import OrderInformation from './drawer-sections/OrderInformation'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface OrderDetailsProps {
    rowData: IOrders
    isOpen: boolean
    onClose: () => void
}

/**
 * OrderDetails component displays a detailed information drawer about an order
 * Shows information in a drawer with tabs for order information and cart
 */
export default function OrderDetails({ rowData, isOpen, onClose }: OrderDetailsProps) {
    const { t, isRTL } = useLocaleResources("purchaseHistory")
    // Handle the case where useMediaQuery might not return an array in tests
    const mediaQueryResult = useMediaQuery("(max-width: 768px)")
    const isSmallerThan768 = Array.isArray(mediaQueryResult) ? mediaQueryResult[0] : false

    // Fetch order details when the drawer is open
    // Handle the case where useQuery might return undefined in tests
    const queryResult = useQuery({
        queryKey: ["order", rowData._id],
        queryFn: () => getOrderService({ orderID: rowData._id }),
        enabled: isOpen,
    }) || { isFetching: false, data: undefined }

    const { isFetching, data } = queryResult
    const orderData = data?.data?.data
    const { orderInformation } = orderData ?? {}

    const tabs = [
        {
            title: t("OrderDetails.orderInformation"),
            content: <OrderInformation orderData={orderData} isFetching={isFetching} />
        },
        {
            title: t("OrderDetails.cart"),
            content: <OrderCart orderData={orderData} rowData={rowData} isFetching={isFetching} />
        }
    ]

    return (
        <Tabs variant="unstyled" width="100%">
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title={`${t("common:order")} ${truncateText(rowData._id, 10)}`}
                placement={isSmallerThan768 ? "bottom" : isRTL ? "left" : "right"}
                headerContent={
                    <OrderHeaderContent
                        isFetching={isFetching}
                        updatedAt={rowData.updatedAt}
                        orderStatus={orderInformation?.status || ""}
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
