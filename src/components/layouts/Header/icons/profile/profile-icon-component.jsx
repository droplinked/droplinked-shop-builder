import defaultProfile from "../../../../../assest/profile/defaultProfile.png"

import { Flex, Image } from "@chakra-ui/react"
import { useProfile } from "../../../../../context/profile/ProfileContext"
import { useState, useEffect } from "react"
import { getShop } from "../../../../../api/base-user/Profile-api"

export default function ProfileIcon({ click }) {

    const [profileImage, setProfileImage] = useState(null)
    const { profile } = useProfile()

    useEffect(() => {
        if (profile.type == "PRODUCER") {
            setShopImage()
        } else {
            setProfileImage(profile.avatar)
        }
    }, [profile])

    const setShopImage = async () => {
        let result = await getShop()
        if(result) setProfileImage(result.logo);
    }


    return (
        <>
            {(profileImage)
                ?
                <Image
                    w={{ base: "34px", md: '52px' }}
                    h={{ base: "34px", md: '52px' }}
                    borderRadius="50%"
                    cursor='pointer'
                    src={profileImage}
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