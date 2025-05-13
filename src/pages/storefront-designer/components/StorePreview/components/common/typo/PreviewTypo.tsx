import { Text, TextProps } from '@chakra-ui/react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext } from 'react';
import classes from './style.module.scss';

function PreviewTypo(props: TextProps) {
  const { state: { shop: { shopDesign: { fontfamily, textColorParagraphs } } } } = useContext(designerContext);

  return (
    <Text className={classes.fonts} fontFamily={fontfamily} color={textColorParagraphs || '#FFF'} {...props}>
      {props.children}
    </Text>
  );
}

export default PreviewTypo;
