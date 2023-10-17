import { SimpleGrid, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'
import OptionLayoutModel from './model'

function OptionLayout() {
    const [Test, setTest] = useState(0)

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Layout' />
            <SimpleGrid columns={4} spacing="15px">
                {OptionLayoutModel.items.map((el, key) => (
                    <ActiveBox active={key === Test} key={key} props={{ padding: "8px", display: "flex", justifyContent: "center", borderRadius: "8px", onClick: () => setTest(key), cursor: "pointer" }}>{el.icon}</ActiveBox>
                ))}
            </SimpleGrid>
        </VStack >
    )
}

export default OptionLayout