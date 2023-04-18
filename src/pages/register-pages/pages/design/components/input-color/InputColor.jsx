import { Flex, Text, FormLabel, FormControl } from "@chakra-ui/react";
import { useEffect } from "react";

import { BANNER_DEFAULT_IMSGES } from "../../default-images";


const InputColor = ({ banner, label, value, change }) => {
  const setCorrectColor = () => {

    
    const imageName = BANNER_DEFAULT_IMSGES.find(
      (element) => element.banner_src === banner
    );
    console.log('imageName  ' ,BANNER_DEFAULT_IMSGES[0].banner_src === banner);
    if (imageName) {
   
      switch (imageName.name) {
        case "banner-1":
          change("#7ec9c8");
          break;
        case "banner-2":
          change("#d9d9dd");
          break;
        case "banner-3":
          change("#e9eaec");
          break;
        case "banner-4":
          change("#010101");
          break;
        default:
          break;
      }
    }
  };


  useEffect(() => {
    if (banner) setCorrectColor();
  }, [banner]);

  return (
    <FormControl isRequired w="100%">
      <FormLabel fontWeight="500" fontSize="18px" color="#C2C2C2" mb="12px">
        {label}
      </FormLabel>
      <Flex
        w="100%"
        bg="subLayer"
        borderRadius="8px"
        p="13px 24px"
        gap="10px"
        alignItems="center"
      >
        <input
          style={{
            backgroundColor: value,
            width: "20px",
            height: "20px",
          }}
          type="color"
          value={value}
          onChange={(e) => change(e.target.value)}
        />

        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="16px"
          color="#808080"
        >
          {value}
        </Text>
      </Flex>
    </FormControl>
  );
};

export default InputColor;
