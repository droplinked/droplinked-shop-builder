import { Tooltip ,Flex} from "@chakra-ui/react";
import { HiOutlineLockOpen } from "react-icons/hi";



const UnlockIcon = () => {
  return (
    <Tooltip
      label="This item is available for everyone"
      color="#fff"
      bgColor="#222"
      borderRadius="8px"
      p="8px 16px"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        w={{ base: "25px", md: "36px" }}
        h={{ base: "25px", md: "36px" }}
        p={{ base: "4px", md: "6px" }}
        borderRadius="50%"
        bgColor="#222"
        cursor="pointer"
      >
        <HiOutlineLockOpen color="white" size="sm" />
      </Flex>
    </Tooltip>
  );
};

export default UnlockIcon;