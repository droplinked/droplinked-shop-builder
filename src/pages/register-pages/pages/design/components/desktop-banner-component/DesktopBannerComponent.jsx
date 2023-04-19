import { Flex, Image } from "@chakra-ui/react";

import { BANNER_DEFAULT_IMSGES } from "../../default-images";

const DesktopBannerComponent = ({ change, value }) => {
  return (
    <Flex
      width="100%"
      overflow="auto"
      gap="15px"
      sx={{
        "&::-webkit-scrollbar": {
          height: "8px !important",
        },
      }}
      justifyContent="space-between"
    >
      {BANNER_DEFAULT_IMSGES.map((item) => {
        return (
          <Image
            key={item.banner_src}
            src={item.image}
            onClick={() => change(item.banner_src)}
            w="20%"
            h="auto"
            border={item.image === value ? "3px solid" : "none"}
            borderColor="#2ec99e"
            borderRadius="8px"
          />
        );
      })}
    </Flex>
  );
};

export default DesktopBannerComponent;
