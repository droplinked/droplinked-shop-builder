import { Box } from '@chakra-ui/react';
import React from 'react';

interface BackgroundImageProps {
  height?: string;
  zIndex?: number;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  height = "100vh", 
}) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      height={height}
      backgroundImage="url('https://upload-file-droplinked.s3.amazonaws.com/34ff1245c76a75b324a960ec988f46981159698dbda5cd62bcbd347859a4ff01.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    />
  );
};

export default BackgroundImage;

