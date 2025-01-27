import { Flex, Hide, Show } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import React, { useState } from 'react';
import DesktopHeader from './_components/desktop-header/DesktopHeader';
import MobileHeader from './_components/mobile-header/MobileHeader';

function HeaderMain() {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    if (window.scrollY > 10) setIsScrolled(true);
    else setIsScrolled(false);
    return () => (window.onscroll = null);
  };

  const headerMenuItems = [
    {
      label: 'Platform Functionalities',
      links: [
        { label: 'Physical Products', description: 'All our items in one place', icon: <AppIcons.HeaderBag />, href: '/physical-product' },
        { label: 'Digital Goods', description: 'Shop by type and interest', icon: <AppIcons.HeaderImage />, href: '/digital-product' },
        { label: 'Products on Demand', description: 'Themed and seasonal product selections', icon: <AppIcons.HeaderShirt />, href: '/pod-product' },
        { label: 'Onchain Affiliate', description: 'Transparent Commerce to Earn the Most', icon: <AppIcons.HeaderAffiliate />, href: '/onchain-affiliate' },
        { label: 'Payment Links', description: 'Seamless Payments, Anytime, Anywhere', icon: <AppIcons.HeaderCreditCard />, href: '/payment-links' },
        { label: 'Product Tiles', description: 'Embed and Sell Anywhere Effortlessly', icon: <AppIcons.HeaderProductBox />, href: '/product-tiles' },
        { label: 'Tokenizing Products', description: 'Tokenize Your Physical Assets Seamlessly', icon: <AppIcons.HeaderTokenCoin />, href: '/tokenizing-products' },
        { label: 'Affiliate SaaS Subscriptions', description: 'Affiliate SaaS Subscriptions with Confidence', icon: <AppIcons.HeaderAffiliateSass />, href: '/affiliate-sass' },
        { label: 'Custom Tokens', description: 'Unlock the Power of Custom Tokens', icon: <AppIcons.HeaderTokenCoin />, href: '/custom-tokens' },
        { label: 'Social Quests', description: 'Grow the community to earn more', icon: <AppIcons.SideBarQuests />, href: '/rewards' }
      ]
    },
    {
      label: 'Enterprise',
      links: [
        { label: 'DIMST', description: 'Onchain inventory management', icon: <AppIcons.HeaderCoins />, href: '/roi' },
        { label: 'Tokenpay', description: 'All our items in one place', icon: <AppIcons.HeaderCoins />, href: '/tokenpay' },
        { label: 'Metaverse Store', description: 'Step Into Your Metaverse Store', icon: <AppIcons.MetaverseStore />, href: '/metaverse-store' },
        { label: 'DPP', description: 'Digital product passport', icon: <AppIcons.HeaderImage />, href: '/dpp' }
      ]
    },
    {
      label: 'Partners',
      links: [
        { label: 'D3', description: 'Droplinked & D3', icon: <AppIcons.HeaderD3 />, href: '/d3' },
        { label: 'Unstoppable Domains', description: 'Droplinked & Unstoppable Domains', icon: <AppIcons.HeaderUd />, href: '/unstoppable-domains' },
        { label: 'Polygon', description: 'Droplinked & Polygon', icon: <AppIcons.HeaderPolygon />, href: '/Polygon' }
      ]
    }
  ];
    const headerMenuItems = [
        {
            label: "Platform Functionalities",
            links: [
                { label: "Physical Products", description: "All our items in one place", icon: <AppIcons.HeaderBag />, href: "/physical-product" },
                { label: "Digital Goods", description: "Shop by type and interest", icon: <AppIcons.HeaderImage />, href: "/digital-product" },
                { label: "Products on Demand", description: "Themed and seasonal product selections", icon: <AppIcons.HeaderShirt />, href: "/pod-product" },
                { label: "Onchain Affiliate", description: "Transparent Commerce to Earn the Most", icon: <AppIcons.HeaderAffiliate />, href: "/onchain-affiliate" },
                { label: "Payment Links", description: "Seamless Payments, Anytime, Anywhere", icon: <AppIcons.HeaderCreditCard />, href: "/payment-links" },
                { label: "Product Tiles", description: "Embed and Sell Anywhere Effortlessly", icon: <AppIcons.HeaderProductBox />, href: "/product-tiles" },
                { label: "Tokenizing Products", description: "Tokenize Your Physical Assets Seamlessly", icon: <AppIcons.HeaderTokenCoin />, href: "/tokenizing-products" },
                { label: "Affiliate SaaS Subscriptions", description: "Affiliate SaaS Subscriptions with Confidence", icon: <AppIcons.HeaderAffiliateSass />, href: "/affiliate-sass" },
                { label: "Custom Tokens", description: "Unlock the Power of Custom Tokens", icon: <AppIcons.HeaderTokenCoin />, href: "/custom-tokens" },
                { label: "Social Quests", description: "Grow the community to earn more", icon: <AppIcons.SideBarQuests />, href: "/rewards" }
            ]
        },
        {
            label: "Enterprise",
            links: [
                { label: "DIMST", description: "Onchain inventory management", icon: <AppIcons.HeaderCoins />, href: "/roi" },
                { label: "Tokenpay", description: "All our items in one place", icon: <AppIcons.HeaderCoins />, href: "/tokenpay" },
                { label: "Metaverse Store", description: "Step Into Your Metaverse Store", icon: <AppIcons.MetaverseStore />, href: "/metaverse-store" },
                { label: "DPP", description: "Digital product passport", icon: <AppIcons.HeaderImage />, href: "/dpp" }
            ]
        },
        {
            label: "Partners",
            links: [
                { label: "D3", description: "Droplinked & D3", icon: <AppIcons.HeaderD3 />, href: "/d3" },
                { label: "Unstoppable Domains", description: "Droplinked & Unstoppable Domains", icon: <AppIcons.HeaderUd />, href: "/unstoppable-domains" },
                // { label: "Polygon", description: "Droplinked & Polygon", icon: <AppIcons.HeaderPolygon />, href: "/Polygon" },
            ]
        }
    ]

  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        right={0}
        borderBottom={isScrolled ? '1px solid #3C3C3C' : 'transparent'}
        paddingBlock={{ base: 4, md: 6 }}
        paddingInline={{ base: 4, md: 9, lg: '60px', xl: '72px' }}
        backgroundColor={isScrolled ? '#141414' : 'transparent'}
        zIndex={999}
      >
        <Hide below="lg">
          <DesktopHeader headerMenuItems={headerMenuItems} />
        </Hide>

        <Show below="lg">
          <MobileHeader headerMenuItems={headerMenuItems} />
        </Show>
      </Flex>
    </>
  );
}

export default HeaderMain;
