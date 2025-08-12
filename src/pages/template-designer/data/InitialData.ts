import { Data } from "droplinked-designer-core";

export interface ShopDesign {
    fontfamily: string;
    backgroundBody: string;
    foreground: string;
    textColorParagraphs: string;
    iconHeaderColor: string;
    isLogoAsFavicon: boolean;
    faviconURL: string;
}

export interface InitialData {
    backgroundColor: string;
    headerIcon: string;
    logo: string;
    shopDesign: ShopDesign;
    launchDate: string | null;
}

export const getInitialData = (initialData: InitialData): Data => {
    const data: Data = {
        root: {
            props: {}
        },
        content: [
            {
                type: "headerComponent",
                props: {
                    linkManagement: [],
                    id: "headerComponent-012746f3-cc7f-4e4e-baf3-ebc4c6369a18"
                }
            },
            {
                type: "productGridList",
                props: {
                    filters: { visibility: "visible" },
                    searchBar: { visibility: "visible" },
                    sort: { visibility: "visible" },
                    padding: { top: 32, bottom: 32 },
                    id: "productGridList-eb8afa59-3ead-4a50-8c3c-166a9220f450"
                }
            },
            {
                type: "footerComponent",
                props: {
                    linkManagement: {
                        firstColumn: { name: "Useful Links", links: [] },
                        secondColumn: { name: "Site Links", links: [] }
                    },
                    id: "footerComponent-012746f3-cc7f-4e4e-baf3-ebc4c6369a18",
                    description: { text: "" },
                    socialChannels: []
                }
            }
        ],
        shopDefaultData: initialData
    }
    return data;
};