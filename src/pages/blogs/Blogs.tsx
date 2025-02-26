import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate'
import { getShopBlogsService } from 'lib/apis/blog/services'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { useQuery } from 'react-query'
import BlogList from './parts/blog-list/BlogList'
import EmptyBox from './parts/empty-box/EmptyBox'
import Loading from './parts/loading/Loading'

function Blogs() {
    const { shop } = useAppStore()
    const { shopNavigate } = useCustomNavigate()
    const { isFetching, data } = useQuery({
        queryKey: "shop-blogs",
        queryFn: () => getShopBlogsService(shop._id),
    })
    const blogs = data?.data

    return (
        <AppCard>
            <Flex direction={"column"} gap={9}>
                <Flex justifyContent={"space-between"}>
                    <AppTypography fontSize={28} fontWeight={700}>Blogs</AppTypography>
                    <BasicButton sizes='medium' onClick={() => shopNavigate("blogs/create")}>Create</BasicButton>
                </Flex>
                {isFetching ? <Loading /> : !blogs.length ? <EmptyBox /> : <BlogList blogs={blogs} />}
            </Flex>
        </AppCard>
    )
}

export default Blogs