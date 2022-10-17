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
                w={{ base: "25px", md: "36px" }}
                h={{ base: "25px", md: "36px" }}
                p={{ base: "4px", md: "6px" }}
                borderRadius="50%"
                bgColor="#222"
                cursor="pointer"
              >
                <HiOutlineLockClosed color="white" size='sm' />
              </Flex>
            </Tooltip>
  );
};

export default LockIcon;
