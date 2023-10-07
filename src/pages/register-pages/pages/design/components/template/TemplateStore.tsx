import { Flex, FormControl, Image, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppTypography from 'components/common/typography/AppTypography';
import { TemplatedStore } from 'lib/utils/statics/templated';
import React from 'react'
import ActiveBox from '../../parts/active/ActiveBox';

function TemplateStore() {
    return (
        <VStack align={"stretch"}>
            <FormControl isRequired w="100%" marginBottom={3}>
                <FieldLabel textProps={{ size: "18px", weight: "bolder" }} label="Store Template" isRequired />
                <AppTypography size="14px" color="#C2C2C2" marginTop={1}>Pick your store template.</AppTypography>
            </FormControl>
            <Flex
                w="100%"
                maxW="100%"
                overflow="hidden"
                gap="24px"
                alignItems="stretch"
            >
                {TemplatedStore.map((currentObj, key) => {
                    return (
                        <ActiveBox
                            active={key === 0}
                            props={{
                                w: "125px",
                                borderRadius: "8px",
                                backgroundColor: "#141414",
                                cursor: "pointer"
                            }}
                        >
                            <Image
                                key={currentObj.img}
                                src={currentObj.img}
                            // onClick={() => {
                            //   selectTheme(currentObj);
                            // }}
                            />
                        </ActiveBox>
                    );
                })}
                <VStack width="125px" backgroundColor="#141414" onClick={() => window.open('mailto:support@droplinked.com')} cursor="pointer" borderRadius="8px" alignItems="center" padding="10px" textAlign="center">
                    <AppIcons.Email />
                    <AppTypography size="12px" color="#808080">Order a customized template</AppTypography>
                </VStack>
            </Flex>
        </VStack>
    )
}

export default TemplateStore