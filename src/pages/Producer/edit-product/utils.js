// returns intro data with correct format
export const getIntroData = (product) => {

  return {
    title: product.title,
    description: product.description,
    media: product.media.map((img) => img.url),
  };
};
// returns thecnical data with correct format
export const getTechnicalData = (product) => {
  return {
    productCollectionID: product.productCollectionID,
    shippingType: product.shippingType,
    shippingPrice: product.shippingPrice,
  };
};
// returns options data with correct format
export const getPropertiesData = (product) => {
  // console.log('product ' , product)
  // let currentOption = [];
  // product.skuIDs[0].options.forEach((option, i) => {
  //   currentOption.push({
  //     optionId: option.variantID,
  //     optionName: option.variantName,
  //     values: [],
  //     index: i + 1,
  //   });
  // });

  // currentOption.forEach((option) => {
  //   option.values = product.skuIDs.map((sku, i) => {
  //     return {
  //       index: i + 1,
  //       value: sku.options.find((opt) => opt.variantID == option.optionId)
  //         .value,
  //     };
  //   });
  // });
  // console.log('currentOption ' , currentOption)
 // return currentOption;
 return []
};
// returns skus data with correct format
export const getSkusData = (product) => {
  console.log('product ' , product)
  let x = product.skuIDs.map((sku) => {
    return {
      _id: sku._id,
      price: sku.price,
      quantity: sku.quantity,
     // record: sku.record,
      weight:sku.weight ,
    //  options:sku.options,
      dimensions:sku.dimensions,
      externalID:sku.externalID
    };
  });
  console.log('x ' , x)
  return x
};
