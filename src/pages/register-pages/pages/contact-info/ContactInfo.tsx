import { Box, Flex, VStack } from "@chakra-ui/react";
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppCard from 'components/common/card/AppCard';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppTypography from 'components/common/typography/AppTypography';
import { Form, Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import { IshopSocial } from "lib/apis/shop/interfaces";
import AppErrors from "lib/utils/statics/errors/errors";
import InputLefton from "pages/register-pages/component/input-lefton/InputLefton";
import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";

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
        showToast({ message: AppErrors.store.when_user_publishes__store, type: "success" })
      } else {
        showToast({ message: AppErrors.store.social_links_have_been_updated, type: "success" });
      }
    } catch (error) {
      showToast({ message: error?.message, type: "error" })
    }
  }, [])

  return (
    <Formik
      initialValues={{
        discordURL: shop.discordURL || "",
        instagramURL: shop.instagramURL || "",
        twitterURL: shop.twitterURL || "",
        webURL: shop.webURL || "",
        linkedinURL: shop.linkedinURL || "",
        tiktokURL: shop.tiktokURL || "",
        facebookURL: shop.facebookURL || "",
        telegramURL: shop.telegramURL || "",
        youtubeURL: shop.youtubeURL || "",
        messengerURL: shop.messengerURL || "",
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
                <Box><FieldLabel label='Social Media Links' textProps={{ fontSize: "18px", fontWeight: "bolder" }} /></Box>
                <Box>
                  <AppTypography fontSize="14px" color="#C2C2C2">
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
                placeHolder="username"
                children="https://discord.gg/"
              />
              <Box mb="32px" />
              <InputLefton
                value={values.twitterURL}
                change={(e: any) => setFieldValue("twitterURL", e.target.value)}
                label="Twitter"
                placeHolder="username"
                children="https://twitter.com/"
              />
              <Box mb="32px" />
              <InputLefton
                value={values.instagramURL}
                change={(e: any) => setFieldValue("instagramURL", e.target.value)}
                label="Instagram"
                placeHolder="username"
                children="https://www.instagram.com/"
              />
              <Box mb="32px" />
              <InputLefton
                value={values.linkedinURL}
                change={(e: any) => setFieldValue("linkedinURL", e.target.value)}
                label="Linkedin"
                placeHolder="username"
                children="https://www.linkedin.com/"
              />
              <Box mb="32px" />
              <InputLefton
                value={values.tiktokURL}
                change={(e: any) => setFieldValue("tiktokURL", e.target.value)}
                label="Tiktok"
                placeHolder="username"
                children="https://www.tiktok.com/"
              />
              <Box mb="32px" />
              <InputLefton
                value={values.facebookURL}
                change={(e: any) => setFieldValue("facebookURL", e.target.value)}
                label="Facebook"
                placeHolder="username"
                children="https://www.facebook.com/"
              />
            </AppCard>
          </VStack>

          <Flex justifyContent={isRegister ? "space-between" : "right"} width="100%" marginTop={8}>
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
