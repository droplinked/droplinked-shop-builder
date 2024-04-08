import { IAdditionalLinkes } from "../../reducer";
import { isStyleProp } from "@chakra-ui/react";

namespace designPageButtonsModel {
    export const refactorLinks = (data: Array<IAdditionalLinkes>) => data.map((el) => ({ caption: el.caption, link: el.link }));

    const is_responsive_value = (obj: any) => {
        if (obj && typeof obj === "object" && ["base", "xs", "sm", "md", "lg", "xl", "2xl"].some((key) => obj.hasOwnProperty(key)))
            return Object.values(obj).every((value) => typeof value === "string");
        else return false;
    };
    export const deep_validate_and_transform = (obj: any) => {
        const transform = (currentObj: any) => {
            return Object.keys(currentObj).reduce((acc, key) => {
                if (key.startsWith("--dlk-")) {
                    const value = currentObj[key];
                    if (typeof value === "object" && value !== null) {
                        const dlkPrefixedKeyCount = Object.keys(value).filter((key) => key.startsWith("--dlk-")).length;
                        if (dlkPrefixedKeyCount === 0) {
                            acc[key] = Object.keys(value)
                                .filter((key) => isStyleProp(key) || is_responsive_value(value[key]))
                                .reduce((obj, key) => {
                                    obj[key] = value[key];
                                    return obj;
                                }, {} as Record<string, any>);
                        } else {
                            acc[key] = transform(value);
                        }
                    } else {
                        acc[key] = value;
                    }
                }
                return acc;
            }, {});
        };

        return transform(obj);
    };
}

export default designPageButtonsModel;
