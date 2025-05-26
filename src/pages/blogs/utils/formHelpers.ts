import { Blog } from 'services/blog/interfaces'
import * as Yup from 'yup'

const DEFAULT_BLOG_VALUES: Blog = {
    image: null,
    title: '',
    content: null,
    searchEngineSummary: '',
    category: '',
    tags: [],
    isVisible: false,
    isFeatured: false
}

export const getInitialValues = (blog?: Blog): Blog => blog ?? DEFAULT_BLOG_VALUES

export const validationSchema = Yup.object({
    image: Yup.string().required('Featured picture is required'),
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Body is required'),
    searchEngineSummary: Yup.string().default(''),
    category: Yup.string().required('Category is required'),
    tags: Yup.array().of(Yup.string()),
    isVisible: Yup.boolean(),
    isFeatured: Yup.boolean()
}) 