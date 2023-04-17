import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { matchSorter } from "match-sorter";
import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
//

import { PageWrapper } from "./CollectionsPage-style";
import { selectCurrentShop } from "store/shop/shop.selector";
import { getCollectionPublicByShopName } from "apis/collectionApiService";
import { useApi } from "hooks/useApi/useApi";
//
import AddCollectionComponent from "./components/add-collection-component/AddCollectionComponent";
import CollectionComponent from "./components/collection-component/CollectionComponent";
import LoadingComponent from "components/shared/loading-component/LoadingComponent";
import PageHeader from "./components/page-header/PageHeader";

export default function CollectionsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState(null);

  const navigate = useNavigate();
  const shop = useSelector(selectCurrentShop);
  const { getApi } = useApi();

  const token = JSON.parse(localStorage.getItem("token"));

  if (token == null) navigate("/");

  const getAllCollections = async () => {
    let result = await getApi(getCollectionPublicByShopName(shop.name));
    if (result) setCollections(result);
  };

  const tableData = useMemo(() => {
    if (!searchValue) return collections;
    return matchSorter(collections, searchValue, {
      keys: ["title"],
    });
  }, [searchValue, collections]);

  useEffect(() => {
    getAllCollections();
  }, []);

  if (!collections)
    return (
      <Box w="100%" h="auto" p="0px 40px">
        <PageWrapper>
          <LoadingComponent />
        </PageWrapper>
      </Box>
    );

  return (
    <Box w="100%" h="auto" p="0px 40px">
      <PageWrapper>
        <PageHeader
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          updateCollaction={getAllCollections}
        />
        <TableContainer mb="36px">
          <Table>
            <Thead borderY="1px solid" borderColor="line">
              <Tr>
                {[
                  {
                    width: "35%",
                    label: "Collection",
                  },
                  {
                    width: "35%",
                    label: "rule sets",
                  },
                  {
                    width: "15%",
                    label: "Products",
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
                    w={item.width}
                    color="white"
                    border="none"
                  >
                    {item.label}
                  </Th>
                ))}
              </Tr>
            </Thead>
            {tableData?.length > 0 && (
              <Tbody>
                {tableData?.map((item, i) => (
                  <CollectionComponent
                    key={i}
                    collection={item}
                    update={getAllCollections}
                  />
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        {tableData.length <= 0 && <AddCollectionComponent />}
      </PageWrapper>
    </Box>
  );
}
