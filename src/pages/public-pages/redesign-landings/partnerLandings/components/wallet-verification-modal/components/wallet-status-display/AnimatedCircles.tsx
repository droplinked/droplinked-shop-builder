import { Box } from "@chakra-ui/react";
import React from "react";

interface AnimatedCirclesProps {
    isGreen: boolean;
    isLoading: boolean;
    color: string;
}

const AnimatedCircles: React.FC<AnimatedCirclesProps> = ({ isGreen, isLoading, color }) => {
    return (
        <>
            {Array.from({ length: 9 }).map((_, index) => (
                <Box
                    key={index}
                    position="absolute"
                    borderRadius="full"
                    border={{
                        base: `${index === 0 ? "1px" : "0.5px"} solid ${isGreen ? "white" : color}`,
                        md: `${index === 0 ? "2px" : "1px"} solid ${isGreen ? "white" : color}`,
                    }}
                    width={{
                        base: `${220 + index * 30}px`,
                        md: `${390 + index * 50}px`,
                    }}
                    height={{
                        base: `${220 + index * 30}px`,
                        md: `${390 + index * 50}px`,
                    }}
                    opacity={index === 0 ? (isLoading ? 0.08 : 0.16) : isGreen ? (5 - index) * 0.01 : (14 - index) * 0.01}
                    borderWidth={{ base: index === 0 && "1px", md: index === 0 && "2px" }}
                />
            ))}
        </>
    );
};

export default AnimatedCircles; 