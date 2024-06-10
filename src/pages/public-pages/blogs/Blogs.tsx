import React, { useRef } from "react";
import { useQuery } from "react-query";
import { Box, HStack, Image, VStack } from "@chakra-ui/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Blog from "./blogs.blog";
import { IBlog } from "./blogs.interface";
import { getSuperAdminBlogs } from "lib/apis/blog/services";
import LatestBlog from "./blogs.latest";
import { sort_by_date } from "lib/utils/heper/helpers";

const useBlogsData = () => {
    return useQuery({
        queryFn: getSuperAdminBlogs,
        queryKey: "super_admin_blogs_post",
        refetchOnWindowFocus: false,
    });
};

const useScrollAnimation = (ref, length: number) => {
    const end = length % 3 !== 0 ? 150 : 150;
    const { scrollYProgress } = useScroll({ target: ref });
    const smoothProgress = useSpring(scrollYProgress, { mass: 0.1 });
    const y = useTransform(smoothProgress, [0, 1], [-150, end]);
    const x = useTransform(smoothProgress, [0, 1], [0, 350]);
    return { y, x };
};

const PublicBlogs = () => {
    const { data, isLoading } = useBlogsData();
    const ref = useRef(null);
    const blogs: IBlog[] = data?.data?.data || [];
    const { y, x } = useScrollAnimation(ref, blogs?.length);
    const columns = [blogs.slice(0, Math.ceil(blogs.length / 3)), blogs.slice(Math.ceil(blogs.length / 3), Math.ceil((2 * blogs.length) / 3)), blogs?.slice(Math.ceil((2 * blogs.length) / 3))];
    if (isLoading) return <div>Loading...</div>;
    return (
        <VStack justifyContent={"center"} alignItems={"center"} maxWidth="1400px" spacing={"32px"} padding={"108px 64px 64px 64px"}>
            <LatestBlog blog={sort_by_date(blogs, "createdAt")?.[0] || blogs?.[0]} />
            <HStack spacing={"24px"} paddingY={"200px"} align={"stretch"} width={"full"} justifyContent={"space-between"} ref={ref}>
                <VStack width={"full"} spacing={"24px"}>
                    {columns?.[0]?.map((blog, index) => {
                        // if (index === columns?.[0]?.length - 1)
                        //     return (
                        //         <motion.div style={{ position: "relative", width: "100%", x}}>
                        //             <Image
                        //                 position={"absolute"}
                        //                 width={"50px"}
                        //                 objectFit={"cover"}
                        //                 height={"auto"}
                        //                 left={"-34px"}
                        //                 bottom={"50%"}
                        //                 src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/abb5f3e86d3c2b2b6d217cb073d22e0eb9cd8c06965d0518d9f3fdd4f3fab0c7.png_or.png"
                        //             />
                        //             <Blog key={blog._id} blog={blog} />
                        //         </motion.div>
                        //     );
                        return <Blog key={blog._id} blog={blog} />;
                    })}
                </VStack>
                <motion.div style={{ y: blogs?.length > 6 && y, width: "100%", display: "flex", flexDirection:"column", gap:"24px" }}>
                    {columns?.[1]?.map((blog) => (
                        <Blog key={blog._id} blog={blog} />
                    ))}
                </motion.div>
                <VStack width={"full"} spacing={"24px"}>
                    {columns?.[2]?.map((blog) => (
                        <Blog key={blog._id} blog={blog} />
                    ))}
                </VStack>
            </HStack>
        </VStack>
    );
};

export default PublicBlogs;
