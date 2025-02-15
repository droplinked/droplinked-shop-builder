import { Text, TextProps } from '@chakra-ui/react';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext } from 'react';
import classes from './style.module.scss';

function PreviewTypo(props: TextProps) {
  const { state: { shop: { shopDesign: { fontfamily, textColorParagraphs } } } } = useContext(designContext);

  return (
    <Text className={classes.fonts} fontFamily={fontfamily} color={textColorParagraphs || '#FFF'} {...props}>
      {props.children}
    </Text>
  );
}

export default PreviewTypo;
