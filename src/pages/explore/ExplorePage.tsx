import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CloseMd } from 'assets/icons/Sign/Close/CloseMd';
import { SearchMd } from 'assets/icons/System/Search/SearchMd';
import { Star2Md } from 'assets/icons/System/Star2/Star2Md';
import { useMutation } from 'react-query';
import { ISemanticSearchParams } from 'services/product/interfaces';
import { semanticSearchService } from 'services/product/productServices';
import ExplorePageProduct from './ExplorePageProduct';

export interface Product {
  _id: string;
  title: string;
  description: string;
  product_type: string;
  media: string;
  price: number;
  shopName: string;
}

const suggestions = [
  'All digital products from linkeddrop shop',
  'green hoodie under 30 dollars from unstoppable shop',
  'red cap',
  'artwork mug',
  'summer shirts',
  'Wireless charging pad'
] as const;

const ProductSearch = () => {
  const [recentSuggestion, setRecentSuggestion] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, mutateAsync, isError } = useMutation(
    (params: ISemanticSearchParams) => semanticSearchService(params)
  );
  const productData = data?.data?.data;

  const formik = useFormik({
    initialValues: {
      searchQuery: ''
    },
    onSubmit: async (values) => {
      if (values.searchQuery.trim()) {
        setHasSearched(true);
        await mutateAsync({
          query: values.searchQuery.trim(),
          limit: 10
        });
      }
    }
  });

  const handleSuggestionClick = (suggestion: string, index: number) => {
    formik.setFieldValue('searchQuery', suggestion);
    setRecentSuggestion(index);
    setTimeout(() => setRecentSuggestion(null), 500);
  };

  const handleReset = () => {
    formik.resetForm();
    setHasSearched(false);
  };

  const showSuggestions = !hasSearched || (!isLoading && !productData?.length);
  const showResults = hasSearched;

  return (

        <Box minH="100vh" bg="#141414" mt={2}>
          {/* Hero Section */}
          <Box w="full" px={8} position="relative">
            <motion.div
              style={{ maxWidth: '48rem', margin: '0 auto' }}
              initial={false}
              animate={{
                y: hasSearched ? 0 : '30vh'
              }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100
              }}
            >
              {/* Header */}
              <motion.div
                style={{ textAlign: 'center', marginBottom: '3rem' }}
                animate={{
                  scale: hasSearched ? 0.8 : 1,
                  opacity: hasSearched ? 0.8 : 1
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut'
                }}
              >
                <Heading
                  as="h1"
                  size="2xl"
                  color="white"
                  mb={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="2"
                >
                  Find Your Perfect Product
                  <Star2Md color="#2EC99E" />
                </Heading>
                <Text color="white" fontSize="lg">
                  Describe what you're looking for and we'll help you find it
                </Text>
              </motion.div>

              {/* Search Form */}
              <VStack spacing={8}>
                <Box as="form" onSubmit={formik.handleSubmit} w="full">
                  <Box position="relative">
                    <Input
                      type="text"
                      id="searchQuery"
                      name="searchQuery"
                      value={formik.values.searchQuery}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isDisabled={isLoading}
                      placeholder="Describe the product that you need"
                      size="lg"
                      px={6}
                      py={4}
                      fontSize="lg"
                      border="2px solid"
                      borderColor="#2EC99E"
                      borderRadius="xl"
                      bg="#1a1a1a"
                      color="white"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{
                        outline: 'none',
                        ring: 2,
                        ringColor: '#2EC99E',
                        ringOpacity: 0.5 as any
                      }}
                      pr={12}
                      transition="all 0.3s"
                      shadow="sm"
                      _hover={{ shadow: 'md' }}
                      opacity={isLoading ? 0.7 : 1}
                      cursor={isLoading ? 'not-allowed' : 'auto'}
                    />
                    <HStack
                      position="absolute"
                      right={3}
                      top="50%"
                      transform="translateY(-50%)"
                      spacing="2"
                    >
                      {formik.values.searchQuery && !isLoading && (
                        <IconButton
                          type="button"
                          onClick={handleReset}
                          icon={<CloseMd color="gray.400" />}
                          aria-label="Clear search"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: '#2a2a2a' }}
                          borderRadius="full"
                          transition="colors 0.2s"
                        />
                      )}
                      <IconButton
                        type="submit"
                        isDisabled={isLoading}
                        icon={<SearchMd color="#2EC99E" />}
                        aria-label="Search"
                        size="sm"
                        variant="ghost"
                        cursor={isLoading ? 'not-allowed' : 'pointer'}
                        opacity={isLoading ? 0.7 : 1}
                      />
                    </HStack>
                  </Box>
                </Box>

                {/* Suggestions */}
                <AnimatePresence mode="wait">
                  {showSuggestions && (
                    <motion.div
                      style={{ width: '100%' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeInOut'
                      }}
                    >
                      <VStack spacing="4" align="stretch">
                        <HStack spacing="2" px={1}>
                          <Star2Md color="#2EC99E" />
                          <Text color="gray.300" fontSize="sm" fontWeight="medium">
                            Suggestions
                          </Text>
                        </HStack>

                        <Flex flexWrap="wrap" gap="3">
                          {suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              type="button"
                              isDisabled={isLoading}
                              onClick={() => handleSuggestionClick(suggestion, index)}
                              px={4}
                              py={2}
                              borderRadius="xl"
                              fontSize="sm"
                              transition="all 0.3s"
                              bg={recentSuggestion === index ? '#2EC99E' : '#1a1a1a'}
                              color={recentSuggestion === index ? 'white' : 'white'}
                              _hover={{
                                bg: recentSuggestion === index ? '#2EC99E' : '#2EC99E20',
                                color: recentSuggestion === index ? 'white' : '#2EC99E',
                                shadow: 'md'
                              }}
                              sx={{
                                transform: recentSuggestion === index ? 'scale(0.95)' : 'scale(1)',
                                '&:hover': {
                                  transform: recentSuggestion === index ? 'scale(0.95)' : 'scale(1.05)'
                                }
                              }}
                              border="1px solid"
                              borderColor="#2a2a2a"
                              shadow="sm"
                              display="flex"
                              alignItems="center"
                              gap="2"
                              opacity={isLoading ? 0.7 : 1}
                              cursor={isLoading ? 'not-allowed' : 'pointer'}
                            >
                              <SearchMd
                                color={
                                  recentSuggestion === index
                                    ? 'white'
                                    : '#2EC99E'
                                }
                              />
                              {suggestion}
                            </Button>
                          ))}
                        </Flex>
                      </VStack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </VStack>
            </motion.div>
          </Box>

          {/* Results Section */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', padding: '3rem 2rem' }}
              >
                <Container maxW="7xl" mx="auto">
                  <Box
                    w="full"
                    bgGradient="linear(to-b, #1a1a1a, #141414)"
                    borderRadius="2xl"
                    p={6}
                    shadow="lg"
                  >
                    <Flex alignItems="center" justifyContent="space-between" mb={6}>
                      <Heading as="h2" size="lg" color="white">
                        Search Results for "{formik.values.searchQuery}"
                      </Heading>
                      {/* {!isLoading && productData?.length > 0 && <Text color="gray.400" fontSize="sm">{productData.length} products found</Text>} */}
                    </Flex>

                    {isLoading ? (
                     <DotLottieReact src="/search.lottie" style={{width: "auto", height: "auto"}} autoplay loop />
                    ) : isError ? (
                      <Center py={12}>
                        <VStack spacing={4}>
                          <Text color="red.500">
                            Failed to load products
                          </Text>
                          <Button
                            onClick={() => formik.handleSubmit()}
                            bg="#2EC99E10"
                            color="#2EC99E"
                            px={6}
                            py={2}
                            borderRadius="lg"
                            _hover={{
                              bg: '#2EC99E',
                              color: 'white'
                            }}
                            transition="all 0.3s"
                          >
                            Try Again
                          </Button>
                        </VStack>
                      </Center>
                    ) : productData?.length === 0 ? (
                      <Center py={12}>
                        <Text color="gray.400">
                          No products found for your search
                        </Text>
                      </Center>
                    ) : (
                      <Grid
                        templateColumns={{
                          base: '1fr',
                          md: 'repeat(2, 1fr)',
                          lg: 'repeat(3, 1fr)'
                        }}
                        gap="6"
                      >
                        <AnimatePresence>
                          {productData?.map((product: Product) => (
                            <ExplorePageProduct
                              key={product._id}
                              product={product}
                            />
                          ))}
                        </AnimatePresence>
                      </Grid>
                    )}
                  </Box>
                </Container>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
  );
};

export default ProductSearch;