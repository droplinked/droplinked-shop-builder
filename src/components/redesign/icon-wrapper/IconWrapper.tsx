import { Center, CenterProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props extends CenterProps {
    icon: ReactNode
}

function IconWrapper({ icon, ...rest }: Props) {
    return (
        <Center
            width={12}
            height={12}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={8}
            bg="neutral.gray.1000"
            // TODO: Remove this line when all new icons are replaced and AppIcons object is complete
            sx={{ svg: { width: 6, height: 6 } }}
            {...rest}
        >
            {icon}
        </Center>
    )
}

export default IconWrapper