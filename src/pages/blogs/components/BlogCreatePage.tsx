import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/blogs/ar.json'
import enLocale from 'locales/blogs/en.json'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Blog } from 'services/blog/interfaces'
import { createBlogService } from 'services/blog/services'
import BlogForm from './BlogForm/BlogForm'

function BlogCreatePage() {
    const navigate = useNavigate()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("blogs", { ar: arLocale, en: enLocale })

    async function handleSubmit(blog: Blog) {
        try {
            await createBlogService(blog)
            showToast({ type: "success", message: t("BlogCreatePage.notifications.created") })
            navigate("/analytics/blogs")
        } catch (error) {
            showToast({ type: "error", message: t("common:genericError") })
        }
    }

    return <BlogForm onSubmit={handleSubmit} />
}

export default BlogCreatePage