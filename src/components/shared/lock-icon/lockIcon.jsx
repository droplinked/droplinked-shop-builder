// CiLock
// CiUnlock

import { Tooltip ,Flex} from "@chakra-ui/react";
import { HiOutlineLockClosed } from "react-icons/hi";

const LockIcon = () => {
  return (
    <Tooltip
              label="This item is exclusive to CrashPunks NFT holders"
              color="#fff"
              bgColor="#222"
              borderRadius='8px'
              p='8px 16px'
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
              >
                <HiOutlineLockClosed color="white" size='sm' />
              </Flex>
            </Tooltip>
  );
};

export default LockIcon;
