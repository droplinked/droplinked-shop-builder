import { Flex, VStack } from "@chakra-ui/react";
import AppModal, { IAppModal } from "components/common/modal/AppModal";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import { useQuery } from "react-query";
import { getProductOrdersService } from "lib/apis/order/services";
import AppTable from "components/common/table/AppTable";
import { format_date_to_month_day_year_hour } from "lib/utils/heper/helpers";
import AppEmptyPage from "components/common/empty/AppEmptyPage";

interface Iprops extends Omit<IAppModal, "children"> {
    productId: string;
}

function ProductOrdersModal({ close, open, productId }: Iprops) {
    const { data, isFetching } = useQuery({ queryFn: () => getProductOrdersService({ productId }), queryKey: ["get-product-orders"], refetchOnWindowFocus: false });
    return (
        <>
            <AppModal close={close} open={open} size="6xl">
                {isFetching ? (
                    <VStack align={"stretch"} spacing={5}>
                        {[...Array(4)].map((_, key) => (
                            <Flex key={key} justifyContent={"space-between"} paddingTop="15px">
                                {[...Array(4)].map((_, index) => (
                                    <AppSkeleton key={index} isLoaded={false} width={"15%"} height="20px" />
                                ))}
                            </Flex>
                        ))}
                    </VStack>
                ) : data?.data?.data?.orders?.length ? (
                    <AppTable
                        props={{ thead: { borderBottom: "1px solid #292929", borderTop: "none" }, tr: { border: "none" } }}
                        rows={
                            data?.data?.data?.orders?.map((order: { orderId: string; date: string; amount: number; quantity: number; email?: string }) => ({
                                orderId: {
                                    caption: "Order ID",
                                    props: {
                                        width: "20%",
                                    },
                                    value: (
                                        <AppTypography fontSize="14px" color="#C2C2C2">
                                            {order?.orderId}
                                        </AppTypography>
                                    ),
                                },
                                customer: {
                                    caption: "Customer",
                                    props: {
                                        width: "35%",
                                    },
                                    value: (
                                        <AppTypography fontSize="16px" color="#C2C2C2">
                                            {order?.email || "-----"}
                                        </AppTypography>
                                    ),
                                },
                                totalCart: {
                                    caption: "Total Cart",
                                    props: {
                                        width: "15%",
                                    },
                                    value: (
                                        <AppTypography price fontSize="16px" color="#C2C2C2">
                                            {order?.amount}
                                        </AppTypography>
                                    ),
                                },
                                Quantity: {
                                    caption: "Quantity",
                                    props: {
                                        width: "10%",
                                    },
                                    value: (
                                        <AppTypography fontSize="16px" color="#C2C2C2">
                                            {order?.quantity}
                                        </AppTypography>
                                    ),
                                },
                                date: {
                                    caption: "Date",
                                    props: {
                                        width: "20%",
                                    },
                                    value: (
                                        <AppTypography fontSize="16px" color="#C2C2C2">
                                            {format_date_to_month_day_year_hour(order?.date)}
                                        </AppTypography>
                                    ),
                                },
                            })) || []
                        }
                    />
                ) : (
                    <AppEmptyPage title="No orders available yet!" />
                )}
            </AppModal>
        </>
    );
}

export default ProductOrdersModal;
