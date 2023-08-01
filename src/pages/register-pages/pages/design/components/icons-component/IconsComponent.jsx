import { Box, Flex, VStack } from "@chakra-ui/react";
import FieldLabelReuired from "components/common/form/fieldLabel/parts/required/FieldLabelReuired";
import AppTypography from "components/common/typography/AppTypography";
import AppUploadImage from "components/common/upload/image/AppUploadImage";
import { useContext } from "react";
import { designContext } from "../../design-context";

const IconsComponent = () => {
  const { state: { logo, headerIcon }, methods: { updateState } } = useContext(designContext);

  return (
    <Flex
      w="100%"
      alignItems="baseline"
      justifyContent="space-between"
      gap="24px"
    >
      <VStack align="stretch" width="50%">
        <AppTypography size="18px" display="flex" alignItems="center" gap={2}>Site Logo <FieldLabelReuired /></AppTypography>
        <AppTypography size="14px" color="#808080">Site logo appears at the top left of the page</AppTypography>
        <Box>
          <AppUploadImage
            values={logo}
            mode="single"
            size="original"
            onChange={(images) => updateState("logo", images)}
          />
        </Box>
      </VStack>

      <VStack align="stretch" width="50%">
        <AppTypography size="18px" display="flex" alignItems="center" gap={2}>Profile Logo<FieldLabelReuired /></AppTypography>
        <AppTypography size="14px" color="#808080">Profile logo appears at the left side of the page.</AppTypography>
        <Box>
          <AppUploadImage
            values={headerIcon}
            mode="single"
            size="original"
            onChange={(images) => updateState("headerIcon", images)}
          />
        </Box>
      </VStack>
    </Flex>
  );
};

export default IconsComponent;
