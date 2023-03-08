import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import Product from "../../../../components/shared/Product/Product";

import { useToasty } from "../../../../context/toastify/ToastContext";
import { USER_TYPE } from "../../../../constant/user-types";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function DroplinkedImsPage({ products, filter }) {

  console.log('products ' , products);
  const fileRef = useRef(null);

  const { errorToast } = useToasty();

  function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    alert(obj);
  }
  function onReaderLoad(event) {
  
  }

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file.type != "application/json") {
      errorToast("dadash eshtebe");
      return;
    } else {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = onReaderLoad;
    }
  };

  return (
    <>
      <Flex w="100%" justifyContent="center" alignItems="center" mb='40px'>
        <Link
          to="/producer/add-product"
          style={{ width: "200px", display: "flex" }}
        >
          <BasicButton>Add item</BasicButton>
        </Link>
      </Flex>

      <Flex w="100%" flexWrap="wrap">
        {products.length <= 0 ? (
          <Text w="100%" textAlign="center" fontSize="24px" fontWeight="600">
            Empty
          </Text>
        ) : (
          <>
            {products
              .filter((pr) => pr.title.toLowerCase().includes(filter))
              .map((item, i) => {
                return (
                  <Box
                    key={i}
                    w={{ base: "50%", sm: "33%", md: "25%" }}
                    p="10px"
                  >
                    <Product
                      title={item.title}
                      imageUrl={item.media[0].url}
                      id={item._id}
                      type={USER_TYPE.PRODUCER}
                    />
                  </Box>
                );
              })}
          </>
        )}
      </Flex>
    </>
  );
}
