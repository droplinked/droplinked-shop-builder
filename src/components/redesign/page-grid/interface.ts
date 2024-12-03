import { IDataGridButtons } from "./components/buttons/interface"
import { IFiltersDataGridItems } from "./components/filters/interface"

export interface SearchInput {
    onChange(e: any): void
    value?: string
    placeholder?: string
}

export interface IdataGrid extends IDataGridButtons {
    filters?: Array<IFiltersDataGridItems>
    loading: boolean
    search?: SearchInput
    description?: string
    title?: string
}

export interface PageGridRootProps {
    children: React.ReactNode;
    loading?: boolean;
}

export interface PageGridHeaderProps {
    title?: string;
    description?: string;
    buttons?: IDataGridButtons['buttons'];
}

export interface PageGridActionsProps {
    search?: SearchInput;
    filters?: Array<IFiltersDataGridItems>;
}

export interface PageGridContentProps {
    children: React.ReactNode;
    loading?: boolean;
}