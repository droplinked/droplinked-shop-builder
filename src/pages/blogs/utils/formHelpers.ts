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

export const createValidationSchema = (t: (key: string) => string) => Yup.object({
    image: Yup.string().required(t('FeaturedPictureUpload.validation.required')),
    title: Yup.string().required(t('TitleInput.validation.required')),
    content: Yup.string().required(t('BodyEditor.validation.required')),
    searchEngineSummary: Yup.string().default(''),
    category: Yup.string().required(t('CategorySelect.validation.required')),
    tags: Yup.array().of(Yup.string()),
    isVisible: Yup.boolean(),
    isFeatured: Yup.boolean()
})