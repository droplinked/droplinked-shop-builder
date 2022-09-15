

import { Flex, Text, Box } from "@chakra-ui/react";


const ShippingComponent = ({shippingItem ,selected ,setSelected}) => {
//console.log(shippingItem);
    return (
    <Flex
     p='10px 15px'
      w='100%'
        mb='30px'
        border='3px solid'
        borderColor={(selected && selected.id == shippingItem.id)?'#8053ff':'#4d4d4d'}
        borderRadius="30px"
        justifyContent='space-between'
        cursor='pointer'
        onClick={()=>{setSelected(shippingItem)}}
        >
        <Text color='#fff'>{shippingItem.title}</Text>
        <Text color='#fff'>${shippingItem.price}</Text>
    </Flex>
    )
}

export default ShippingComponent