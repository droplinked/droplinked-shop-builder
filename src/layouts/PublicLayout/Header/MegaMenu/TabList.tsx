import { Flex, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import TabButton from './TabButton'

interface Props {
    items: any[]
    activeTab: number
    onTabChange: (index: number) => void
}

function TabList({ items, activeTab, onTabChange }: Props) {
    const { t } = useLocaleResources('layout/PublicLayout')

    return (
        <Flex
            width="354px"
            direction="column"
            gap={2}
            borderRight="1px solid"
            borderColor="neutral.gray.900"
            padding={{ xl: 4, "2xl": 6 }}
            bgColor="neutral.websiteBackground"
        >
            <Text
                marginBottom={2}
                paddingInline={3}
                fontSize={12}
                color="text.subtext.placeholder.dark"
            >
                {t('Header.MegaMenu.platform')}
            </Text>

            {items.map((item, index) => (
                <TabButton
                    key={item.label}
                    item={item}
                    isActive={activeTab === index}
                    onClick={() => onTabChange(index)}
                />
            ))}
        </Flex>
    )
}

export default TabList