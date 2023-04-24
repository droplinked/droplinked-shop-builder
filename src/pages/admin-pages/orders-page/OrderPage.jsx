import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { useApi } from "../../../hooks/useApi/useApi";
import { useMemo, useState, useEffect } from "react";
import LoadingComponent from "../../../components/shared/loading-component/LoadingComponent";
import PageHeader from "./components/page-header/PageHeader";
import { matchSorter } from "match-sorter";
import OrderComponent from "./components/order-component/OrderCompnent";
import AppCard from "components/shared/card/AppCard";
import { getOrders } from "lib/apis/orderApiService";

export default function OrderPage() {
  //
  const [searchValue, setSearchValue] = useState("");
  const [orders, setOrders] = useState(null);
  //
  const { getApi } = useApi();

  const getAllOrders = async () => {
    let result = await getApi(getOrders());
    if (result) {
      result = result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(result);
    }
  };

  const tableData = useMemo(() => {
    if (!searchValue) return orders;
    return matchSorter(orders, searchValue, {
      keys: [
        "_id",
        "customerAddressBook.firstName",
        "customerAddressBook.lastName",
      ],
    });
  }, [searchValue, orders]);

  useEffect(() => {
    getAllOrders();
  }, []);

  if (orders === null) {
    return <LoadingComponent />;
  }

  return (
    <AppCard>
      <PageHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      <TableContainer mb="36px">
        <Table>
          <Thead borderY="1px solid" borderColor="line">
            <Tr>
              {[
                {
                  width: "35%",
                  label: "Code",
                },
                {
                  width: "35%",
                  label: "Customer",
                },
                {
                  width: "15%",
                  label: "Date",
                },
                {
                  width: "15%",
                  label: "Items",
                },
                {
                  width: "15%",
                  label: "Status",
                },
              ].map((item) => (
                <Th
                  py={4}
                  fontSize="12px"
                  key={item.label}
                  // w={item.width}
                  color="white"
                  border="none"
                >
                  {item.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          {tableData.length > 0 && (
            <Tbody>
              {tableData.map((item, i) => (
                <OrderComponent key={i} order={item} update={getAllOrders} />
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </AppCard>
  );
}
