import { Box, Flex, FormControl, HStack, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppTypography from 'components/common/typography/AppTypography';
import { availableTemplateService } from 'lib/apis/shop/shopServices';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { designContext } from '../../design-context';
import ActiveBox from '../../parts/active/ActiveBox';

function TemplateStore() {
    const { state: { templateID }, methods: { updateState } } = useContext(designContext);
    const { data } = useQuery({
        queryFn: availableTemplateService,
        queryKey: "chains_query",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    const images = [
        '/assets/images/templated/Frame20603.jpg',
        '/assets/images/templated/Frame21325.jpg',
        '/assets/images/templated/Frame206031.jpg',
        '/assets/images/templated/Frame206032.jpg',
        '/assets/images/templated/Frame206033.jpg',
        '/assets/images/templated/Frame213251.jpg',
    ]

    return (
        <VStack align={"stretch"}>
            <FormControl isRequired w="100%" marginBottom={3}>
                <FieldLabel textProps={{ size: "18px", weight: "bolder" }} label="Store Template" isRequired />
                <AppTypography size="14px" color="#C2C2C2" marginTop={1}>Pick your store template.</AppTypography>
            </FormControl>
            <SimpleGrid w="100%" columns={5} spacing="10px">
                {data ? data?.data?.data.map((template: any, key: number) => {
                    return (
                        <ActiveBox
                            active={template._id === templateID}
                            props={{
                                borderRadius: "8px",
                                border: "3px solid transparent",
                                backgroundColor: "#141414",
                                padding: "12px",
                                cursor: "pointer"
                            }}
                        >
                            <VStack align="stretch">
                                <Image
                                    width="100%"
                                    borderRadius="8px"
                                    key={key}
                                    src={images[key]}
                                    onClick={() => updateState("templateID", template._id)}
                                />
                                <Flex justifyContent="space-between">
                                    <VStack align="stretch" width="60%" spacing="0">
                                        <AppTypography size="8px" weight='bolder'>{template.fontFamily}</AppTypography>
                                        <AppTypography size="8px">{template.fontFamily}</AppTypography>
                                    </VStack>
                                    <HStack width="30%" spacing="0" >
                                        <Box width="50%" borderRadius="100px 0 0 100px" height="18px" backgroundColor={template.foreground}></Box>
                                        <Box width="50%" borderRadius="0 100px 100px 0" height="18px" backgroundColor={template.background}></Box>
                                    </HStack>
                                </Flex>
                            </VStack>
                        </ActiveBox>
                    );
                }) : null}
                <VStack width="125px" backgroundColor="#141414" onClick={() => window.open('mailto:support@droplinked.com')} cursor="pointer" borderRadius="8px" alignItems="center" padding="10px" textAlign="center">
                    <AppIcons.Email />
                    <AppTypography size="12px" color="#808080">Order a customized template</AppTypography>
                </VStack>
            </SimpleGrid>
        </VStack>
    )
}

export default TemplateStore