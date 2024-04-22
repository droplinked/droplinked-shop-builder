import { Button, Flex, Grid } from '@chakra-ui/react';
import React from 'react';

interface Props {
    tabs: string[];
    activeTab: string;
    setter: React.Dispatch<React.SetStateAction<string>>;
}

function TabsContainer({ tabs, activeTab, setter }: Props) {
    return (
        <Grid
            width={"100%"}
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, auto)" }}
            templateRows={{ base: "repeat(2, 1fr)", md: "repeat(1, 1fr)" }}
            gap={2}
            borderRadius={12}
            padding={2}
            background={"#1C1C1C"}
        >
            {tabs.map((tab, index) =>
                <Button
                    key={index}
                    _hover={{}}
                    _active={{}}
                    border={`1px solid ${tab === activeTab ? "rgb(255, 255, 255 , 0.3)" : "transparent"}`}
                    boxShadow={tab === activeTab ? "0px 4.282px 52.456px 0px rgba(0, 7, 72, 0.12)" : "unset"}
                    background={tab === activeTab ? "linear-gradient(155deg, rgba(255, 255, 255, 0.00) -2.13%, rgba(255, 255, 255, 0.15) 136.58%)" : "transparent"}
                    color={"#fff"}
                    fontSize={{ base: 12, lg: 16 }}
                    onClick={() => setter(tab)}
                >
                    {tab}
                </Button>
            )}
        </Grid>
    )
}

export default TabsContainer