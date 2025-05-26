import useAppToast from 'hooks/toast/useToast'
import { Blog } from 'services/blog/interfaces'
import { createBlogService } from 'services/blog/services'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm/BlogForm'

function BlogCreatePage() {
    const navigate = useNavigate()
    const { showToast } = useAppToast()

    async function handleSubmit(blog: Blog) {
        try {
            await createBlogService(blog)
            showToast({ type: "success", message: "Blog created successfully" })
            navigate("/analytics/blogs")
        } catch (error) {
            showToast({ type: "error", message: "Failed to create blog" })
        }
    }

    return <BlogForm onSubmit={handleSubmit} />
}

export default BlogCreatePage