export enum TILE_INPUT_TYPES {
    SLIDER = "SLIDER",
    SWITCH = "SWITCH",
    DROPDOWN = "DROPDOWN",
    COLOR_PICKER = "COLOR_PICKER",
    TEXT = "TEXT",
    CHECKBOX = "CHECKBOX",
}

export enum TILE_DESIGN_PAGES_ENUM {
    PRODUCT = "PRODUCT",
    INFORMATION = "INFORMATION",
    SHIPPING = "SHIPPING",
    PAYMENT = "PAYMENT",
    POST_PURCHASE = "POST_PURCHASE",
}

export enum PRODUCT_SECTIONS_ENUM {
    CONTAINER = "CONTAINER",
    IMAGE = "IMAGE",
    TITLE = "TITLE",
    PRICE = "PRICE",
    VARIANTS = "VARIANTS",
    BUTTON = "BUTTON",
}

export interface ITileDesignState {
    design?: {
        [TILE_DESIGN_PAGES_ENUM.PRODUCT]: {
            [PRODUCT_SECTIONS_ENUM.CONTAINER]: {
                backgroundColor: string;
                opacity: number;
                darkMode: boolean;
            };
            [PRODUCT_SECTIONS_ENUM.IMAGE]: {
                display: boolean;
                slider: boolean;
            };
            [PRODUCT_SECTIONS_ENUM.TITLE]: {
                color: string;
            };
            [PRODUCT_SECTIONS_ENUM.PRICE]: { color: string };
            [PRODUCT_SECTIONS_ENUM.VARIANTS]: {
                displayType: "checkbox" | "dropdown";
            };
            [PRODUCT_SECTIONS_ENUM.BUTTON]: {
                text: string;
                backgroundColor: string;
                color: string;
            };
        };
    };
    current?: { page: TILE_DESIGN_PAGES_ENUM; section: PRODUCT_SECTIONS_ENUM | "none" };
}

export interface ITileDesignContext {
    state: ITileDesignState;
    methods: {
        updateFormFields({ page, section, key, value }: { page: TILE_DESIGN_PAGES_ENUM; section: PRODUCT_SECTIONS_ENUM | "none"; key: string; value: any });
        updateState(key: "current" | "design", value: any): void;
    };
}


