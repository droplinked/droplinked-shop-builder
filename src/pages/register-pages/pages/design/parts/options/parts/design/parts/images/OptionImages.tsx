import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import { availableTemplateService } from 'lib/apis/shop/shopServices'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionImages() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { backgroundBody, foreground } } } } = useContext(designContext)
    const { data } = useQuery({
        queryFn: availableTemplateService,
        queryKey: "images_them_option_query",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Color Layouts' isRequired />
            <Flex gap="10px">
                {data ? data?.data?.data.map((template: any, key: number) => {
                    return (
                        <ActiveBox
                            key={key}
                            active={template.background === backgroundBody && template.foreground === foreground}
                            props={{
                                borderRadius: "100px",
                                backgroundColor: "#141414",
                                cursor: "pointer",
                                width: "40px",
                                onClick: () => {
                                    dispatch({
                                        type: 'updateShop', params: {
                                            shopDesign: {
                                                backgroundBody: template.background,
                                                fontfamily: template.fontFamily,
                                                foreground: template.foreground,
                                                textColorParagraphs: template.textColor,
                                            }
                                        }
                                    })
                                }
                            }}
                        >
                            <HStack width="100%" spacing="0" >
                                <Box width="50%" borderRadius="100px 0 0 100px" height="18px" backgroundColor={template.foreground}></Box>
                                <Box width="50%" borderRadius="0 100px 100px 0" height="18px" backgroundColor={template.background}></Box>
                            </HStack>
                        </ActiveBox>
                    );
                }) : null}
            </Flex>
        </VStack>
    )
}

export default OptionImages