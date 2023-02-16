

const existSameOptions = (skus , sku) => {
    if (sku.options.length == 0) return false;
    let result = false;
    let thisSkuOption = sku.options;
    skus.forEach((currentSku) => {
      let isSame = true;
      currentSku.options.forEach((option) => {
        let find = thisSkuOption.find((op) => op.variantID == option.variantID);
        if (find.value == "") isSame = false;
        if (find.value != option.value) isSame = false;
      });
      if (isSame) {
       
        result = true;
        return;
      }
    });
    return result;
  };