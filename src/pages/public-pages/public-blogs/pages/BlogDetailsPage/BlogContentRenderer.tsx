import React from "react";
import { Box, Text, Heading, Image, UnorderedList, ListItem } from "@chakra-ui/react";
import { IBlogDetail } from "../../types/blog.types";

// Interface for TOC items
export interface ITocItem {
  id: string;
  text: string;
  level: number;
}

// Utility function to generate consistent heading IDs
const generateHeadingId = (block: any, index: number): string => {
  if (block.id) return block.id;
  
  const headingText = block.content
    ?.map((item: any) => item.text || "")
    .join("")
    .trim();
  
  if (headingText) {
    return `heading-${index}-${headingText.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  }
  
  return `heading-${index}-${Math.random().toString(36).substr(2, 9)}`;
};

// Utility function to extract TOC items from blog content
export const extractTocItems = (blog: IBlogDetail): ITocItem[] => {
  const tocItems: ITocItem[] = [];
  
  // Parse the content if it's a string
  let contentBlocks = blog.content;
  if (typeof blog.content === "string") {
    try {
      contentBlocks = JSON.parse(blog.content);
    } catch (error) {
      console.error("Failed to parse blog content for TOC:", error);
      return [];
    }
  }

  if (!Array.isArray(contentBlocks)) {
    return [];
  }

  // Extract headings from content blocks
  contentBlocks.forEach((block, index) => {
    if (block.type === "heading" && block.props?.level) {
      const headingText = block.content
        ?.map((item: any) => item.text || "")
        .join("")
        .trim();

      if (headingText) {
        const headingId = generateHeadingId(block, index);
        
        tocItems.push({
          id: headingId,
          text: headingText,
          level: block.props.level
        });
      }
    }
  });

  return tocItems;
};


function BlogContentRenderer({ blog }: { blog: IBlogDetail }) {
  const renderContent = (content: any[]) => {
    return content.map((item, index) => {
      if (item.type === "text") {
        const styles = item.styles || {};
        return (
          <Text
            key={index}
            as="span"
            color="white"
            fontWeight={styles.bold ? "bold" : "normal"}
            fontStyle={styles.italic ? "italic" : "normal"}
          >
            {item.text}
          </Text>
        );
      }
      return null;
    });
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <Text key={block.id} fontSize="16px" fontWeight="400" color="text.body.primary.dark" mb={4} lineHeight="1.6">
            {renderContent(block.content)}
          </Text>
        );

      case "heading":
        const headingLevel = `h${block.props.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        const headingId = generateHeadingId(block, index);
        
        return (
          <Heading 
            key={block.id} 
            id={headingId}
            as={headingLevel} 
            fontSize={{base:"18px", md:"24px"}} 
            mb={4} 
            fontWeight="600"
          >
            {renderContent(block.content)}
          </Heading>
        );

      case "image":
        return (
          <Box key={block.id} mb={4}>
            <Image
              src={block.props.url}
              alt={block.props.caption || ""}
              width="100%"
              borderRadius="xl"
            />
            {block.props.caption && (
              <Text mt={2} fontSize="14px" fontWeight="400" color="text.subtext.placeholder.dark" textAlign="center">
                {block.props.caption}
              </Text>
            )}
          </Box>
        );

      case "bulletListItem":
        return (
          <UnorderedList key={block.id} mb={2} color="white">
            <ListItem>
              {renderContent(block.content)}
            </ListItem>
          </UnorderedList>
        );

      default:
        return null;
    }
  };

  // Parse the content if it's a string
  let contentBlocks = blog.content;
  if (typeof blog.content === "string") {
    try {
      contentBlocks = JSON.parse(blog.content);
    } catch (error) {
      console.error("Failed to parse blog content:", error);
      return <Text color="white">Content could not be loaded.</Text>;
    }
  }

  if (!Array.isArray(contentBlocks)) {
    return <Text color="white">Invalid content format.</Text>;
  }

  return (
    <Box>
      {contentBlocks.map((block, index) => renderBlock(block, index))}
    </Box>
  );
}

export default BlogContentRenderer; 