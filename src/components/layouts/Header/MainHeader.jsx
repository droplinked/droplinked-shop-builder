import "./mainHeader.scss";

import { Link } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext"
import { Flex, Text } from "@chakra-ui/react"
import { useState } from "react";

import DefaulHeader from "./default header/Default-header-component"
import UserHeader from "./user Header/User-header-component"
import EmailModal from "../../Modal/Email-modal/email-modal"


function MainHeader() {

  const [showEmailModal, setEmailModal] = useState(false);
  const { profile } = useProfile();

  const closeEmailModal = () => setEmailModal(false)

  const customerHaventEmail = () => setEmailModal(true)
  // show droplinked logo in leftside and condition for right side 
  // if have any profile show(UserHeader component)
  // if havent any profile show default component

  return (
    <Flex
      w='100%'
      bgColor='#222'
      justifyContent='space-between'
      alignItems='center'
      padding={{ base: "8px 20px", md: '8px 80px' }}
      h={{ base: '52px', md: '70px' }}
    >
      <Link to="/">
        <Text
          color='#fff'
          fontSize={{ base: '24px', md: '28px' }}
          fontWeight='600'
        >
          droplinked
        </Text>
      </Link>
      <Flex h='100%'>
        {(profile)
          ?
          <UserHeader />
          :
          <DefaulHeader haventEmail={customerHaventEmail} />
        }
        {showEmailModal && <EmailModal close={closeEmailModal} />}
      </Flex>
    </Flex>
  )

}

export default MainHeader

