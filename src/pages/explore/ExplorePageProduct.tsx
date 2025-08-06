import { motion } from "framer-motion";
import React from "react";
import {
  Box,
  Image,
  Badge,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Flex
} from '@chakra-ui/react';
import { ShopMd } from 'assets/icons/System/Shop/ShopMd';
import { TagMd } from 'assets/icons/Finance/Tag/TagMd';


const ExplorePageProduct = ({ product }: { product: any }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s',
                border: '1px solid #2a2a2a'
            }}
            whileHover={{
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Box position="relative">
                <Box
                    aspectRatio="1"
                    overflow="hidden"
                >
                    <Image
                        src={product.media}
                        alt={product.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                        transition="transform 0.5s"
                        _groupHover={{ transform: 'scale(1.05)' }}
                    />
                </Box>
                <Box position="absolute" top={3} right={3}>
                    <Badge
                        bg="#2EC99E"
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="medium"
                    >
                        ${product.price}
                    </Badge>
                </Box>
            </Box>

            <VStack p={4} spacing={3} align="stretch">
                <Flex alignItems="flex-start" justifyContent="space-between" gap={2}>
                    <Heading
                        as="h3"
                        size="md"
                        color="white"
                        fontWeight="semibold"
                        noOfLines={1}
                        _groupHover={{ color: '#2EC99E' }}
                        transition="colors 0.3s"
                        flex={1}
                    >
                        {product.title}
                    </Heading>
                    <HStack spacing={1} color="#2EC99E" fontSize="sm" whiteSpace="nowrap">
                        <ShopMd />
                        <Text>{product.shopName}</Text>
                    </HStack>
                </Flex>

                <Box
                    color="gray.400"
                    fontSize="sm"
                    noOfLines={2}
                    dangerouslySetInnerHTML={{
                        __html: product.description.replace(/<\/?p>/g, "").split("•")[0],
                    }}
                />

                <Flex pt={2} alignItems="center" justifyContent="space-between">
                    <HStack spacing={2} alignItems="center">
                        <TagMd color="#2EC99E" />
                        <Text color="gray.300" fontSize="sm">
                            {product.product_type}
                        </Text>
                    </HStack>
                    <Button
                        bg="#2EC99E10"
                        color="#2EC99E"
                        px={4}
                        py={2}
                        borderRadius="lg"
                        fontSize="sm"
                        fontWeight="medium"
                        _hover={{
                            bg: '#2EC99E',
                            color: 'white'
                        }}
                        transition="all 0.3s"
                    >
                        View Details
                    </Button>
                </Flex>
            </VStack>
        </motion.div>
    );
};

export default ExplorePageProduct