import { Flex, VStack } from "@chakra-ui/react";
import AppEmptyPage from "components/common/empty/AppEmptyPage";
import AppModal, { IAppModal } from "components/common/modal/AppModal";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import AppTable from "components/common/table/AppTable";
import AppTypography from "components/common/typography/AppTypography";
import { getProductOrdersService } from "lib/apis/order/services";
import React from "react";
import { useQuery } from "react-query";

interface Iprops extends Omit<IAppModal, "children"> {
    productId: string;
}

function ProductOrdersModal({ close, open, productId }: Iprops) {
    const { data, isFetching } = useQuery({ queryFn: () => getProductOrdersService({ productId }), queryKey: ["get-product-orders"] });
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
                                            {order?.amount.toFixed(2)}
                                        </AppTypography>
                                    ),
                                },
                                Quantity: {
                                    caption: "Quantity",
                                    props: {
                                        width: "fit-content",
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
                                        width: "30%",
                                    },
                                    value: (
                                        <AppTypography fontSize="16px" color="#C2C2C2">
                                            {(new Date(order?.date)).toLocaleDateString("en-US", { minute: "numeric", hour: "numeric", day: "numeric", month: "long", year: "numeric" })}
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

export default ProductOrdersModal