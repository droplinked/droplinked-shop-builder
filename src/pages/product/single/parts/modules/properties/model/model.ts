import { Iproperties } from "lib/apis/product/interfaces";
import AppendModule from "./module/append";

export interface IaddProperty {
    available_properties: Array<Iproperties>;
    title: string;
    index: number;
}

interface IappendHandle {
    state: Array<Iproperties>;
    types: Array<any>;
}

interface ItypesAvailable {
    state: Array<Iproperties>
    propertyValue: string
    title: string
}

const append = AppendModule;

const PropertiesFormModel = {
    // This method for button "Make New Properties" in "PropertiesForm" component
    appendHandle: ({ state, types }: IappendHandle): Array<Iproperties> => {
        if (state.length) {
            // Check exist left types for append
            const checkLePr = append.checkLengthProperty({
                properties: state,
                types,
            });
            if (checkLePr) return state;

            return append.appendProperty(state);
        } else {
            return append.mock();
        }
    },

    typesAvailable: ({ state, propertyValue, title }: ItypesAvailable): Boolean => {
        const indexesState = state.map((el) => {
            return el.title
        })
        return [propertyValue, ...indexesState].includes(title)
    },

    addProperty: ({ available_properties, title, index }: IaddProperty): Array<Iproperties> => {
        // key === index condition means that we want to keep previous properties but with additional property that we wanna add
        const propertiesLenght = available_properties.length > 1
        return append.loopProperty({
            state: available_properties,
            action: (el: Iproperties, key) => {
                return {
                    title: key === index ? title : el.title,
                    items: propertiesLenght ? el.items : [],
                }
            }
        })
    },

    // Make data
    makeData: (state: Array<Iproperties>) => {
        return state.filter((el) => el?.items?.filter((item) => item.value.length).length);
    },
};

export default PropertiesFormModel;
