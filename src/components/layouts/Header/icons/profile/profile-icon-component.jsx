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
                    w={{ base: "25px", md: '40px' }}
                    h={{ base: "25px", md: '40px' }}
                    borderRadius="50%"
                    cursor='pointer'
                    src={Profileimage}
                    onClick={click}
                />
                :
                <Flex
                    justifyContent='center'
                    alignItems='center'
                    cursor='pointer'
                    borderRadius='50%'
                    border='1px'
                    borderColor='#666'
                    w={{ base: "25px", md: '40px' }}
                    h={{ base: "25px", md: '40px' }}
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