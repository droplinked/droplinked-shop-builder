import { Box, Flex, Link, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppImage from 'components/common/image/AppImage';
import AppTypography from 'components/common/typography/AppTypography';
import { getShopCommunityProfile } from 'lib/apis/shop/shopServices';
import ProductsGridRenderer from 'pages/affiliate/components/ProductsGridRenderer';

import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const AffiliateStoresProfile = () => {
  const params = useParams();
  const { data, isLoading: isLoadingStore } = useQuery({ queryKey: ['new-shops', params?.shopId], queryFn: () => getShopCommunityProfile({ shopId: params?.shopId }) });
  const storeProfile = data?.data?.data;
  return (
    <Box display="flex" width="full" flexDirection="column" alignItems="center" gap="24px">
      <Box display="flex" width="full" flexDirection="column" alignItems="center" gap="24px">
        <VStack align={'stretch'} width={'full'}>
          <AppImage objectFit={'cover'} width="full" height={'360px'} src="https://upload-file-droplinked.s3.amazonaws.com/22b2a2e43dcf9d76c43ad427cd8f72a4a0db5dab76be1e1545140721aba0e018.jpg" />
          <Box width={'132px'} height={'132px'} padding={'16px'} backgroundColor={'#141414'} rounded={'full'} marginTop={'-66px'} marginLeft={'16px'}>
            <AppImage src={storeProfile?.logo} rounded={'full'} />
          </Box>
        </VStack>
        <Box display="flex" padding="0px 36px 0px 24px" justifyContent="space-between" alignItems="flex-start" alignSelf="stretch">
          <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="600" lineHeight="36px">
            {storeProfile?.name}
          </AppTypography>
          <Flex gap={'12px'} alignItems={'center'}>
            {storeProfile?.tiktokURL && storeProfile?.tiktokURL !== '' && (
              <Link
                href={`https://tiktok.com/@${storeProfile?.tiktokURL}`}
                style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#292929', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                target="_blank"
              >
                <AppIcons.AffiliateStoreTiktok />
              </Link>
            )}
            {storeProfile?.instagramURL && storeProfile?.instagramURL !== '' && (
              <Link
                href={`https://instagram.com/${storeProfile?.instagramURL}`}
                style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#292929', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                target="_blank"
              >
                <AppIcons.AffiliateStoreInstagram />
              </Link>
            )}
            {storeProfile?.twitterURL && storeProfile?.twitterURL !== '' && (
              <Link
                href={`https://x.com/${storeProfile?.twitterURL}`}
                style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#292929', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                target="_blank"
              >
                <AppIcons.AffiliateStoreTwitter />
              </Link>
            )}
            {storeProfile?.youtubeURL && storeProfile?.youtubeURL !== '' && (
              <Link
                href={`https://youtube.com/@${storeProfile?.youtubeURL}`}
                style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#292929', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                target="_blank"
              >
                <AppIcons.AffiliateStoreYoutube />
              </Link>
            )}
          </Flex>
        </Box>
      </Box>
      <ProductsGridRenderer data={storeProfile} fetchNextPage={undefined} hasNextPage={undefined} isLoading={isLoadingStore} isError={undefined}></ProductsGridRenderer>
    </Box>
  );
};

export default AffiliateStoresProfile;
