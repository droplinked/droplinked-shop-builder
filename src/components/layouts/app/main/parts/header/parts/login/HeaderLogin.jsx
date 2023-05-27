import React from 'react'
import { useState } from "react";
import { HeaderButton } from "../../HeaderLayout-style";
import AuthModal from 'components/modals/auth-modal/AuthModal';


const HeaderLogin = () => {
    const [authModal, setAuthModal] = useState(false);
    const toggleAuthModal = () => setAuthModal((p) => !p);

    return (
        <>
            <HeaderButton onClick={toggleAuthModal}>Login</HeaderButton>
            <AuthModal show={authModal} close={toggleAuthModal} />
        </>
    )
    
}

export default HeaderLogin