import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getOrderService, getProductOrdersService } from "services/order/services";
import useAppStore from "stores/app/appStore";
import { OrderHeader } from "./ OrderHeader";
import { CustomerInfo } from "./CustomerInfo";
import { OrderProducts } from "./OrderProducts";
import OrderSkeleton from "./OrderSkeleton";
import { OrderTotal } from "./OrderTotal";

const OrdersContent = ({ productId }: { productId: string }) => {
  const { t } = useLocaleResources('products')
  const [customer, setCustomer] = useState<any>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const {
    shop: { currency },
  } = useAppStore();

  // Fetch product orders
  const { data, isFetching } = useQuery({
    queryFn: () => getProductOrdersService({ productId }),
    queryKey: ["get-product-orders", productId],
  });

  const orders = useMemo(() => data?.data?.data?.orders || [], [data]);

  // Fetch order details
  useEffect(() => {
    if (orders.length > 0) {
      const fetchOrderDetails = async () => {
        const promises = orders.map(async (order) => {
          try {
            const res = await getOrderService({ orderID: order.orderId });
            const orderDetails = res.data.data;

            setCustomer(orderDetails.customer);

            const products = orderDetails.items.filter((item) => item.productId === productId);
            setFilteredProducts(products);
          } catch (err) {
            console.error(`Error fetching details for Order ID ${order.orderId}:`, err);
          }
        });

        await Promise.all(promises);
      };

      fetchOrderDetails();
    }
  }, [orders, productId]);

  if (isFetching) {
    return (
      <Flex direction="column" p="9" gap="4">
        <OrderSkeleton />
      </Flex>
    );
  }

  if (!orders.length) {
      return (
        <Flex
          justifyContent={'center'}
          width="100%"
          marginTop={8}
          marginBottom={5}
        >
          <Text fontSize="18px" color={'#777'}>
            {t('OrdersContent.noOrdersAvailable')}
          </Text>
        </Flex>
      )
  }

  return (
    <Flex direction="column" p="9" justify="start" align="start" gap="4">
      {orders.map((order, index) => (
        <Box key={index} w="full" borderWidth="1px" borderColor="#282828" borderRadius="2xl" bg="transparent" overflow="hidden">
          <VStack align="start" spacing="6" p="6">
            {/* Header */}
            <OrderHeader order={order} />

            {/* Customer Info */}
            <CustomerInfo customer={customer} />
          </VStack>

          <Divider borderColor="#282828" />

          {/* Products */}
          <OrderProducts products={filteredProducts} />

          <Divider borderColor="#282828" />

          {/* Total */}
          <OrderTotal amount={order?.amount} currency={currency} />
        </Box>
      ))}
    </Flex>
  );
};

export default OrdersContent;
