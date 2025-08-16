import { Box, Flex } from "@chakra-ui/react";
import { getPublicBlogByIdService } from "services/blog/services";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlogDetails from "./blog.details";
import BlogLoading from "./blog.loading";

const PublicBlog = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();
    const { isFetching, data } = useQuery({
        queryFn: () => getPublicBlogByIdService(slug),
        onError: (error: any) => {
            const errorData = error?.response?.data;
            if (errorData?.statusCode === 404) navigate("/blogs");
        },
    });
    const blog = data?.data;
    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]);

    return (
        <Flex justifyContent={"center"}>
            <Box width={"100%"} maxWidth={"1280px"}>
                {isFetching ? <BlogLoading /> : <BlogDetails blog={blog!} />}
            </Box>
        </Flex>
    );
};

export default PublicBlog;
