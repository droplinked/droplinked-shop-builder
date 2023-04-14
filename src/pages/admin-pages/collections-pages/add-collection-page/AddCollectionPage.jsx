// external
import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
// internal
import {
  ComponentTitle,
  ComponentWrapper,
  PageWrapper,
} from "./AddCollectionPage-style";
// components
import InputFieldComponent from "components/shared/input-field-component/InputFieldComponent";
import BasicButton from "components/shared/BasicButton/BasicButton";
import RuleSetsComponent from "./components/rule-sets-component/RuleSetsComponent";

function AddCollectionPage() {
  return (
    <PageWrapper>
      <ComponentWrapper>
        <ComponentTitle>place holder</ComponentTitle>
      </ComponentWrapper>
      <ComponentWrapper>
        <InputFieldComponent
          placeholder="default"
          description="description"
          label="Name"
        />
        <RuleSetsComponent />
      </ComponentWrapper>
      <Flex
        w="100%"
        maxW="1000px"
        alignItems="center"
        justifyContent="space-between"
        pt="20px"
      >
        <Box w="200px">
          <Button
            size="lg"
            variant="outline"
            colorScheme="whiteAlpha"
            borderColor="line"
            // cancelType={true}
            // click={backToPriviesPage}
            // loading={loading}
          >
            Save invisible
          </Button>
        </Box>
        <Box w="200px">
          <BasicButton
          // click={saveProduct} loading={loading}
          >
            Save visible
          </BasicButton>
        </Box>
      </Flex>
    </PageWrapper>
  );
}

export default AddCollectionPage;
