import { convertMBtoBytes } from "utils/helpers";

// Pure utility functions for image validation - no hooks
export const validateImageSize = (file: File, maxSizeMB: number = 5): void => {
    if (file.size > convertMBtoBytes(maxSizeMB)) {
        throw new Error(`Image size must be less than ${maxSizeMB}MB`);
    }
};

export const validateImageType = (file: File): void => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
        throw new Error("Image type not supported");
    }
};

export const validateImageFile = (file: File, maxSizeMB: number = 5): void => {
    validateImageSize(file, maxSizeMB);
    validateImageType(file);
};

// Legacy function for backward compatibility
const UploadImageModel = () => {
    return {
        size: (file: any) => validateImageSize(file),
        type: (file: any) => validateImageType(file),
        validate: (file: any) => validateImageFile(file)
    };
};

export default UploadImageModel;
