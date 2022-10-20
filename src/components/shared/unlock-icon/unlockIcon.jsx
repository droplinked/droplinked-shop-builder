import { Tooltip, Flex } from "@chakra-ui/react";
import { HiOutlineLockOpen } from "react-icons/hi";
import { useState } from "react";

const UnlockIcon = () => {
  
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  const open = () => setIsLabelOpen(true);
  const close = () => setIsLabelOpen(false);

  return (
    <Tooltip
      isOpen={isLabelOpen}
      label="This item is available for everyone"
      color="#fff"
      bgColor="#222"
      borderRadius="8px"
      p="12px 16px"
      minW="350px"
    >
      <Flex justifyContent="center" alignItems="center" cursor="pointer">
        <HiOutlineLockOpen
          color="white"
          size="sm"
          onMouseOver={open}
          onMouseOut={close}
        />
      </Flex>
    </Tooltip>
  );
};

export default UnlockIcon;
