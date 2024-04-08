import { Flex } from "@chakra-ui/react";
import AppSwitch from "components/common/swich";
import AppTypography from "components/common/typography/AppTypography";
import { designContext } from "pages/register-pages/pages/design/design-context";
import React, { useContext } from "react";

const IsHeaderFixed = () => {
    const { methods: { dispatch }, state: { shop: { shopDesign: { isHeaderFixed } } } } = useContext(designContext);
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isHeaderFixed = e.target.checked;
        dispatch({ type: "updateShop", params: { shopDesign: { isHeaderFixed } } });
    };

    return (
        <Flex alignItems="center" gap="16px">
            <AppSwitch isChecked={isHeaderFixed} onChange={change} />
            <AppTypography fontSize="14px">Wanna header to be sticky?</AppTypography>
        </Flex>
    );
};

export default IsHeaderFixed;
