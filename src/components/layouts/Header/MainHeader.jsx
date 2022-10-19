import "./mainHeader.scss";

import { Link } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext";
import { Flex, Text, Image } from "@chakra-ui/react";
import { useState } from "react";

import DefaulHeader from "./default header/Default-header-component";
import UserHeader from "./user Header/User-header-component";
import EmailModal from "../../Modal/Email-modal/email-modal";
import header from "../../../assest/icon/droplinked.png";

function MainHeader() {
  const [showEmailModal, setEmailModal] = useState(false);
  const { profile } = useProfile();

  const closeEmailModal = () => setEmailModal(false);

  const customerHaventEmail = () => setEmailModal(true);
  // show droplinked logo in leftside and condition for right side
  // if have any profile show(UserHeader component)
  // if havent any profile show default component

  return (
    <Flex
      w="100%"
      bgColor="#181818"
      justifyContent="space-between"
      alignItems="center"
      padding={{ base: "12px 20px", md: "36px 80px" }}
      h={{ base: "60px", md: "124px" }}
    >
      <Link to="/">
        {/* <Image
          h={{ base: "26px", sm: "36px", md: "28px" }}
         // h={{ base: "26px", sm: "36px", md: "52px" }}
          w="auto"
          src={header}
        /> */}
         <Text
          color="#fff"
          fontSize={{ base: "24px", md: "28px" }}
          fontWeight="600"
          letterSpacing="0.2em"
          pt={{ base: "3px", md: "0px" }}
        >
          droplinked
        </Text> 
      </Link>
      <Flex h="100%">
        {profile ? (
          <UserHeader />
        ) : (
          <DefaulHeader haventEmail={customerHaventEmail} />
        )}
        {showEmailModal && <EmailModal close={closeEmailModal} />}
      </Flex>
    </Flex>
  );
}

export default MainHeader;
