// CiLock
// CiUnlock
import { useState } from "react";
import { Tooltip, Flex ,Image } from "@chakra-ui/react";
import { HiOutlineLockClosed } from "react-icons/hi";
import lockIcon from "../../../assest/icon/lockIcon.svg"

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
        <Image src={lockIcon} onMouseOver={open} onMouseOut={close}/>
        {/* <HiOutlineLockClosed
          color="white"
          size="sm"
          
          
        //  onMouseOver={close}
        /> */}
      </Flex>
    </Tooltip>
  );
};

export default LockIcon;
