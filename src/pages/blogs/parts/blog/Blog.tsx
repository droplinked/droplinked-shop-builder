import { AxiosError } from 'axios'
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { getBlogByIdService } from 'lib/apis/blog/services'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import BlogForm from '../blog-form/BlogForm'

function SingleBlog() {
    const { shop } = useAppStore()
    const { slug } = useParams()
    const { showToast } = useAppToast()
    const { shopNavigate } = useCustomNavigate()
    const { isFetching, data } = useQuery({
        queryKey: "blog",
        queryFn: () => getBlogByIdService(shop._id, slug),
        refetchOnWindowFocus: false,
        onError: (e) => {
            const errorStatus = (e as AxiosError).response.status
            const is404Error = errorStatus === 404
            showToast({ type: "error", message: is404Error ? "Blog not found." : "Oops! Something went wrong." })
            is404Error && shopNavigate("blogs")
        }
    })
    const blog = data?.data

    return (
        <>
            {isFetching ?
                <FullScreenLoading /> :
                <BlogForm blog={{ ...blog, content: JSON.parse(blog.content) }} />}
        </>
    )
}

export default SingleBlog