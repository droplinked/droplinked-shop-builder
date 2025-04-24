import { Grid, GridItem } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { Blog } from 'lib/apis/blog/interfaces'
import React from 'react'
import * as Yup from 'yup'
import BlogFormActions from './FormFields/BlogFormActions'
import BodyEditor from './FormFields/BodyEditor/BodyEditor'
import CategorySelect from './FormFields/CategorySelect'
import FeaturedPictureUpload from './FormFields/FeaturedPictureUpload'
import Keywords from './FormFields/Keywords'
import SearchEngineSummary from './FormFields/SearchEngineSummary'
import TitleInput from './FormFields/TitleInput'

interface Props {
    blog?: Blog
    onSubmit: (blog: Blog) => Promise<void>
}

function BlogForm({ blog, onSubmit }: Props) {
    const initialValues: Blog = {
        _id: blog?._id || '',
        title: blog?.title || '',
        content: blog?.content || '',
        category: blog?.category || [],
        image: blog?.image || null,
        isVisible: blog?.isVisible || false,
        isFeatured: blog?.isFeatured || false,
        writer: blog?.writer || '',
        tags: blog?.tags || []
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        body: Yup.string().required('Body is required'),
        searchEngineSummary: Yup.string(),
        category: Yup.string(),
        keywords: Yup.string(),
        featuredPicture: Yup.mixed()
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {() => (
                <Form>
                    <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
                        <GridItem display="flex" flexDirection="column" gap={9}>
                            <TitleInput />
                            <BodyEditor />
                            <SearchEngineSummary />
                            <CategorySelect />
                            <Keywords />
                        </GridItem>
                        <GridItem display="flex" flexDirection="column" gap={9}>
                            <FeaturedPictureUpload />
                            <BlogFormActions />
                        </GridItem>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default BlogForm