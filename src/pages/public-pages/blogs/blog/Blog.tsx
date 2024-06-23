import { Flex } from "@chakra-ui/react";
import { getPublicBlogByIdService } from "lib/apis/blog/services";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlogLoading from "./blog.loading";
import BlogDetails from "./blog.details";

const PublicBlog = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();
    const { isFetching, data } = useQuery({
        queryFn: () => getPublicBlogByIdService({ slug: slug! }),
        refetchOnWindowFocus: false,
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
        <Flex direction={"column"} p={"64px"} mt={"40px"} gap={12} maxWidth={"1400px"}>
            {isFetching ? <BlogLoading /> : <BlogDetails blog={blog!} />}
        </Flex>
    );
};

export default PublicBlog;
