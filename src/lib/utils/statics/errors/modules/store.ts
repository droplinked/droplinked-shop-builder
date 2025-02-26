export interface ISizeLimit {
    fieldName: string
    size: string
}

const storeErrors = {
    sizeLimit: ({ fieldName, size }: ISizeLimit) => `${fieldName} must be less than ${size}. Please choose a smaller file size and try again.`,
    headerBannerSizeLimit: "Header banner must be less than 5MB. Please choose a smaller file size and try again.",
    storePublished: "Your store has been published successfully!",
    storeAddressAdded: "Store address has been added successfully!",
    storeAddressUpdated: "Store address has been updated!",
    socialLinksUpdated: "Social Links have been updated",
    paymentOptionsUpdated: "Payment options have been updated", 
    hasBeenUpdated: (target: string) => `${target} has been updated`, 
    uploadSuccess: (field: string) => `${field} has been uploaded successfully!`
};

export default storeErrors;
