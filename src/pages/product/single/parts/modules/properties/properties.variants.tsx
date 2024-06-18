import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useCallback, useContext, useRef } from "react";
import ProductCollapse from "../collapse/ProductCollapse";
import { VStack, HStack, Input, Box, useOutsideClick } from "@chakra-ui/react";
import { productContext } from "pages/product/single/context";
import ProductModel from "pages/product/single/model";
import ProductType from "../productType/ProductType";
import AppIcons from "assest/icon/Appicons";
import CreatableSelect from "react-select/creatable";
import DropDownModel from "components/common/form/dropdown/DropDownModel";
import { useQuery } from "react-query";
import { variantOptionsService } from "lib/apis/variant/services";

const defaultValues = {
    options: [
        {
            name: "",
            values: [{ value: "", caption: "" }],
        },
    ],
};

const droplinked_variants = [
    { label: "Color", value: "Color" },
    { label: "Size", value: "Size" },
];

const PropertyVariants = () => {
    const { data, isLoading } = useQuery({
        queryFn: variantOptionsService,
        queryKey: "product_properties",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
    const formikRef = useRef(null);
    const {
        state: { product_type, properties, publish_product, pod_blank_product_id, prodviderID },
        productID,
        methods: { updateState },
    } = useContext(productContext);
    console.log(properties);
    const getProps = useCallback(() => {
        return properties
            ? {
                  options: properties?.map((api_properties) => ({
                      name: api_properties?.title || "",
                      values: api_properties?.items || [],
                  })),
              }
            : defaultValues;
    }, [properties]);
    const ref = useRef();
    const handleOutsideClick = useCallback(() => {
        if (formikRef.current) {
            const formik = formikRef.current;
            const cleaned_values = formik?.values?.options
                ?.map((option, index) => ({
                    ...option,
                    values: option?.values?.filter((each_value_field_array) => {
                        console.log(each_value_field_array, !is_custom(option?.name), option?.values?.length);
                        if (!is_custom(option?.name) || option?.values?.length === 1) return true;
                        return each_value_field_array?.value !== "" && each_value_field_array?.caption !== "";
                    }),
                }))
                ?.filter((option, index) => option?.values?.length > 0);
            updateState(
                "properties",
                cleaned_values.map((property) => ({
                    title: property.name,
                    value: property.name === "Color" ? "62a989ab1f2c2bbc5b1e7153" : property?.name === "Size" ? "62a989ab1f2c2bbc5b1e7154" : undefined,
                    items: property.values,
                }))
            );
            formik.setFieldValue("options", cleaned_values);
        }
    }, [formikRef?.current?.values?.options]);

    useOutsideClick({
        ref,
        handler: handleOutsideClick,
    });

    const is_custom = (variant_name: string) => !["Size", "Color"].includes(variant_name);

    return (
        <Formik
            innerRef={formikRef}
            initialValues={getProps()}
            enableReinitialize
            onSubmit={(values) => {
                console.log("Submitted Data", values);
            }}
        >
            {({ values, resetForm, handleChange }) => (
                <Form>
                    <FieldArray
                        name="options"
                        render={(arrayHelpers) => (
                            <VStack spacing={"24px"} align={"stretch"}>
                                {values.options.map((option, index) => (
                                    <VStack key={index} ref={ref} align={"stretch"} padding={"24px"} spacing={"24px"} backgroundColor={"#141414"} rounded={"16px"}>
                                        <VStack spacing={"12px"} align={"flex-start"} width={"full"}>
                                            <AppTypography fontSize={"16px"} color="#C2C2C2">
                                                Property Name
                                            </AppTypography>
                                            <HStack width="300px" display="flex" alignItems="center" justifyContent="center" borderRadius="8px" background="#262626">
                                                <CreatableSelect
                                                    placeholder={"Select or type"}
                                                    formatCreateLabel={(e) => `Create ${e}`}
                                                    onCreateOption={(e) => {
                                                        if (
                                                            (option?.values?.length > 1 && option?.values?.[0]?.value !== "") ||
                                                            values.options.some((opt) => opt.name.toLowerCase() === e.toLowerCase())
                                                        )
                                                            return;
                                                        option?.values?.length === 0 && arrayHelpers?.form?.setFieldValue(`options[${index}].values`, [{ value: "", caption: "" }]);
                                                        arrayHelpers?.form?.setFieldValue(`options[${index}].name`, e);
                                                        console.log(option?.values);
                                                    }}
                                                    isDisabled={option?.values?.length > 1 && option?.values?.[0]?.value !== ""}
                                                    onChange={(e) => {
                                                        if (
                                                            (option?.values?.length > 1 && option?.values?.[0]?.value !== "") ||
                                                            values.options.some((opt) => opt?.name?.toLowerCase() === e?.value.toLowerCase())
                                                        )
                                                            return;
                                                        arrayHelpers?.form?.setFieldValue(`options[${index}].name`, e?.value);
                                                        arrayHelpers?.form?.setFieldValue(`options[${index}].values`, []);
                                                    }}
                                                    value={option?.name !== "" && { value: option?.name, label: option?.name }}
                                                    options={droplinked_variants}
                                                    styles={{
                                                        ...DropDownModel.style(undefined),
                                                        indicatorsContainer: (baseStyles) => ({ ...baseStyles }),
                                                        indicatorSeparator: (baseStyles) => ({ ...baseStyles, display: "none" }),
                                                        container: (baseStyles) => ({ ...baseStyles, width: "100%" }),
                                                        input: (baseStyles) => ({ ...baseStyles, color: "#C2C2C2" }),
                                                        control: (baseStyles) => ({
                                                            ...baseStyles,
                                                            borderColor: "transparent",
                                                            backgroundColor: "transparent",
                                                            fontSize: "16x",
                                                            padding: "8px 18px",
                                                            borderRadius: "8px",
                                                            display: "flex",
                                                        }),
                                                        placeholder: (baseStyles) => ({ ...baseStyles, color: "#808080" }),
                                                        singleValue: (baseStyles) => ({ ...baseStyles, color: "#C2C2C2" }),
                                                        option: () => ({ fontSize: "14px", padding: "10px 16px", color: "#C2C2C2", ":hover": { backgroundColor: "#444" } }),
                                                    }}
                                                />
                                            </HStack>
                                        </VStack>
                                        <FieldArray
                                            name={`options[${index}].values`}
                                            render={(valueHelpers) => (
                                                <VStack width="full" spacing={"16px"} align={"flex-start"}>
                                                    <AppTypography fontSize={"16px"} color="#C2C2C2">
                                                        Property Values
                                                    </AppTypography>
                                                    <HStack align={"stretch"} flexWrap={"wrap"}>
                                                        {!is_custom(option?.name) &&
                                                            data?.data?.data?.length &&
                                                            data?.data?.data
                                                                ?.find((service_variants) => service_variants?.name?.toLowerCase() === option?.name?.toLowerCase())
                                                                ?.values?.map((founded_values_from_service: { caption: string; value: string }) => {
                                                                    // value stands for hex code
                                                                    const index_of_active_value_if_exist = option?.values?.findIndex(
                                                                        (formik_field_selected_values) => formik_field_selected_values?.value === founded_values_from_service?.value
                                                                    );
                                                                    const is_value_active = index_of_active_value_if_exist !== -1;
                                                                    const styles_based_on_option_name = {
                                                                        Color: {
                                                                            background: founded_values_from_service.value,
                                                                            borderRadius: "100%",
                                                                            border: "2px solid #353535",
                                                                            width: "32px",
                                                                            height: "32px",
                                                                            ...(is_value_active && { borderColor: "#2BCFA1" }),
                                                                        },
                                                                        Size: {
                                                                            background: "#1C1C1C",
                                                                            borderRadius: "28px",
                                                                            padding: "6px 16px",
                                                                            border: "2px solid transparent",
                                                                            ...(is_value_active && { borderColor: "#2BCFA1" }),
                                                                        },
                                                                    };
                                                                    return (
                                                                        <Box
                                                                            key={founded_values_from_service?.value}
                                                                            onClick={() => {
                                                                                const the_clicked_value = {
                                                                                    value: founded_values_from_service?.value,
                                                                                    caption: founded_values_from_service?.caption,
                                                                                };
                                                                                if (is_value_active) valueHelpers.remove(index_of_active_value_if_exist);
                                                                                else valueHelpers.push(the_clicked_value);
                                                                            }}
                                                                            cursor={productID && publish_product ? "auto" : "pointer"}
                                                                            {...styles_based_on_option_name[option?.name]}
                                                                        >
                                                                            {option?.name === "Size" && founded_values_from_service?.caption}
                                                                        </Box>
                                                                    );
                                                                })}
                                                    </HStack>
                                                    {option?.values?.map((value, k) => (
                                                        <HStack
                                                            padding={"8px 18px"}
                                                            height={"48px"}
                                                            key={k}
                                                            width={"full"}
                                                            align="center"
                                                            justifyContent={"center"}
                                                            borderRadius="8px"
                                                            background="#262626"
                                                        >
                                                            <Input
                                                                isReadOnly={!is_custom(option?.name) || option?.name === ""}
                                                                background="transparent"
                                                                color="#C2C2C2"
                                                                border={"none"}
                                                                focusBorderColor="transparent"
                                                                _placeholder={{ color: "#808080" }}
                                                                placeholder={option?.name === "" ? "Set a property name at first" : is_custom(option?.name) && `Custom Value`}
                                                                boxShadow={"none"}
                                                                onChange={(e) => {
                                                                    if (!is_custom(option?.name)) return;
                                                                    if (
                                                                        k === option?.values?.length - 2 &&
                                                                        e?.target?.value === "" &&
                                                                        option?.values?.[option?.values?.length - 1]?.value === "" &&
                                                                        option?.values?.[option?.values?.length - 1]?.caption === ""
                                                                    )
                                                                        valueHelpers.remove(option?.values?.length - 1);
                                                                    if (
                                                                        k === option?.values?.length - 1 &&
                                                                        e?.target?.value !== "" &&
                                                                        option?.values?.[option?.values?.length - 1]?.value !== "" &&
                                                                        option?.values?.[option?.values?.length - 1]?.caption !== ""
                                                                    )
                                                                        valueHelpers.push({ value: "", caption: "" });
                                                                    valueHelpers?.form?.setFieldValue(`options[${index}].values[${k}].value`, e?.target?.value);
                                                                    valueHelpers?.form?.setFieldValue(`options[${index}].values[${k}].caption`, e?.target?.value);
                                                                }}
                                                                name={`options[${index}].values[${k}].value`}
                                                                value={value?.caption}
                                                            />
                                                            <AppIcons.Delete
                                                                onClick={() => {
                                                                    if (option?.name === "" && values?.options?.length === 1) return;
                                                                    if (option?.values?.length === 1) return arrayHelpers.remove(index);
                                                                    valueHelpers.remove(k);
                                                                }}
                                                            />
                                                        </HStack>
                                                    ))}
                                                    {/* {is_custom(option?.name) && <BasicButton onClick={() => valueHelpers.push({ value: "" })}>Add another Value</BasicButton>} */}
                                                </VStack>
                                            )}
                                        />
                                    </VStack>
                                ))}
                                <BasicButton onClick={() => arrayHelpers.push({ name: "", values: [{ value: "", caption: "" }] })}>Add another option</BasicButton>
                            </VStack>
                        )}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default PropertyVariants;
