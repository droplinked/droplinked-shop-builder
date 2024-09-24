type Option = {
    variantName: string;
    value: string;
    caption: string;
    _id: string;
};

export const variantIDs = {
    color: {
        _id: "62a989ab1f2c2bbc5b1e7153",
    },
    size: {
        _id: "62a989e21f2c2bbc5b1e7154",
    },
};

namespace productPageModel {
    export const getFirstOption = (sku: any) => {
        const option = (variantID: string) => sku?.options.find((el: any) => el.variantID === variantID)?.caption;
        return {
            color: option(variantIDs.color._id) || null,
            size: option(variantIDs.size._id) || null,
            custom_variants: [],
        };
    };

    export const getCustomVariants = (
        skus: any
    ): {
        name: string;
        values: Pick<Option, "_id" | "value" | "caption">[];
    }[] => {
        const customVariantsMap = new Map<
            string,
            {
                name: string;
                values: Pick<Option, "_id" | "value" | "caption">[];
            }
        >();

        skus?.forEach((sku: any) => {
            sku?.options?.forEach((option: any) => {
                if (option?.variantName !== "Size" && option?.variantName !== "Color") {
                    if (!customVariantsMap.has(option.variantName)) {
                        customVariantsMap.set(option.variantName, {
                            name: option.variantName,
                            values: [],
                        });
                    }

                    const currentVariantGroup = customVariantsMap.get(option.variantName);
                    const isDuplicate = currentVariantGroup?.values.some((v) => v?.value === option?.value && v?.caption === option?.caption);

                    if (!isDuplicate) {
                        currentVariantGroup?.values.push({
                            _id: option?._id,
                            value: option?.value,
                            caption: option?.caption,
                        });
                    }
                }
            });
        });
        return Array.from(customVariantsMap.values());
    };

    export const findSkuAsOption = ({ options, skuIDs }: { options: { [key: string]: string }; skuIDs: any[] }) => {
        if (!skuIDs) return null;

        const findOption = (skuOptions: any[], optionValue: string, optionKey: string) =>
            skuOptions?.some(({ caption, variantName }) => caption === optionValue && variantName?.toLowerCase() === optionKey?.toLowerCase());

        return skuIDs?.find((skuId: any) => Object.entries(options)?.every(([key, value]) => findOption(skuId?.options, value, key)));
    };

    export const getOptions = ({ skuIDs, type }: any): Array<any> => {
        if (!skuIDs || !skuIDs.length) return [];

        let results: any = {};
        const variantID = variantIDs[type]._id;
        skuIDs
            .filter((el: any) => el.options?.find((item: any) => item.variantID === variantID))
            .forEach((element: any) => {
                const target = element.options.find((color: any) => color.variantID === variantID);
                results[target.caption] = {
                    _id: target?._id,
                    value: target?.value,
                    caption: target?.caption,
                };
            });

        return Object.keys(results).length ? Object.values(results) : [];
    };
}

export default productPageModel;
