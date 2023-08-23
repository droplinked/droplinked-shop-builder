import { Box, Flex, Image, SimpleGrid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import appUploadImageContext from 'components/common/upload/image/context'
import React, { useCallback, useContext } from 'react'

function UploadImagesList() {
    const { values, deleted, defaults } = useContext(appUploadImageContext)

    const star = useCallback((url: string) => {
        const props = {
            cursor: "pointer",
            onClick: () => defaults.updateDefault(url),
            width: "18px",
            height: "18px"
        }
        return defaults.value === url ? <AppIcons.StarFilled {...props} /> : <AppIcons.StarOutline {...props} />
    }, [defaults])

    return (
        <>
            {values.length && typeof values === "object" ? (
                <>
                    {values.map((el: any, key: number) => (
                        <Flex key={key} position="relative" border="1px solid #313131" borderRadius="8px" alignItems="center" height="200px" justifyContent="center">
                            {el.search('https://printful') < 0 && (
                                <Box position="absolute" top={2} right={2}>
                                    <AppTooltip label="Delete image">
                                        <AppIcons.Close cursor="pointer" onClick={() => deleted(el)} style={{ backgroundColor: "#C2C2C2", padding: "3px", borderRadius: "100%" }} width="18px" height="18px" />
                                    </AppTooltip>
                                </Box>
                            )}

                            {defaults && <AppTooltip label="Set change default"><Box position="absolute" top={2} left={2}>{star(el)}</Box></AppTooltip>}
                            <Image src={el} maxWidth="75%" maxHeight="75%" borderRadius="8px" />
                        </Flex>
                    ))}
                </>
            ) : null}
        </>
    )
}

export default UploadImagesList