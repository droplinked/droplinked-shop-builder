import { SimpleGrid } from '@chakra-ui/react'
import { Blog } from 'lib/apis/blog/interfaces'
import React from 'react'
import BlogCard from '../blog-card/BlogCard'

function BlogList({ blogs }: { blogs: Blog[] }) {
    return (
        <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            gap={4}
        >
            {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
        </SimpleGrid>
    )
}

export default BlogList