/**
 * ===========================
 *     Dashboard Types
 * ===========================
 *
 * Defines TypeScript types and interfaces for 
 * the dashboard layout, including sidebar, 
 * profile, and subscription data.
 */
import { BoxProps } from '@chakra-ui/react';
import { IAppTypography } from 'components/common/typography/AppTypography';

/**
 * Represents an individual item in the sidebar menu.
 */
export type SidebarItem = {
  title: string;
  icon: any;
  linkTo?: string | null;
  list: Array<{ listTitle: string; linkTo: string }>;
  onClick?: () => void;
};

/**
 * Represents a group of sidebar items, typically categorized under a section.
 */
export type SidebarGroup = {
  group: string;
  items: SidebarItem[];
};

/**
 * Defines the structure for a profile item displayed in the user profile section.
 */
export type ProfileItem = {
  title: { label: string; style: Partial<IAppTypography> };
  icon: { svg: any; style: Partial<IAppTypography> };
  linkTo: string | null;
  isExternalLink: boolean;
  rightSide: { value: string | null; style: Partial<IAppTypography> };
  action?: () => void;
};

/**
 * Represents a subscription plan with configurable display options.
 */
export type SubscriptionPlan = {
  icon: any;
  title: string;
  rightSide:
  | { type: 'text'; style: IAppTypography; value: string }
  | { type: 'button'; style: BoxProps; value: string; action: () => void };
};