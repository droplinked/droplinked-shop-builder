import { Box, HStack, Input, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppColorPicker from "components/common/colorPicker/AppColorPicker";
import DropDownModel from "components/common/form/dropdown/DropDownModel";
import AppTypography from "components/common/typography/AppTypography";
import { FieldArray, Form, Formik } from "formik";
import { variantOptionsService } from "lib/apis/variant/services";
import { productContext } from "pages/product/single/context";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useQuery } from "react-query";
import CreatableSelect from "react-select/creatable";

/**
 * Handles the application of changes or cancellation of edits for property variant forms.
 * This function is designed to either commit the changes to the global state or revert
 * any changes made to a form depending on user interaction (apply or cancel).
 *
 * @param {number} index_of_form_that_called_me - The index of the form where the apply or cancel action was triggered.
 * @param {boolean} [cancel=false] - A boolean flag indicating whether the action is to cancel the changes. Defaults to false, meaning changes are to be applied.
 * 
 * Detailed Function Logic:
 * - **Form Reference**: The function first checks if there's a current reference to the Formik form, which is necessary to access and manipulate form data.
 * - **Data Processing**:
 *   - The options are iterated over to filter and clean data based on the condition that custom properties must not have empty values and captions.
 *   - Each option is also checked to close its form view if it's the one that triggered the apply or cancel action.
 * - **Apply Changes**:
 *   - If not cancelling, it updates the global state with the cleaned and processed data where each property's ID and items are updated based on predefined conditions.
 *   - The Formik state is then updated to reflect these changes.
 * - **Cancel Changes**:
 *   - If cancelling and the property existed previously (checked against an external properties array), the form values are reset to their original state.
 *   - If the property was newly added and not previously existing, it is removed entirely from the Formik state.
 * 
 * Note: This function heavily relies on external state (`properties`) for original data reference and `formikRef` to access and manipulate Formik state.
 */

