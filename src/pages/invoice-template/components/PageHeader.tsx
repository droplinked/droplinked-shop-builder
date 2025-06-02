import { Flex } from '@chakra-ui/react';
import { DownloadMd } from 'assets/icons/Action/Download/DownloadMd';
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd';
import AppButton from 'components/redesign/button/AppButton';
import { HeaderContainer } from 'layouts/ProducerLayout/Header/HeaderContainer';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
    onDownload: () => void;
    isDownloading?: boolean;
    isFetching?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onDownload, isDownloading, isFetching }) => {
    const navigate = useNavigate();

    return (
        <HeaderContainer py={4}>
            <Flex justifyContent="space-between" width="100%" px={4}>
                <AppButton
                    variant="normal"
                    color="#fff"
                    leftIcon={<ChevronleftMd />}
                    onClick={() => navigate("/analytics")}
                >
                    Back to Dashboard
                </AppButton>
                <AppButton
                    rightIcon={<DownloadMd />}
                    onClick={onDownload}
                    isLoading={isDownloading}
                    isDisabled={isFetching}
                    loadingText="Downloading..."
                >
                    Download
                </AppButton>
            </Flex>
        </HeaderContainer>
    );
};

export default PageHeader;
