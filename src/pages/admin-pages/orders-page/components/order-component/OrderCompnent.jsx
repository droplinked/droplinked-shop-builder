import {
  Tr,
  Td,
  Text,
  Popover,
  PopoverTrigger,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { calculateHowTimePassed, getStatus } from "./order-component-utils";
import moreIcon from "../../../../../assest/icon/more-icon.svg";


import OrderModal from "modals/order-modal/OrderModal";

const OrderComponent = ({ order, update }) => {
  const [showModal , setShowModal]=useState(false)

  const toggleModal = () => setShowModal(p => !p)
  //
  console.log('order ' , order);
  return (
    <>
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
        cursor='pointer'
        onClick={toggleModal}
      >
        <Td>
          <Text>{order._id}</Text>
        </Td>
        <Td>
          <Text>
            {order?.customerAddressBook?.firstName +
              " " +
              order?.customerAddressBook?.lastName}
          </Text>
        </Td>
        <Td>
          <Text>{calculateHowTimePassed(order.createdAt)}</Text>
        </Td>
        <Td>
          <Text>{order?.items?.length}</Text>
        </Td>
        <Td>
          <Text>{order?.status}</Text>
        </Td>
        <Td>
          {/* <Popover placement="right-start">
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
          </Popover> */}
        </Td>
      </Tr>
      <OrderModal order={order} show={showModal} close={toggleModal} updateOrder={update} />
    </>
  );
};

export default OrderComponent;


        {/* <PopoverContent
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
            </PopoverContent> */}