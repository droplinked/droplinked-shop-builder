import {
    Flex,
    FormControl,
    FormLabel,
    Text,
    Input,
    Box,
    keyframes,
    usePrefersReducedMotion,
    Button
} from '@chakra-ui/react'

import { BASE_URL } from "../../../api/BaseUrl"
import { useEffect, useState } from 'react'
import { useAddress } from "../../../context/address/AddressContext"
import { useToasty } from "../../../context/toastify/ToastContext"
import { updateShopApi } from "../../../api/producer/Shop-api"
import { useNavigate } from "react-router-dom";
import { useShop } from "../../../context/shop/ShopContext"

import axios from "axios"
import InputImage from '../../../components/shared/InputImage/InputImage'
import Loading from "../../../components/shared/loading/Loading"
import FormInput from "../../../components/shared/FormInput/FormInput"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"
import AddressComponent from "../../../components/shared/Address/address-component"
import AddressForm from "../../../components/Modal/Address/Address-modal"

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


export default function ShopInfoComponent({ active }) {

    const token = JSON.parse(localStorage.getItem("token"));
    const profile = JSON.parse(localStorage.getItem("profile"));

    const [shop, setShop] = useState(null)
    const [disableBtn, setDisableBtn] = useState(false)
    const [addressModal, setAddressModal] = useState(false)

    const { addressList } = useAddress()
    const { errorToast, successToast } = useToasty()
    const { updateShop } = useShop()

    let navigate = useNavigate();


    const prefersReducedMotion = usePrefersReducedMotion();

    const startAnimation = prefersReducedMotion
        ? undefined
        : `${keyframe_startanimation}  0.2s linear`;

    let shopAddressBook = addressList.find(address => address.addressType == "SHOP")


    useEffect(() => {
        axios.get(`${BASE_URL}/profile`,
            { headers: { Authorization: "Bearer " + token } })
            .then(e => {
                if (e.data.data.shop.description)
                    setShop(e.data.data.shop)
                else setShop({ ...e.data.data.shop, description: "" })
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


    const submitForm = async () => {

        if(shop.description.length < 1){
            errorToast("Shop name is required")
            return 
        }

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

        let result = await updateShopApi(shopInformation)

        if (result.status == 'success') {
            localStorage.setItem("shop", JSON.stringify(result.data.shop));
            successToast("Shop info successfully updated")
            updateShop()
            if (profile.status == "VERIFIED") navigate(`/${profile.shopName}`);
        } else {
            errorToast(result.reason)
        }

        setDisableBtn(false)

    }

    const changeShopname = (e) => {
        if(e.target.value.length<31)
        chageShopInformation('description', e)
    }

    return (
        <Box w='100%' animation={(active == 'shop' ? startAnimation : '')} bg='subLayer' p='10px' borderRadius='8px'>
            {(shop == null)
                ?
                <Loading />
                :
                <>
                    <InputImage image={shop.logo} setImage={changeShopLogo} />

                    {/* shop name input */}
                    <FormControl >
                        <FormLabel
                            htmlFor='input-com'
                            fontWeight='600'
                            fontSize={{ base: '14px', md: '20px' }}
                            color='#fff'
                        >Shop name</FormLabel>
                        <Flex
                            border='2px'
                            borderColor='#b3b3b3'
                            borderRadius='8px'
                            _focus={{ borderColor: "#8053ff" }}
                            px="16px"
                            py={{ base: "8px", md: "12px" }}
                        >
                            <Input
                                id='input-com'
                                value={shop.description}
                                onChange={changeShopname}
                                fontWeight='600'
                                fontSize={{ base: '14px', md: '20px' }}
                                color='#fff'
                                p='0px'
                                // h='100%'
                                outline='none'
                                border='none'
                                _focus={{
                                    borderColor: "none",
                                    outline: 'none'
                                }}
                                //   w='100%'
                                h='auto'
                                placeholder="Shop name"
                            />
                            <Text
                                fontSize={{ base: '14px', md: '20px' }}
                                fontWeight='600'
                                color={(shop.description.length < 30) ? "#fff" : "red"}
                            >
                                {shop.description.length}/30
                            </Text>
                        </Flex>
                    </FormControl>
                    {/* shop name input */}

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
                    {(shopAddressBook) ?
                        <AddressComponent
                            address={shopAddressBook}
                        />
                        :
                        <Flex w='100%' justifyContent='center'>
                            <Button
                                mt='40px'
                                text-align="center"
                                color="#ffffff"
                                fontSize={{ base: "16px", md: '20px' }}
                                fontWeight='600'
                                padding="13px 50px"
                                borderRadius='10px'
                                bgColor='transparent'
                                onClick={() => { setAddressModal(true) }}
                                border='2px solid subLayer'
                                _hover={{
                                    bgColor: 'transparent',
                                    borderColor: "#fff"
                                }}
                            >Add address</Button>
                        </Flex>
                    }
                    <Flex justifyContent='end' mt='50px'>
                        <BasicButton w={{ base: '100%', md: '45%' }} p='12px 16px'
                            disabled={(disableBtn || (shop.description.length > 30))}
                            onClick={submitForm}
                        >Submit</BasicButton>
                    </Flex>
                    {addressModal && <AddressForm type={"SHOP"} close={() => { setAddressModal(false) }} />}
                </>
            }

        </Box >
    )
}