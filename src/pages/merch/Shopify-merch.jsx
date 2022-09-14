import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCart } from "../../context/cart/CartContext";
import { useToasty } from "../../context/toastify/ToastContext";
import { useProfile } from "../../context/profile/ProfileContext";
import { checkRules } from "../../services/nft-service/NFTcheck";
import { UseWalletInfo } from "../../context/wallet/WalletContext"
import axios from "axios";
import Loading from "../../components/shared/loading/Loading";
import Carousel from "../../components/shared/Carousel/Carousel-component";
//import DropdownTest from "./test-drop-component"
import Dropdown from "../../components/shared/Dropdown/Dropdown-component";
import plus from "../../assest/icon/plusIcon.png";
import minus from "../../assest/icon/minusIcon.png";
import BasicButton from "../../components/shared/BasicButton/BasicButton";

const ShopifyMech = ({ ruleset, product, shopdomain }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [testLimit, setTextLimit] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { userData, authenticate } = UseWalletInfo();
  const { addShopifyItemToCart } = useCart();
  const { successToast, errorToast } = useToasty();
  const { profile } = useProfile();

  let images = product.images.map((img) => {
    return { url: img.src };
  });

  useEffect(() => {
    let opt = product.variants.map((vari) => {
      return { id: vari.id, value: vari.title };
    });
    setOptions(opt);
    setSelectedOption(opt[0].id);
  }, []);

  const checkGated = async () => {
    if (ruleset == undefined) return true;

    const Rules = ruleset.rules.map((rule) => rule.address);
    setLoading(true)
    checkRules(userData.profile.stxAddress.mainnet, Rules)
      .then((e) => {
        if (e) {
          setLoading(false)
          return true;
        } else {
          setLoading(false)
          errorToast("Required NFT not found, accessed denied");
          return false;
        }
      })
      .catch((e) => {
        setLoading(false)
        errorToast(e.response.data);
        return false;
      });
  };

  const addItemToBasket = async () => {
    if (profile == null) {
      errorToast("Please login");
      return;
    }

   
    let checkNftGated = await checkGated();

    if(!checkNftGated) return

    let selectedVar = product.variants.find(
      (variant) => variant.id == selectedOption
    );
    let itemObject = {
      amount: quantity,
      product: product,
      shopName: shopdomain,
      variant: selectedVar,
    };
    successToast("Item added to cart");
    addShopifyItemToCart(itemObject);
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        maxW="800px"
        w="100%"
        flexWrap="wrap"
        m="auto"
      >
        {/* images */}
        <Box w={{ base: "100%", md: "50%" }} minh="500px">
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
            ${product.variants[0].price}
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
              onClick={() => {
                if (quantity > 1) {
                  setQuantity((p) => p - 1);
                }
              }}
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
              {quantity}
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
              onClick={() => {
                setQuantity((p) => p + 1);
              }}
            >
              <Image src={plus} alt="minus" />
            </Flex>
          </Flex>

          <Box h="auto">
            <BasicButton click={addItemToBasket} loading={loading}>Add to basket</BasicButton>
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
            cursor="pointer"
            _hover={{ border: "1px solid #fff" }}
            onClick={() => setTextLimit((p) => !p)}
          >
            Read more
          </Box>
        </Flex>
        {/* description */}
      </Flex>
    </>
  );
};

export default ShopifyMech;
