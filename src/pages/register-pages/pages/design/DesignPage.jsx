import { Box, Flex, Image, input } from "@chakra-ui/react";
import { useReducer , useState } from "react";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  SaveButton,
  Text18px,
} from "../../RegisterPages-style";
import { MainThemeImage } from "./DesignPage-style";
import { shopDesignReducer ,SHOP_REDUCER_TYPES } from "./reducer";

import InputImage from "./components/input-image/InputImage";
import InputColor from "./components/input-color/InputColor";
import InputComponent from "../../component/input-component/InputComponent";

import theme1Image from "./theme-1.jpg";
import theme2Image from "./theme-2.jpg";
import theme3Image from "./theme-3.jpg";

const INITIAL_SHOP_Design = {
  logo: "",
  headerIcon: "",
  textColor: "",
  theme: "",
  backgroundText: "",
  backgroundImage: "",
  backgroundImageSecondary: "",
};

const IMAGES = [
  {img :theme1Image , name:'theme-1' } ,
  {img :theme2Image , name:'theme-2' } ,
  {img :theme3Image , name:'theme-3' } ,
]

const DesignPage = () => {

  const [selectedTheme , setSelectedTheme] = useState(IMAGES[0])

  const [designData, dispatch] = useReducer(
    shopDesignReducer,
    INITIAL_SHOP_Design
  );
console.log('designData : ',designData);

  const selectTheme = (item) => {
    setSelectedTheme(item)
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_THEME,
      payload: item.name,
    });
  }


  const changeLogo = (item) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_LOGO,
      payload: item,
    });
  }


  const changeHeaderIcon = (item) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_HEADER_ICON,
      payload: item,
    });
  }

  const changeDescription = (e) => {
    dispatch({
        type: SHOP_REDUCER_TYPES.SET_BACKGROUNED_TEXT,
        payload: e.target.value,
      });
  };


  const changeBanner= (item) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_BACKGROUNED_BANNER,
      payload: item,
    });
  }

  return (
    <PageContent>
      <PageInformationComponent>
        Pick an editable template and customize it with your brand logo, title,
        header banner, etc.
      </PageInformationComponent>
      <PageContentWrapper>
        <Text18px>Templates</Text18px>
        <Box mb="48px" />
        <MainThemeImage src={selectedTheme.img} />
        <Box mb="48px" />
        <Flex
          w="100%"
          maxW="100%"
          overflow="hidden"
          gap="24px"
          justifyContent="space-between"
          alignItems="center"
        >
          {IMAGES.map((currentObj) => {
            return (
              <Image
                src={currentObj.img}
                onClick={()=>{selectTheme(currentObj)}}
                w="30%"
                h="154px"
                borderRadius="8px"
                cursor="pointer"
              />
            );
          })}
        </Flex>
        <Box mb="104px" />
        <Text18px>Details</Text18px>
        <Box mb="48px" />
        <InputImage
          label="Logo"
          placeHolder="This image will display on the left side of the store page."
          change={changeLogo}
        />
        <Box mb="48px" />
        <InputImage
          label="Header logo"
          placeHolder="This image will display at the upper left corner of the store page."
          change={changeHeaderIcon}
        />
        <Box mb="48px" />
        <InputComponent
          label="Header title"
          placeHolder="Write a catchy title for the header"
          isRequired={true}
          change={changeDescription}
        />
        <Box mb="48px" />
        <InputImage
          label="Header banner"
          placeHolder="This image will display at the top of the store page."
          change={changeBanner}
        />
        <Box mb="48px" />
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          gap="24px"
        >
          <Box w="50%">
            <InputColor label="Color background" />
          </Box>
          <Box w="50%">
            <InputColor label="Color background" />
          </Box>
        </Flex>
      </PageContentWrapper>
      <Box mb="36px" />
      <Flex justifyContent="end" w="100%">
        <SaveButton w="200px" onClick={() => {}}>
          Save & next step
        </SaveButton>
      </Flex>
    </PageContent>
  );
};

export default DesignPage;
