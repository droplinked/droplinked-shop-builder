import { Box } from "@chakra-ui/react";
import { shopsData } from "./shops-data"
import ShopComponent from "../components/shop-component/shop-component";

const Shops = () => {
  return <Box w="100%" >
    {shopsData.map((shop , i)=>{
      return <ShopComponent shop={shop}/>
    })}
  </Box>;
};

export default Shops;
