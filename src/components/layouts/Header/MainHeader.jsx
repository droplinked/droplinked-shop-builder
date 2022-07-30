import "./mainHeader.scss";

import { Link } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext"
import { Flex , Text } from "@chakra-ui/react"

import DefaulHeader from "./default header/Default-header-component"
import UserHeader from "./user Header/User-header-component"




function MainHeader() {

  const { profile, logout } = useProfile();

  return (
    <Flex
    w='100%'
    bgColor='#222'
    justifyContent='space-between'
    alignItems='center'
    padding={{base:"8px 20px" , md:'8px 80px'}}
    h={{base:'52px' , md:'70px'}}
    >
        <Link to="/">
          <Text
           color='#fff'
           fontSize={{base:'24px' , md:'28px'}}
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
            <DefaulHeader />
          }
        </Flex> 
      </Flex>
  )

}

export default MainHeader