const PropertyVariants = () => {
    const { data } = useQuery({ queryFn: variantOptionsService, queryKey: "product_properties", cacheTime: 60 * 60 * 1000 });
    const formikRef = useRef(null);
    const { state: { properties, publish_product }, productID, methods: { updateState } } = useContext(productContext);
    const getProps = useCallback(() => properties ? { options: properties?.map((api_properties) => ({ name: api_properties?.title || "", values: api_properties?.items || [], isOpen: false, isCustom: api_properties?.isCustom })) } : { options: [{ name: "", values: [{ value: "", caption: "" }], isOpen: true, isCustom: true }] }, [properties]);
    const [customColor, setCustomColor] = useState({ value: '#FFFFFF', caption: '' });
    const [customSize, setCustomSize] = useState({ value: '', caption: '' });
    const [dropdownInput, setDropdownInput] = useState([{ label: "Color", value: "Color" }, { label: "Size", value: "Size" }]);
    const handle_form_apply = useCallback((index_of_form_that_called_me: number, cancel: boolean = false) => {
        if (formikRef.current) {
            const formik = formikRef.current;
            const cleaned_values = formik?.values?.options
                ?.map((option, index) => ({
                    ...option,
                    values: option?.values?.filter((each_value_field_array) => {
                        if (!option?.isCustom) return true;
                        return (each_value_field_array?.value !== "" && each_value_field_array?.caption !== "");
                    }),
                    ...(index_of_form_that_called_me === index && { isOpen: false })
                }))
                ?.filter((option, index) => option?.values?.length > 0);
            if (!cancel) {
                updateState(
                    "properties",
                    cleaned_values.map((property) => ({
                        title: property?.name,
                        value: property?.name === "Color" ? "62a989ab1f2c2bbc5b1e7153" : property?.name === "Size" ? "62a989ab1f2c2bbc5b1e7154" : property.name,
                        isCustom: property?.isCustom,
                        items: property?.values,
                    }))
                );
                formik.setFieldValue("options", cleaned_values);
            }
            if (cancel) {
                if (properties[index_of_form_that_called_me]) {
                    formik.setFieldValue(`options[${index_of_form_that_called_me}]`, { name: properties[index_of_form_that_called_me]?.title, values: properties[index_of_form_that_called_me]?.items, isOpen: false })
                } else {
                    formik.setFieldValue("options", formik.values.options.filter((_, idx) => idx !== index_of_form_that_called_me));
                }
            }
        }
    }, [formikRef?.current?.values?.options]);



    const addCustomProperty = (propertyType, value) => {
        if (formikRef.current) {
            const formik = formikRef.current;
            const optionIndex = formik.values.options.findIndex(opt => opt.name === propertyType);

            if (optionIndex !== -1) {
                formik.setFieldValue(`options[${optionIndex}].values`, [
                    ...formik.values.options[optionIndex].values,
                    value
                ]);
            } else {
                formik.setFieldValue('options', [
                    ...formik.values.options,
                    { name: propertyType, values: [value], isOpen: false }
                ]);
            }
        }
    };

    const is_custom = (variant_name: string) => !["Size", "Color"].includes(variant_name);

    return (
        <Formik innerRef={formikRef} initialValues={getProps()} enableReinitialize onSubmit={(values) => { }}>
            {({ values }) => (
                <Form>
                    <FieldArray
                        name="options"
                        render={(arrayHelpers) => (
                            <VStack spacing={"32px"} align={"stretch"}>
                                {values.options.map((option, index) => (
                                    option?.isOpen ?
                                        <VStack key={index} align={"stretch"} padding={"24px"} spacing={"24px"} backgroundColor={"#141414"} rounded={"16px"}>
                                            <VStack spacing={"12px"} align={"flex-start"} width={"full"}>
                                                <AppTypography fontSize={"16px"} color="#C2C2C2">Property Name</AppTypography>
                                                <HStack width="300px" display="flex" alignItems="center" justifyContent="center" borderRadius="8px" background="#262626">
                                                    <CreatableSelect
                                                        placeholder={"Select or type"}
                                                        formatCreateLabel={(e) => `Create ${e}`}
                                                        onCreateOption={(e) => {
                                                            if ((option?.values?.length > 1 && option?.values?.[0]?.value !== "") || values.options.some((opt) => opt?.name?.toLowerCase() === e?.toLowerCase())) return;
                                                            // option?.values?.length === 0 && arrayHelpers?.form?.setFieldValue(`options[${index}].values`, [{ value: "", caption: "" }]);
                                                            // arrayHelpers?.form?.setFieldValue(`options[${index}].name`, e);
                                                            arrayHelpers?.form?.setFieldValue(`options[${index}]`, {
                                                                name: e,
                                                                isCustom: true,
                                                                ...(option?.values?.length === 0 ? { values: [{ value: "", caption: "" }] } : { values: option?.values }),
                                                                isOpen: true
                                                            });
                                                        }}
                                                        onChange={(e) => {
                                                            if ((option?.values?.length > 1 && option?.values?.[0]?.value !== "") || values.options.some((opt) => opt?.name?.toLowerCase() === e?.value?.toLowerCase())) return;
                                                            if (e?.value === "Custom Size" || e?.value === "Custom Color") {
                                                                if (values.options.some((opt) => `custom ${opt?.name?.toLowerCase()}` === e?.value?.toLowerCase())) return
                                                                // arrayHelpers?.form?.setFieldValue(`options[${index}].values`, []);
                                                                arrayHelpers?.form?.setFieldValue(`options[${index}]`, { name: e?.value === "Custom Color" ? "Color" : e?.value === "Custom Size" ? "Size" : "", isCustom: true, values: e?.value !== "Custom Color" ? [{ value: "", caption: "" }] : [], isOpen: true });
                                                            } else {
                                                                if (values.options.some((opt) => opt?.name?.toLowerCase() === `custom ${e?.value?.toLowerCase()}`)) return
                                                                // arrayHelpers?.form?.setFieldValue(`options[${index}].values`, []);
                                                                // arrayHelpers?.form?.setFieldValue(`options[${index}].name`, e?.value);
                                                                arrayHelpers?.form?.setFieldValue(`options[${index}]`, { name: e?.value, isOpen: true, isCustom: false, values: [] });
                                                            }
                                                        }}
                                                        value={option?.name !== "" && { value: option?.name, label: option?.name }}
                                                        options={dropdownInput}
                                                        styles={{ ...DropDownModel.style(undefined), indicatorsContainer: (baseStyles) => ({ ...baseStyles }), indicatorSeparator: (baseStyles) => ({ ...baseStyles, display: "none" }), container: (baseStyles) => ({ ...baseStyles, width: "100%" }), input: (baseStyles) => ({ ...baseStyles, color: "#C2C2C2" }), control: (baseStyles) => ({ ...baseStyles, borderColor: "transparent", backgroundColor: "transparent", fontSize: "16x", padding: "8px 18px", borderRadius: "8px", display: "flex" }), placeholder: (baseStyles) => ({ ...baseStyles, color: "#808080" }), singleValue: (baseStyles) => ({ ...baseStyles, color: "#C2C2C2" }), option: () => ({ fontSize: "14px", padding: "10px 16px", color: "#C2C2C2", ":hover": { backgroundColor: "#444" } }) }}
                                                        onInputChange={(e) => {
                                                            if (e?.toUpperCase().includes("COLOR")) setDropdownInput([{ label: "Color", value: "Color" }, { label: `Create Color`, value: `Custom Color` }])
                                                            if (e?.toUpperCase().includes("SIZE")) setDropdownInput([{ label: "Size", value: "Size" }, { label: `Create Size`, value: `Custom Size` }])
                                                        }}
                                                        onBlur={() => setDropdownInput([{ label: "Color", value: "Color" }, { label: "Size", value: "Size" }])}
                                                        onFocus={() => setDropdownInput([{ label: "Color", value: "Color" }, { label: "Size", value: "Size" }])}
                                                    />
                                                </HStack>
                                            </VStack>
                                            <FieldArray
                                                name={`options[${index}].values`}
                                                render={(valueHelpers) => (
                                                    <VStack width="full" spacing={"16px"} align={"flex-start"}>
                                                        <AppTypography fontSize={"16px"} color="#C2C2C2">Property Values</AppTypography>
                                                        <HStack align={"stretch"} flexWrap={"wrap"}>
                                                            {!option?.isCustom &&
                                                                data?.data?.data?.length &&
                                                                data?.data?.data
                                                                    ?.find((service_variants) => service_variants?.name?.toLowerCase() === option?.name?.toLowerCase())
                                                                    ?.values?.map((founded_value_from_service: { caption: string; value: string }) => {
                                                                        const index_of_active_value_if_exist = option?.values?.findIndex((formik_field_selected_values) => formik_field_selected_values?.value === founded_value_from_service?.value);
                                                                        const is_value_active = index_of_active_value_if_exist !== -1;
                                                                        const styles_based_on_option_name = { Color: { background: founded_value_from_service.value, borderRadius: "100%", border: "2px solid #353535", width: "32px", height: "32px", ...(is_value_active && { borderColor: "#2BCFA1" }) }, Size: { background: "#1C1C1C", borderRadius: "28px", padding: "6px 16px", border: "2px solid transparent", ...(is_value_active && { borderColor: "#2BCFA1" }) } };
                                                                        return (
                                                                            <Box
                                                                                key={founded_value_from_service?.value}
                                                                                onClick={() => {
                                                                                    const the_clicked_value = { value: founded_value_from_service?.value, caption: founded_value_from_service?.caption };
                                                                                    if (is_value_active) valueHelpers.remove(index_of_active_value_if_exist);
                                                                                    else valueHelpers.push(the_clicked_value);
                                                                                }}
                                                                                cursor={productID && publish_product ? "auto" : "pointer"}
                                                                                {...styles_based_on_option_name[option?.name]}
                                                                            >
                                                                                {option?.name === "Size" && founded_value_from_service?.caption}
                                                                            </Box>
                                                                        );
                                                                    })}
                                                        </HStack>
                                                        {option?.name === "Color" && option?.isCustom && (
                                                            <HStack background="#262626" padding={"8px"} rounded={"8px"} width={"full"}>
                                                                <AppColorPicker props={{ containerProps: { backgroundColor: "transparent" } }} value={customColor.value || "#FFFFFF"} onChange={(e) => setCustomColor({ ...customColor, value: e })} />
                                                                <Input
                                                                    border={"none"}
                                                                    focusBorderColor="transparent"
                                                                    _placeholder={{ color: "#808080" }}
                                                                    placeholder="Color Name"
                                                                    boxShadow={"none"}
                                                                    value={customColor.caption}
                                                                    onChange={(e) => setCustomColor({ ...customColor, caption: e.target.value })}
                                                                />
                                                                <BasicButton
                                                                    onClick={() => {
                                                                        if (customColor.caption && customColor.value) {
                                                                            if (option?.values?.some((opt) => opt?.value?.toLowerCase() === customColor?.value?.toLowerCase() || opt?.caption?.toLowerCase() === customColor?.caption?.toLowerCase())) return
                                                                            addCustomProperty("Color", customColor);
                                                                            setCustomColor({ value: "#FFFFFF", caption: "" });
                                                                        }
                                                                    }}
                                                                >
                                                                    Add Color
                                                                </BasicButton>
                                                            </HStack>
                                                        )}
                                                        {option?.values?.map((value, k) => (
                                                            <HStack padding={"8px 18px"} height={"48px"} key={k} width={"full"} align="center" justifyContent={"center"} borderRadius="8px" background="#262626"
                                                            >
                                                                {option?.name === "Color" && option?.isCustom && <Box backgroundColor={value?.value} borderRadius={"100%"} border={"2px solid #353535"} width={"32px"} height="32px" />}
                                                                <Input
                                                                    isReadOnly={!option?.isCustom || option?.name === "Color" || option?.name === ""}
                                                                    background="transparent"
                                                                    color="#C2C2C2"
                                                                    border={"none"}
                                                                    focusBorderColor="transparent"
                                                                    _placeholder={{ color: "#808080" }}
                                                                    placeholder={option?.name === "" ? "Set a property name at first" : option?.isCustom && `Custom Value`}
                                                                    boxShadow={"none"}
                                                                    onChange={(e) => {
                                                                        if (!option?.isCustom || option?.name === "Color") return;
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
                                                        <HStack width={"full"} spacing={"16px"} align={"flex-end"} justifyContent={"flex-end"}>
                                                            <BasicButton onClick={() => handle_form_apply(index, true)} variant="outline" border={"1px solid #2BCFA1"} color={"#2BCFA1"} _hover={{ borderColor: "#5D5D5D !important", bgColor: "unset", color: "#5D5D5D" }}>Cancel</BasicButton>
                                                            <BasicButton _hover={{}} onClick={() => handle_form_apply(index)}>Apply</BasicButton>
                                                        </HStack>
                                                    </VStack>
                                                )}
                                            />
                                        </VStack>
                                        :
                                        <HStack justifyContent="space-between" onClick={() => arrayHelpers?.form?.setFieldValue(`options[${index}].isOpen`, true)} cursor={"pointer"} padding={"24px"} backgroundColor={"#141414"} rounded={"16px"}>
                                            <AppTypography fontSize={"16px"} color="#C2C2C2">{option.name}</AppTypography>
                                            <HStack>{option?.values?.map((opt) => <Box padding={"4px 8px"} backgroundColor={"#262626"} rounded={"4px"}>{opt?.caption}</Box>)}</HStack>
                                        </HStack>
                                ))}
                                <BasicButton onClick={() => { arrayHelpers.push({ name: "", values: [{ value: "", caption: "" }], isOpen: true, isCustom: true }) }}>Add Product Attribute</BasicButton>
                            </VStack>
                        )}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default PropertyVariants