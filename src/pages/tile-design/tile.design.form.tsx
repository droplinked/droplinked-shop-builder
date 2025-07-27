import React, { useContext } from "react";
import { TILE_DESIGN_PAGES_ENUM, TILE_INPUT_TYPES, PRODUCT_SECTIONS_ENUM, ITileDesignState } from "./types/tile.design.types";
import { HStack, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, VStack } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import { TileDesignContext } from "./context/tile.design.context";
import AppSwitch from "components/common/swich";
import AppColorPicker from "components/common/colorPicker/AppColorPicker";
import { capitalizeFirst } from "utils/helpers";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import localAr from 'locales/tile-design/ar.json';
import localEn from 'locales/tile-design/en.json';

const tile_design_form_fields_object = ({ design, t }: Pick<ITileDesignState, "design"> & { t: any }) => ({
    [TILE_DESIGN_PAGES_ENUM.PRODUCT]: {
        [PRODUCT_SECTIONS_ENUM.CONTAINER]: {
            inputs: [
                {
                    label: t('TileDesignForm.productType'),
                    type: TILE_INPUT_TYPES.DROPDOWN,
                    options: ["card", "button"],
                    key: "type",
                },
                design?.[TILE_DESIGN_PAGES_ENUM.PRODUCT][PRODUCT_SECTIONS_ENUM.CONTAINER].type === "card" && {
                    label: t('TileDesignForm.backgroundColor'),
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "backgroundColor",
                },
                design?.[TILE_DESIGN_PAGES_ENUM.PRODUCT][PRODUCT_SECTIONS_ENUM.CONTAINER].type === "card" && {
                    label: t('TileDesignForm.transparency'),
                    type: TILE_INPUT_TYPES.SLIDER,
                    key: "opacity",
                },
                design?.[TILE_DESIGN_PAGES_ENUM.PRODUCT][PRODUCT_SECTIONS_ENUM.CONTAINER].type === "card" && {
                    label: t('TileDesignForm.description'),
                    type: TILE_INPUT_TYPES.SWITCH,
                    key: "description",
                },
                {
                    label: t('TileDesignForm.darkMode'),
                    type: TILE_INPUT_TYPES.SWITCH,
                    key: "darkMode",
                },
                design?.[TILE_DESIGN_PAGES_ENUM.PRODUCT][PRODUCT_SECTIONS_ENUM.CONTAINER].type === "button" && {
                    label: t('TileDesignForm.buttonText'),
                    type: TILE_INPUT_TYPES.TEXT,
                    key: "text",
                },
                design?.[TILE_DESIGN_PAGES_ENUM.PRODUCT][PRODUCT_SECTIONS_ENUM.CONTAINER].type === "button" && {
                    label: t('TileDesignForm.buttonBackgroundColor'),
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "buttonBackgroundColor",
                },
                design?.[TILE_DESIGN_PAGES_ENUM.PRODUCT][PRODUCT_SECTIONS_ENUM.CONTAINER].type === "button" && {
                    label: t('TileDesignForm.buttonTextColor'),
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "color",
                },
                {
                    label: t('TileDesignForm.phoneForDigital'),
                    type: TILE_INPUT_TYPES.SWITCH,
                    key: "phone",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.IMAGE]: {
            inputs: [
                {
                    label: t('TileDesignForm.image'),
                    type: TILE_INPUT_TYPES.SWITCH,
                    key: "display",
                },
                {
                    label: t('TileDesignForm.imageSlider'),
                    type: TILE_INPUT_TYPES.SWITCH,
                    key: "slider",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.TITLE]: {
            inputs: [
                {
                    label: t('TileDesignForm.titleColor'),
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "color",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.PRICE]: {
            inputs: [
                {
                    label: t('TileDesignForm.priceColor'),
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "color",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.VARIANTS]: {
            inputs: [
                {
                    label: t('TileDesignForm.variantDisplay'),
                    type: TILE_INPUT_TYPES.DROPDOWN,
                    options: ["dropdown", "checkbox"],
                    key: "displayType",
                },
            ],
        },

        [PRODUCT_SECTIONS_ENUM.BUTTON]: {
            inputs: [
                {
                    label: t('TileDesignForm.buttonText'),
                    type: TILE_INPUT_TYPES.TEXT,
                    key: "text",
                },
                {
                    label: t('TileDesignForm.buttonBackgroundColor'),
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "backgroundColor",
                },
                {
                    label: t('TileDesignForm.buttonTextColor'),
                    type: TILE_INPUT_TYPES.COLOR_PICKER,
                    key: "color",
                },
            ],
        },
    },
});

const TileDesignForm = () => {
    const {
        state: { design, current },
        methods: { updateFormFields, updateState },
    } = useContext(TileDesignContext);
    const { t } = useLocaleResources('tile-design', { en: localEn, ar: localAr });

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
                            backgroundColor: CONTAINER.backgroundColor === "neutral.background" ? "neutral.white" : CONTAINER.backgroundColor,
                            darkMode: toDarkMode,
                        },
                        TITLE: {
                            color: TITLE.color === "neutral.white" ? "neutral.black" : TITLE.color,
                        },
                        PRICE: { color: PRICE.color === "neutral.white" ? "neutral.black" : PRICE.color },
                        BUTTON: {
                            ...BUTTON,
                            backgroundColor: BUTTON.backgroundColor === "neutral.white" ? "neutral.background" : BUTTON.backgroundColor,
                            color: BUTTON.color === "neutral.black" ? "neutral.white" : BUTTON.color,
                        },
                    },
                }
                : {
                    PRODUCT: {
                        ...design?.PRODUCT,
                        CONTAINER: {
                            ...CONTAINER,
                            backgroundColor: CONTAINER.backgroundColor === "neutral.background" ? "neutral.white" : CONTAINER.backgroundColor,
                            darkMode: toDarkMode,
                        },
                        TITLE: {
                            color: TITLE.color === "neutral.white" ? "neutral.black" : TITLE.color,
                        },
                        PRICE: { color: PRICE.color === "neutral.white" ? "neutral.black" : PRICE.color },
                        BUTTON: {
                            ...BUTTON,
                            backgroundColor: BUTTON.backgroundColor === "neutral.white" ? "neutral.background" : BUTTON.backgroundColor,
                            color: BUTTON.color === "neutral.black" ? "neutral.white" : BUTTON.color,
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
                    {t('TileDesignForm.title')}
                </AppTypography>
            </HStack>
            <form>
                <VStack align={"stretch"} spacing={"16px"} paddingY={"16px"}>
                    {tile_design_form_fields_object({ design, t })
                        ?.[current?.page]?.[current?.section]?.inputs?.filter(Boolean)
                        ?.map((input: any) => {
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
                                            props={{ containerProps: { backgroundColor: "white", border: "1px solid neutral.gray.200", borderColor:"neutral.gray.200", minW: "128px" } }}
                                            value={currentValue}
                                            onChange={(e) => updateFormFields({ page: current.page, section: current.section, key: input?.key, value: e })}
                                        />
                                    );
                                if (input?.type === TILE_INPUT_TYPES.DROPDOWN)
                                    return (
                                        <Select value={currentValue} onChange={(e) => updateFormFields({ page: current.page, section: current.section, key: input?.key, value: e.target?.value })}>
                                            {input?.options?.map((option) => (
                                                <option value={option}>{capitalizeFirst(option)}</option>
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
