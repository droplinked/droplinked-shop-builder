import React, { useContext } from "react";
import { TILE_DESIGN_PAGES_ENUM, TILE_INPUT_TYPES, PRODUCT_SECTIONS_ENUM } from "./types/tile.design.types";
import { HStack, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import { TileDesignContext } from "./context/tile.design.context";
import AppInput from "components/common/form/textbox/AppInput";
import AppSwitch from "components/common/swich";
import AppColorPicker from "components/common/colorPicker/AppColorPicker";

const tile_design_form_fields_object = {
    [TILE_DESIGN_PAGES_ENUM.PRODUCT]: {
        [PRODUCT_SECTIONS_ENUM.CONTAINER]: {
            inputs: [
                {
                    label: "Background Color",
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "backgroundColor",
                },
                {
                    label: "Background Transparency",
                    type: TILE_INPUT_TYPES.SLIDER,
                    key: "opacity",
                },
                {
                    label: "Dark Mode",
                    type: TILE_INPUT_TYPES.SWITCH,
                    key: "darkMode",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.IMAGE]: {
            inputs: [
                {
                    label: "Image",
                    type: TILE_INPUT_TYPES.SWITCH,
                    key: "display",
                },
                {
                    label: "Image Slider",
                    type: TILE_INPUT_TYPES.SWITCH,
                    key: "slider",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.TITLE]: {
            inputs: [
                {
                    label: "Title Color",
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "color",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.PRICE]: {
            inputs: [
                {
                    label: "Title Text Color",
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "color",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.VARIANTS]: {
            inputs: [
                {
                    label: "Variant Display Options",
                    type: TILE_INPUT_TYPES.DROPDOWN,
                    options: ["dropdown", "checkbox"],
                    key: "displayType",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.BUTTON]: {
            inputs: [
                {
                    label: "Buy Button Text",
                    type: TILE_INPUT_TYPES.TEXT,
                    key: "text",
                },
                {
                    label: "Buy Button Background Color",
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "backgroundColor",
                },
                {
                    label: "Buy Button Text Color",
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "color",
                },
            ],
        },
    },
};

const TileDesignForm = () => {
    const {
        state: { design, current },
        methods: { updateFormFields, updateState },
    } = useContext(TileDesignContext);
    if (current.section === "none") return null;
    const change_theme = (toDarkMode: boolean) => {
        const {
            PRODUCT: { CONTAINER, TITLE, PRICE, BUTTON },
        } = design;
        updateState(
            "design",
            toDarkMode
                ? {
                      PRODUCT: {
                          ...design?.PRODUCT,
                          CONTAINER: {
                              ...CONTAINER,
                              backgroundColor: CONTAINER.backgroundColor === "#FFFFFF" ? "#141414" : CONTAINER.backgroundColor,
                              darkMode: toDarkMode,
                          },
                          TITLE: {
                              color: TITLE.color === "#000000" ? "#FFFFFF" : TITLE.color,
                          },
                          PRICE: { color: PRICE.color === "#000000" ? "#FFFFFF" : PRICE.color },
                          BUTTON: {
                              ...BUTTON,
                              backgroundColor: BUTTON.backgroundColor === "#141414" ? "#FFFFFF" : BUTTON.backgroundColor,
                              color: BUTTON.color === "#FFFFFF" ? "#000000" : BUTTON.color,
                          },
                      },
                  }
                : {
                      PRODUCT: {
                          ...design?.PRODUCT,
                          CONTAINER: {
                              ...CONTAINER,
                              backgroundColor: CONTAINER.backgroundColor === "#141414" ? "#FFFFFF" : CONTAINER.backgroundColor,
                              darkMode: toDarkMode,
                          },
                          TITLE: {
                              color: TITLE.color === "#FFFFFF" ? "#000000" : TITLE.color,
                          },
                          PRICE: { color: PRICE.color === "#FFFFFF" ? "#000000" : PRICE.color },
                          BUTTON: {
                              ...BUTTON,
                              backgroundColor: BUTTON.backgroundColor === "#FFFFFF" ? "#141414" : BUTTON.backgroundColor,
                              color: BUTTON.color === "#000000" ? "#FFFFFF" : BUTTON.color,
                          },
                      },
                  }
        );
    };

    return (
        <VStack align={"stretch"} backgroundColor={"white"} width={"280px"} padding={"16px"} rounded={"8px"}>
            <HStack borderBottom={"4px solid #2BCFA1"}>
                <AppIcons.Paint />
                <AppTypography fontSize={"16px"} fontWeight={"500"}>
                    Style
                </AppTypography>
            </HStack>
            <form>
                <VStack align={"stretch"} spacing={"16px"} paddingY={"16px"}>
                    {tile_design_form_fields_object?.[current?.page]?.[current?.section]?.inputs?.map((input: any) => {
                        const currentValue = design?.[current?.page][current?.section][input?.key];
                        const inputComponent = () => {
                            if (input?.type === TILE_INPUT_TYPES.TEXT)
                                return (
                                    <Input
                                        value={currentValue}
                                        name={input?.key}
                                        onChange={(e) => updateFormFields({ page: current.page, section: current.section, key: input?.key, value: e.currentTarget?.value })}
                                    />
                                );
                            if (input?.type === TILE_INPUT_TYPES.SWITCH && input?.key !== "darkMode")
                                return (
                                    <AppSwitch
                                        isChecked={currentValue}
                                        name={input?.key}
                                        onChange={(e) => updateFormFields({ page: current.page, section: current.section, key: input?.key, value: e.currentTarget?.checked })}
                                    />
                                );

                            if (input?.type === TILE_INPUT_TYPES.SWITCH && input?.key === "darkMode")
                                return <AppSwitch isChecked={currentValue} name={input?.key} onChange={(e) => change_theme(e?.target?.checked)} />;
                            if (input?.type === TILE_INPUT_TYPES.COLOR_PICKER)
                                return (
                                    <AppColorPicker
                                        props={{ containerProps: { backgroundColor: "white", border: "1px solid #DEDEDE", minW: "128px" } }}
                                        value={currentValue}
                                        onChange={(e) => updateFormFields({ page: current.page, section: current.section, key: input?.key, value: e })}
                                    />
                                );
                            if (input?.type === TILE_INPUT_TYPES.DROPDOWN)
                                return (
                                    <Select value={currentValue} onChange={(e) => updateFormFields({ page: current.page, section: current.section, key: input?.key, value: e.target?.value })}>
                                        {input?.options?.map((option) => (
                                            <option value={option}>{option}</option>
                                        ))}
                                    </Select>
                                );

                            if (input?.type === TILE_INPUT_TYPES.SLIDER)
                                return (
                                    <Slider
                                        aria-label="slider-ex-1"
                                        defaultValue={currentValue * 100}
                                        onChange={(e) => updateFormFields({ page: current.page, section: current.section, key: input?.key, value: e / 100 })}
                                    >
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                );
                        };
                        return (
                            <HStack align={"center"} justifyContent={"space-between"} wrap={"wrap"}>
                                <AppTypography fontSize={"14px"} fontWeight={"500"}>
                                    {input?.label}
                                </AppTypography>
                                {inputComponent()}
                            </HStack>
                        );
                    })}
                </VStack>
            </form>
        </VStack>
    );
};

export default TileDesignForm;
