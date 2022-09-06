import {
  Text,
  Flex,
  Box,
  AspectRatio,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { getCollections } from "../../../api/producer/Collection-api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { addProductToCollection } from "../../../api/producer/Collection-api";

import Dropdown from "../../../components/shared/Dropdown/Dropdown-component";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";

const ViewShopifyMerch = ({ product, shopifyData }) => {
  const [collectionList, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(
    product.productCollectionID
  );
  const { successToast, errorToast } = useToasty();
  const navigate = useNavigate();

  useEffect(() => {
    initialCollection();
  }, []);

  const initialCollection = async () => {
    let result = await getCollections();
    if (result != null) {
      let collections = result.map((col) => {
        return { id: col._id, value: col.title };
      });
      setCollection(collections);
    }
  };

  const changeCollectionId = (e) => {
    setSelectedCollection(e.target.value);
  };

  const cancelForm = () => {
    navigate("/producer/ims");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    setLoading(true);
    let result = await addProductToCollection(selectedCollection, product._id);
    if (result == true) {
      successToast("Item successfully updated");
      navigate("/producer/ims");
    } else {
      errorToast(result);
      setLoading(false);
    }
  };


  return (
    <Flex
      w="100%"
      justifyContent="center"
      maxW="900px"
      flexDir="column"
      mx="auto"
      px={{ base: "20px", md: "80px" }}
    >
      <Text
        color="#fff"
        fontWeight="600"
        fontSize={{ base: "16px", md: "20px" }}
        mb="30px"
      >
        {shopifyData.title}
      </Text>
      <Box w={{ base: "100%", md: "50%" }} mb="30px" mx="auto">
        {collectionList.length > 0 && (
          <Dropdown
            value={selectedCollection}
            pairArray={collectionList}
            change={changeCollectionId}
            placeholder={
              collectionList.find(
                (collection) => collection.id == product.productCollectionID
              ).value
            }
          />
        )}
      </Box>
      <Text
        color="#fff"
        fontWeight="500"
        fontSize={{ base: "14px", md: "16px" }}
        mb="30px"
        dangerouslySetInnerHTML={{ __html: shopifyData.body_html }}
      ></Text>

      <Flex w="100%" wrap="wrap" my="20px">
        {shopifyData.images.map((img) => {
          return (
            <Box w={{ base: "100%", sm: "50%", md: "25%" }} p="5px">
              <AspectRatio ratio={1}>
                <Image src={img.src} alt="test" borderRadius="8px" />
              </AspectRatio>
            </Box>
          );
        })}
      </Flex>

      <TableContainer>
        <Table>
          <Thead color="red">
            <Tr>
              {shopifyData.options.map((option) => (
                <Th>{option.name}</Th>
              ))}
              <Th>Sku</Th>
              <Th>Quantitu</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shopifyData.variants.map((variant) => {
              return (
                <Tr>
                  <Td color="#8054ff" fontWeight="600">
                    {variant.option_values[0].value}
                  </Td>
                  <Td color="#8054ff" fontWeight="600">
                    {variant.sku}
                  </Td>
                  <Td color="#8054ff" fontWeight="600">
                    {variant.inventory_quantity}
                  </Td>
                  <Td color="#8054ff" fontWeight="600">
                    ${variant.price}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginTop: "80px", width: "100%" }}
      >
        <div className="col-5 col-md-4">
          <BasicButton click={cancelForm} loading={loading}>
            Cancel
          </BasicButton>
        </div>
        <div className="col-5 col-md-4">
          <BasicButton click={submitForm} loading={loading}>
            Submit
          </BasicButton>
        </div>
      </div>
    </Flex>
  );
};

export default ViewShopifyMerch;
