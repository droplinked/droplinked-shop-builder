import { createContext } from "react";
import { DesignerActions, StateDesignPage } from "../types/designerTypes";
import { initialStateDesignPage } from "../constants/initialState";

/**
 * Context interface for designer state and methods
 */
interface DesignerContext {
    state: StateDesignPage;
    methods: {
        dispatch(action: DesignerActions): void;
        resetState(): void;
    };
}

/**
 * Designer context with default values
 */
export const designerContext = createContext<DesignerContext>({
    state: initialStateDesignPage,
    methods: {
        dispatch: () => {},
        resetState: () => {},
    },
});
