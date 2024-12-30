// ColorCircle.tsx
import { Box } from "@chakra-ui/react";
import React from "react";

// تعریف ثابت‌های رنگ‌ها برای استفاده در این کامپوننت
const ACTIVE_BORDER_COLOR = "#2BCFA1";
const INACTIVE_BORDER_COLOR = "#FFFFFF";

interface ColorCircleProps {
  color: string;
  isActive: boolean;
  onClick: () => void;
}

const ColorCircle: React.FC<ColorCircleProps> = ({ color, isActive, onClick }) => {
  return (
    <Box
      width="20px"
      height="20px"
      borderRadius="50%"
      bg={color}
      border={isActive ? `2px solid ${ACTIVE_BORDER_COLOR}` : `2px solid ${INACTIVE_BORDER_COLOR}`}
      cursor="pointer"
      onClick={onClick}
    />
  );
};

export default ColorCircle;
