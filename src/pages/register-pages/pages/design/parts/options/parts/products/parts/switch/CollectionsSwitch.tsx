import React, { useContext } from 'react'
import { Flex } from '@chakra-ui/react'

// Contexts
import { designContext } from 'pages/register-pages/pages/design/design-context'

// Components
import OptionsCaption from '../../../caption/OptionsCaption'
import AppSwitch from 'components/common/swich'

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
            <OptionsCaption caption='Show Collections' />
        </Flex>
    )
}

export default CollectionsSwitch
