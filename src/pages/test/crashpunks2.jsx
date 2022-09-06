import { Flex ,Box } from "@chakra-ui/react";
import { useEffect , useState } from "react";

import axios from "axios"
import ProfileTopSection from "../Crashpunks-page/crashpunks top section/ProfileTopSection";
import GalleryCarousel from "../Crashpunks-page/gallery carousel/GalleryCarousel"
import Collection from "../../components/shared/Collection/collection-component"

const Crashpunks2 = () => {

    const [products , setProducts] = useState([])


        useEffect(() => {
            axios.post('https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search',
                {
                    page: 1,
                    shop_domain: "crashpunks-gear.myshopify.com",
                    keyword: ""
                }).then((response) => {
                    let x = response.data.shopify.map((item) =>  item )
                    setProducts(x)
                });
        }, [])


  return (
  <Flex  w='100vw' mx='auto' maxWidth='940px' px={{base:'20px' , md:'80px'}} justifyContent='center' flexDir='column'>
    <ProfileTopSection />
    <GalleryCarousel />

    <Box mb='40px'></Box>

    {(products.length>0)&&<Collection type="SHOPIFY" collection={{_id:1 , title:'xxx',products:products}} />}

  </Flex>
  );
};

export default Crashpunks2;
