import { Blog } from 'lib/apis/blog/interfaces'
import * as Yup from 'yup'

export const getInitialValues = (blog?: Blog): Blog => ({
    _id: blog?._id || '',
    title: blog?.title || '',
    content: blog?.content || '',
    category: blog?.category || [],
    image: blog?.image || null,
    isVisible: blog?.isVisible || false,
    isFeatured: blog?.isFeatured || false,
    writer: blog?.writer || '',
    tags: blog?.tags || []
})

export const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
    searchEngineSummary: Yup.string(),
    category: Yup.string(),
    keywords: Yup.string(),
    featuredPicture: Yup.mixed()
}) 