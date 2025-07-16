import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/blogs/ar.json'
import enLocale from 'locales/blogs/en.json'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Blog } from 'services/blog/interfaces'
import { updateBlogService } from 'services/blog/services'
import useBlog from '../hooks/useBlog'
import BlogForm from './BlogForm/BlogForm'

function BlogEditPage() {
    const navigate = useNavigate()
    const { isFetching, data } = useBlog()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("blogs", { ar: arLocale, en: enLocale })

    const blog = data?.data

    async function handleSubmit(blog: Blog) {
        try {
            await updateBlogService(blog)
            showToast({ type: "success", message: t("BlogEditPage.notifications.updated") })
            navigate("/analytics/blogs")
        } catch (error) {
            showToast({ type: "error", message: t("common:genericError") })
        }
    }

    if (isFetching) return <FullScreenLoading />

    return <BlogForm blog={blog} onSubmit={handleSubmit} />
}

export default BlogEditPage