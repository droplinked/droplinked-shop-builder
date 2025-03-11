import { Circle, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { ShopLg } from 'assets/icons/System/Shop/ShopLg';
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg';
import { LinkLg } from 'assets/icons/Action/Link/LinkLg';
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg';
import { BrushLg } from 'assets/icons/StyleDesigner/Brush/BrushLg';
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg';
import { NftLg } from 'assets/icons/System/NFT/NftLg';
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg';

const CircleIcons = () => {
  const circleIcons = [
    { icon: ShopLg, position: { top: '0', left: '65%' } },
    { icon: LinkLg, position: { top: '15%', right: '10%' } },
    { icon: AffiliateLg, position: { top: '50%', right: '0' } },
    { icon: BrushLg, position: { bottom: '15%', right: '15%' } },
    { icon: CoinsLg, position: { bottom: '0', left: '50%' } },
    { icon: NftLg, position: { bottom: '15%', left: '15%' } },
    { icon: BoxLg, position: { top: '50%', left: '0' } },
    { icon: MagicwandLg, position: { top: '15%', left: '15%' } }
  ];

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
      animate={{
        rotate: -360
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {circleIcons.map((item, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            ...item.position,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Circle
            size="64px"
            bg="neutral.gray.900"
            border={"1px solid"}
            borderColor="neutral.gray.800"
          >
            <item.icon color="white" />
          </Circle>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CircleIcons;