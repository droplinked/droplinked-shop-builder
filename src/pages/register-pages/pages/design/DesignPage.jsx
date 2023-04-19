import { Box, Flex, Image } from "@chakra-ui/react";
import { useReducer, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  Text18px,
} from "../../RegisterPages-style";
import { MainThemeImage } from "./DesignPage-style";
import { shopDesignReducer, SHOP_REDUCER_TYPES } from "./reducer";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { useApi } from "../../../../hooks/useApi/useApi";
import { putUpdateShop } from "../../../../apis/shopApiService";
import { isValidData } from "./utils";
import { useCustomNavigate } from "../../../../hooks/useCustomeNavigate/useCustomNavigate";
import { useProfile } from "../../../../hooks/useProfile/useProfile";

import InputImage from "./components/input-image/InputImage";
import InputColor from "./components/input-color/InputColor";
import InputComponent from "../../component/input-component/InputComponent";
import SubmitButton from "../../component/submit-buttons/SubmitButtons";
import DesktopBannerComponent from "./components/desktop-banner-component/DesktopBannerComponent";

import theme1Image from "./theme-1.jpg";
import theme2Image from "./theme-2.jpg";
import theme3Image from "./theme-3.jpg";
import BasicButton from "components/shared/BasicButton/BasicButton";
import { BANNER_DEFAULT_IMSGES } from "./default-images";

const INITIAL_SHOP_Design = {
  logo: "",
  headerIcon: "",
  textColor: "#ffffff",
  theme: "theme-2",
  backgroundText: "",
  backgroundImage: "",
  backgroundImageSecondary: "",
  backgroundColor: "#000000",
};

const IMAGES = [
  // { img: theme1Image, name: "theme-1" },
  { img: theme2Image, name: "theme-2" },
];

const DesignPage = () => {
  const [selectedTheme, setSelectedTheme] = useState(IMAGES[0]);
  const [loading, setLoading] = useState(false);

  const [designData, dispatch] = useReducer(
    shopDesignReducer,
    INITIAL_SHOP_Design
  );

  const { errorToast, successToast } = useToasty();
  const { putApi } = useApi();
  const { shop, updateShopData } = useProfile();
  const { shopNavigate } = useCustomNavigate();
  const currentPath = useLocation().pathname;

  const initializeData = () => {
    const initial_value = {
      logo: shop.logo ? shop.logo : "",
      headerIcon: shop.headerIcon ? shop.headerIcon : "",
      textColor: shop.textColor ? shop.textColor : "#000",
      theme: shop.theme ? shop.theme : "theme-2",
      backgroundText: shop.backgroundText ? shop.backgroundText : "",
      backgroundImage: shop.backgroundImage ? shop.backgroundImage : "",
      backgroundImageSecondary: shop.backgroundImageSecondary
        ? shop.backgroundImageSecondary
        : "",
      backgroundColor: shop.backgroundColor ? shop.backgroundColor : "#fff",
    };
    dispatch({
      type: SHOP_REDUCER_TYPES.INITIALIZE,
      payload: initial_value,
    });
  };

  useEffect(() => {
    initializeData();
  }, [shop]);

  const selectTheme = (item) => {
    setSelectedTheme(item);
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_THEME,
      payload: item.name,
    });
  };

  const changeLogo = (item) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_LOGO,
      payload: item,
    });
  };

  const changeHeaderIcon = (item) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_HEADER_ICON,
      payload: item,
    });
  };

  const changeDescription = (e) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_BACKGROUNED_TEXT,
      payload: e.target.value,
    });
  };

  const changeBanner = (item) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_BACKGROUNED_BANNER,
      payload: item,
    });
  };

  const changeTextColor = (value) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_TEXT_COLOR,
      payload: value,
    });
  };

  const changeBackgroundColor = (value) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_BACKGROUND_COLOR,
      payload: value,
    });
  };
  const changeBackgroundImageSecondary = (image) => {
    dispatch({
      type: SHOP_REDUCER_TYPES.SET_BACKGROUNED_SECONDARY,
      payload: image,
    });
  };

  const clickSubmit = async () => {
    const finalData = {
      ...designData,
      backgroundColor:
        BANNER_DEFAULT_IMSGES?.find(
          (img) => img.banner_src === designData?.backgroundImage
        )?.color ?? designData.backgroundColor,
    };

    if (!isValidData(finalData)) {
      errorToast("Required");
      return;
    }
    setLoading(true);
    const result = await putApi(putUpdateShop(finalData));
    updateShopData();
    setLoading(false);
    if (result) {
      if (!currentPath.includes("register")) successToast("Updated");
      shopNavigate(`register/technical`);
    }
  };

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
                key={currentObj.img}
                src={currentObj.img}
                onClick={() => {
                  selectTheme(currentObj);
                }}
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
          value={designData.logo}
          change={changeLogo}
        />
        <Box mb="48px" />
        <InputImage
          label="Header logo"
          placeHolder="This image will display at the upper left corner of the store page."
          value={designData.headerIcon}
          change={changeHeaderIcon}
        />
        <Box mb="48px" />
        <InputComponent
          label="Header title"
          placeHolder="Write a catchy title for the header"
          isRequired={true}
          change={changeDescription}
          value={designData.backgroundText}
        />

        <Box mb="48px" />

        <InputImage
          label="Header banner"
          placeHolder="This image will display at the top of the store page."
          change={changeBanner}
          value={designData.backgroundImage}
        />
        <Box mb="24px" />
        <DesktopBannerComponent
          change={changeBanner}
          value={designData.backgroundImage}
        />
        <Box mb="48px" />
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          gap="24px"
        >
          <Box w="50%">
            <InputColor
              value={designData.textColor}
              change={changeTextColor}
              label="Text color"
            />
          </Box>
          {(designData.theme === "theme-1" ||
            designData.theme === "theme-2") && (
            <Box w="50%">
              <InputColor
                banner={designData.backgroundImage}
                value={
                  BANNER_DEFAULT_IMSGES?.find(
                    (img) => img.banner_src === designData?.backgroundImage
                  )?.color ?? designData.backgroundColor
                }
                change={changeBackgroundColor}
                label="Color background"
              />
            </Box>
          )}
        </Flex>
      </PageContentWrapper>
      <Box mb="36px" />

      <Flex justifyContent={"right"} width={"100%"}>
        <Box>
          <BasicButton size="lg" click={clickSubmit} loading={loading}>
            {currentPath.includes("register") ? "Save & next step" : "Save"}
          </BasicButton>
        </Box>
      </Flex>
    </PageContent>
  );
};

export default DesignPage;
