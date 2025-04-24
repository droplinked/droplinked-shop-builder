import { Blog } from 'lib/apis/blog/interfaces'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm/BlogForm'

function BlogCreatePage() {
    const navigate = useNavigate()

    async function handleSubmit(blog: Blog) {
        try {

        } catch (error) {

        }
    }

    return <BlogForm onSubmit={handleSubmit} />
}

export default BlogCreatePage