export interface ISizeLimit {
    fieldName: string
    size: string
}

const storeErrors = {
    sizeLimit: ({ fieldName, size }: ISizeLimit) => `${fieldName} must be less than ${size}. Please choose a smaller file size and try again.`,
};

export default storeErrors;
