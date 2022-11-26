


export const getDroplinkedTotalprice = (sku , quantity) => {
    let total = parseFloat(sku.price) * quantity;
    return total.toFixed(2);
}


export const getVariantsText = (sku) => {
    if (sku.options.length == 0) return "";
    let optionArray = sku.options.map((option) => option.value);
    let text = optionArray.join(" / ");
    return text;
  };