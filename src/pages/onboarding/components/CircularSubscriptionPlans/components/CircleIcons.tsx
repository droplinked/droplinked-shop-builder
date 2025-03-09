import { Circle, Icon } from '@chakra-ui/react';
import React from 'react';
import { ShopLg } from 'assets/icons/System/Shop/ShopLg';
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg';
import { LinkLg } from 'assets/icons/Action/Link/LinkLg';
import { AffiliateLg} from 'assets/icons/System/Affiliate/AffiliateLg';
import { BrushLg } from 'assets/icons/StyleDesigner/Brush/BrushLg';
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg';
import { NftLg } from 'assets/icons/System/NFT/NftLg';
import { BoxLg} from 'assets/icons/Finance/Box/BoxLg';

const CircleIcons = () => {
  const circleIcons = [
    { icon: ShopLg , position: { top: '0', left: '50%', transform: 'translate(-50%, -50%)' } },
    { icon: LinkLg , position: { top: '15%', right: '15%', transform: 'translate(50%, -50%)' } },
    { icon: AffiliateLg, position: { top: '50%', right: '0', transform: 'translate(50%, -50%)' } },
    { icon: BrushLg, position: { bottom: '15%', right: '15%', transform: 'translate(50%, 50%)' } },
    { icon: CoinsLg, position: { bottom: '0', left: '50%', transform: 'translate(-50%, 50%)' } },
    { icon: NftLg, position: { bottom: '15%', left: '15%', transform: 'translate(-50%, 50%)' } },
    { icon: BoxLg, position: { top: '50%', left: '0', transform: 'translate(-50%, -50%)' } },
    { icon: MagicwandLg, position: { top: '15%', left: '15%', transform: 'translate(-50%, -50%)' } }
  ];

  return (
    <>
      {circleIcons.map((item, index) => (
        <Circle
          key={index}
          size="64px"
          bg="neutral.gray.900"
          position="absolute"
          border={"1px solid"}
          borderColor="neutral.gray.800"
          {...item.position}
        >
          <item.icon color="white" />
        </Circle>
      ))}
    </>
  );
};

export default CircleIcons; 