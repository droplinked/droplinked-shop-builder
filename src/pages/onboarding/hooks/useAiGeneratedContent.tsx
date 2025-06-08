import useAppToast from 'hooks/toast/useToast';
import { generateDomains, generateHeroSection, generateLogos, generateShopNames } from 'lib/apis/ai/services';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

export const useAiGeneratedContent = (businessCategory: string, businessDescribe: string) => {
    const { showToast } = useAppToast();
    const { updateOnboardingState, storeSetup } = useOnboardingStore();

    // Create a staged state that will only be committed when user clicks "Done"
    const [stagedState, setStagedState] = useState({
        logo: storeSetup.logo || '',
        hero_section: storeSetup.hero_section || '',
        shop_url: storeSetup.shop_url || '',
        name: storeSetup.name || '',
    });

    const defaultLogo = "https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png"

    useEffect(() => {
        setStagedState({
            logo: logos?.[0] || '',
            hero_section: covers?.[0] || '',
            shop_url: urls?.[0] || '',
            name: names?.[0] || '',
        });
    }, []);

    const { isFetching: isLogosLoading, data: logos, refetch: refetchLogos } = useQuery({
        queryFn: () => generateLogos({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateLogos"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.logos || [];
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" });
        },
        onSuccess(data) {
            handleLogoChange(data?.[0] || defaultLogo);
        },
        refetchOnMount: false,
    });

    const { isFetching: isCoversLoading, data: covers, refetch: refetchCovers } = useQuery({
        queryFn: () => generateHeroSection({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateHeroSection"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.heroSections || [];
        },
        onSuccess(data) {
            handleCoverChange(data?.[0]);
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" });
        },
        refetchOnMount: false,
    });

    const { isFetching: isUrlsLoading, data: urls, refetch: refetchUrls } = useQuery({
        queryFn: () => generateDomains({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateDomains"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.domains || [];
        },
        onSuccess(data) {
            handleUrlChange(data?.[0]);
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" });
        },
        refetchOnMount: false,
    });

    const { isFetching: isNamesLoading, data: names, refetch: refetchNames } = useQuery({
        queryFn: () => generateShopNames({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateShopNames"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.shopNames || [];
        },
        onSuccess(data) {
            handleNameChange(data?.[0]);
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" });
        },
        refetchOnMount: false,
    });

    const handleLogoChange = (logo: string) => {
        setStagedState(prev => ({ ...prev, logo }));
    };

    const handleCoverChange = (hero_section: string) => {
        setStagedState(prev => ({ ...prev, hero_section }));
    };

    const handleUrlChange = (shop_url: string) => {
        setStagedState(prev => ({ ...prev, shop_url }));
    };

    const handleNameChange = (name: string) => {
        setStagedState(prev => ({ ...prev, name }));
    };

    const commitChanges = () => {
        updateOnboardingState("storeSetup", {
            ...storeSetup,
            logo: stagedState.logo,
            hero_section: stagedState.hero_section,
            shop_url: stagedState.shop_url,
            name: stagedState.name
        });
    };

    return {
        logos: {
            data: logos || [],
            isLoading: isLogosLoading,
            refetch: refetchLogos,
            selectedLogo: stagedState.logo,
            handleChange: handleLogoChange
        },
        covers: {
            data: covers || [],
            isLoading: isCoversLoading,
            refetch: refetchCovers,
            selectedCover: stagedState.hero_section,
            handleChange: handleCoverChange
        },
        urls: {
            data: urls || [],
            isLoading: isUrlsLoading,
            refetch: refetchUrls,
            selectedUrl: stagedState.shop_url,
            handleChange: handleUrlChange
        },
        names: {
            data: names || [],
            isLoading: isNamesLoading,
            refetch: refetchNames,
            selectedName: stagedState.name,
            handleChange: handleNameChange
        },
        commitChanges
    };
};
