import { Flex, FormLabel, Textarea, Box } from '@chakra-ui/react'
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useEffect, useState } from 'react'

import axios from "axios"
import InputImage from '../../../components/shared/InputImage/InputImage'
import Loading from "../../../components/shared/loading/Loading"
import FormInput from "../../../components/shared/FormInput/FormInput"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"

export default function ShopInfoComponent() {

    const token = JSON.parse(localStorage.getItem("token"));

    const [shop, setShop] = useState(null)
    const [disableBtn, setDisableBtn] = useState(false)

    useEffect(() => {
        axios.get(`${BasicURL}/profile`,
            { headers: { Authorization: "Bearer " + token } })
            .then(e => setShop(e.data.data.shop))
            .catch(e => console.log(e.response.data.reason))
    }, [])

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
        axios.put(`${BasicURL}/producer/shop/info`,shopInformation,
        { headers: { Authorization: "Bearer " + token } })
        .then(e => {
            console.log(e.data.data);
            setDisableBtn(false)
        })
        .catch(e => {
            setDisableBtn(false)
            console.log(e.response.reason)
        })
    }


    return (
        <Box w='100%'>
            {(shop == null)
                ?
                <Loading />
                :
                <>
                    <InputImage image={shop.logo} setImage={changeShopLogo} />

                    <FormInput value={`droplinked.io/${shop.name}`} label={'domain'} mt='20px' />

                    <FormLabel
                        mt='20px'
                        htmlFor='description-shop'
                        fontWeight='600'
                        fontSize={{ base: '14px', md: '20px' }}
                        color='#fff'
                    >about you shop</FormLabel>
                    <Textarea
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
                    </Textarea>

                    <FormInput
                        value={shop.webUrl}
                        changeValue={(e) => chageShopInformation('webUrl', e)}
                        label={'Website'}
                        placeholder="www.website.com"
                        mt='20px' />

                    <FormInput
                        value={shop.discordUrl}
                        changeValue={(e) => chageShopInformation('discordUrl', e)}
                        label={'Discord'}
                        placeholder="discoreId"
                        mt='20px' />

                    <FormInput
                        value={shop.twitterUrl}
                        changeValue={(e) => chageShopInformation('twitterUrl', e)}
                        label={'Twitter'}
                        placeholder="Twitter username"
                        mt='20px' />
                    <FormInput
                        value={shop.instagramUrl}
                        changeValue={(e) => chageShopInformation('instagramUrl', e)}
                        label={'Instagram'}
                        placeholder="Instagram username"
                        mt='20px' />

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