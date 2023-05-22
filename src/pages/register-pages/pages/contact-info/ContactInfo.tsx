import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useCustomNavigate } from "../../../../hooks/useCustomeNavigate/useCustomNavigate";
import { useProfile } from "../../../../hooks/useProfile/useProfile";
import AppTypography from "common/typography/AppTypography";
import AppErrors from "lib/utils/statics/errors/errors";
import { Form, Formik } from "formik";
import { Box, Flex, VStack } from "@chakra-ui/react";
import AppCard from "common/card/AppCard";
import InputLefton from "pages/register-pages/component/input-lefton/InputLefton";
import { IshopSocial } from "lib/apis/shop/interfaces";
import BasicButton from "common/BasicButton/BasicButton";
import useAppToast from "hooks/toast/useToast";

const ContactInfo = () => {
  const { shopNavigate } = useCustomNavigate();
  const { shop, setShopData: { update, loading } } = useProfile();
  const currentPath = useLocation().pathname;
  const { showToast } = useAppToast()

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
    <AppCard mini>
      <Formik
        initialValues={{
          discordURL: shop.discordURL ? shop.discordURL : "",
          instagramURL: shop.instagramURL ? shop.instagramURL : "",
          twitterURL: shop.twitterURL ? shop.twitterURL : "",
          webURL: shop.webURL ? shop.webURL : "",
        }}
        enableReinitialize
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form>
            <VStack align={"stretch"}>
              <AppCard>
                <AppTypography size="14px">
                  Add social media links on your store to help customers find you easily
                  across multiple platforms.
                </AppTypography>
              </AppCard>
              <AppCard>
                <InputLefton
                  value={values.webURL}
                  change={(e: any) => setFieldValue("webURL", e.target.value)}
                  label="Website"
                  placeHolder="mystore.com"
                  children="https://"
                />
                <Box mb="52px" />
                <InputLefton
                  value={values.discordURL}
                  change={(e: any) => setFieldValue("discordURL", e.target.value)}
                  label="Discord"
                  placeHolder="my store"
                  children="https://discord.gg/"
                />
                <Box mb="52px" />
                <InputLefton
                  value={values.twitterURL}
                  change={(e: any) => setFieldValue("twitterURL", e.target.value)}
                  label="Twitter"
                  placeHolder="my store"
                  children="https://twitter.com/"
                />
                <Box mb="52px" />
                <InputLefton
                  value={values.instagramURL}
                  change={(e: any) => setFieldValue("instagramURL", e.target.value)}
                  label="Instagram"
                  placeHolder="mystore"
                  children="https://www.instagram.com/"
                />
              </AppCard>
            </VStack>

            <Flex justifyContent={"right"} marginTop={8} width={"100%"}>
              <Box>
                <BasicButton sizes="large" type="submit" isLoading={loading}>
                  {currentPath.includes("register") ? "Publish store" : "Update"}
                </BasicButton>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </AppCard>
  );
};
export default ContactInfo;
