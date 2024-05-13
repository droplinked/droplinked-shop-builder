import { Box, Flex, HStack, Input, VStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { variantOptionsService } from "lib/apis/variant/services";
import { typesProperties } from "lib/utils/statics/types";
import { productContext } from "pages/product/single/context";
import SkeletonProduct from "pages/product/single/parts/modules/skeleton/SkeletonProduct";
import ProductPageTitle from "pages/product/single/parts/modules/title/ProductPageTitle";
import React, { useCallback, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import PropertiesFormModel from "../../model/model";
import PropertyButton from "../button/PropertyButton";
import PropertyItem from "../item/PropertyItem";
import PropertyOptions from "./parts/options/PropertyOptions";
import { Iproperties } from "lib/apis/product/interfaces";

function PropertyFormProduct() {
    const { data, isLoading } = useQuery({
        queryFn: variantOptionsService,
        queryKey: "product_properties",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
    const {
        state: { properties, publish_product },
        methods: { updateState },
        productID,
    } = useContext(productContext);
    const { addProperty } = PropertiesFormModel;

    // Create new property
    const create = useCallback(
        (value: any, index: number) => {
            updateState(
                "properties",
                addProperty({
                    available_properties: properties,
                    title: value,
                    index,
                })
            );
        },
        [properties]
    );

    const update_custom_property_title = (keyProperty: number, new_title: string) => {
        updateState(
            "properties",
            properties.map((property, key) => {
                if(keyProperty === key) return ({...property, custom_title: new_title})
                return ({...property})
            })
        );
    };

    const getProperties = useCallback(
        (title: string) => {
            const datas = data?.data?.data;
            if (!datas) return [];
            const items = datas.find((el) => el.name.toLowerCase() === title.toLowerCase());
            return items ? items : [];
        },
        [data, properties]
    );

    return (
        <>
            <Flex justifyContent={"space-between"}>
                <ProductPageTitle head isRequired title="Product Properties" description="Add at least one property to enable all variant fields." />
                {productID && publish_product ? null : <PropertyButton state={properties} types={typesProperties} />}
            </Flex>
            <SkeletonProduct>
                <VStack align={"stretch"} spacing={3}>
                    {!isLoading && properties.length
                        ? properties.map((el, keyProperty) => (
                              <VStack background={"#141414"} spacing={"12px"} borderRadius="8px" padding={4} align={"stretch"} key={keyProperty} width={"100%"}>
                                  <HStack>
                                      <Box width={"20%"}>
                                          <AppTypography fontSize="14px" color="#FFF">
                                              Property
                                          </AppTypography>
                                      </Box>
                                      <Box width={"80%"}>
                                          <PropertyOptions element={el} value={el.title} onChange={(e: any) => create(e.target.value, keyProperty)} />
                                      </Box>
                                  </HStack>
                                  {el.title && (
                                      <VStack align={"stretch"} justifyContent={"space-between"} spacing={"12px"}>
                                          <HStack align={"stretch"}>
                                              <Box width={"20%"}>
                                                  <AppTypography fontSize="14px" color="#FFF">
                                                      Title
                                                  </AppTypography>
                                              </Box>
                                              <Flex width={"80%"} flexWrap="wrap" gap={3}>
                                                  {getProperties(el.title) && (
                                                      <Input
                                                          name="customValues"
                                                          id="customValues"
                                                          width={"auto"}
                                                          value={properties?.[keyProperty]?.custom_title}
                                                          placeholder="custom title"
                                                          onChange={(e) => update_custom_property_title(keyProperty, e.target.value)}
                                                          color="#808080"
                                                          border="none"
                                                          focusBorderColor="transparent"
                                                      />
                                                  )}
                                              </Flex>
                                          </HStack>
                                          <HStack align={"stretch"}>
                                              <Box width={"20%"}>
                                                  <AppTypography fontSize="14px" color="#FFF">
                                                      Values
                                                  </AppTypography>
                                              </Box>
                                              <PropertyItem property={el} getProperties={getProperties} />
                                          </HStack>
                                      </VStack>
                                  )}
                              </VStack>
                          ))
                        : null}
                </VStack>
            </SkeletonProduct>
        </>
    );
}

export default PropertyFormProduct;
