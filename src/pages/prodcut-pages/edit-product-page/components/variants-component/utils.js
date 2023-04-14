export const existSameOptions = (sku, skus) => {
  if (sku.options.length === 0) return false;
  const isSame = skus?.some((skuItem) => {
    const skuOption = sku.options;
    const skuItemOption = skuItem.options;
    const findByVariantName = (variantName, data) => {
      return data?.find((item) => item.variantName === variantName) ?? null;
    };
    return skuOption.every(
      (opt) =>
        findByVariantName(opt.variantName, skuItemOption)?.value === opt?.value
    );
  });
  return isSame;
};
