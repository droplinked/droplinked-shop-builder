import defaultProfile from "../../../../../assest/profile/defaultProfile.png"

import { Flex, Image } from "@chakra-ui/react"
import { useProfile } from "../../../../../context/profile/ProfileContext"

export default function ProfileIcon({ click }) {


    const { profile } = useProfile()

    let Profileimage = profile.avatar

    return (
        <>
            {(Profileimage)
                ?
                <Image
                    w={{ base: "34px", md: '52px' }}
                    h={{ base: "34px", md: '52px' }}
                    borderRadius="50%"
                    cursor='pointer'
                    src={Profileimage}
                    onClick={click}
                    border='2px'
                    borderColor='#8053ff'
                />
                :
                <Flex
                    justifyContent='center'
                    alignItems='center'
                    cursor='pointer'
                    borderRadius='50%'
                    border='2px'
                    borderColor='#8053ff'
                    w={{ base: "34px", md: '52px' }}
                    h={{ base: "34px", md: '52px' }}
                    style={{
                        backgroundImage: `url(${defaultProfile})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                    onClick={click}
                ></Flex>
            }
        </>
    )
}