import { AxiosError } from 'axios'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { getBlogByIdService } from 'lib/apis/blog/services'
import useAppStore from 'lib/stores/app/appStore'
import ProductLoading from 'pages/product/single/parts/loading/ProductLoading'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import BlogForm from '../blog-form/BlogForm'

function Blog() {
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
            {isFetching ? <ProductLoading /> : <BlogForm blog={blog} />}
        </>
    )
}

export default Blog