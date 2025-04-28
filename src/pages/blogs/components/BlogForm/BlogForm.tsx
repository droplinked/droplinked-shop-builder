import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { Blog } from 'lib/apis/blog/interfaces'
import React from 'react'
import { getInitialValues, validationSchema } from '../../utils/formHelpers'
import BlogFormActions from './FormFields/BlogFormActions'
import BodyEditor from './FormFields/BodyEditor/BodyEditor'
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

function BlogForm({ blog, onSubmit }: Props) {
    return (
        <Formik
            initialValues={getInitialValues(blog)}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {() => (
                <Form>
                    <Grid
                        templateColumns={{
                            base: '1fr',
                            md: '2fr 1fr',
                            lg: '1fr 356px',
                            xl: '1fr 400px',
                            '2xl': '1fr 440px',
                            '3xl': '1fr 600px'
                        }}
                        gap={{ base: 4, "2xl": 6 }}
                        sx={{
                            '.blog-form-column-layout': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 9
                            },
                            '.blog-form-column': {
                                border: '1px solid',
                                borderColor: 'neutral.gray.800',
                                borderRadius: 16,
                                padding: 6
                            }
                        }}
                    >
                        <GridItem className='blog-form-column-layout blog-form-column'>
                            <TitleInput />
                            <BodyEditor />
                            <SearchEngineSummary />
                            <CategorySelect />
                            <Keywords />
                        </GridItem>
                        <GridItem className='blog-form-column-layout'>
                            <Box className='blog-form-column'>
                                <FeaturedPictureUpload />
                            </Box>
                            <Box className='blog-form-column'>
                                <VisibilityStatusRadio />
                            </Box>
                            <BlogFormActions />
                        </GridItem>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default BlogForm