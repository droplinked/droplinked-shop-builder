import React from 'react';
import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react';
import { formatDateToShortStyle } from 'utils/helpers/dateUtils';
import { GridSm } from 'assets/icons/Navigation/Grid/GridSm';
import { CalendarSm } from 'assets/icons/System/Calendar/CalendarSm';
import { ShareSm } from 'assets/icons/Action/Share/ShareSm';
import { ListSm } from 'assets/icons/Navigation/List/ListSm';
import { TagSm } from 'assets/icons/Finance/Tag/TagSm';

import BlogSidebarSection from './BlogSidebarSection';
import SocialShareButtons from './SocialShareButtons';
import TableOfContents from './TableOfContents';
import TagList from './TagList';

interface TocItem {
  id: string;
  text: string;
}

interface BlogSidebarProps {
  category?: string;
  createdAt: string;
  tags?: string[];
  tocItems: TocItem[];
  activeTocItemId?: string;
  onTocItemClick?: (itemId: string) => void;
  onShare?: (platform: string) => void;
  shareUrl?: string;
  shareTitle?: string;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  category,
  createdAt,
  tags = [],
  tocItems,
  activeTocItemId,
  onTocItemClick,
  onShare,
  shareUrl,
  shareTitle
}) => {
  return (
    <Box
      width={{ xl: '376px', '2xl': '416px' }}
      flexShrink={0}
      position={{ xl: 'sticky' }}
      top={{ xl: '24px' }}
      height="fit-content"
    >
      <VStack spacing={6} align="flex-start">
        {/* Category */}
        <BlogSidebarSection icon={<GridSm color="#7B7B7B" />} title="Category">
          <Text color="neutral.white"  fontSize="16px" fontWeight="normal">
            {category || 'General'}
          </Text>
        </BlogSidebarSection>

        {/* Published Date */}
        <BlogSidebarSection
          icon={<CalendarSm color="#7B7B7B" />}
          title="Published"
        >
          <HStack spacing={3} justify="flex-start" align="center">
            <Text color="neutral.white" fontSize="16px" fontWeight="normal">
              {formatDateToShortStyle(createdAt)}
            </Text>
          </HStack>
        </BlogSidebarSection>

        {/* Share */}
        <BlogSidebarSection icon={<ShareSm color="#7B7B7B" />} title="Share">
          <SocialShareButtons
            url={shareUrl}
            title={shareTitle}
            onShare={onShare}
          />
        </BlogSidebarSection>

        <Divider borderColor="neutral.gray.800" />

        {/* Table of Contents */}
        <BlogSidebarSection
          icon={<ListSm color="#7B7B7B" />}
          title="In this article"
        >
          <TableOfContents
            items={tocItems}
            activeItemId={activeTocItemId}
            onItemClick={onTocItemClick}
          />
        </BlogSidebarSection>

        <Divider borderColor="neutral.gray.800" />

        {/* Tags */}
        <BlogSidebarSection icon={<TagSm color="#7B7B7B" />} title="Tags">
          <TagList tags={tags} />
        </BlogSidebarSection>
      </VStack>
    </Box>
  );
};

export default BlogSidebar;
