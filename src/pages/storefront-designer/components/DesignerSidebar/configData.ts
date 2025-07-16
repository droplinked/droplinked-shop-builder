import React from 'react';
import { BrushMd } from 'assets/icons/StyleDesigner/Brush/BrushMd';
import { FooterMd } from 'assets/icons/StyleDesigner/Footer/FooterMd';
import { HeaderMd } from 'assets/icons/StyleDesigner/Header/HeaderMd';
import { ClocktimeMd } from 'assets/icons/System/ClockTime/ClocktimeMd';
import { ImageMd } from 'assets/icons/System/Image/ImageMd';
import { ShopMd } from 'assets/icons/System/Shop/ShopMd';
import { FooterConfig, HeaderConfig, HeroConfig, SettingsConfig, StoreConfig, ThemeConfig } from './components/config-sections';
import { ShopSm } from 'assets/icons/System/Shop/ShopSm';

export interface ConfigSectionData {
  id: string;
  title: string;
  icon: React.ReactElement;
  component?: React.ComponentType;
  defaultOpen?: boolean;
} 

type TranslateFunction = (key: string) => string;

/**
 * Available configuration sections for the designer sidebar
 */
export const getConfigSections = (t: TranslateFunction): ConfigSectionData[] => {
  return [
    {
      id: 'theme',
      title: t('DesignerSidebar.sections.theme'),
      icon: React.createElement(BrushMd, { color: "white" }),
      component: ThemeConfig,
      defaultOpen: true
    },
    {
      id: 'header',
      title: t('DesignerSidebar.sections.header'),
      icon: React.createElement(HeaderMd, { color: "white" }),
      component: HeaderConfig
    },
    {
      id: 'hero',
      title: t('DesignerSidebar.sections.heroSection'),
      icon: React.createElement(ImageMd, { color: "white" }),
      component: HeroConfig
    },
    {
      id: 'store',
      title: t('DesignerSidebar.sections.storeDetails'),
      icon: React.createElement(ShopMd, { color: "white" }),
      component: StoreConfig
    },
    {
      id: 'footer',
      title: t('DesignerSidebar.sections.footer'),
      icon: React.createElement(FooterMd, { color: "white" }),
      component: FooterConfig
    },
    {
      id: 'settings',
      title: t('DesignerSidebar.sections.additionalSettings'),
      icon: React.createElement(ClocktimeMd, { color: "white" }),
      component: SettingsConfig
    }
  ];
}; 