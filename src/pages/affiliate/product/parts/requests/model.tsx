import React from "react";
import { Box } from "@chakra-ui/react";
import { typesProperties } from "lib/utils/statics/types";

const RequestProductModel = ({
    getCaption: (id: string) => typesProperties.find(el => el._id === id).name,

    makeOptions: (list: any) => {
        let options = {}
        list?.forEach((element: any) => {
            options[RequestProductModel.getCaption(element.variantID)] = {
                value: element.variantID === "62a989ab1f2c2bbc5b1e7153" ? <Box backgroundColor={element.value} width="25px" height="25px" borderRadius="100%"></Box> : element.value
            }
        });
        return options
    }
})

export default RequestProductModel