import { Box, Flex, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { Blog } from 'lib/apis/blog/interfaces'
import React from 'react'
import { getInitialValues, validationSchema } from '../../utils/formHelpers'
import BlogFormActions from './FormFields/BlogFormActions'
import BodyEditor from './FormFields/BodyEditor'
import CategorySelect from './FormFields/CategorySelect'
import FeaturedPictureUpload from './FormFields/FeaturedPictureUpload'
import Keywords from './FormFields/Keywords'
import SearchEngineSummary from './FormFields/SearchEngineSummary'
import TitleInput from './FormFields/TitleInput'
import VisibilityStatusRadio from './FormFields/VisibilityStatusRadio'

interface Props {
    blog?: Blog
    onSubmit: (blog: Blog) => Promise<void>
}

export default function BlogForm({ blog, onSubmit }: Props) {
    const isLessThanLg = useBreakpointValue({ base: true, lg: false })

    return (
        <Formik
            initialValues={getInitialValues(blog)}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {() => (
                <Form>
                    {isLessThanLg ? <MobileLayout /> : <DesktopLayout />}
                </Form>
            )}
        </Formik>
    )
}

function MobileLayout() {
    const isTablet = useBreakpointValue({ base: false, md: true })

    const applyContainerStyles = isTablet ? containerStyles : {}

    return (
        <Flex
            direction="column"
            gap={4}
        >
            <Box {...applyContainerStyles}>
                <FeaturedPictureUpload />
            </Box>

            <Flex direction="column" gap={9} {...applyContainerStyles} >
                <TitleInput />
                <BodyEditor />
                <SearchEngineSummary />
                <CategorySelect />
                <Keywords />
            </Flex>

            <Box {...applyContainerStyles}>
                <VisibilityStatusRadio />
            </Box>

            <BlogFormActions />
        </Flex>
    )
}

function DesktopLayout() {
    return (
        <Grid
            templateColumns={{
                base: '1fr',
                lg: '1fr 356px',
                xl: '1fr 400px',
                '2xl': '1fr 440px',
                '3xl': '1fr 600px'
            }}
            gap={{ base: 4, "2xl": 6 }}
        >
            <GridItem display="flex" flexDirection="column" gap={9} {...containerStyles}>
                <TitleInput />
                <BodyEditor />
                <SearchEngineSummary />
                <CategorySelect />
                <Keywords />
            </GridItem>
            <GridItem display="flex" flexDirection="column" gap="inherit">
                <Box {...containerStyles}>
                    <FeaturedPictureUpload />
                </Box>
                <Box {...containerStyles}>
                    <VisibilityStatusRadio />
                </Box>
                <BlogFormActions />
            </GridItem>
        </Grid>
    )
}

const containerStyles = {
    border: '1px solid',
    borderColor: 'neutral.gray.800',
    borderRadius: 16,
    padding: { base: 4, lg: 6 }
}