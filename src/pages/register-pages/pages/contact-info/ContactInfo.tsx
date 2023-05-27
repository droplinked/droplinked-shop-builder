import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import AppTypography from 'components/common/typography/AppTypography';
import AppErrors from "lib/utils/statics/errors/errors";
import { Form, Formik } from "formik";
import { Box, Flex, VStack } from "@chakra-ui/react";
import AppCard from 'components/common/card/AppCard';
import InputLefton from "pages/register-pages/component/input-lefton/InputLefton";
import { IshopSocial } from "lib/apis/shop/interfaces";
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from "functions/hooks/toast/useToast";
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import { useProfile } from "functions/hooks/useProfile/useProfile";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";

const ContactInfo = () => {
  const { shopNavigate } = useCustomNavigate();
  const { shop, setShopData: { update, loading } } = useProfile();
  const currentPath = useLocation().pathname;
  const { showToast } = useAppToast()
  const isRegister = currentPath.includes("register")

  const onSubmit = useCallback(async (params: IshopSocial) => {
    try {
      await update(params)
      if (currentPath.includes("register")) {
        shopNavigate(`products`);
        showToast(AppErrors.store.when_user_publishes__store, "success")
      } else {
        showToast(AppErrors.store.has_been_updated("Contact options"), "success");
      }
    } catch (error) {
      showToast(error?.message, "error")
    }
  }, [])

  return (
    <Formik
      initialValues={{
        discordURL: shop?.discordURL ? shop.discordURL : "",
        instagramURL: shop?.instagramURL ? shop.instagramURL : "",
        twitterURL: shop?.twitterURL ? shop.twitterURL : "",
        webURL: shop?.webURL ? shop.webURL : "",
      }}
      enableReinitialize
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ errors, values, setFieldValue }) => (
        <Form>
          <VStack align={"stretch"}>
            <AppCard>
              <VStack align={"stretch"} marginBottom={8}>
                <Box><FieldLabel label='Social Media Links' textProps={{ size: "18px", weight: "bolder" }} /></Box>
                <Box>
                  <AppTypography size="14px" color="#C2C2C2">
                    Add your social media links on your store to help customers find you easily across multiple platforms.
                  </AppTypography>
                </Box>
              </VStack>
              <InputLefton
                value={values.webURL}
                change={(e: any) => setFieldValue("webURL", e.target.value)}
                label="Website"
                placeHolder="mystore.com"
                children="https://"
              />
              <Box mb="32px" />
              <InputLefton
                value={values.discordURL}
                change={(e: any) => setFieldValue("discordURL", e.target.value)}
                label="Discord"
                placeHolder="my store"
                children="https://discord.gg/"
              />
              <Box mb="32px" />
              <InputLefton
                value={values.twitterURL}
                change={(e: any) => setFieldValue("twitterURL", e.target.value)}
                label="Twitter"
                placeHolder="my store"
                children="https://twitter.com/"
              />
              <Box mb="32px" />
              <InputLefton
                value={values.instagramURL}
                change={(e: any) => setFieldValue("instagramURL", e.target.value)}
                label="Instagram"
                placeHolder="mystore"
                children="https://www.instagram.com/"
              />
            </AppCard>
          </VStack>

          <Flex justifyContent={isRegister ? "space-between" : "right"} width={"100%"}>
            {isRegister && (
              <Box>
                <BasicButton variant="outline" onClick={() => shopNavigate(`register/technical`)}>Back</BasicButton>
              </Box>
            )}
            <Box>
              <BasicButton sizes="large" type="submit" isLoading={loading}>
                {isRegister ? "Publish store" : "Update"}
              </BasicButton>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
export default ContactInfo;
