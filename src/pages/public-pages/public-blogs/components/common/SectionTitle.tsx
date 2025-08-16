import { Text, TextProps } from "@chakra-ui/react";
import React from "react";

interface SectionTitleProps extends Omit<TextProps, 'children'> {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, ...props }) => {
  return (
    <Text
      color="white"
      fontSize={{ base: '20px', lg: '24px' }}
      fontWeight="medium"
      fontFamily="Inter"
      lineHeight="9"
      mb={{ base: '16px', lg: '24px' }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default SectionTitle;
