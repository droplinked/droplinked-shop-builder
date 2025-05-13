import React from 'react';
import { BrushMd } from 'assets/icons/StyleDesigner/Brush/BrushMd';
import { FooterMd } from 'assets/icons/StyleDesigner/Footer/FooterMd';
import { HeaderMd } from 'assets/icons/StyleDesigner/Header/HeaderMd';
import { ClocktimeMd } from 'assets/icons/System/ClockTime/ClocktimeMd';
import { ImageMd } from 'assets/icons/System/Image/ImageMd';
import { ShopMd } from 'assets/icons/System/Shop/ShopMd';
import { FooterConfig, HeaderConfig, HeroConfig, SettingsConfig, StoreConfig, ThemeConfig } from './components/config-sections';

export interface ConfigSectionData {
  id: string;
  title: string;
  icon: React.ReactElement;
  component?: React.ComponentType;
  defaultOpen?: boolean;
} 

/**
 * Available configuration sections for the designer sidebar
 */
export const configSections: ConfigSectionData[] = [
  {
    id: 'theme',
    title: 'Theme',
    icon: React.createElement(BrushMd, { color: "white" }),
    component: ThemeConfig,
    defaultOpen: true
  },
  {
    id: 'header',
    title: 'Header',
    icon: React.createElement(HeaderMd, { color: "white" }),
    component: HeaderConfig
  },
  {
    id: 'hero',
    title: 'Hero Section',
    icon: React.createElement(ImageMd, { color: "white" }),
    component: HeroConfig
  },
  {
    id: 'store',
    title: 'Store Details',
    icon: React.createElement(ShopMd, { color: "white" }),
    component: StoreConfig
  },
  {
    id: 'footer',
    title: 'Footer',
    icon: React.createElement(FooterMd, { color: "white" }),
    component: FooterConfig
  },
  {
    id: 'settings',
    title: 'Additional Settings',
    icon: React.createElement(ClocktimeMd, { color: "white" }),
    component: SettingsConfig
  }
]; 