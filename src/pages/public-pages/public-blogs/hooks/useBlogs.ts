import { useQuery } from 'react-query'
import { getPublicBlogsService } from 'services/blog/services'
import { IBlogListItem, ICategory } from '../types/blog.types'

function useBlogs() {
    const { data, isLoading } = useQuery({
        queryFn: getPublicBlogsService,
        queryKey: ['public-blogs'],
    })

    const blogs: IBlogListItem[] = !isLoading && data?.data?.data?.data 
        ? data.data.data.data 
        : []

    // Extract categories from blogs data
    const extractCategories = (blogs: IBlogListItem[]): ICategory[] => {
        const categoryMap = new Map<string, { name: string; count: number }>()
        
        blogs?.forEach(blog => {
            if (blog.category) {
                const existing = categoryMap.get(blog.category)
                if (existing) {
                    existing.count++
                } else {
                    categoryMap.set(blog.category, { name: blog.category, count: 1 })
                }
            }
        })

        return Array.from(categoryMap.entries()).map(([ id, { name, count }]) => ({
            id,
            name,
            blogCount: count
        }))
    }

    const categories = extractCategories(blogs)

    // Get blogs by category
    const getBlogsByCategory = (categoryId: string): IBlogListItem[] => {
        return blogs.filter(blog => blog.category === categoryId)
    }

    // Get featured blogs
    const getFeaturedBlogs = (): IBlogListItem[] => {
        return blogs.filter(blog => blog.isFeatured)
    }

    // Get latest blogs
    const getLatestBlogs = (limit: number = 5): IBlogListItem[] => {
        return blogs
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit)
    }

    return { 
        blogs, 
        categories,
        isLoading,
        getBlogsByCategory,
        getFeaturedBlogs,
        getLatestBlogs
    }
}

export default useBlogs 