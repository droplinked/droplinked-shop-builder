import { Box, Skeleton, useBreakpointValue } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useBlogs from "../../hooks/useBlogs";
import { IBlogListItem } from "../../types/blog.types";
import { CenterCard } from "./CenterCard";
import { SideCard } from "./SideCard";
import { NavButton } from "./NavButton";
import SliderControls from "../common/SliderControls";

interface FeaturedBlogsCarouselProps {
    slides?: IBlogListItem[];
}

export default function FeaturedBlogsCarousel({
    slides: slidesProp,
}: FeaturedBlogsCarouselProps) {
    const { getFeaturedBlogs, isLoading } = useBlogs();

    const slides = useMemo<IBlogListItem[]>(() => {
        if (slidesProp && slidesProp.length) return slidesProp;
        return getFeaturedBlogs();
    }, [slidesProp, getFeaturedBlogs]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (slides.length) setCurrentIndex(0);
    }, [slides.length]);

    const next = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((i) => (i + 1) % (slides.length || 1));
        setTimeout(() => setIsTransitioning(false), 500);
    }, [slides.length, isTransitioning]);

    const prev = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(
            (i) => (i - 1 + (slides.length || 1)) % (slides.length || 1)
        );
        setTimeout(() => setIsTransitioning(false), 500);
    }, [slides.length, isTransitioning]);

    const getByOffset = (offset: number) =>
        slides[(currentIndex + offset + slides.length) % slides.length];
    const left2 = getByOffset(-2);
    const left1 = getByOffset(-1);
    const center = getByOffset(0);
    const right1 = getByOffset(1);
    const right2 = getByOffset(2);

    const sidesPerSide = useBreakpointValue({ base: 0, md: 1, lg: 2 }) ?? 2;
    const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

    if (isLoading) {
        return (
            <Skeleton
                w={{ base: "100%", md: "100%" }}
                h={{ base: "384px", md: "480px" }}
                borderRadius="xl"
            />
        );
    }
    if (!slides.length) return null;

    const MobileLayout = () => (
        <Box
            w={{ base: "100%" }}
            maxW="1296px"
            h={{ base: "384px" }}
            position="relative"
            display="inline-flex"
            justifyContent="center"
            alignItems="flex-end"
            style={{ perspective: "1000px" }}
        >
            <Box
                transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                transform={
                    isTransitioning
                        ? "rotateY(5deg) scale(0.95)"
                        : "rotateY(0deg) scale(1)"
                }
                style={{ transformStyle: "preserve-3d" }}
            >
                <CenterCard slide={center} />
            </Box>
            {slides.length > 1 && (
                <Box
                    w="100%"
                    position="absolute"
                    bottom={-4}
                    left="50%"
                    transform="translateX(-50%)"
                >
                    <SliderControls
                        onPrevious={prev}
                        onNext={next}
                        currentIndex={currentIndex}
                        totalItems={slides.length}
                        visibleItems={1}
                    />
                </Box>
            )}
        </Box>
    );
    if (isMobile) return <MobileLayout />;

    const OneSideLayout = () => (
        <Box
            w={{ md: "100%" }}
            maxW="1296px"
            h={{ md: "480px" }}
            position="relative"
            display="inline-flex"
            justifyContent="center"
            alignItems="flex-end"
            gap={6}
            style={{ perspective: "1200px" }}
        >
            <Box
                transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                transform="rotateY(-15deg) translateZ(-50px) scale(0.9)"
                opacity={0.7}
                style={{ transformStyle: "preserve-3d" }}
            >
                <SideCard slide={left1} />
            </Box>
            <Box
                w="24px"
                h={{ md: "480px" }}
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={2}
            >
                <NavButton direction="prev" onClick={prev} />
            </Box>
            <Box
                transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                transform={
                    isTransitioning
                        ? "rotateY(8deg) scale(0.95)"
                        : "rotateY(0deg) scale(1)"
                }
                style={{ transformStyle: "preserve-3d" }}
                zIndex={1}
            >
                <CenterCard slide={center} />
            </Box>
            <Box
                w="24px"
                h={{ md: "480px" }}
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={2}
            >
                <NavButton direction="next" onClick={next} />
            </Box>
            <Box
                transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                transform="rotateY(15deg) translateZ(-50px) scale(0.9)"
                opacity={0.7}
                style={{ transformStyle: "preserve-3d" }}
            >
                <SideCard slide={right1} />
            </Box>
        </Box>
    );
    if (sidesPerSide === 1) return <OneSideLayout />;

    return (
        <Box
            w={{ lg: "100%" }}
            maxW="1296px"
            h={{ lg: "480px" }}
            position="relative"
            display="inline-flex"
            justifyContent="center"
            alignItems="flex-end"
            gap={6}
            style={{ perspective: "1500px" }}
        >
            <Box
                position="relative"
                display="inline-flex"
                alignItems="flex-end"
                gap={6}
            >
                <Box
                    transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    transform="rotateY(-25deg) translateZ(-100px) scale(0.8)"
                    opacity={0.5}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <SideCard slide={left2} />
                </Box>
                <Box
                    transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    transform="rotateY(-15deg) translateZ(-50px) scale(0.9)"
                    opacity={0.7}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <SideCard slide={left1} />
                </Box>
                <NavButton
                    direction="prev"
                    onClick={prev}
                    position="absolute"
                    left="50%"
                    top="50%"
                    transform="translate(-50%, -50%)"
                    zIndex={3}
                />
            </Box>
            <Box
                transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                transform={
                    isTransitioning
                        ? "rotateY(10deg) scale(0.95)"
                        : "rotateY(0deg) scale(1)"
                }
                style={{ transformStyle: "preserve-3d" }}
                zIndex={2}
                boxShadow="0 20px 40px rgba(0,0,0,0.1)"
            >
                <CenterCard slide={center} />
            </Box>
            <Box
                position="relative"
                display="inline-flex"
                alignItems="flex-end"
                gap={6}
            >
                <Box
                    transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    transform="rotateY(15deg) translateZ(-50px) scale(0.9)"
                    opacity={0.7}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <SideCard slide={right1} />
                </Box>
                <Box
                    transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    transform="rotateY(25deg) translateZ(-100px) scale(0.8)"
                    opacity={0.5}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <SideCard slide={right2} />
                </Box>
                <NavButton
                    direction="next"
                    onClick={next}
                    position="absolute"
                    left="50%"
                    top="50%"
                    transform="translate(-50%, -50%)"
                    zIndex={3}
                />
            </Box>
        </Box>
    );
}
