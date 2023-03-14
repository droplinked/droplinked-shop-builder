import { Box, Flex , Image } from "@chakra-ui/react";
import { useState } from "react";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  SaveButton,
  Text18px
} from "../../RegisterPages-style";
import { MainThemeImage } from "./DesignPage-style";

import InputImage from "./components/input-image/InputImage";

import theme1Image from "./theme-1.jpg"
import theme2Image from "./theme-2.jpg"
import theme3Image from "./theme-3.jpg"

const DesignPage = () => {

    const images = [theme1Image , theme2Image ,theme3Image ]
  return (
    <PageContent>
      <PageInformationComponent>
        Pick an editable template and customize it with your brand logo, title,
        header banner, etc.
      </PageInformationComponent>
      <PageContentWrapper>
        <Text18px>Templates</Text18px>
        <Box mb="48px" />
        <MainThemeImage src={theme3Image} />
        <Box mb="48px" />
        <Flex w='100%' maxW='100%' overflow='hidden' gap='24px' justifyContent='space-between' alignItems='center' >
            {images.map((currentImage)=>{
                return <Image src={currentImage} w='30%' h='154px' borderRadius='8px' cursor='pointer' />
            })}
        </Flex>
        <Box mb="104px" />

        <Text18px>Details</Text18px>
        <Box mb="48px" />
        <InputImage label='Logo' placeHolder='This image will display on the left side of the store page.' setImage={(e)=>{console.log('e ' ,e)}} />
      </PageContentWrapper>
    </PageContent>
  );
};

export default DesignPage;
