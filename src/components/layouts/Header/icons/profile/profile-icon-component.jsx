import defaultProfile from "../../../../../assest/image/defaultProfile.png"

import { Flex, Image } from "@chakra-ui/react"
import { useProfile } from "../../../../../context/profile/ProfileContext"
import { useState, useEffect } from "react"
import { getShop } from "../../../../../api/base-user/Profile-api"
import { useShop } from "../../../../../context/shop/ShopContext"

export default function ProfileIcon({ click }) {

    const [profileImage, setProfileImage] = useState(null)
    const { profile } = useProfile()
    const { shop } = useShop()

    useEffect(() => {
        if (profile.type == "PRODUCER") {
            if(shop)setProfileImage(shop.logo)
            
        } else {
            setProfileImage(profile.avatar)
        }
    }, [profile , shop])

    // const setShopImage = async () => {
    //     let result = await getShop()
    //     if (result) setProfileImage(result.logo);
    // }


    return (
        <>
            {(profileImage)
                ?
                <Image
                    w={{ base: "34px", md: '46px' }}
                    h={{ base: "34px", md: '46px' }}
                    borderRadius="50%"
                    cursor='pointer'
                    src={profileImage}
                    onClick={click}
                    border='2px'
                    borderColor='primary'
                />
                :
                <Flex
                    justifyContent='center'
                    alignItems='center'
                    cursor='pointer'
                    borderRadius='50%'
                    border='2px'
                    borderColor='primary'
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