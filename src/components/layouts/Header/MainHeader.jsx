import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { HeaderWrapper, HeaderTitle } from "./MainHeader-style";

import DefaulHeader from "./default header/Default-header-component";
import CustomerHeader from "./components/customer-header/customer-header"
import EmailModal from "../../Modal/Email-modal/email-modal";
import ProducerHeader from "./components/producer-header/producer-header"

function MainHeader() {
  const [showEmailModal, setEmailModal] = useState(false);
  const { profile, isCustomer } = useProfile();
  const navigate = useNavigate();

  const closeEmailModal = () => setEmailModal(false);

  const navigateToLandingPage = () => navigate("/");

  const customerHaventEmail = () => setEmailModal(true);
  // show droplinked logo in leftside and condition for right side
  // if have any profile show(UserHeader component)
  // if havent any profile show default component

  return (
    <HeaderWrapper>
      <HeaderTitle onClick={navigateToLandingPage}>droplinked</HeaderTitle>
      <Flex h="100%">
        {profile ? (
          <Flex h="100%" alignItems="center">
            {isCustomer() ? <CustomerHeader/> : <ProducerHeader/>}
          </Flex>
        ) : (
          <DefaulHeader haventEmail={customerHaventEmail} />
        )}
        {showEmailModal && <EmailModal close={closeEmailModal} />}
      </Flex>
    </HeaderWrapper>
  );
}

export default MainHeader;
