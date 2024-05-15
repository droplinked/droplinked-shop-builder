import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { getShopBlogs } from 'lib/apis/blog/services'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { useQuery } from 'react-query'
import BlogList from './parts/BlogList'
import EmptyBox from './parts/EmptyBox'
import Loading from './parts/Loading'

function Blog() {
    const { shop } = useAppStore()
    const { shopNavigate } = useCustomNavigate()
    const { isFetching, data } = useQuery({
        queryKey: "shop-blogs",
        queryFn: () => getShopBlogs(shop._id),
        refetchOnWindowFocus: false
    })
    const blogs = data?.data

    return (
        <AppCard>
            <Flex direction={"column"} gap={9}>
                <Flex justifyContent={"space-between"}>
                    <AppTypography fontSize={28} fontWeight={700}>Blogs</AppTypography>
                    <BasicButton sizes='medium' onClick={() => shopNavigate("blog/create")}>Create</BasicButton>
                </Flex>
                {isFetching ? <Loading /> : !blogs.length ? <EmptyBox /> : <BlogList blogs={blogs} />}
            </Flex>
        </AppCard>
    )
}

export default Blog