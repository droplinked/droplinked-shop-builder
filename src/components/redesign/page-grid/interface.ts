import { IFiltersDataGridItems } from "./components/filters/interface"

export interface SearchInput {
    onChange(e: any): void
    value?: string
    placeholder?: string
    disabled?: boolean
}

export interface PageGridRootProps {
    children: React.ReactNode;
    loading?: boolean;
}

export interface PageGridHeaderProps {
    title?: string;
    description?: string;
    rightContent?: React.ReactNode;
}

export interface PageGridActionsProps {
    search?: SearchInput;
    filters?: Array<IFiltersDataGridItems>;
}

export interface PageGridContentProps {
    children: React.ReactNode;
    loading?: boolean;
}