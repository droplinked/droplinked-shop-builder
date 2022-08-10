import { Flex, FormLabel, Textarea, Box, keyframes, usePrefersReducedMotion } from '@chakra-ui/react'
import { BASE_URL } from "../../../api/BaseUrl"
import { useEffect, useState } from 'react'
import { useAddress } from "../../../context/address/AddressContext"
import { useToasty } from "../../../context/toastify/ToastContext"

import axios from "axios"
import InputImage from '../../../components/shared/InputImage/InputImage'
import Loading from "../../../components/shared/loading/Loading"
import FormInput from "../../../components/shared/FormInput/FormInput"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"
import AddressComponent from "../../../components/shared/Address/address-component"

const keyframe_startanimation = keyframes`
0% {
    transform: translateX(-400px);
    opacity: 0;
}
100% {
  transform: translateX(0);
  opacity: 1;
}
`;


export default function ShopInfoComponent({active}) {

    const token = JSON.parse(localStorage.getItem("token"));

    const [shop, setShop] = useState(null)
    const [disableBtn, setDisableBtn] = useState(false)

    const { addressList } = useAddress()
    const { errorToast, successToast } = useToasty()
    const prefersReducedMotion = usePrefersReducedMotion();

    const startAnimation = prefersReducedMotion
    ? undefined
    : `${keyframe_startanimation}  0.2s linear`;

    let shopAddressBook = addressList.find(address => address.addressType == "SHOP")


    useEffect(() => {
        axios.get(`${BASE_URL}/profile`,
            { headers: { Authorization: "Bearer " + token } })
            .then(e => {
                setShop(e.data.data.shop)
            })
            .catch(e => console.log(e.response.data.reason))
    }, [token])

    const changeShopLogo = (imageUrl) => {
        let newObject = {}
        newObject = { ...shop, logo: imageUrl }
        setShop(newObject)
    }

    const chageShopInformation = (type, e) => {
        let newObject = {}
        newObject = { ...shop, [type]: e.target.value }
        setShop(newObject)
    }


    const submitForm = () => {

        let shopInformation = {
            social: {
                discordUrl: shop.discordUrl,
                twitter: shop.twitterUrl,
                instagram: shop.instagramUrl,
                webUrl: shop.webUrl
            },
            shopLogo: shop.logo,
            shopAddressID: shop.addressBookID,
            description: shop.description
        }

        setDisableBtn(true)
        axios.put(`${BASE_URL}/producer/shop/info`, shopInformation,
            { headers: { Authorization: "Bearer " + token } })
            .then(e => {
                successToast("Shop info successfully updated")
                setDisableBtn(false)
            })
            .catch(e => {
                errorToast(e.response.data.reason)
                setDisableBtn(false)
            })
    }


    return (
        <Box w='100%' animation={(active=='shop'?startAnimation:'')}>
            {(shop == null)
                ?
                <Loading />
                :
                <>
                    <InputImage image={shop.logo} setImage={changeShopLogo} />

                    <FormInput 
                    value={shop.description}
                     onChange={(e) => chageShopInformation('description', e)} 
                     label={'Shop name'}
                     placeholder="Shop name"
                      mt='20px' />

                    {/* <Textarea
                        id='description-shop'
                        value={shop.description}
                        onChange={(e) => chageShopInformation('description', e)}
                        fontWeight='600'
                        fontSize={{ base: '14px', md: '20px' }}
                        color='#fff'
                        border='2px'
                        borderColor='#b3b3b3'
                        borderRadius='8px'
                        px="16px"
                        py={{ base: "8px", md: "12px" }}
                        outline='none'
                        _focus={{ borderColor: "#8053ff" }}
                        h='auto'
                        placeholder='about your shop'
                    >
                    </Textarea> */}

                    <FormInput value={`droplinked.com/${shop.name}`} label={'Domain'} mt='20px' />

                    
                    

                    <FormInput
                        value={shop.webUrl}
                        changeValue={(e) => chageShopInformation('webUrl', e)}
                        label={'Website'}
                        placeholder="www.example.com"
                        mt='20px' />

                    <FormInput
                        value={shop.discordUrl}
                        changeValue={(e) => chageShopInformation('discordUrl', e)}
                        label={'Discord'}
                        placeholder="Username"
                        mt='20px' />

                    <FormInput
                        value={shop.twitterUrl}
                        changeValue={(e) => chageShopInformation('twitterUrl', e)}
                        label={'Twitter'}
                        placeholder="Username"
                        mt='20px' />
                    <FormInput
                        value={shop.instagramUrl}
                        changeValue={(e) => chageShopInformation('instagramUrl', e)}
                        label={'Instagram'}
                        placeholder="Username"
                        mt='20px'
                        mb='20px'
                    />
                    {(shopAddressBook) &&
                        <AddressComponent
                            address={shopAddressBook}
                        />
                    }
                    <Flex justifyContent='end' mt='50px'>
                        <BasicButton w={{ base: '100%', md: '45%' }} p='12px 16px'
                            disabled={disableBtn}
                            onClick={submitForm}
                        >Submit</BasicButton>
                    </Flex>
                </>
            }

        </Box >
    )
}