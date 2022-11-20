export const getAddressObject = (selectedAddress) => {
    return {
        first_name: selectedAddress.firstname,
        last_name: selectedAddress.lastname,
        country: selectedAddress.country,
        province: selectedAddress.state,
        city: selectedAddress.city,
        address1: selectedAddress.addressLine1,
        address2: selectedAddress.addressLine2,
        zip: selectedAddress.zip,
        phone: "",
      };
}



export const getLineItems = (card) => {
   return card.items.map((item) => {
        return {
          variant_id: item.variant.id,
          quantity: item.amount,
          product_id: item.productId,
        };
      });
}