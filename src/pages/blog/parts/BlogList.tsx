import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import BlogCard from './BlogCard'

function BlogList({ blogs }: { blogs: Blog[] }) {
    return (
        <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            gap={4}
        >
            {blogs.map(blog => <BlogCard blog={blog} />)}
        </SimpleGrid>
    )
}

export default BlogList