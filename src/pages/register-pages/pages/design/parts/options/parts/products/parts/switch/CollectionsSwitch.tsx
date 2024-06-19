import React, { useContext } from 'react'
import { Flex } from '@chakra-ui/react'

// Contexts
import { designContext } from 'pages/register-pages/pages/design/design-context'

// Components
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'

function CollectionsSwitch() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { isCollectionShown } } } } = useContext(designContext)

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isCollectionShown = e.target.checked;
        dispatch({ type: "updateShop", params: { shopDesign: { isCollectionShown } } });
    };

    return (
        <Flex align="stretch" gap={4}>
            <AppSwitch
                isChecked={isCollectionShown}
                onChange={handleSwitchChange}
            />
            <AppTypography fontSize={"14px"} fontWeight={400}>Show Collections</AppTypography>
        </Flex>
    )
}

export default CollectionsSwitch
