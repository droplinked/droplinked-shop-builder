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
  const radius = 365; // Radius of the circle in pixels
  const totalIcons = 8;

  const calculatePosition = (index: number) => {
    const angle = (index / totalIcons) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return {
      left: `calc(46% + ${x}px)`,
      top: `calc(45.5% + ${y}px)`,
    };
  };

  const circleIcons = [
    { icon: ShopLg },
    { icon: LinkLg },
    { icon: AffiliateLg },
    { icon: BrushLg },
    { icon: CoinsLg },
    { icon: NftLg },
    { icon: BoxLg },
    { icon: MagicwandLg }
  ].map((item, index) => ({
    ...item,
    position: calculatePosition(index)
  }));

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ rotate: 0 }}
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 40,
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
          }}
          initial={{ rotate: 0 }}
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Circle
            size="64px"
            bg="neutral.gray.900"
            border="1px solid"
            borderColor="neutral.gray.800"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <item.icon color="white" />
          </Circle>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CircleIcons;