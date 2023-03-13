import { Box ,Flex } from "@chakra-ui/react";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  SaveButton,
} from "../../RegisterPages-style";

import InputComponent from "../../component/input-component/InputComponent";

const ContactInfo = () => {
  return (
    <PageContent>
      <PageInformationComponent>
        Add social media links on your store to help customers find you easily
        across multiple platforms.
      </PageInformationComponent>
      <PageContentWrapper>
        <InputComponent
        label='Website'
        placeHolder='https://mystore.com'
        />
        <Box mb='52px' />
        <InputComponent
        label='Discord'
        placeHolder='discord/my store'
        />
        <Box mb='52px' />
        <InputComponent
        label='Twitter'
        placeHolder='https://twitter.com/my store'
        />
        <Box mb='52px' />
        <InputComponent
        label='Instagram'
        placeHolder='https://www.instagram.com/mystore.com'
        />


      </PageContentWrapper>

      <Flex justifyContent="end" w="100%" pt='36px'>
          <SaveButton w="200px" >
          Save & next step
          </SaveButton>
        </Flex>
    </PageContent>
  );
};
export default ContactInfo;
