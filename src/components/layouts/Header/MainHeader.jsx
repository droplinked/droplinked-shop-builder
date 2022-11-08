import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { HeaderWrapper, HeaderTitle } from "./MainHeader-style";

import DefaulHeader from "./default header/Default-header-component";
import UserHeader from "./user Header/User-header-component";
import EmailModal from "../../Modal/Email-modal/email-modal";

function MainHeader() {
  const [showEmailModal, setEmailModal] = useState(false);
  const { profile } = useProfile();
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
          <UserHeader />
        ) : (
          <DefaulHeader haventEmail={customerHaventEmail} />
        )}
        {showEmailModal && <EmailModal close={closeEmailModal} />}
      </Flex>
    </HeaderWrapper>
  );
}

export default MainHeader;
