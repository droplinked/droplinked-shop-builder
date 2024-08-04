import { createContext } from "react";
import { ITileDesignContext, ITileDesignState, TILE_DESIGN_PAGES_ENUM, PRODUCT_SECTIONS_ENUM } from "../types/tile.design.types";

export const initialTileDesignState: ITileDesignState = {
    design: {
        PRODUCT: {
            CONTAINER: {
                backgroundColor: "#FFFFFF",
                opacity: 1,
                darkMode: false,
            },
            IMAGE: {
                display: true,
                slider: true,
            },
            TITLE: {
                color: "#000000",
            },
            PRICE: { color: "#000000" },
            VARIANTS: {
                displayType: "checkbox",
            },
            BUTTON: {
                text: "Buy",
                backgroundColor: "#000000",
                color: "#FFFFFF",
            },
        },
    },
    current: {
        page: TILE_DESIGN_PAGES_ENUM.PRODUCT,
        section: PRODUCT_SECTIONS_ENUM.CONTAINER,
    },
};

export const TileDesignContext = createContext<ITileDesignContext>({
    state: initialTileDesignState,
    methods: {
        updateFormFields: () => {},
        updateState: () => {},
    },
});
