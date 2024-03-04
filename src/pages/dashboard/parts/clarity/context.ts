import { createContext } from "react";

interface IClarityContext {
    clarityData: {
        shopName: string;
        totalSessionCount: number;
        pagesPerSession: number;
        activeTimeSpent: number;
        topCountries: Record<string, number>
    },
    isLoading: boolean
}

const clarityContext = createContext<IClarityContext>({
    clarityData: {
        shopName: "",
        totalSessionCount: 0,
        pagesPerSession: 0,
        activeTimeSpent: 0,
        topCountries: {}
    },
    isLoading: true
});

export default clarityContext