import { FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface FileUploadProps {
    onFileChange: (file: File | null) => void;
    dropDescription?: string;
    multiple?: boolean;
    accept?: {
        [key: string]: string[];
    };
    isLoading?: boolean;
    boxProps?: FlexProps;
    icon?: ReactNode;
    title?: ReactNode;
    value?: string;
}
