export interface Isize_limit {
    fieldName: string
    size: string
}
const storeErrors = {
    size_limit: ({ fieldName, size }: Isize_limit) => `${fieldName} must be less than ${size}. Please choose a smaller file size and try again.`,
    header_banner_size_limit: "Header banner must be less than 5MB. Please choose a smaller file size and try again.",
    when_user_publishes__store: "Your store has been published successfully!"
}

export default storeErrors