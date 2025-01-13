import { FlexProps } from "@chakra-ui/react"
import { IDataGridButtons } from "./components/buttons/interface"
import { IFiltersDataGridItems } from "./components/filters/interface"

export interface SearchInput {
    onChange(e: any): void
    value?: string
    placeholder?: string
}

export interface IdataGrid {
    filters?: Array<IFiltersDataGridItems>
    loading: boolean
    search?: SearchInput
    description?: string
    title?: string
}

export interface PageGridRootProps {
    children: React.ReactNode;
    loading?: boolean;
    flexProps?: FlexProps;
}

export interface PageGridHeaderProps {
    title?: string;
    description?: string;
    buttons?: IDataGridButtons['buttons'];
    flexProps?: FlexProps;
}

export interface PageGridActionsProps {
    search?: SearchInput;
    filters?: Array<IFiltersDataGridItems>;
}

export interface PageGridContentProps {
    children: React.ReactNode;
    loading?: boolean;
}