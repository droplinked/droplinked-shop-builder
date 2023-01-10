import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

import { HeaderWrapper, HeaderTitle, BurgerIcon } from "./Header-style";
import { useProfile } from "../../context/profile/ProfileContext";
import { useSideBar } from "../../context/sidebar/sidebar-context";
/* components */
//import DefaulHeader from "./components/default-header/default-header";
//import CustomerHeader from "./components/customer-header/customer-header";
//import ProducerHeader from "./components/producer-header/producer-header";
import PublicHeader from "./components/public-header/PublicHeader";
import EmailModal from "../../modals/email/EmailModal";

/* icons */
import burger from "../../assest/icon/test-burger-icon.svg";

const Header = () => {
  const [showEmailModal, setEmailModal] = useState(false);

  const { profile, isCustomer, isRegisteredProducer } = useProfile();
  const { showSideBar, toggleSideBar } = useSideBar();
  const navigate = useNavigate();

  const toggleEmailModal = () => setEmailModal((p) => !p);

  const navigateToLandingPage = () => navigate("/");
  // show droplinked logo in leftside and condition for right side
  // if have any profile show(UserHeader component)
  // if havent any profile show default component

  return (
    <HeaderWrapper>
      <Flex w="auto" alignItems="center">
        {isRegisteredProducer() && (
          <BurgerIcon
            src={burger}
            onClick={toggleSideBar}
            transform={showSideBar ? "rotate(90deg)" : "rotate(0deg)"}
            transition="1s"
            // transform: rotate(45deg);
          />
        )}
        <HeaderTitle onClick={navigateToLandingPage}>droplinked</HeaderTitle>
      </Flex>
      <Flex h="100%" alignItems='center'>
        {profile ? (
          <Flex h="100%" alignItems="center">
            {/* {isCustomer() ? <CustomerHeader /> : <ProducerHeader />} */}
          </Flex>
        ) : (
          <PublicHeader />
        )}
        <EmailModal show={showEmailModal} close={toggleEmailModal} />
      </Flex>
    </HeaderWrapper>
  );
};

export default Header;
