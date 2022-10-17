// CiLock
// CiUnlock
import { useState } from "react";
import { Tooltip, Flex } from "@chakra-ui/react";
import { HiOutlineLockClosed } from "react-icons/hi";

const LockIcon = () => {
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  const open = () => setIsLabelOpen(true);
  const close = () => setIsLabelOpen(false);

  return (
    <Tooltip
      isOpen={isLabelOpen}
      label="This item is exclusive to CrashPunks NFT holders"
      color="#fff"
      bgColor="#222"
      borderRadius="8px"
      p="12px 16px"
      minW="350px"
    >
      <Flex justifyContent="center" alignItems="center" cursor="pointer">
        <HiOutlineLockClosed
          color="white"
          size="sm"
          onMouseOver={open}
          onMouseOut={close}
        //  onMouseOver={close}
        />
      </Flex>
    </Tooltip>
  );
};

export default LockIcon;
