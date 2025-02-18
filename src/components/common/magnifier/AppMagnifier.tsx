import { Box, Image as MyImage, ImageProps, Skeleton } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import classes from './style.module.scss';

interface IProps {
  src: string;
  magnifierRadius: number;
  zoom?: number;
  props?: ImageProps;
}

function AppMagnifier({ src, magnifierRadius, zoom = 2, props }: IProps) {
  const [magnifierState, setMagnifierState] = useState({
    top: -80,
    left: -80,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0
  });
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  const [isVisible, setIsVisible] = useState(false);

  const mouseover = useCallback(
    (e: any) => {
      setIsVisible(true);
      const smallImage = e.currentTarget;
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const magnifierBackgroundSize = {
        width: smallImage.width * zoom,
        height: smallImage.height * zoom
      };

      setMagnifierState({
        top: y - magnifierRadius - 100,
        left: x - magnifierRadius - 100,
        offsetX: (x / smallImage.width) * magnifierBackgroundSize.width - magnifierRadius,
        offsetY: (y / smallImage.height) * magnifierBackgroundSize.height - magnifierRadius,
        width: magnifierBackgroundSize.width,
        height: magnifierBackgroundSize.height
      });
    },
    [magnifierRadius, zoom]
  );

  return (
    <Box
      position="relative"
      display="flex"
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
      width={{ base: 'auto', md:'440px', lg: '526px', xl: '586px' }}
      height={{ base: 'auto' , md:'440px',lg: '526px', xl: '586px' }}
      aspectRatio="1/1"
    >
      <>
        <MyImage w={'full'} h={'full'} objectFit="cover" src={src} {...props} onMouseMove={mouseover} onMouseLeave={() => setIsVisible(false)} onClick={() => setIsVisible(false)} />
        <div
          className={classes.image}
          style={{
            backgroundImage: `url("${src}")`,
            width: 8 * magnifierRadius,
            height: 8 * magnifierRadius,
            top: magnifierState.top + 'px',
            left: magnifierState.left + 'px',
            backgroundPositionX: -1 * magnifierState.offsetX,
            backgroundPositionY: -1 * magnifierState.offsetY,
            opacity: isVisible ? 1 : 0,
            backgroundSize: `${magnifierState.width}px ${magnifierState.width}px`
          }}
        />
      </>
    </Box>
  );
}

export default AppMagnifier;
