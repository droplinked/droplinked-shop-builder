export const convertCustomerInformation = (order) => {
  if (!order || !order.customerAddressBook) return null

  const { firstName, lastName, addressLine1, city, state, country, zip } = order.customerAddressBook
  
  return [
    {
      name: "Customer",
      data: `${firstName} ${lastName}`
    },
    {
      name: "Email",
      data: order?.customerEmail
    },
    {
      name: "Address",
      data: `${addressLine1} ${city} ${state} ${country} ${zip} `
    }
  ]

}