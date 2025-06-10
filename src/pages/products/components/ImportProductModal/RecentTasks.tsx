import { Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import { ChevronrightLg } from "assets/icons/Navigation/ChevronRight/ChevronrightLg";
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList";
import InteractiveText from "components/redesign/interactive-text/InteractiveText";
import RuledGrid from "components/redesign/ruled-grid/RuledGrid";
import { RecentCrawlerTasksResponse } from "lib/apis/crawler/interface";
import { getStatusColor } from "pages/products/utils/statusColorHelper";
import React from "react";

interface Props {
    recentTasks: RecentCrawlerTasksResponse[];
    isLoading: boolean;
    getProducts: (poolId: string) => void;
    getProductsLoading: boolean;
}

export default function RecentTasks({ recentTasks, isLoading, getProducts, getProductsLoading }: Props) {
    const [selectedProduct, setSelectedProduct] = React.useState("");

    const handleProductClick = (url: string) => {
        setSelectedProduct(url);
        getProducts(url);
    };

    if (isLoading) return <Spinner color="#fff" mx="auto" mt={2} />;
    if (!recentTasks || recentTasks.length === 0) return null;

    return (
        <RuledGrid columns={1} borderRadius="8px">
            {recentTasks.map((task) => {
                const isDone = task.status === "previews_ready" || task.status === "error" || task.status === "completed" || task.status === "recorded";

                return (
                    <Flex key={task._id} padding={4} alignItems="center" justifyContent="space-between">
                        <Flex flexDirection="column" gap={2}>
                            <DotSeparatedList>
                                <Text color="#fff" fontSize={16} fontWeight={500}>
                                    {task._id}
                                </Text>
                                <Text
                                    color={getStatusColor(task.status)}
                                    fontSize={16}
                                    fontWeight={500}
                                    textTransform="capitalize"
                                >
                                    {task.status}
                                </Text>
                            </DotSeparatedList>
                            <InteractiveText to={task.websiteUrl} target="_blank" textDecoration="underline" fontSize={16}>
                                {task.websiteUrl}
                            </InteractiveText>
                        </Flex>
                        <IconButton
                            variant="ghost"
                            _hover={{ background: "transparent" }}
                            disabled={task.status !== "previews_ready"}
                            aria-label="View Preview"
                            isLoading={selectedProduct === task._id && getProductsLoading}
                            onClick={() => handleProductClick(task._id)}
                            color="#fff"
                        >
                            {isDone ? <ChevronrightLg color="#fff" /> : <Spinner />}
                        </IconButton>
                    </Flex>
                );
            })}
        </RuledGrid>
    );
}
