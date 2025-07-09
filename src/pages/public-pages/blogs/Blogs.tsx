import { HStack, VStack, useMediaQuery } from "@chakra-ui/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { useQuery } from "react-query";
import { getPublicBlogsService } from "services/blog/services";
import { sortByDate } from "utils/helpers";
import Blog from "./blogs.blog";
import { IBlogListItem } from "./blogs.interface";
import LatestBlog from "./blogs.latest";
import LoadingBlogs from "./blogs.loading";

const useScrollAnimation = (ref, length: number) => {
  const end = length % 2 !== 0 ? 150 : 150;
  const { scrollYProgress } = useScroll({ target: ref });
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1 });
  const y = useTransform(smoothProgress, [0, 1], [-150, end]);
  return { y };
};

const PublicBlogs = () => {
  const { data, isLoading } = useQuery({
    queryFn: getPublicBlogsService,
    queryKey: ["public-blogs"],
  });

  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const ref = useRef(null);
  const { y } = useScrollAnimation(ref, 0);


  if (isLoading) return <LoadingBlogs />;
  
  const blogs: IBlogListItem[] = !isLoading && data?.data?.data?.data ? data.data.data.data : [];
  let columns;
  if (isLargerThan1024) {
    columns = [
      blogs.slice(0, Math.ceil(blogs.length / 3)),
      blogs.slice(Math.ceil(blogs.length / 3), Math.ceil((2 * blogs.length) / 3)),
      blogs?.slice(Math.ceil((2 * blogs.length) / 3)),
    ];
  } else if (isLargerThanMd) {
    columns = [
      blogs.slice(0, Math.ceil(blogs.length / 2)),
      blogs?.slice(Math.ceil(blogs.length / 2)),
    ];
  } else {
    columns = [blogs];
  }

  return (
    <VStack
      ref={ref}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={"32px"}
      padding={"108px 64px 64px 64px"}
    >
      <LatestBlog blog={sortByDate(blogs, "createdAt")?.[0] || blogs?.[0]} />
      <HStack
        spacing={"24px"}
        paddingY={isLargerThanMd ? "200px" : "32px"}
        align={"stretch"}
        width={"full"}
        justifyContent={"space-between"}
        flexDirection={isLargerThanMd ? "row" : "column"}
      >
        <VStack width={"full"} spacing={"24px"}>
          {columns[0]?.map((blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </VStack>
        {isLargerThanMd && (
          <motion.div
            style={{
              y: isLargerThan1024 ? (blogs?.length > 6 && y) : (blogs?.length > 4 && y),
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {columns[1]?.map((blog) => (
              <Blog key={blog._id} blog={blog} />
            ))}
          </motion.div>
        )}
        {isLargerThan1024 && (
          <VStack width={"full"} spacing={"24px"}>
            {columns[2]?.map((blog) => (
              <Blog key={blog._id} blog={blog} />
            ))}
          </VStack>
        )}
      </HStack>
    </VStack>
  );
};

export default PublicBlogs;