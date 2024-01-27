import { useDisclosure } from '@chakra-ui/react';
import LoginModal from 'components/modals/login-modal/LoginModal';
import React from 'react';
import { HeaderButton } from "../../HeaderLayout-style";

const HeaderLogin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
        <>
            <HeaderButton onClick={onOpen}>Login</HeaderButton>
            <LoginModal show={isOpen} open={onOpen} close={onClose} />
        </>
    )
}

export default HeaderLogin