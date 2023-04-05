import {
  Tr,
  Td,
  Image,
  Flex,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  Button,
} from "@chakra-ui/react";

import { useCustomNavigate } from "../../../../../hooks/useCustomeNavigate/useCustomNavigate";

import moreIcon from "../../../../../assest/icon/more-icon.svg";
import { useState } from "react";
import SmallModal from "../../../../../modals/small-modal/SmallModal";
import { useApi } from "../../../../../hooks/useApi/useApi";
import { useToasty } from "../../../../../context/toastify/ToastContext";

import { deleteProductById } from "../../../../../apis/productsApiService";

const ProductComponent = ({ product, update }) => {
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");

  const { shopNavigate } = useCustomNavigate();
  const { deleteApi } = useApi();
  const { errorToast, successToast } = useToasty();

  const navigateToEditProductPage = () =>
    shopNavigate(`product/${product._id}`);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const clickOnDeleteProduct = async () => {
    setLoading(true);
    let result = await deleteApi(deleteProductById(productId));
    if (result?.acknowledged === true) {
      successToast("Product deleted successfully");
      update();
    } else {
      errorToast(result);
    }
    setLoading(false);
    toggleModal();
  };
  //
  return (
    <>
      {showModal && (
        <SmallModal
          text={`Are you sure you want to delete this product?`}
          show={showModal}
          hide={toggleModal}
          click={clickOnDeleteProduct}
          loading={loading}
          buttonText={"Delete"}
        />
      )}
      <Tr
        sx={{
          "& td": {
            borderColor: "line",
            fontFamily: "Avenir Next",
            fontWeight: "500",
            fontSize: "12px",
            color: "#C2C2C2",
          },
        }}
      >
        <Td>
          <Flex alignItems="start" gap="12px">
            <Image src={product.media[0]?.url} w="48px" h="48px" />
            <Text>{product.title}</Text>
          </Flex>
        </Td>
        <Td>
          <Text>{product.productCollectionID?.title}</Text>
        </Td>
        <Td>
          <Text>No status</Text>
        </Td>
        <Td>
          <Text>-</Text>
        </Td>
        <Td>
          <Popover placement="right-start">
            <PopoverTrigger>
              <IconButton
                size="sm"
                textAlign="center"
                variant="unstyled"
                _focus={{ outline: "none" }}
              >
                <Image src={moreIcon} />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent
              _focus={{ outline: "none" }}
              border="none"
              bg="#292929"
              color="white"
              fontSize="xs"
              sx={{ width: "100px", borderRadius: "8px", p: 3 }}
            >
              <Stack>
                <Button
                  textAlign="start"
                  variant="unstyled"
                  size="xs"
                  onClick={navigateToEditProductPage}
                >
                  Edit
                </Button>
                <Button
                  textAlign="start"
                  variant="unstyled"
                  size="xs"
                  onClick={() => {
                    toggleModal();
                    setProductId(product?._id);
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </PopoverContent>
          </Popover>
        </Td>
      </Tr>
    </>
  );
};

export default ProductComponent;
