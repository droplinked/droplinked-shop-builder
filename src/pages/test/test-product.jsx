import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import axios from "axios";
import Loading from "../../components/shared/loading/Loading";
import Carousel from "../../components/shared/Carousel/Carousel-component";
//import DropdownTest from "./test-drop-component"
import Dropdown from "../../components/shared/Dropdown/Dropdown-component";
import plus from "../../assest/icon/plusIcon.png";
import minus from "../../assest/icon/minusIcon.png";
import BasicButton from "../../components/shared/BasicButton/BasicButton";

const TestProduct = () => {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [testLimit, setTextLimit] = useState(false);


  useEffect(() => {
    axios
      .post(
        "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search",
        {
          page: 1,
          shop_domain: "home-prime.myshopify.com",
          keyword: "",
        }
      )
      .then((response) => {
        let x = response.data.shopify.map((item) => item.product_listing);
        setProduct(x[0]);
        let images = x[0].images.map((img) => {
          return { url: img.src };
        });
        let opt = x[0].variants.map((vari) => {
          return { id: vari.id, value: vari.title };
        });
        setOptions(opt);
        setSelectedOption(opt[0]);
        setImages(images);
      });
  }, []);

  return (
    <Flex
      w="100%"
      p={{ base: "0px 20px", md: "0px 80px" }}
      flexDir="column"
      h="auto"
    >
      {product == null ? (
        <Loading />
      ) : (
        <Flex
          justifyContent="space-between"
          maxW="800px"
          w="100%"
          flexWrap="wrap"
          m="auto"
        >
          {/* images */}
          <Box w={{ base: "100%", md: "50%" }}>
            <Carousel imagesArray={images} />
          </Box>
          {/* images */}

          {/* detail */}
          <Flex
            w={{ base: "100%", md: "50%" }}
            pl={{ base: "0px", md: "20px" }}
            pb={{ base: "0px", md: "80px" }}
            mt={{ base: "40px", md: "0px" }}
            h={{ base: "320px", md: "auto" }}
            flexDir="column"
            justifyContent="space-between"
          >
            <Text color="#fff" fontSize="20px" fontWeight="600">
              {product.title}
            </Text>

            <Text
              color="#B3B3B3"
              fontSize={{ base: "20px", md: "22px" }}
              fontWeight="600"
              cursor="pointer"
              display="inline-block"
              _hover={{ color: "#fff" }}
            >
              Crashpunks
            </Text>

            <Text fontWeight="600" fontSize="24px" color="#fff">
              {product.variants[0].price}
            </Text>

            {selectedOption && (
              <Flex justifyContent="space-between" w="100%" flexWrap="wrap">
                <Box w="49%">
                  <Dropdown
                    change={(e) => {
                      setSelectedOption(e.target.value);
                    }}
                    pairArray={options}
                    value={options[0].value}
                    placeholder={options[0].value}
                  />
                </Box>
              </Flex>
            )}

            <Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                w="35px"
                h="35px"
                bgColor="#353536"
                borderRadius="8px"
                color="#b3b3b3"
                mr="8px"
                p="0px"
              >
                <Image src={minus} alt="minus" />
              </Flex>

              <Text
                mr="8px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                w="35px"
                h="35px"
                borderRadius="8px"
                color="white"
                fontSize="20px"
              >
                1
              </Text>

              <Flex
                justifyContent="center"
                alignItems="center"
                w="35px"
                h="35px"
                bgColor="#353536"
                borderRadius="8px"
                color="#b3b3b3"
                mr="8px"
                p="0px"
              >
                <Image src={plus} alt="minus" />
              </Flex>
            </Flex>

            <Box h="auto">
              <BasicButton>Add to basket</BasicButton>
            </Box>
          </Flex>
          {/* detail */}
          {/* description */}

          <Flex
            mt={{ base: "20px", md: "40px" }}
            w="100%"
            flexDir="column"
            alignItems="center"
            pr={{ base: "20px", md: "0px" }}
            overflow="hidden"
          >
            <Text
              fontWeight="500"
              fontSize="18px"
              w="100%"
              color="#b3b3b3"
              whiteSpace="pre-line"
              dangerouslySetInnerHTML={{ __html: product.body_html }}
              display={testLimit == true ? "inline-block " : "-webkit-box"}
              overflow="hidden"
              text-overflow="ellipsis"
              __css={{
                "&::-webkit-line-clamp": {
                  w: "2",
                },
                "&::-webkit-box-orient": {
                  w: "vertical",
                },
              }}
            ></Text>
            <Box
              color="#fff"
              fontSize="16px"
              w="auto"
              textAlign="center"
              mt="20px"
              border="1px solid #aaa"
              p="5px 10px"
              borderRadius="8px"
             cursor='pointer'
              _hover={{ border: "1px solid #fff" }}
              onClick={()=>setTextLimit(p => !p)}
            >
              Read more
            </Box>
          </Flex>
          {/* description */}
        </Flex>
      )}
    </Flex>
  );
};

export default TestProduct;
