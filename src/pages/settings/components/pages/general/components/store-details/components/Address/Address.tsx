import { useDisclosure } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import BlueButton from "components/redesign/button/BlueButton";
import { Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { addressByIdService, createAddressService, updateAddressService } from "lib/apis/address/addressServices";
import useAppStore from "lib/stores/app/appStore";
import SectionContent from "pages/settings/components/common/SectionContent";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { formValidation, IAddressInputs, initialValues } from "./formConfigs";
import AddressInputs from "./components/AddressInputs";
import AddressHolder from "./components/AddressHolder";
import { IcreateAddressService, IupdateAddressService } from "lib/apis/address/interfaces";

export default function Address() {
    const { shop, updateShop, loading } = useAppStore();
    const { addressBookID } = shop;
    const { showToast } = useAppToast();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { mutateAsync: createAddress } = useMutation((params: IcreateAddressService) => createAddressService(params))
    const { mutateAsync: updateAddress } = useMutation((params: IupdateAddressService) => updateAddressService(params))
    const { isFetching, data, refetch } = useQuery({
        queryKey: ["shopAddressInformation", addressBookID],
        enabled: !!addressBookID,
        queryFn: () => addressByIdService({ addressID: addressBookID }),
        onError: () => {
            showToast({
                message: "Unable to get address Information",
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
            showToast({ message: addressBookID ? "Store address has been updated!" : "Store address has been added successfully!", type: "success" });
            onClose();
        }
        catch (error) {
            const message = error?.response?.data?.data.message;
            showToast({ message: message || "Unable to save address Information", type: "error" });
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <SectionContent
            title="Address"
            description="Provide the store or warehouse address for delivery and tax calculations."
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
                                border={"1px solid #292929"}
                                fontSize={16}
                                fontWeight={500}
                            >
                                <AppIcons.BluePlus
                                    style={{ width: "24px", height: "24px", marginRight: "8px" }}
                                />
                                Address
                            </BlueButton>
                        )}
                        {isOpen && (
                            <Formik
                                initialValues={initialValues({ data: data?.data?.data })}
                                onSubmit={handleSubmit}
                                validateOnChange={false}
                                validationSchema={formValidation()}
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
