import React, { useContext } from "react";
import { Button, Flex, IconButton } from "@chakra-ui/react";

//Components
import AppSwitch from "components/common/swich";
import AppTypography from "components/common/typography/AppTypography";
import AppUploadImage from "components/common/upload/image/AppUploadImage";

//Context
import { designContext } from "pages/register-pages/pages/design/design-context";
import AppIcons from "assest/icon/Appicons";

const CustomFavicon = () => {
  const { methods: { dispatch }, state: { shop: { shopDesign: {isLogoAsFavicon, faviconURL}, headerIcon } } } = useContext(designContext)

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isLogoAsFavicon = e.target.checked;
    dispatch({ type: "updateShop", params: { shopDesign: {isLogoAsFavicon} } });
  };

  const handleClearFavicon = () => {
    dispatch({ type: 'updateShop', params: { shopDesign: { faviconURL: '' } } });
  };

  return (
    <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"36px"} alignSelf={"stretch"}>
      <Flex alignItems={"center"} gap={"12px"} alignSelf={"stretch"}>
        <AppSwitch isChecked={isLogoAsFavicon} onChange={handleSwitchChange} />
        <AppTypography fontSize={"14px"} fontWeight={400}>Use Site Logo as Favicon</AppTypography>
      </Flex>
      {!isLogoAsFavicon && 
      <Flex alignItems={"flex-start"} gap={"24px"} alignSelf={"stretch"} flexDirection={"column"}>
        <Flex alignItems={"flex-start"} gap={"12px"} alignSelf={"stretch"} flexDirection={"column"}>
          <AppTypography fontSize={"14px"} fontWeight={450}>Upload Favicon</AppTypography>
          <AppUploadImage 
            size="original" 
            mode="horizontal" 
            values={isLogoAsFavicon ? headerIcon : faviconURL} 
            onChange={(value) => dispatch({ type: 'updateShop', params: { shopDesign: {faviconURL: value } } })} 
            />
        </Flex>
        {faviconURL &&
          <Flex alignItems={"flex-start"} gap={"12px"} alignSelf={"stretch"} flexDirection={"column"}>
            <AppTypography fontSize={"14px"} fontWeight={450}>Clear Favicon</AppTypography>
            <IconButton aria-label="clear-favicon" icon={<AppIcons.WhiteTrash />} onClick={handleClearFavicon} colorScheme="red" />
          </Flex>
        }
      </Flex>}
    </Flex>
  )
}

export default CustomFavicon;