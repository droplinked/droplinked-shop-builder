import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'

//Components
import AppTypography from 'components/common/typography/AppTypography'

const CollectionTitleColumn = ({collection}) => {

  const generateRandomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return `#${color.padStart(6, '0')}`;
  }
  
  return (
    <Flex gap={"8px"} alignItems={"center"}>
      {collection.image ? 
        <Image src={collection.image} width={"40px"} height={"40px"} borderRadius={"7px"} objectFit={"cover"} /> 
        : 
        <Box width="40px" height="40px" borderRadius="7px" backgroundColor={generateRandomColor()} />
      }
      <AppTypography fontSize="12px">{collection.title}</AppTypography>
    </Flex>
  )
}

export default CollectionTitleColumn