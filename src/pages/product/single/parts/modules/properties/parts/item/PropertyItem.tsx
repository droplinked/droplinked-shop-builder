import { Box, Flex, HStack, Input } from "@chakra-ui/react";
import { IpropertiesItems, productContext } from "pages/product/single/context";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import propertiesFormContext from "../../context";
import classes from "./style.module.scss";
import { Iproperties } from "lib/apis/product/interfaces";
import AppTypography from "components/common/typography/AppTypography";
import AppIcons from "assest/icon/Appicons";
import { useFormik } from "formik";

interface IProps {
    property: Iproperties;
    getProperties?: (title: string) => any;
    pod?: boolean;
    podItem?: IpropertiesItems;
}

function PropertyItem({ property, getProperties, pod = false, podItem }: IProps) {
    const {
        state: { properties, publish_product },
        productID,
    } = useContext(productContext);
    const { set, remove } = useContext(propertiesFormContext);
    const inputRef = useRef<any>();
    const checkItem = useCallback(
        (value: string) => {
            return properties.find((el) => el.items.find((e: any) => e.value === value));
        },
        [properties]
    );

    const addProperty = useCallback(
        (type: string, item: any) => {
            if (productID && publish_product) return false;

            if (checkItem(item.value)) {
                remove(item.value);
            } else {
                set({
                    item: {
                        value: item.value,
                        caption: item.caption,
                        title: type,
                    },
                });
            }
        },
        [properties, productID, publish_product]
    );

    const { values, handleSubmit, handleChange, setFieldValue } = useFormik({ initialValues: { customValues: "" }, onSubmit: () => {} });

    const getContainer = useMemo(() => {
        if (property.title !== "Custom Property" && !(getProperties(property.title) && typeof getProperties(property.title)?.values === "object")) return null;
        switch (property.title?.toLowerCase()) {
            case "color":
                if (pod)
                    return (
                        <Box
                            borderRadius="100%"
                            onClick={() => addProperty(property.title, podItem)}
                            width="32px"
                            height="32px"
                            cursor={productID && publish_product ? "auto" : "pointer"}
                            background={podItem?.value}
                            className={`${checkItem(podItem?.value) ? classes.active : ""} ${classes.box} ${classes.color}`}
                        ></Box>
                    );
                return (
                    <Flex width={"80%"} flexWrap="wrap" gap={3}>
                        {getProperties(property.title)?.values.map((item: any, key: number) => (
                            <Box
                                key={key}
                                borderRadius="100%"
                                onClick={() => addProperty(property.title, item)}
                                width="32px"
                                height="32px"
                                cursor={productID && publish_product ? "auto" : "pointer"}
                                background={item.value}
                                className={`${checkItem(item.value) ? classes.active : ""} ${classes.box} ${classes.color}`}
                            ></Box>
                        ))}
                    </Flex>
                );

            case "size":
                if (pod)
                    return (
                        <Box
                            borderRadius="28px"
                            onClick={() => addProperty(property.title, podItem)}
                            padding="6px 16px"
                            cursor={productID && publish_product ? "auto" : "pointer"}
                            background="#1C1C1C"
                            className={`${checkItem(podItem?.value) ? classes.active : ""} ${classes.box}`}
                        >
                            {podItem?.value}
                        </Box>
                    );
                return (
                    <Flex width={"80%"} flexWrap="wrap" gap={3}>
                        {getProperties(property.title)?.values.map((item: any, key: number) => (
                            <Box
                                key={key}
                                borderRadius="28px"
                                onClick={() => addProperty(property.title, item)}
                                padding="6px 16px"
                                cursor={productID && publish_product ? "auto" : "pointer"}
                                background="#1C1C1C"
                                className={`${checkItem(item.value) ? classes.active : ""} ${classes.box}`}
                            >
                                {item.value}
                            </Box>
                        ))}
                    </Flex>
                );
            case "custom property":
                return (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            backgroundColor: "#1C1C1C",
                            cursor: "text",
                            borderRadius: "8px",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px",
                            flexDirection: "row",
                            width: "80%",
                        }}
                        onClick={() => inputRef.current.focus()}
                    >
                        {properties
                            .find((innerProperty) => innerProperty.title === property?.title)
                            ?.items?.map((item: any, key: number) => (
                                <HStack key={key} spacing={"10px"} backgroundColor="#262626" padding="6px 16px" borderRadius="4px">
                                    <AppTypography fontSize="14px" color="#777">
                                        {item.value}
                                    </AppTypography>
                                    <AppIcons.Close
                                        onClick={() => {
                                            remove(item.value);
                                        }}
                                        cursor="pointer"
                                    />
                                </HStack>
                            ))}
                        <Input
                            ref={inputRef}
                            name="customValues"
                            id="customValues"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !checkItem(values.customValues)) {
                                    addProperty(property?.title, { value: values?.customValues, caption: values?.customValues });
                                    setFieldValue("customValues", "");
                                }
                            }}
                            width={"auto"}
                            value={values.customValues}
                            placeholder="enter..."
                            onChange={handleChange}
                            color="#808080"
                            border="none"
                            focusBorderColor="transparent"
                        />
                    </form>
                );
            default:
                return <></>;
        }
    }, [properties, values]);

    return getContainer;
}

export default PropertyItem;
