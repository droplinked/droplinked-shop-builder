import { useDisclosure } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import BlueButton from "components/redesign/button/BlueButton";
import { Formik } from "formik";
import useAppToast from "hooks/toast/useToast";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import { addressByIdService, createAddressService, updateAddressService } from "services/address/addressServices";
import useAppStore from "stores/app/appStore";
import SectionContent from "pages/settings/components/common/SectionContent";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { formValidation, IAddressInputs, initialValues } from "./formConfigs";
import AddressInputs from "./components/AddressInputs";
import AddressHolder from "./components/AddressHolder";
import { IcreateAddressService, IupdateAddressService } from "services/address/interfaces";

export default function Address() {
    const { shop, updateShop, loading } = useAppStore();
    const { addressBookID } = shop;
    const { showToast } = useAppToast();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { t } = useLocaleResources('settings');
    const { mutateAsync: createAddress } = useMutation((params: IcreateAddressService) => createAddressService(params))
    const { mutateAsync: updateAddress } = useMutation((params: IupdateAddressService) => updateAddressService(params))
    const { isFetching, data, refetch } = useQuery({
        queryKey: ["shopAddressInformation", addressBookID],
        enabled: !!addressBookID,
        queryFn: () => addressByIdService({ addressID: addressBookID }),
        onError: () => {
            showToast({
                message: t("Address.errors.fetchFailed"),
                type: "error",
            });
        },
    });
    const handleSubmit = async (formValues: IAddressInputs, { setSubmitting }) => {
        try {
            if (addressBookID) {
                await updateAddress({ addressID: addressBookID, params: { ...formValues, addressType: "SHOP" } })
                await refetch();
            } else {
                await createAddress({ ...formValues, addressType: "SHOP" }).then((res) => {
                    const id = res.data.data._id as string;
                    updateShop({ ...shop, addressBookID: id })
                })
            }
            showToast({
                message: addressBookID ? t("Address.success.updated") : t("Address.success.created"),
                type: "success"
            });
            onClose();
        }
        catch (error) {
            const message = error?.response?.data?.data.message;
            showToast({ message: message || t("Address.errors.saveFailed"), type: "error" });
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <SectionContent
            title={t("Address.title")}
            description={t("Address.description")}
            rightContent={
                (isFetching || loading) ? (
                    <AppSkeleton
                        isLoaded={false}
                        borderRadius={"8px"}
                        width={"100%"}
                        height={"48px"}
                    />
                ) : (
                    <>
                        {!isOpen && !addressBookID && (
                            <BlueButton
                                onClick={onOpen}
                                width={"100%"}
                                px={4}
                                py={3}
                                border={"1px solid"}
                                borderColor="neutral.gray.800"
                                fontSize={16}
                                fontWeight={500}
                            >
                                <AppIcons.BluePlus
                                    style={{ width: "24px", height: "24px", marginRight: "8px" }}
                                />
                                {t("Address.addButton")}
                            </BlueButton>
                        )}
                        {isOpen && (
                            <Formik
                                initialValues={initialValues({ data: data?.data?.data })}
                                onSubmit={handleSubmit}
                                validateOnChange={false}
                                validationSchema={formValidation(t)}
                            >
                                <AddressInputs onClose={onClose} />
                            </Formik>
                        )}
                        {!isOpen && addressBookID && (
                            <AddressHolder onOpen={onOpen} addressData={data?.data?.data} />
                        )}
                    </>
                )
            }
        />
    );
}
