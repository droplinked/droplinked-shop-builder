import { Flex, FormControl, Image, VStack } from '@chakra-ui/react'
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
                justifyContent="space-between"
                alignItems="center"
            >
                {TemplatedStore.map((currentObj, key) => {
                    return (
                        <ActiveBox
                            active={key === 0}
                            props={{
                                w: "125px",
                                borderRadius: "8px",
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
            </Flex>
        </VStack>
    )
}

export default TemplateStore