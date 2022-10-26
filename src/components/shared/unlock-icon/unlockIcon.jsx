import { Tooltip, Flex, Image } from "@chakra-ui/react";
import { HiOutlineLockOpen } from "react-icons/hi";
import { useState } from "react";

import unlockIconfrom from "../../../assest/icon/unlock.svg";

const UnlockIcon = () => {
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  const open = () => setIsLabelOpen(true);
  const close = () => setIsLabelOpen(false);

  return (
    <Tooltip
      isOpen={isLabelOpen}
      label="You’ve unlocked this exclusive offer!"
      color="#fff"
      bgColor="#222"
      borderRadius="8px"
      p="12px 16px"
      minW="350px"
    >
      <Flex justifyContent="center" alignItems="center" cursor="pointer">
        <Image src={unlockIconfrom}  onMouseOver={open}  onMouseOut={close}/>  
       
        {/* <HiOutlineLockOpen
          color="white"
          size="sm"
         
         
        /> */}
      </Flex>
    </Tooltip>
  );
};

export default UnlockIcon;
