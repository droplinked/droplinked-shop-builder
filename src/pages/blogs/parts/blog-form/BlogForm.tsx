import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppCard from 'components/common/card/AppCard'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { Blog } from 'lib/apis/blog/interfaces'
import { checkBlogSlugAvailabilityService, createBlogService, updateBlogService } from 'lib/apis/blog/services'
import useAppStore from 'lib/stores/app/appStore'
import React, { useState } from 'react'
import BlogTags from './parts/blog-tags/BlogTags'
import TextEditor from './parts/text-editor/TextEditor'

function BlogForm({ blog }: { blog?: Blog }) {
    const { shop } = useAppStore()
    const [blogData, setBlogData] = useState<Blog>(blog || { title: "", content: "", isVisible: false, writer: "", tags: [], shopID: shop._id })
    const [blogImage, setBlogImage] = useState(blog?.image || "")
    const updateBlog = <K extends keyof typeof blogData>(key: K, value: typeof blogData[K]) => setBlogData({ ...blogData, [key]: value })
    const [isLoading, setLoading] = useState(false)
    const { shopNavigate } = useCustomNavigate()
    const { showToast } = useAppToast()
    const disabledButton = isLoading || !blogImage || Object.entries(blogData).filter(([key]) => ["title", "content", "writer"].includes(key)).some(([, value]) => !value)

    const handleFormSubmission = async () => {
        try {
            if (disabledButton) return
            setLoading(true)
            if (blog) {
                // this means we are in edit mode
                await updateBlogService({ ...blogData, image: blogImage })
                showToast({ type: "success", message: "Blog updated successfully." })
            }
            else {
                const { data } = await checkBlogSlugAvailabilityService({ shopId: shop._id, title: blogData.title })
                if (data.data.slugExist) {
                    showToast({ type: "error", message: "Blog title already exists. Please enter a different title for your blog." })
                    return
                }

                await createBlogService({ ...blogData, image: blogImage })
                showToast({ type: "success", message: "Blog created successfully." })
            }
            shopNavigate("blogs")
        }
        catch (e) {
            const { response: { data } } = e
            showToast({ type: "error", message: data?.data?.message })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Flex justifyContent={"center"}>
            <Flex width={"80%"} direction={"column"} gap={3}>
                <AppCard>
                    <Flex direction={"column"} gap={12}>
                        {/* title */}
                        <AppInput name='blog-title' label='Title' value={blogData.title} placeholder='Enter your captivating blog title here...' isRequired onChange={(e) => updateBlog("title", e.target.value)} />

                        {/* content */}
                        <TextEditor initialContent={blogData.content} updateBlog={(document: any) => updateBlog("content", document)} />

                        {/* checkbox */}
                        <Flex gap={3}>
                            <AppSwitch isChecked={blogData.isVisible} onChange={(e) => updateBlog("isVisible", e.target.checked)} />
                            <AppTypography fontSize='14px' fontWeight='700'>Mark to publish this blog immediately</AppTypography>
                        </Flex>

                        {/* image */}
                        <Flex direction={"column"} gap={3}>
                            <FieldLabel label='Featured image' isRequired />
                            <AppUploadImage onChange={(image: any) => setBlogImage(image)} values={blogImage} mode="single" size="original" />
                        </Flex>

                        {/* author */}
                        <AppInput name='blog-writer' label='Writer' value={blogData.writer} placeholder='Your name or pen name...' isRequired onChange={(e) => updateBlog("writer", e.target.value)} />

                        {/* tags */}
                        <BlogTags tags={blogData.tags} setTags={(tags: string[]) => updateBlog("tags", tags)} />
                    </Flex>
                </AppCard>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <BasicButton variant='outline' onClick={() => shopNavigate("blogs")}>Back</BasicButton>
                    <BasicButton isLoading={isLoading} isDisabled={disabledButton} onClick={handleFormSubmission}>{blog ? "Update" : "Create"}</BasicButton>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default BlogForm