import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading'
import { Blog } from 'lib/apis/blog/interfaces'
import React, { useState } from 'react'
import useBlog from '../hooks/useBlog'
import BlogForm from './BlogForm/BlogForm'

function BlogEditPage() {
    const { isFetching, data } = useBlog()
    const [isLoading, setLoading] = useState(false)

    const blog = data?.data

    async function handleSubmit(blog: Blog) {
        try {

        } catch (error) {

        }
    }

    if (isFetching) return <FullScreenLoading />

    return <BlogForm blog={blog} onSubmit={handleSubmit} />
}

export default BlogEditPage