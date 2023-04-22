

export const convertCustomerInformation = (order) => {
    if(!order) return null
    let array = [];
    array.push({
      name: "Customer",
      data:
        order?.customerAddressBook?.firstName +
        " " +
        order?.customerAddressBook?.lastName,
    });
    array.push({ name: "Email", data: order?.customerEmail });
    array.push({
      name: "Address",
      data:
        order?.customerAddressBook?.addressLine1 +
        " ," +
        order?.customerAddressBook?.city +
        " ," +
        order?.customerAddressBook?.state +
        " ," +
        order?.customerAddressBook?.country +
        " ," +
        order?.customerAddressBook?.zip,
    });
    array.push({ name: "Email", data: order?.customerEmail });
    return array;
}